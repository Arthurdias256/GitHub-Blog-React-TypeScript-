import { useCallback } from 'react'
import { ProfileCard } from '../components/ProfileCard'
import { IssueList } from '../components/IssueCard'
import { EmptyState, ErrorState, LoadingState } from '../components/States'
import { useResource } from '../hooks/useResource'
import { searchIssues } from '../services/github'

export function Home() {
  const load = useCallback((signal: AbortSignal) => searchIssues('', 1, signal), [])
  const posts = useResource('issues', load)
  return <><ProfileCard /><section className="mt-16" aria-labelledby="publications-title"><div className="mb-6 flex items-center justify-between gap-4"><h2 id="publications-title" className="text-lg">Publicações</h2><span role="status" className="text-sm">{posts.data ? `${posts.data.total_count} publicações` : 'Consultando…'}</span></div>{posts.loading ? <LoadingState /> : posts.error ? <ErrorState error={posts.error} onRetry={posts.retry} /> : posts.data?.items.length ? <IssueList issues={posts.data.items} /> : <EmptyState />}</section></>
}
