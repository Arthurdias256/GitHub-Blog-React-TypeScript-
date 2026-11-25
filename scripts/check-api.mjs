import assert from 'node:assert/strict'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://api.github.com', timeout: 20000, headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' } })
const repository = 'Arthurdias256/GitHub-Blog-React-TypeScript-'
try {
  const { data: profile } = await api.get('/users/Arthurdias256')
  assert.equal(profile.login, 'Arthurdias256')
  const { data: repo } = await api.get(`/repos/${repository}`)
  assert.equal(repo.private, false)
  const params = { q: `repo:${repository} is:issue`, sort: 'created', order: 'desc', per_page: 6 }
  const { data: first } = await api.get('/search/issues', { params: { ...params, page: 1 } })
  const { data: second } = await api.get('/search/issues', { params: { ...params, page: 2 } })
  assert.ok(first.total_count >= 10, 'Ainda não existem dez issues indexadas na Search API')
  assert.equal(first.items.length, 6)
  assert.ok(second.items.length >= 4)
  const ids = [...first.items, ...second.items].map(issue => issue.id)
  assert.equal(new Set(ids).size, ids.length)
  assert.ok([...first.items, ...second.items].every(issue => !issue.pull_request))
  const { data: search } = await api.get('/search/issues', { params: { ...params, q: `${params.q} "React"`, page: 1 } })
  assert.ok(search.total_count > 0)
  const { data: empty } = await api.get('/search/issues', { params: { ...params, q: `${params.q} "termo-inexistente-4fd8091"`, page: 1 } })
  assert.equal(empty.total_count, 0)
  const { data: detail } = await api.get(`/repos/${repository}/issues/${first.items[0].number}`)
  assert.ok(detail.body?.length > 100)
  console.log(JSON.stringify({ result: 'PASS', authentication: 'none', profile: profile.login, public: !repo.private, total: first.total_count, firstPage: first.items.length, secondPage: second.items.length, search: search.total_count, empty: empty.total_count, detail: detail.html_url, duplicateIds: false }, null, 2))
} catch (error) {
  console.error('Integração real não aprovada:', axios.isAxiosError(error) ? { status: error.response?.status, message: error.response?.data?.message || error.code } : error instanceof Error ? error.message : 'Falha desconhecida')
  process.exitCode = 1
}
