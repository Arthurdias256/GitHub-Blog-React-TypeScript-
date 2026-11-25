import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import axios from 'axios'
import { chromium } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const baseURL = process.env.AUDIT_BASE_URL || 'https://github-blog-arthurdias256.vercel.app'
const directory = 'docs/evidencias/auditoria'
const repository = 'Arthurdias256/GitHub-Blog-React-TypeScript-'
await mkdir(directory, { recursive: true })
const report = { timestamp: new Date().toISOString(), sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), baseURL, mocked: false }
const api = axios.create({ baseURL: 'https://api.github.com', timeout: 20000, headers: { Accept: 'application/vnd.github+json' } })
const browser = await chromium.launch()
try {
  const { data: repo } = await api.get(`/repos/${repository}`)
  const { data: rawIssues } = await api.get(`/repos/${repository}/issues`, { params: { state: 'all', per_page: 100, sort: 'created', direction: 'desc' } })
  const issues = rawIssues.filter(issue => !issue.pull_request)
  assert.equal(repo.private, false)
  assert.ok(issues.length >= 10)
  assert.ok(issues.every(issue => issue.user.login === 'Arthurdias256' && issue.body?.length > 600 && issue.body.includes('```')))
  assert.equal(new Set(issues.map(issue => issue.body)).size, issues.length)
  report.github = { public: !repo.private, htmlURL: repo.html_url, issues: issues.map(issue => ({ number: issue.number, title: issue.title, author: issue.user.login, markdownLength: issue.body.length, url: issue.html_url })), distinctBodies: true, intellectualAuthorship: 'Não inferida apenas pelo login; conteúdo com IA deve ser revisado pelo aluno.' }

  const commits = execFileSync('git', ['rev-list', '--all'], { encoding: 'utf8' }).trim().split('\n')
  const secretPattern = 'gh[pousr]_[[:alnum:]]{20,}|github_pat_[[:alnum:]_]{30,}|AKIA[A-Z0-9]{16}|-----BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY-----'
  const scan = spawnSync('git', ['grep', '-I', '-l', '-E', secretPattern, ...commits, '--'], { encoding: 'utf8' })
  assert.ok(scan.status === 0 || scan.status === 1, 'Erro ao inspecionar histórico')
  const matches = scan.stdout.trim().split('\n').filter(Boolean)
  report.historySecurity = { commits: commits.length, matchingFiles: matches, limitation: 'Heurística por padrões, não certificação de ausência de todo segredo possível.' }
  assert.equal(matches.length, 0, 'Possível credencial no histórico; revisar nomes dos arquivos, sem imprimir valores')

  const document = await axios.get(baseURL, { timeout: 20000 })
  const direct = await axios.get(`${baseURL}/post/10`, { timeout: 20000 })
  const assetPaths = [...document.data.matchAll(/(?:src|href)="([^" ]+\.(?:js|css))"/g)].map(match => match[1])
  const assets = []
  for (const path of assetPaths) {
    const url = new URL(path, baseURL).href
    const response = await axios.get(url, { timeout: 20000 })
    assets.push({ url, status: response.status, contentType: response.headers['content-type'] })
    assert.ok(!/gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,}|BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY/.test(response.data))
    assert.ok(!String(response.data).includes('Arthur — teste'), 'Fixture de teste encontrada no asset')
    if (path.endsWith('.js')) {
      const detailPath = String(response.data).match(/PostDetails-[A-Za-z0-9_-]+\.js/)?.[0]
      if (detailPath) {
        const detailURL = new URL(detailPath, url).href
        const detailAsset = await axios.get(detailURL, { timeout: 20000 })
        assets.push({ url: detailURL, status: detailAsset.status, contentType: detailAsset.headers['content-type'] })
        assert.ok(!/gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{30,}/.test(detailAsset.data))
      }
    }
  }
  assert.ok(assets.some(asset => asset.url.endsWith('.js')))
  report.hosting = { homeStatus: document.status, directDetailStatus: direct.status, assets, headers: { contentType: document.headers['content-type'], nosniff: document.headers['x-content-type-options'], frame: document.headers['x-frame-options'] }, credentialPatternsInInspectedAssets: false }

  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  const page = await context.newPage()
  const responses = []
  page.on('response', response => { if (response.url().startsWith('https://api.github.com/')) responses.push({ url: response.url(), status: response.status() }) })
  report.accessibility = []
  report.responsiveness = []
  for (const path of ['/', '/post/10']) {
    await page.goto(`${baseURL}${path}`)
    if (path === '/') await page.getByText('10 publicações encontradas', { exact: true }).waitFor({ timeout: 30000 })
    else await page.getByRole('table').waitFor({ timeout: 30000 })
    await page.evaluate(() => document.fonts.ready)
    const axe = await new AxeBuilder({ page }).analyze()
    const violations = axe.violations.map(violation => ({ id: violation.id, impact: violation.impact, targets: violation.nodes.map(node => node.target) }))
    report.accessibility.push({ path, mode: 'axe completo, incluindo heading-order e color-contrast', violations })
    assert.equal(violations.length, 0, `Violações axe em ${path}`)
    for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 })
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }))
      report.responsiveness.push({ path, width, ...dimensions })
      assert.ok(dimensions.document <= dimensions.viewport, `Overflow em ${path}/${width}`)
    }
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.screenshot({ path: `${directory}/${path === '/' ? 'home' : 'detalhe'}-desktop.png`, fullPage: true })
    await page.setViewportSize({ width: 375, height: 812 })
    await page.screenshot({ path: `${directory}/${path === '/' ? 'home' : 'detalhe'}-mobile.png`, fullPage: true })
    if (path === '/') {
      report.contrast = await page.getByRole('searchbox').evaluate(input => {
        function luminance(color) {
          const [r, g, b] = color.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => { const channel = value / 255; return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4 })
          return 0.2126 * r + 0.7152 * g + 0.0722 * b
        }
        function contrast(a, b) { const x = luminance(a), y = luminance(b); return Number(((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(3)) }
        const field = getComputedStyle(input.parentElement)
        const body = getComputedStyle(document.body)
        const style = getComputedStyle(input)
        const link = getComputedStyle(document.querySelector('.external-link'))
        const panel = getComputedStyle(document.querySelector('.panel'))
        return { fieldBorder: field.borderTopColor, borderAgainstPage: contrast(field.borderTopColor, body.backgroundColor), borderAgainstField: contrast(field.borderTopColor, field.backgroundColor), inputText: contrast(style.color, field.backgroundColor), externalLink: contrast(link.color, panel.backgroundColor) }
      })
      assert.ok(report.contrast.borderAgainstPage >= 3 && report.contrast.borderAgainstField >= 3)
      assert.ok(report.contrast.inputText >= 4.5 && report.contrast.externalLink >= 4.5)
      await page.getByRole('searchbox').focus()
      await page.keyboard.press('ArrowRight')
      report.focus = await page.getByRole('searchbox').evaluate(input => ({ focused: document.activeElement === input, visible: input.matches(':focus-visible'), outlineStyle: getComputedStyle(input).outlineStyle, outlineWidth: getComputedStyle(input).outlineWidth }))
      assert.ok(report.focus.focused && report.focus.visible && report.focus.outlineWidth === '2px')
      await page.setViewportSize({ width: 1440, height: 1000 })
      await page.getByRole('searchbox').fill('React')
      await page.getByText('3 publicações encontradas', { exact: true }).waitFor({ timeout: 30000 })
      await page.screenshot({ path: `${directory}/busca-desktop.png`, fullPage: true })
      await page.getByRole('link', { name: 'GitHub Blog — página inicial' }).click()
      await page.getByText('10 publicações encontradas', { exact: true }).waitFor({ timeout: 30000 })
      assert.equal(await page.getByRole('searchbox').inputValue(), '')
      assert.equal(new URL(page.url()).search, '')
      await page.getByRole('button', { name: 'Próxima' }).click()
      await page.getByRole('list', { name: 'Publicações' }).waitFor({ timeout: 30000 })
      assert.equal(await page.getByRole('article').count(), 4)
      report.liveNavigation = { searchReact: 3, logoClearsQuery: true, secondPage: 4, url: page.url() }
    }
  }
  report.responses = responses
  const { data: runs } = await api.get(`/repos/${repository}/actions/runs`, { params: { per_page: 1 } })
  const run = runs.workflow_runs[0]
  if (run) {
    const { data: jobs } = await api.get(`/repos/${repository}/actions/runs/${run.id}/jobs`)
    const annotations = []
    for (const job of jobs.jobs) {
      const { data } = await api.get(`${job.check_run_url}/annotations`)
      annotations.push(...data.map(item => item.message))
    }
    report.actions = { url: run.html_url, commit: run.head_sha, status: run.status, conclusion: run.conclusion, steps: jobs.jobs.flatMap(job => job.steps || []), annotations, mandatoryInNotion: false }
  }
  report.result = 'PASS — verificações técnicas; pendências acadêmicas e CI descritas separadamente'
} catch (error) {
  report.result = 'FAIL'
  report.error = axios.isAxiosError(error) ? { status: error.response?.status, code: error.code } : error instanceof Error ? error.message : 'Falha desconhecida'
  process.exitCode = 1
} finally {
  await writeFile(`${directory}/verificacao-publica.json`, JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
  await browser.close()
}
