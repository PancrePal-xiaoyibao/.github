#!/usr/bin/env node
// Read profile/contributors.json and render:
//   1. Beautified avatar wall markdown snippet injected into 6 README files
//      between <!-- CONTRIBUTORS:START --> and <!-- CONTRIBUTORS:END -->
//   2. profile/CONTRIBUTORS.md — full table for foundation reporting
//   3. profile/contributors.csv — for mail merge / Excel

import { readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const dataPath = resolve(root, 'profile/contributors.json')

const README_FILES = [
  'profile/README.md',
  'profile/README.en.md',
  'profile/README.es.md',
  'profile/README.ja.md',
  'profile/README.ko.md',
  'profile/README.ru.md',
]

const LOCALE = {
  'profile/README.md': {
    banner: '🌟 星河贡献者 · 微光成炬',
    subtitle: '每一位贡献者，都是照亮患者旅途的一束光',
    formula: '综合分 = commits × 1 + PRs × 3 + reviews × 2',
    updated: '数据更新于',
    fullList: '完整名单与详细数据',
    core: '💎 核心贡献者',
    active: '⭐️ 活跃贡献者',
    all: '✨ 全体贡献者',
    stats: {
      contributors: '位贡献者',
      repos: '个仓库',
      commits: '次提交',
      lines: '行代码变更',
      orgs: '个组织',
    },
  },
  'profile/README.en.md': {
    banner: '🌟 Galaxy of Contributors · Glimmer to Greatness',
    subtitle: 'Every contributor is a beam of light on the patient\'s journey',
    formula: 'Score = commits × 1 + PRs × 3 + reviews × 2',
    updated: 'Updated',
    fullList: 'Full list & detailed data',
    core: '💎 Core contributors',
    active: '⭐️ Active contributors',
    all: '✨ All contributors',
    stats: {
      contributors: 'contributors',
      repos: 'repositories',
      commits: 'commits',
      lines: 'lines changed',
      orgs: 'organizations',
    },
  },
  'profile/README.es.md': {
    banner: '🌟 Galaxia de contribuidores · De destello a grandeza',
    subtitle: 'Cada contribuidor es un rayo de luz en el viaje del paciente',
    formula: 'Puntuación = commits × 1 + PRs × 3 + reviews × 2',
    updated: 'Actualizado',
    fullList: 'Lista completa y datos detallados',
    core: '💎 Contribuidores principales',
    active: '⭐️ Contribuidores activos',
    all: '✨ Todos los contribuidores',
    stats: {
      contributors: 'contribuidores',
      repos: 'repositorios',
      commits: 'commits',
      lines: 'líneas modificadas',
      orgs: 'organizaciones',
    },
  },
  'profile/README.ja.md': {
    banner: '🌟 貢献者の銀河 · 微光成炬',
    subtitle: '一人ひとりの貢献者が、患者の旅路を照らす光です',
    formula: 'スコア = commits × 1 + PRs × 3 + reviews × 2',
    updated: '更新日',
    fullList: '完全なリストと詳細データ',
    core: '💎 コア貢献者',
    active: '⭐️ アクティブ貢献者',
    all: '✨ 全貢献者',
    stats: {
      contributors: '名の貢献者',
      repos: 'リポジトリ',
      commits: 'コミット',
      lines: '行の変更',
      orgs: '組織',
    },
  },
  'profile/README.ko.md': {
    banner: '🌟 기여자 은하 · 미광성거',
    subtitle: '모든 기여자는 환자의 여정을 비추는 한 줄기 빛입니다',
    formula: '점수 = commits × 1 + PRs × 3 + reviews × 2',
    updated: '업데이트',
    fullList: '전체 명단과 상세 데이터',
    core: '💎 핵심 기여자',
    active: '⭐️ 활발한 기여자',
    all: '✨ 전체 기여자',
    stats: {
      contributors: '명의 기여자',
      repos: '개 저장소',
      commits: '커밋',
      lines: '줄 변경',
      orgs: '개 조직',
    },
  },
  'profile/README.ru.md': {
    banner: '🌟 Галактика контрибьюторов · От искры к пламени',
    subtitle: 'Каждый контрибьютор — луч света на пути пациента',
    formula: 'Оценка = commits × 1 + PRs × 3 + reviews × 2',
    updated: 'Обновлено',
    fullList: 'Полный список и подробные данные',
    core: '💎 Основные контрибьюторы',
    active: '⭐️ Активные контрибьюторы',
    all: '✨ Все контрибьюторы',
    stats: {
      contributors: 'контрибьюторов',
      repos: 'репозиториев',
      commits: 'коммитов',
      lines: 'строк изменено',
      orgs: 'организаций',
    },
  },
}

const START = '<!-- CONTRIBUTORS:START -->'
const END = '<!-- CONTRIBUTORS:END -->'

const CORE_THRESHOLD = 100
const ACTIVE_THRESHOLD = 20

const MEDAL = ['👑', '🥈', '🥉']

function formatNumber(n) {
  if (n >= 10000) return (n / 1000).toFixed(1) + 'k'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return String(n)
}

function scoreBadge(score) {
  // https://img.shields.io — flat-square, gradient-ish colors by tier
  let color = 'blue'
  if (score >= 500) color = 'red'
  else if (score >= 200) color = 'orange'
  else if (score >= 100) color = 'yellow'
  else if (score >= 20) color = 'green'
  const label = encodeURIComponent('score')
  return `https://img.shields.io/badge/${label}-${score}-${color}?style=flat-square`
}

function cell(c, opts = {}) {
  const size = opts.size || 80
  const width = opts.width || '14%'
  const medal = opts.medal ? `${opts.medal} ` : ''
  const orgBadge = (c.orgs && c.orgs.length > 1) ? ' 🔗' : ''
  const privateNote = c.privateRepoCount ? ` +${c.privateRepoCount}🔒` : ''
  const title = [
    `${c.login} · score ${c.score}`,
    `${c.commits} commits · ${c.prs} PRs · ${c.reviews} reviews`,
    c.privateRepoCount ? `+${c.privateCommits} commits in ${c.privateRepoCount} private repo(s)` : null,
    `first ${c.firstContribution ?? '—'} · last ${c.lastContribution ?? '—'}`,
    (c.orgs && c.orgs.length > 1) ? `orgs: ${c.orgs.join(', ')}` : null,
  ].filter(Boolean).join(' · ')
  return (
    `<td align="center" valign="top" width="${width}">` +
    `<a href="${c.htmlUrl}" title="${title.replace(/"/g, '&quot;')}">` +
    `<img src="${c.avatarUrl}&s=${size * 2}" width="${size}" height="${size}" alt="${c.login}" style="border-radius:50%"/>` +
    `<br/><sub><b>${medal}${c.login}${orgBadge}</b></sub></a>` +
    `<br/><img src="${scoreBadge(c.score)}" alt="score ${c.score}"/>` +
    (privateNote ? `<br/><sub>${privateNote}</sub>` : '') +
    `</td>`
  )
}

function tableRows(list, opts) {
  const perRow = opts.perRow || 6
  const rows = []
  for (let i = 0; i < list.length; i += perRow) {
    const chunk = list.slice(i, i + perRow)
    const cells = chunk.map((c, j) => cell(c, {
      size: opts.size,
      width: `${Math.floor(100 / perRow)}%`,
      medal: opts.medals ? MEDAL[i + j] : null,
    }))
    // pad row so widths align
    while (cells.length < perRow) cells.push(`<td width="${Math.floor(100 / perRow)}%"></td>`)
    rows.push('<tr>' + cells.join('') + '</tr>')
  }
  return rows.join('\n')
}

function totalsFrom(contributors) {
  return contributors.reduce((acc, c) => {
    acc.commits += c.commits
    acc.privateCommits += c.privateCommits || 0
    acc.additions += c.additions
    acc.deletions += c.deletions
    acc.prs += c.prs
    acc.reviews += c.reviews
    for (const r of c.repos) acc.repoSet.add(r)
    return acc
  }, { commits: 0, privateCommits: 0, additions: 0, deletions: 0, prs: 0, reviews: 0, repoSet: new Set() })
}

function renderStatsBanner(data, locale) {
  const t = totalsFrom(data.contributors)
  const lines = t.additions + t.deletions
  const s = locale.stats
  const orgCount = data.orgs?.length || 1
  const repoLine = data.privateRepoCount
    ? `<h3>${data.repoCount}</h3><sub>${s.repos} <span title="包含 ${data.privateRepoCount} 个私有仓库">🔒${data.privateRepoCount}</span></sub>`
    : `<h3>${data.repoCount}</h3><sub>${s.repos}</sub>`
  const orgLine = orgCount > 1
    ? `<td align="center" width="20%"><h3>${orgCount}</h3><sub>${s.orgs}</sub></td>`
    : ''
  const colWidth = orgCount > 1 ? '20%' : '25%'
  return [
    `<table align="center"><tr>`,
    orgLine,
    `<td align="center" width="${colWidth}"><h3>${data.contributorCount}</h3><sub>${s.contributors}</sub></td>`,
    `<td align="center" width="${colWidth}">${repoLine}</td>`,
    `<td align="center" width="${colWidth}"><h3>${formatNumber(t.commits)}</h3><sub>${s.commits}</sub></td>`,
    `<td align="center" width="${colWidth}"><h3>${formatNumber(lines)}</h3><sub>${s.lines}</sub></td>`,
    `</tr></table>`,
  ].filter(Boolean).join('\n')
}

function renderAvatarWall(data, locale) {
  const all = data.contributors
  const core = all.filter((c) => c.score >= CORE_THRESHOLD)
  const active = all.filter((c) => c.score >= ACTIVE_THRESHOLD && c.score < CORE_THRESHOLD)
  const rest = all.filter((c) => c.score < ACTIVE_THRESHOLD)

  const parts = [START, '']
  parts.push(`<div align="center">`)
  parts.push('')
  parts.push(`### ${locale.banner}`)
  parts.push('')
  parts.push(`_${locale.subtitle}_`)
  parts.push('')
  parts.push(renderStatsBanner(data, locale))
  parts.push('')
  parts.push(`</div>`)
  parts.push('')

  if (core.length) {
    parts.push(`#### ${locale.core}`)
    parts.push('')
    parts.push('<table>')
    parts.push(tableRows(core, { perRow: 5, size: 96, medals: true }))
    parts.push('</table>')
    parts.push('')
  }

  if (active.length) {
    parts.push(`#### ${locale.active}`)
    parts.push('')
    parts.push('<table>')
    parts.push(tableRows(active, { perRow: 7, size: 72 }))
    parts.push('</table>')
    parts.push('')
  }

  if (rest.length) {
    parts.push(`<details><summary><b>${locale.all}</b> (${rest.length})</summary>`)
    parts.push('')
    parts.push('<table>')
    parts.push(tableRows(rest, { perRow: 10, size: 48 }))
    parts.push('</table>')
    parts.push('')
    parts.push('</details>')
    parts.push('')
  }

  const date = data.generatedAt.slice(0, 10)
  parts.push(`<div align="center">`)
  parts.push('')
  parts.push(`<sub>📊 <code>${locale.formula}</code></sub><br/>`)
  parts.push(`<sub>🕓 ${locale.updated} <b>${date}</b> · 📖 <a href="./CONTRIBUTORS.md">${locale.fullList}</a> · 📊 <a href="./contributors.csv">CSV</a> · 🔧 <a href="./contributors.json">JSON</a></sub>`)
  parts.push('')
  parts.push(`</div>`)
  parts.push('')
  parts.push(END)
  return parts.join('\n')
}

function replaceBlock(md, block) {
  const startIdx = md.indexOf(START)
  const endIdx = md.indexOf(END)
  if (startIdx === -1 || endIdx === -1) return md
  return md.slice(0, startIdx) + block + md.slice(endIdx + END.length)
}

function renderContributorsMd(data) {
  const lines = []
  const orgList = (data.orgs || [data.org]).join(', ')
  lines.push(`# ${orgList} 贡献者名单 / Contributors`)
  lines.push('')
  lines.push(`> 自动生成于 ${data.generatedAt}`)
  lines.push(`> 覆盖组织 / Orgs: **${orgList}**`)
  lines.push(`> 仓库总数 / Repos: **${data.repoCount}** (${data.publicRepoCount ?? data.repoCount} public${data.privateRepoCount ? ` + ${data.privateRepoCount} 私有 🔒` : ''})`)
  lines.push(`> 贡献者 / Contributors: **${data.contributorCount}**`)
  lines.push(`> 评分公式 / Scoring: \`${data.scoringFormula}\``)
  lines.push('')
  lines.push('本文件由 GitHub Actions 自动生成，用于向基金会报送定期贡献者名单及作为公益感谢信的基础数据。')
  if (data.privateRepoCount) {
    lines.push('')
    lines.push('> 🔒 = 私有仓库贡献。为保护未开源项目信息，仓库名称不在此文件中列出，仅统计贡献总量。')
  }
  lines.push('')
  lines.push('| # | 用户 / User | 综合分 / Score | 提交 / Commits | 增行 / Additions | 删行 / Deletions | 净行 / Net | PR | Reviews | 参与仓库 / Repos | 私有 🔒 | 组织 / Orgs | 首次贡献 / First | 最近贡献 / Last |')
  lines.push('|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|')
  data.contributors.forEach((c, i) => {
    const privCell = c.privateRepoCount ? `${c.privateRepoCount} repo · ${c.privateCommits} commits` : '—'
    const orgsCell = (c.orgs || []).join(', ') || '—'
    lines.push(
      `| ${i + 1} ` +
      `| [${c.login}](${c.htmlUrl}) ` +
      `| ${c.score} ` +
      `| ${c.commits} ` +
      `| ${c.additions} ` +
      `| ${c.deletions} ` +
      `| ${c.net} ` +
      `| ${c.prs} ` +
      `| ${c.reviews} ` +
      `| ${c.repoCount} ` +
      `| ${privCell} ` +
      `| ${orgsCell} ` +
      `| ${c.firstContribution ?? '—'} ` +
      `| ${c.lastContribution ?? '—'} |`
    )
  })
  lines.push('')
  lines.push('---')
  lines.push('')
  lines.push('## 参与仓库明细 / Per-user repo breakdown (public only)')
  lines.push('')
  for (const c of data.contributors) {
    const publicRepos = (c.repos || []).join(', ') || '—'
    const priv = c.privateRepoCount ? ` _(+ ${c.privateRepoCount} 私有仓库)_` : ''
    lines.push(`- **[${c.login}](${c.htmlUrl})** — ${publicRepos}${priv}`)
  }
  lines.push('')
  return lines.join('\n')
}

function renderCsv(data) {
  const header = [
    'login', 'html_url', 'score', 'commits', 'private_commits', 'additions', 'deletions', 'net',
    'prs', 'reviews', 'repo_count', 'public_repo_count', 'private_repo_count', 'orgs', 'repos', 'first_contribution', 'last_contribution',
  ]
  const rows = [header.join(',')]
  for (const c of data.contributors) {
    const cells = [
      c.login,
      c.htmlUrl,
      c.score,
      c.commits,
      c.privateCommits ?? 0,
      c.additions,
      c.deletions,
      c.net,
      c.prs,
      c.reviews,
      c.repoCount,
      c.publicRepoCount ?? c.repoCount,
      c.privateRepoCount ?? 0,
      `"${(c.orgs || []).join('; ')}"`,
      `"${(c.repos || []).join('; ')}"`,
      c.firstContribution ?? '',
      c.lastContribution ?? '',
    ]
    rows.push(cells.join(','))
  }
  return rows.join('\n') + '\n'
}

async function main() {
  const data = JSON.parse(await readFile(dataPath, 'utf8'))
  console.log(`loaded ${data.contributors.length} contributors from ${dataPath}`)

  for (const rel of README_FILES) {
    const full = resolve(root, rel)
    let md
    try {
      md = await readFile(full, 'utf8')
    } catch {
      console.warn(`skip missing ${rel}`)
      continue
    }
    const locale = LOCALE[rel]
    const block = renderAvatarWall(data, locale)
    const next = replaceBlock(md, block)
    if (next !== md) {
      await writeFile(full, next)
      console.log(`updated ${rel}`)
    } else {
      console.log(`no change / no markers in ${rel}`)
    }
  }

  await writeFile(resolve(root, 'profile/CONTRIBUTORS.md'), renderContributorsMd(data))
  await writeFile(resolve(root, 'profile/contributors.csv'), renderCsv(data))
  console.log('wrote profile/CONTRIBUTORS.md and profile/contributors.csv')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
