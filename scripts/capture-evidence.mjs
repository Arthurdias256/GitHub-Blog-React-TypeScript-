import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'

const baseURL = process.env.EVIDENCE_BASE_URL || 'http://127.0.0.1:5173'
const directory = process.env.EVIDENCE_DIRECTORY || 'docs/evidencias'
await mkdir(directory, { recursive: true })
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const responses = []
  page.on('response', response => {
    if (response.url().startsWith('https://api.github.com/')) responses.push({ url: response.url(), status: response.status() })
  })
  await page.goto(baseURL)
  await page.getByText('10 publicações encontradas', { exact: true }).waitFor({ timeout: 30000 })
  await page.locator('#profile-name').waitFor()
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: `${directory}/home-desktop.png`, fullPage: true })
  await page.getByRole('button', { name: 'Próxima' }).click()
  await page.getByText('Página 2 de 2', { exact: true }).waitFor()
  await page.getByRole('list', { name: 'Publicações' }).waitFor()
  const pageTwoCards = await page.getByRole('article').count()
  if (pageTwoCards !== 4) throw new Error(`Esperadas 4 issues na segunda página; recebidas ${pageTwoCards}`)
  await page.getByRole('searchbox').fill('React')
  await page.locator('[aria-busy="false"]').waitFor({ timeout: 30000 })
  await page.getByText('Página 1 de', { exact: false }).waitFor()
  await page.screenshot({ path: `${directory}/busca-desktop.png`, fullPage: true })
  await page.getByRole('button', { name: 'Limpar pesquisa' }).click()
  await page.getByText('10 publicações encontradas', { exact: true }).waitFor({ timeout: 30000 })
  await page.getByRole('list', { name: 'Publicações' }).getByRole('link').first().click()
  await page.getByRole('region', { name: 'Conteúdo da publicação' }).waitFor({ timeout: 30000 })
  await page.getByRole('table').waitFor()
  await page.screenshot({ path: `${directory}/detalhe-desktop.png`, fullPage: true })
  const detailURL = page.url()
  await page.reload()
  await page.getByRole('region', { name: 'Conteúdo da publicação' }).waitFor({ timeout: 30000 })
  await page.setViewportSize({ width: 375, height: 812 })
  await page.screenshot({ path: `${directory}/detalhe-mobile.png`, fullPage: true })
  await page.goto(baseURL)
  await page.getByText('10 publicações encontradas', { exact: true }).waitFor({ timeout: 30000 })
  await page.locator('#profile-name').waitFor()
  await page.screenshot({ path: `${directory}/home-mobile.png`, fullPage: true })
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  if (overflow) throw new Error('Overflow horizontal no mobile')
  const report = { baseURL, source: 'API pública real, sem interceptação ou fixtures', desktop: '1440x1000', mobile: '375x812', pageTwoCards, detailURL, directReload: true, mobileOverflow: overflow, responses }
  await writeFile(`${directory}/browser-real.json`, JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
} finally { await browser.close() }
