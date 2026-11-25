import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { delay, http, HttpResponse } from 'msw'
import App from '../App'
import { base, issuePath, server } from './server'
import { issues, markdown, profile, searchFixture } from './fixtures'

function open(path = '/') { return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>) }
const results = () => screen.findByText('10 publicações encontradas')

describe('fluxos completos', () => {
  test('Home apresenta perfil real do contrato e seis cards com contador', async () => {
    open(); await results()
    expect(await screen.findByRole('heading', { name: profile.name! })).toBeVisible()
    expect(screen.getByText('12 seguidores')).toBeVisible()
    expect(screen.getAllByRole('article')).toHaveLength(6)
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled()
  })

  test('perfil suporta campos nulos', async () => {
    server.use(http.get(`${base}/users/:username`, () => HttpResponse.json({ ...profile, name: null, bio: null, company: null })))
    open()
    expect(await screen.findByRole('heading', { name: profile.login })).toBeVisible()
    expect(screen.getByText(/ainda não possui uma biografia/)).toBeVisible()
  })

  test('falha do perfil não impede listagem e pode ser recuperada', async () => {
    server.use(http.get(`${base}/users/:username`, () => HttpResponse.json({ message: 'Failure' }, { status: 500 })))
    const user = userEvent.setup(); open(); await results(); await screen.findByRole('alert')
    expect(screen.getAllByRole('article')).toHaveLength(6)
    server.resetHandlers(); await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(await screen.findByRole('heading', { name: profile.name! })).toBeVisible()
  })

  test('URL com página fora do total oferece recuperação', async () => {
    const user = userEvent.setup(); open('/?page=99'); await results()
    await user.click(screen.getByRole('button', { name: 'Ir para primeira página' }))
    expect(await screen.findByText('Página 1 de 2')).toBeVisible()
    await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(6))
  })

  test('logotipo volta à Home sem restaurar uma busca obsoleta', async () => {
    const user = userEvent.setup(); open('/?q=React&page=2')
    await screen.findByText('7 publicações encontradas')
    await user.click(screen.getByRole('link', { name: 'GitHub Blog — página inicial' }))
    await results()
    expect(screen.getByRole('searchbox')).toHaveValue('')
    expect(screen.getByText('Página 1 de 2')).toBeVisible()
  })

  test('pagina no servidor, reinicia busca na página um e limpa consulta', async () => {
    const user = userEvent.setup(); open(); await results()
    await user.click(screen.getByRole('button', { name: 'Próxima' }))
    expect(await screen.findByText('Página 2 de 2')).toBeVisible()
    await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(4))
    await user.type(screen.getByRole('searchbox'), 'React')
    expect(await screen.findByText('7 publicações encontradas')).toBeVisible()
    expect(screen.getByText('Página 1 de 2')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Limpar pesquisa' }))
    await results(); expect(screen.getByRole('searchbox')).toHaveValue('')
  })

  test('pesquisa sem resultados e com caracteres especiais', async () => {
    const user = userEvent.setup(); open(); await results()
    await user.type(screen.getByRole('searchbox'), 'C++ & segurança?')
    expect(await screen.findByText('0 publicações encontradas')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Nenhuma publicação encontrada' })).toBeVisible()
  })

  test('debounce não envia imediatamente cada tecla e usa parâmetros seguros', async () => {
    const seen: URL[] = []
    server.use(http.get(`${base}/search/issues`, ({ request }) => { const url = new URL(request.url); seen.push(url); return HttpResponse.json(searchFixture(url)) }))
    const user = userEvent.setup(); open(); await results(); const initial = seen.length
    await user.type(screen.getByRole('searchbox'), 'React')
    expect(seen).toHaveLength(initial)
    await screen.findByText('7 publicações encontradas')
    expect(seen.at(-1)?.searchParams.get('q')).toBe('repo:Arthurdias256/GitHub-Blog-React-TypeScript- is:issue "React"')
    expect(seen.at(-1)?.searchParams.get('page')).toBe('1')
    expect(seen.at(-1)?.searchParams.get('per_page')).toBe('6')
  })

  test('resposta antiga não sobrescreve pesquisa nova', async () => {
    server.use(http.get(`${base}/search/issues`, async ({ request }) => {
      const url = new URL(request.url)
      if (url.searchParams.get('q')?.includes('"React"')) await delay(1200)
      return HttpResponse.json(searchFixture(url))
    }))
    const user = userEvent.setup(); open(); await results()
    await user.type(screen.getByRole('searchbox'), 'React'); await user.click(screen.getByRole('button', { name: 'Pesquisar' }))
    await user.clear(screen.getByRole('searchbox')); await user.type(screen.getByRole('searchbox'), 'TypeScript')
    expect(await screen.findByText('3 publicações encontradas')).toBeVisible()
    await new Promise(resolve => setTimeout(resolve, 1300))
    expect(screen.getByText('3 publicações encontradas')).toBeVisible()
  })

  test('detalhe abre via link, renderiza Markdown e retorna preservando a busca', async () => {
    const user = userEvent.setup(); open('/?q=React&page=2')
    await screen.findByText('7 publicações encontradas')
    await user.click(screen.getByRole('link', { name: /React publicação 4/ }))
    expect(await screen.findByRole('heading', { level: 1, name: 'React publicação 4' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Conceitos' })).toBeVisible()
    expect(screen.getByRole('table')).toBeVisible()
    expect(screen.getByText('const nome = "React"')).toBeVisible()
    await user.click(screen.getByRole('link', { name: 'Voltar' }))
    await screen.findByText('7 publicações encontradas')
    expect(screen.getByText('Página 2 de 2')).toBeVisible()
    expect(screen.getByRole('searchbox')).toHaveValue('React')
  })

  test('acesso direto ao detalhe faz requisição individual', async () => {
    open('/post/10')
    expect(await screen.findByRole('heading', { level: 1, name: issues[0].title })).toBeVisible()
    expect(screen.getByRole('link', { name: /Ver no GitHub/ })).toHaveAttribute('href', issues[0].html_url)
  })

  test('títulos Markdown não saltam níveis após o título do post', async () => {
    open('/post/10')
    expect(await screen.findByRole('heading', { level: 2, name: 'Conceitos' })).toBeVisible()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  test('erro no detalhe oferece retorno e nova tentativa', async () => {
    server.use(http.get(issuePath, () => HttpResponse.json({ message: 'Failure' }, { status: 500 })))
    const user = userEvent.setup(); open('/post/10'); await screen.findByRole('alert')
    expect(screen.getByRole('link', { name: 'Voltar' })).toHaveAttribute('href', '/')
    server.resetHandlers(); await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(await screen.findByRole('heading', { name: issues[0].title })).toBeVisible()
  })

  test('corpo e autor ausentes no detalhe usam fallback', async () => {
    server.use(http.get(issuePath, () => HttpResponse.json({ ...issues[0], body: null, user: null })))
    open('/post/10'); expect(await screen.findByText('Esta publicação ainda não possui conteúdo.')).toBeVisible()
    expect(screen.getByText('Autor indisponível')).toBeVisible()
  })

  test.each(['/post/999', '/post/abc', '/post/0'])('publicação inválida: %s', async path => {
    open(path); expect(await screen.findByRole('heading', { name: 'Publicação não encontrada' })).toBeVisible()
  })

  test('rota inexistente apresenta 404', async () => {
    open('/nao-existe'); expect(await screen.findByRole('heading', { name: 'Página não encontrada' })).toBeVisible()
  })

  test('exclui pull requests da listagem e do detalhe', async () => {
    server.use(http.get(`${base}/search/issues`, () => HttpResponse.json({ total_count: 1, incomplete_results: false, items: [{ ...issues[0], title: 'PR indevido', pull_request: { url: 'https://example.com' } }] })))
    open(); expect(await screen.findByRole('heading', { name: 'Nenhuma publicação encontrada' })).toBeVisible()
    expect(screen.queryByText('PR indevido')).not.toBeInTheDocument()
  })

  test('detalhe rejeita pull request', async () => {
    server.use(http.get(issuePath, () => HttpResponse.json({ ...issues[0], pull_request: { url: 'https://example.com' } })))
    open('/post/10'); expect(await screen.findByRole('heading', { name: 'Publicação não encontrada' })).toBeVisible()
  })

  test.each([500, 403, 429])('trata HTTP %s e permite nova tentativa apropriada', async status => {
    server.use(http.get(`${base}/search/issues`, () => HttpResponse.json({ message: status === 403 ? 'API rate limit exceeded' : 'Failure' }, { status })))
    const user = userEvent.setup(); open()
    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(status === 500 ? 'não conseguiu atender' : 'Limite de requisições')
    server.resetHandlers(); await user.click(screen.getByRole('button', { name: 'Tentar novamente' })); await results()
  })

  test('rate limit com Retry-After desabilita botão temporariamente', async () => {
    server.use(http.get(`${base}/search/issues`, () => HttpResponse.json({ message: 'rate limit' }, { status: 429, headers: { 'retry-after': '60' } })))
    open(); await screen.findByRole('alert')
    expect(screen.getByRole('button', { name: 'Tentar novamente' })).toBeDisabled()
  })

  test('falha de conexão não deixa loading eterno', async () => {
    server.use(http.get(`${base}/search/issues`, () => HttpResponse.error()))
    open(); expect(await screen.findByRole('alert')).toHaveTextContent('Verifique sua conexão')
    expect(screen.queryByText('Carregando publicações…')).not.toBeInTheDocument()
  })

  test('loading de perfil, listagem e detalhe aparece durante a consulta', async () => {
    server.use(http.get(`${base}/search/issues`, async () => { await delay(100); return HttpResponse.json({ total_count: 0, items: [], incomplete_results: false }) }))
    open(); expect(screen.getByText('Carregando perfil…')).toBeVisible(); expect(screen.getByText('Carregando publicações…')).toBeVisible()
    await screen.findByRole('heading', { name: 'Nenhuma publicação encontrada' })
  })

  test('loading de detalhe é apresentado antes da resposta', async () => {
    server.use(http.get(issuePath, async () => { await delay(100); return HttpResponse.json(issues[0]) }))
    open('/post/10'); expect(screen.getByText('Carregando publicação…')).toBeVisible()
    expect(await screen.findByRole('heading', { name: issues[0].title })).toBeVisible()
  })

  test('limite da Search API e resultados incompletos são informados', async () => {
    server.use(http.get(`${base}/search/issues`, () => HttpResponse.json({ total_count: 1500, incomplete_results: true, items: issues.slice(0, 6) })))
    open(); expect(await screen.findByText(/exibimos até 996/)).toBeVisible()
    expect(screen.getByText(/resultados incompletos/)).toBeVisible()
  })

  test('Markdown não executa HTML e tem fallback de corpo vazio', async () => {
    server.use(http.get(issuePath, () => HttpResponse.json({ ...issues[0], body: `${markdown}\n\n<script>alert(1)</script>\n\n[ruim](javascript:alert)` })))
    open('/post/10'); await screen.findByRole('heading', { level: 1 })
    expect(document.querySelector('script')).toBeNull()
    expect(screen.getByRole('link', { name: /Referência/ })).toHaveAttribute('rel', 'noopener noreferrer')
    expect(within(screen.getByRole('region', { name: 'Conteúdo da publicação' })).getByAltText('Diagrama')).toBeVisible()
  })
})
