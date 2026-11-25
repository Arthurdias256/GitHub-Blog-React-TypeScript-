import { excerpt, relativeDate } from '../utils/content'
import { buildSearchQuery, normalizeSearch } from '../services/github'
import { ApiError, normalizeApiError } from '../services/api'
import { remarkHeadingOrder } from '../utils/remarkHeadingOrder'

test('resumo remove Markdown e trunca sem conteúdo cru', () => {
  expect(excerpt('## Olá **React**\n```ts\nconst x = 1\n```\n[link](https://example.com)')).toBe('Olá React link')
  expect(excerpt('abcdef', 3)).toBe('abc…')
  expect(excerpt(null)).toContain('ainda não possui conteúdo')
})
test('datas relativas em português e fallback', () => {
  expect(relativeDate('2026-01-01T00:00:00Z', Date.parse('2026-01-03T00:00:00Z'))).toBe('anteontem')
  expect(relativeDate('invalid')).toBe('Data indisponível')
})
test('normalização e escopo fixo de consulta', () => {
  expect(normalizeSearch('  React   TS  ')).toBe('React TS')
  expect(buildSearchQuery('')).toBe('repo:Arthurdias256/GitHub-Blog-React-TypeScript- is:issue')
  expect(buildSearchQuery('" repo:other/pr')).toContain('is:issue "  repo:other/pr"')
})
test('erros desconhecidos têm mensagem e erro normalizado é preservado', () => {
  const error = new ApiError('Falha', 'http')
  expect(normalizeApiError(error)).toBe(error)
  expect(normalizeApiError(null).message).toContain('falha inesperada')
})

test('hierarquia Markdown começa em h2 e normaliza saltos sem alterar código', () => {
  const headings = [3, 5, 6, 3, 1, 4].map(depth => ({ type: 'heading', depth }))
  const code = { type: 'code', value: '# Apenas código' }
  const tree = { type: 'root', children: [...headings, code] }
  remarkHeadingOrder()(tree)
  expect(headings.map(node => node.depth)).toEqual([2, 3, 4, 2, 2, 3])
  expect(code.value).toBe('# Apenas código')
})
