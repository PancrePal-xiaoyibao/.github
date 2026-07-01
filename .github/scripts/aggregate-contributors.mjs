#!/usr/bin/env node
// Aggregate contributors across every public repo of a GitHub organization.
// Output: profile/contributors.json (single source of truth for renderer).
//
// Env:
//   ORG    required, GitHub org login (e.g. "PancrePal-xiaoyibao")
//   TOKEN  required, GitHub token with public repo read access
//
// Scoring: score = commits * 1 + prs * 3 + reviews * 2

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ORG = process.env.ORG
const TOKEN = process.env.TOKEN || process.env.GITHUB_TOKEN
if (!ORG) throw new Error('ORG env var is required')
if (!TOKEN) throw new Error('TOKEN (or GITHUB_TOKEN) env var is required')

const API = 'https://api.github.com'
const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': `${ORG}-contributors-sync`,
}

const BOT_LOGINS = new Set([
  'dependabot[bot]', 'renovate[bot]', 'github-actions[bot]',
  'greenkeeper[bot]', 'imgbot[bot]', 'allcontributors[bot]',
  'codecov[bot]', 'sonarcloud[bot]', 'stale[bot]',
])

// Additional patterns that indicate bot accounts even without the [bot] suffix
const BOT_PATTERNS = [
  /\[bot\]$/i,
  /-bot$/i,
  /^bot-/i,
]

function isBot(login, type) {
  if (!login) return true
  if (type === 'Bot') return true
  if (BOT_LOGINS.has(login)) return true
  return BOT_PATTERNS.some((p) => p.test(login))
}

async function ghFetch(url, opts = {}) {
  const maxAttempts = opts.maxAttempts ?? 8
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const res = await fetch(url, { ...opts, headers: { ...HEADERS, ...(opts.headers || {}) } })
    if (res.status === 202) {
      // stats endpoint is computing; back off progressively (2, 4, 8, ... seconds)
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function ghPaged(url) {
  const out = []
  let next = url
  while (next) {
    const res = await ghFetch(next)
    // 204 No Content (empty repo, no contributors) → treat as empty list
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
  const repos = await ghPaged(`${API}/orgs/${org}/repos?per_page=100&type=public`)
  return repos.filter((r) => !r.fork && !r.archived && !r.disabled)
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
  // Returns array of { author: {login,id,...}, total, weeks: [{w,a,d,c},...] }
  // Stats endpoint requires GitHub to compute cache; may 202 for a long time.
  // If it stays 202 after max retries, degrade gracefully — the repo will
  // lack additions/deletions/first/last but commits from /contributors still count.
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
  // Batched GraphQL: for each login, run two search queries.
  // We cap concurrency to avoid secondary rate limits.
  const results = new Map()
  const chunks = []
  const arr = [...logins]
  const size = 20
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))

  for (const chunk of chunks) {
    const parts = chunk.map((login, i) => {
      const safe = login.replace(/"/g, '')
      return `
        u${i}_pr: search(query: "org:${org} is:pr author:${safe}", type: ISSUE, first: 0) { issueCount }
        u${i}_rv: search(query: "org:${org} is:pr reviewed-by:${safe}", type: ISSUE, first: 0) { issueCount }
      `
    })
    const query = `query { ${parts.join('\n')} }`
    const data = await graphql(query, {})
    chunk.forEach((login, i) => {
      results.set(login, {
        prs: data[`u${i}_pr`]?.issueCount ?? 0,
        reviews: data[`u${i}_rv`]?.issueCount ?? 0,
      })
    })
    await sleep(500)
  }
  return results
}

function weekTsToIso(w) {
  return new Date(w * 1000).toISOString().slice(0, 10)
}

async function main() {
  console.log(`[org=${ORG}] listing repos...`)
  const repos = await listRepos(ORG)
  console.log(`found ${repos.length} repos`)

  const acc = new Map() // login -> aggregated record

  for (const repo of repos) {
    console.log(`  scanning ${repo.name}`)
    const [contribs, stats] = await Promise.all([
      repoContributors(ORG, repo.name),
      repoStats(ORG, repo.name),
    ])

    for (const c of contribs) {
      if (!c?.login) continue
      if (isBot(c.login, c.type)) continue
      const rec = acc.get(c.login) || {
        login: c.login,
        htmlUrl: c.html_url,
        avatarUrl: c.avatar_url,
        commits: 0,
        additions: 0,
        deletions: 0,
        repos: new Set(),
        firstWeek: null,
        lastWeek: null,
      }
      rec.commits += c.contributions || 0
      rec.repos.add(repo.name)
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
          rec.additions += w.a || 0
          rec.deletions += w.d || 0
          if (firstW === null || w.w < firstW) firstW = w.w
          if (lastW === null || w.w > lastW) lastW = w.w
        }
        if (firstW !== null) rec.firstWeek = rec.firstWeek === null ? firstW : Math.min(rec.firstWeek, firstW)
        if (lastW !== null) rec.lastWeek = rec.lastWeek === null ? lastW : Math.max(rec.lastWeek, lastW)
      }
    }
  }

  console.log(`aggregated ${acc.size} unique contributors`)

  const logins = [...acc.keys()]
  console.log(`fetching PR/review counts for ${logins.length} users...`)
  const prReviewMap = await prAndReviewCounts(ORG, logins)

  const rows = logins.map((login) => {
    const r = acc.get(login)
    const pr = prReviewMap.get(login) || { prs: 0, reviews: 0 }
    const score = r.commits * 1 + pr.prs * 3 + pr.reviews * 2
    return {
      login: r.login,
      htmlUrl: r.htmlUrl,
      avatarUrl: r.avatarUrl,
      repos: [...r.repos].sort(),
      repoCount: r.repos.size,
      commits: r.commits,
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
    org: ORG,
    generatedAt: new Date().toISOString(),
    repoCount: repos.length,
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
