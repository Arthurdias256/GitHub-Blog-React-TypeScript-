import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { issues, profile, searchFixture } from '../../src/tests/fixtures'

async function mockApi(page: Page) {
  await page.route('https://api.github.com/**', async route => {
    const url = new URL(route.request().url())
    if (url.pathname.startsWith('/users/')) return route.fulfill({ json: profile })
    if (url.pathname === '/search/issues') return route.fulfill({ json: searchFixture(url) })
    const issue = issues.find(item => url.pathname.endsWith(`/issues/${item.number}`))
    return issue ? route.fulfill({ json: issue }) : route.fulfill({ status: 404, json: { message: 'Not Found' } })
  })
}
test.beforeEach(async ({ page }) => { await mockApi(page) })

test('busca, paginação, detalhes, reload e retorno', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: profile.name! })).toBeVisible()
  await expect(page.getByText('10 publicações encontradas')).toBeVisible()
  await page.getByRole('button', { name: 'Próxima' }).click()
  await expect(page.getByText('Página 2 de 2')).toBeVisible()
  await page.getByRole('searchbox').fill('React')
  await expect(page.getByText('7 publicações encontradas')).toBeVisible()
  await expect(page.getByText('Página 1 de 2')).toBeVisible()
  await page.getByRole('link', { name: /React publicação 10/ }).click()
  await expect(page).toHaveURL(/\/post\/10$/)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1, name: 'React publicação 10' })).toBeVisible()
  await expect(page.getByRole('table')).toBeVisible()
  await page.getByRole('link', { name: 'Voltar', exact: true }).click()
  await expect(page.getByRole('searchbox')).toHaveValue('React')
  const firstCard = page.getByRole('article').first()
  await firstCard.scrollIntoViewIfNeeded()
  const bounds = await firstCard.boundingBox()
  expect(bounds).not.toBeNull()
  // Click the card padding, not the title: the stretched link must keep this working.
  await page.mouse.click(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height - 16)
  await expect(page.getByRole('heading', { level: 1, name: 'React publicação 10' })).toBeVisible()
})

test('vazio, limpeza e 404', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('searchbox').fill('inexistente++')
  await expect(page.getByRole('heading', { name: 'Nenhuma publicação encontrada' })).toBeVisible()
  await page.getByRole('button', { name: 'Limpar pesquisa' }).click()
  await expect(page.getByText('10 publicações encontradas')).toBeVisible()
  await page.goto('/post/999')
  await expect(page.getByRole('heading', { name: 'Publicação não encontrada' })).toBeVisible()
  await page.goto('/rota-inexistente')
  await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible()
})

test('logotipo limpa a consulta e o histórico restaura a pesquisa correta', async ({ page }) => {
  await page.goto('/?q=React&page=2')
  await expect(page.getByText('7 publicações encontradas')).toBeVisible()
  await page.getByRole('link', { name: 'GitHub Blog — página inicial' }).click()
  await expect(page.getByText('10 publicações encontradas')).toBeVisible()
  await expect(page.getByRole('searchbox')).toHaveValue('')
  await expect(page).toHaveURL(/\/$/)
  await page.goBack()
  await expect(page.getByRole('searchbox')).toHaveValue('React')
  await expect(page.getByText('Página 2 de 2')).toBeVisible()
  await page.goForward()
  await expect(page.getByText('10 publicações encontradas')).toBeVisible()
  await expect(page.getByRole('searchbox')).toHaveValue('')
})

test('erro da API, limite, rede e retry', async ({ page }) => {
  await page.route('https://api.github.com/search/issues**', route => route.fulfill({ status: 500, json: { message: 'Failure' } }))
  await page.goto('/'); await expect(page.getByRole('alert')).toContainText('não conseguiu atender')
  await page.route('https://api.github.com/search/issues**', route => route.fulfill({ status: 429, json: { message: 'rate limit' } }))
  await page.getByRole('button', { name: 'Tentar novamente' }).click(); await expect(page.getByRole('alert')).toContainText('Limite de requisições')
  await page.route('https://api.github.com/search/issues**', route => route.abort())
  await page.getByRole('button', { name: 'Tentar novamente' }).click(); await expect(page.getByRole('alert')).toContainText('Verifique sua conexão')
  await page.route('https://api.github.com/search/issues**', route => route.fulfill({ json: searchFixture(new URL(route.request().url())) }))
  await page.getByRole('button', { name: 'Tentar novamente' }).click(); await expect(page.getByText('10 publicações encontradas')).toBeVisible()
})

for (const width of [320, 375, 390, 768, 1024, 1280, 1440, 1920]) {
  test(`Home e detalhe sem overflow em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 }); await page.goto('/')
    await expect(page.getByText('10 publicações encontradas')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.goto('/post/10'); await expect(page.getByRole('table')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}

test('teclado e auditoria automatizada WCAG 2.2 AA', async ({ page }) => {
  await page.goto('/'); await expect(page.getByText('10 publicações encontradas')).toBeVisible()
  const controlContrast = await page.getByRole('searchbox').evaluate(input => {
    function luminance(color: string) {
      const [r, g, b] = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(value => {
        const channel = value / 255
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    const field = getComputedStyle(input.parentElement!)
    const border = luminance(field.borderTopColor)
    return [field.backgroundColor, getComputedStyle(document.body).backgroundColor].map(color => {
      const background = luminance(color)
      return (Math.max(border, background) + 0.05) / (Math.min(border, background) + 0.05)
    })
  })
  expect(controlContrast.every(ratio => ratio >= 3)).toBe(true)
  await page.getByRole('searchbox').focus(); await page.keyboard.type('React'); await page.keyboard.press('Enter')
  await expect(page.getByText('7 publicações encontradas')).toBeVisible()
  await expect(page.getByRole('searchbox')).toHaveCSS('outline-style', 'solid')
  await expect(page.getByRole('searchbox')).toHaveCSS('outline-width', '2px')
  await page.keyboard.press('Tab'); await expect(page.getByRole('button', { name: 'Limpar pesquisa' })).toBeFocused()
  const home = await new AxeBuilder({ page }).analyze()
  expect(home.violations).toEqual([])
  await page.goto('/post/10'); await expect(page.getByRole('table')).toBeVisible()
  const detail = await new AxeBuilder({ page }).analyze()
  expect(detail.violations).toEqual([])
  const headings = await new AxeBuilder({ page }).withRules(['heading-order']).analyze()
  expect(headings.violations).toEqual([])
})
