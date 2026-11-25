import type { GitHubIssue, GitHubUser } from '../types/github'

// Fixtures are exclusively for tests; production always uses the public GitHub API.
export const profile: GitHubUser = { login: 'Arthurdias256', name: 'Arthur — teste', bio: 'Desenvolvimento de software', company: null, followers: 12, avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4', html_url: 'https://github.com/Arthurdias256' }
export const markdown = '## Conceitos\n\nTexto com **negrito**, *ênfase* e `inline`.\n\n- Uma lista\n\n> Uma citação\n\n```ts\nconst nome = "React"\n```\n\n| Item | Valor |\n| --- | --- |\n| Teste | 1 |\n\n[Referência](https://react.dev)\n\n![Diagrama](https://example.com/image.png)'
export const issues: GitHubIssue[] = Array.from({ length: 10 }, (_, index) => ({ id: 10 - index, number: 10 - index, title: `${index < 7 ? 'React' : 'TypeScript'} publicação ${10 - index}`, body: markdown, created_at: '2026-01-01T12:00:00Z', comments: 2, html_url: `https://github.com/Arthurdias256/GitHub-Blog-React-TypeScript-/issues/${10 - index}`, user: { login: 'Arthurdias256' } }))

export function searchFixture(url: URL) {
  const q = url.searchParams.get('q') || ''
  const match = q.match(/is:issue\s+"(.*)"$/)?.[1]?.toLowerCase() || ''
  const filtered = issues.filter(issue => !match || issue.title.toLowerCase().includes(match))
  const page = Number(url.searchParams.get('page') || 1)
  const perPage = Number(url.searchParams.get('per_page') || 6)
  return { total_count: filtered.length, incomplete_results: false, items: filtered.slice((page - 1) * perPage, page * perPage) }
}
