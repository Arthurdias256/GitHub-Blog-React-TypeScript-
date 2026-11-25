import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProfileCard } from '../components/ProfileCard'
import { IssueList } from '../components/IssueCard'
import { EmptyState, ErrorState, LoadingState } from '../components/States'
import { useResource } from '../hooks/useResource'
import { normalizeSearch, searchIssues } from '../services/github'
import { SearchInput } from '../components/SearchInput'
import { Pagination } from '../components/Pagination'
import { githubConfig } from '../config/github'

export function Home() {
  const [params, setParams] = useSearchParams()
  const query = normalizeSearch((params.get('q') || '').slice(0, 200))
  const maxPages = Math.floor(1000 / githubConfig.perPage)
  const requestedPage = Number(params.get('page'))
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? Math.min(requestedPage, maxPages) : 1
  const [draft, setDraft] = useState(query)
  const waiting = normalizeSearch(draft) !== query
  const load = useCallback((signal: AbortSignal) => searchIssues(query, page, signal), [query, page])
  const posts = useResource(`issues:${query}:${page}`, load)

  const updateQuery = useCallback((value: string) => {
    const normalized = normalizeSearch(value)
    setParams(normalized ? { q: normalized } : {}, { replace: true })
  }, [setParams])

  useEffect(() => {
    if (!waiting) return
    const timer = window.setTimeout(() => updateQuery(draft), 500)
    return () => window.clearTimeout(timer)
  }, [draft, waiting, updateQuery])

  useEffect(() => {
    const sync = () => setDraft(normalizeSearch(new URLSearchParams(window.location.search).get('q') || ''))
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  const total = posts.data?.total_count
  const pages = total === undefined ? page : Math.min(maxPages, Math.ceil(total / githubConfig.perPage))
  const pending = posts.loading || waiting
  function goToPage(nextPage: number) {
    if (pending) return
    setParams({ ...(query ? { q: query } : {}), ...(nextPage > 1 ? { page: String(nextPage) } : {}) })
  }

  return <><ProfileCard /><section className="mt-16" aria-labelledby="publications-title">
    <div className="mb-3 flex flex-wrap items-center justify-between gap-4"><h2 id="publications-title" className="text-lg">Publicações</h2><span role="status" aria-live="polite" className="text-sm">{pending ? 'Consultando publicações…' : total !== undefined ? `${total} ${total === 1 ? 'publicação encontrada' : 'publicações encontradas'}` : 'Não foi possível contar as publicações'}</span></div>
    <SearchInput value={draft} pending={pending} onChange={setDraft} onSubmit={() => { if (waiting) updateQuery(draft) }} />
    <div aria-busy={pending}>
      {pending ? <LoadingState message={query || waiting ? 'Pesquisando publicações…' : undefined} /> : posts.error ? <ErrorState error={posts.error} onRetry={posts.retry} /> : posts.data?.items.length ? <IssueList issues={posts.data.items} /> : <EmptyState />}
    </div>
    {!posts.error && (total === undefined || total > 0) && <Pagination page={page} pages={pages} disabled={pending} onPage={goToPage} />}
    {total !== undefined && total > maxPages * githubConfig.perPage && <p className="mt-4 text-sm">A busca do GitHub limita o acesso aos primeiros 1.000 resultados. Com seis itens por página, exibimos até 996; refine sua pesquisa para encontrar outras publicações.</p>}
    {posts.data?.incomplete_results && <p role="status" className="mt-4 text-sm">O GitHub retornou resultados incompletos. Refine a busca ou tente novamente.</p>}
  </section></>
}
