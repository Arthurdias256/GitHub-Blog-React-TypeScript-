import { ArrowUpRight, CalendarDays, ChevronLeft, Github, MessageCircle } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { ErrorState, LoadingState } from '../components/States'
import { MarkdownContent } from '../components/MarkdownContent'
import { getIssue } from '../services/github'
import { useResource } from '../hooks/useResource'
import { relativeDate } from '../utils/content'
import { NotFound } from './NotFound'

export function PostDetails() {
  const { issueNumber = '' } = useParams()
  const location = useLocation()
  const from: unknown = location.state?.from
  const back = typeof from === 'string' && (from === '/' || from.startsWith('/?')) ? from : '/'
  const load = useCallback((signal: AbortSignal) => getIssue(issueNumber, signal), [issueNumber])
  const { data: issue, error, loading, retry } = useResource(`issue:${issueNumber}`, load)
  useEffect(() => { if (issue) document.title = `${issue.title} | GitHub Blog` }, [issue])

  if (loading) return <LoadingState message="Carregando publicação…" />
  if (error?.kind === 'not-found') return <NotFound publication />
  if (error) return <><Link className="external-link mb-4" to={back}><ChevronLeft aria-hidden="true" className="size-4" />Voltar</Link><ErrorState error={error} onRetry={retry} /></>
  if (!issue) return null

  return <article>
    <header className="panel">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <Link to={back} className="external-link"><ChevronLeft aria-hidden="true" className="size-4" />Voltar</Link>
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="external-link">Ver no GitHub<ArrowUpRight aria-hidden="true" className="size-3" /><span className="sr-only">(abre em nova aba)</span></a>
      </div>
      <h1 className="break-words text-2xl">{issue.title}</h1>
      <div className="metadata mt-3">
        <span><Github aria-hidden="true" />{issue.user?.login || 'Autor indisponível'}</span>
        <span><CalendarDays aria-hidden="true" /><time dateTime={issue.created_at} title={new Date(issue.created_at).toLocaleString('pt-BR')}>{relativeDate(issue.created_at)}</time></span>
        <span><MessageCircle aria-hidden="true" />{issue.comments} {issue.comments === 1 ? 'comentário' : 'comentários'}</span>
      </div>
    </header>
    <section aria-label="Conteúdo da publicação" className="px-1 py-10 sm:px-8"><MarkdownContent content={issue.body} /></section>
  </article>
}
