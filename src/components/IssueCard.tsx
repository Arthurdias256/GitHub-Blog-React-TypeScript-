import { MessageCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import type { GitHubIssue } from '../types/github'
import { excerpt, relativeDate } from '../utils/content'

export function IssueCard({ issue }: { issue: GitHubIssue }) {
  const location = useLocation()
  return <li className="min-w-0">
      <article aria-labelledby={`issue-title-${issue.id}`} className="relative h-full rounded-[10px] border-2 border-transparent bg-post p-6 hover:border-accent focus-within:border-accent sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
          <h3 id={`issue-title-${issue.id}`} className="min-w-0 flex-1 break-words text-xl leading-8"><Link to={`/post/${issue.number}`} state={{ from: `${location.pathname}${location.search}` }} className="after:absolute after:inset-0 after:rounded-lg">{issue.title}</Link></h3>
          <time className="shrink-0 text-xs text-text sm:pt-1" dateTime={issue.created_at} title={new Date(issue.created_at).toLocaleString('pt-BR')}>{relativeDate(issue.created_at)}</time>
        </div>
        <p className="mt-4 line-clamp-4 break-words">{excerpt(issue.body)}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-xs"><MessageCircle aria-hidden="true" className="size-4 text-label" />{issue.comments} {issue.comments === 1 ? 'comentário' : 'comentários'}</span>
      </article>
  </li>
}

export function IssueList({ issues }: { issues: GitHubIssue[] }) {
  return <ul aria-label="Publicações" className="grid grid-cols-1 gap-8 md:grid-cols-2">{issues.map(issue => <IssueCard key={issue.id} issue={issue} />)}</ul>
}
