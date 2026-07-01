#!/usr/bin/env node
// Aggregate contributors across every repo of one or more GitHub organizations.
// Output: profile/contributors.json (single source of truth for renderer).
//
// Env:
//   ORGS            required, comma-separated GitHub org logins
//                   (or ORG for backwards compatibility with a single org)
//                   e.g. "PancrePal-xiaoyibao,opencare-skillhub"
//   TOKEN           required, GitHub token
//   INCLUDE_PRIVATE optional, "true" to also scan private/internal repos.
//                   Repo names are NOT exposed; only aggregate private
//                   commit/pr/review counts are added to each contributor.
//                   Requires token with repo scope on the target orgs.
//
// Scoring: score = commits * 1 + prs * 3 + reviews * 2
// Private and public contributions are summed into the same score.

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ORGS = (process.env.ORGS || process.env.ORG || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
const TOKEN = process.env.TOKEN || process.env.GITHUB_TOKEN
const INCLUDE_PRIVATE = process.env.INCLUDE_PRIVATE === 'true'
if (!ORGS.length) throw new Error('ORGS (or ORG) env var is required')
if (!TOKEN) throw new Error('TOKEN (or GITHUB_TOKEN) env var is required')

const API = 'https://api.github.com'
const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': `xiaoyibao-contributors-sync`,
}

const BOT_LOGINS = new Set([
  'dependabot[bot]', 'renovate[bot]', 'github-actions[bot]',
  'greenkeeper[bot]', 'imgbot[bot]', 'allcontributors[bot]',
  'codecov[bot]', 'sonarcloud[bot]', 'stale[bot]',
])

const BOT_PATTERNS = [/\[bot\]$/i, /-bot$/i, /^bot-/i]

function isBot(login, type) {
  if (!login) return true
  if (type === 'Bot') return true
  if (BOT_LOGINS.has(login)) return true
  return BOT_PATTERNS.some((p) => p.test(login))
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function ghFetch(url, opts = {}) {
  const maxAttempts = opts.maxAttempts ?? 8
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const res = await fetch(url, { ...opts, headers: { ...HEADERS, ...(opts.headers || {}) } })
    if (res.status === 202) {
      const wait = Math.min(2000 * Math.pow(2, attempt), 30000)
      console.warn(`  [202] ${url} — waiting ${Math.round(wait / 1000)}s (attempt ${attempt + 1}/${maxAttempts})`)
      await sleep(wait)
      continue
    }
    if (res.status === 403 || res.status === 429) {
      const reset = Number(res.headers.get('x-ratelimit-reset')) * 1000
      const wait = Math.max(reset - Date.now(), 5000)
      console.warn(`rate limited, sleeping ${Math.round(wait / 1000)}s`)
      await sleep(wait)
      continue
    }
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      throw new Error(`${res.status} ${res.statusText} at ${url}\n${body}`)
    }
    return res
  }
  throw new Error(`STATS_TIMEOUT: ${url}`)
}

async function ghPaged(url) {
  const out = []
  let next = url
  while (next) {
    const res = await ghFetch(next)
    if (res.status === 204) return []
    const text = await res.text()
    if (!text) return out
    let page
    try {
      page = JSON.parse(text)
    } catch (e) {
      throw new Error(`JSON parse failed for ${next}: ${e.message}\nfirst 200 chars: ${text.slice(0, 200)}`)
    }
    if (Array.isArray(page)) out.push(...page)
    else return page
    const link = res.headers.get('link') || ''
    const m = link.match(/<([^>]+)>;\s*rel="next"/)
    next = m ? m[1] : null
  }
  return out
}

async function graphql(query, variables) {
  const res = await ghFetch(`${API}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  if (json.errors) throw new Error(JSON.stringify(json.errors))
  return json.data
}

async function listRepos(org) {
  // type=all includes public + private + internal (subject to token scope).
  // If INCLUDE_PRIVATE is false we filter locally so token permission errors
  // don't fail the whole run.
  const type = INCLUDE_PRIVATE ? 'all' : 'public'
  try {
    const repos = await ghPaged(`${API}/orgs/${org}/repos?per_page=100&type=${type}`)
    return repos.filter((r) => !r.fork && !r.archived && !r.disabled)
  } catch (e) {
    // If we asked for `all` but the token can't see private, fall back to public.
    if (INCLUDE_PRIVATE && String(e).includes('403')) {
      console.warn(`  [${org}] token cannot list private repos, falling back to public`)
      const repos = await ghPaged(`${API}/orgs/${org}/repos?per_page=100&type=public`)
      return repos.filter((r) => !r.fork && !r.archived && !r.disabled)
    }
    throw e
  }
}

async function repoContributors(owner, repo) {
  try {
    return await ghPaged(`${API}/repos/${owner}/${repo}/contributors?per_page=100&anon=0`)
  } catch (e) {
    const s = String(e)
    if (s.includes('404') || s.includes('403') || s.includes('204') || s.includes('Empty repository')) return []
    console.warn(`  skipping ${repo}: ${s.split('\n')[0]}`)
    return []
  }
}

async function repoStats(owner, repo) {
  try {
    const res = await ghFetch(`${API}/repos/${owner}/${repo}/stats/contributors`)
    if (res.status === 204) return []
    const text = await res.text()
    if (!text) return []
    return JSON.parse(text)
  } catch (e) {
    const s = String(e)
    if (s.includes('STATS_TIMEOUT')) {
      console.warn(`  stats unavailable for ${repo} (still computing after retries)`)
      return []
    }
    if (s.includes('404') || s.includes('403') || s.includes('422')) return []
    console.warn(`  stats error for ${repo}: ${s.split('\n')[0]} — continuing without stats`)
    return []
  }
}

async function prAndReviewCounts(org, logins) {
  // Batched GraphQL: for each login, run two search queries scoped to the org.
  // Results are per-org and additive across orgs (a user active in both
  // PancrePal-xiaoyibao and opencare-skillhub will get PRs summed).
  const results = new Map()
  const arr = [...logins]
  const size = 20
  for (let i = 0; i < arr.length; i += size) {
    const chunk = arr.slice(i, i + size)
    const parts = chunk.map((login, j) => {
      const safe = login.replace(/"/g, '')
      return `
        u${j}_pr: search(query: "org:${org} is:pr author:${safe}", type: ISSUE, first: 0) { issueCount }
        u${j}_rv: search(query: "org:${org} is:pr reviewed-by:${safe}", type: ISSUE, first: 0) { issueCount }
      `
    })
    const query = `query { ${parts.join('\n')} }`
    try {
      const data = await graphql(query, {})
      chunk.forEach((login, j) => {
        results.set(login, {
          prs: data[`u${j}_pr`]?.issueCount ?? 0,
          reviews: data[`u${j}_rv`]?.issueCount ?? 0,
        })
      })
    } catch (e) {
      console.warn(`  PR/review query failed for chunk ${i}: ${e.message}`)
      chunk.forEach((login) => results.set(login, { prs: 0, reviews: 0 }))
    }
    await sleep(500)
  }
  return results
}

function weekTsToIso(w) {
  return new Date(w * 1000).toISOString().slice(0, 10)
}

function emptyRec(c) {
  return {
    login: c.login,
    htmlUrl: c.html_url,
    avatarUrl: c.avatar_url,
    commits: 0,
    additions: 0,
    deletions: 0,
    publicRepos: new Set(),       // exposed by name
    privateRepoCount: 0,          // count only, no names
    privateCommits: 0,            // commits in private repos
    orgs: new Set(),
    firstWeek: null,
    lastWeek: null,
  }
}

async function scanRepo(org, repo, acc) {
  const isPrivate = !!repo.private
  const [contribs, stats] = await Promise.all([
    repoContributors(org, repo.name),
    repoStats(org, repo.name),
  ])

  for (const c of contribs) {
    if (!c?.login) continue
    if (isBot(c.login, c.type)) continue
    const rec = acc.get(c.login) || emptyRec(c)
    rec.orgs.add(org)
    rec.commits += c.contributions || 0
    if (isPrivate) {
      rec.privateRepoCount += 1
      rec.privateCommits += c.contributions || 0
    } else {
      rec.publicRepos.add(`${org}/${repo.name}`)
    }
    acc.set(c.login, rec)
  }

  if (Array.isArray(stats)) {
    for (const s of stats) {
      const login = s?.author?.login
      if (isBot(login, s?.author?.type)) continue
      const rec = acc.get(login)
      if (!rec) continue
      let firstW = null, lastW = null
      for (const w of s.weeks || []) {
        if (!w.a && !w.d && !w.c) continue
        // Only expose additions/deletions for public repos to avoid leaking
        // private code volume. First/last dates aggregate across all repos.
        if (!isPrivate) {
          rec.additions += w.a || 0
          rec.deletions += w.d || 0
        }
        if (firstW === null || w.w < firstW) firstW = w.w
        if (lastW === null || w.w > lastW) lastW = w.w
      }
      if (firstW !== null) rec.firstWeek = rec.firstWeek === null ? firstW : Math.min(rec.firstWeek, firstW)
      if (lastW !== null) rec.lastWeek = rec.lastWeek === null ? lastW : Math.max(rec.lastWeek, lastW)
    }
  }
}

async function main() {
  console.log(`orgs=${ORGS.join(',')} includePrivate=${INCLUDE_PRIVATE}`)
  const acc = new Map()
  const orgStats = []

  for (const org of ORGS) {
    console.log(`[${org}] listing repos...`)
    const repos = await listRepos(org)
    const pub = repos.filter((r) => !r.private).length
    const priv = repos.filter((r) => r.private).length
    console.log(`[${org}] found ${repos.length} repos (${pub} public, ${priv} private)`)
    orgStats.push({ org, total: repos.length, public: pub, private: priv })

    for (const repo of repos) {
      const badge = repo.private ? '🔒' : '  '
      console.log(`  ${badge} ${org}/${repo.name}`)
      await scanRepo(org, repo, acc)
    }
  }

  console.log(`aggregated ${acc.size} unique contributors across ${ORGS.length} orgs`)

  const logins = [...acc.keys()]
  console.log(`fetching PR/review counts (per-org) for ${logins.length} users...`)

  // Sum PR/review counts across orgs for each user.
  const prMap = new Map()
  for (const org of ORGS) {
    const partial = await prAndReviewCounts(org, logins)
    for (const [login, v] of partial) {
      const cur = prMap.get(login) || { prs: 0, reviews: 0 }
      cur.prs += v.prs
      cur.reviews += v.reviews
      prMap.set(login, cur)
    }
  }

  const rows = logins.map((login) => {
    const r = acc.get(login)
    const pr = prMap.get(login) || { prs: 0, reviews: 0 }
    const score = r.commits * 1 + pr.prs * 3 + pr.reviews * 2
    return {
      login: r.login,
      htmlUrl: r.htmlUrl,
      avatarUrl: r.avatarUrl,
      orgs: [...r.orgs].sort(),
      repos: [...r.publicRepos].sort(),
      repoCount: r.publicRepos.size + r.privateRepoCount,
      publicRepoCount: r.publicRepos.size,
      privateRepoCount: r.privateRepoCount,
      commits: r.commits,
      privateCommits: r.privateCommits,
      additions: r.additions,
      deletions: r.deletions,
      net: r.additions - r.deletions,
      prs: pr.prs,
      reviews: pr.reviews,
      score,
      firstContribution: r.firstWeek ? weekTsToIso(r.firstWeek) : null,
      lastContribution: r.lastWeek ? weekTsToIso(r.lastWeek) : null,
    }
  })

  rows.sort((a, b) => b.score - a.score || b.commits - a.commits || a.login.localeCompare(b.login))

  const out = {
    orgs: ORGS,
    orgStats,
    includePrivate: INCLUDE_PRIVATE,
    generatedAt: new Date().toISOString(),
    repoCount: orgStats.reduce((n, o) => n + o.total, 0),
    publicRepoCount: orgStats.reduce((n, o) => n + o.public, 0),
    privateRepoCount: orgStats.reduce((n, o) => n + o.private, 0),
    contributorCount: rows.length,
    scoringFormula: 'score = commits * 1 + prs * 3 + reviews * 2',
    contributors: rows,
  }

  const here = dirname(fileURLToPath(import.meta.url))
  const outPath = resolve(here, '../../profile/contributors.json')
  await mkdir(dirname(outPath), { recursive: true })
  await writeFile(outPath, JSON.stringify(out, null, 2) + '\n')
  console.log(`wrote ${outPath}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
