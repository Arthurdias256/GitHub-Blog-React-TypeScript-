import { AlertCircle, FileSearch, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ApiError } from '../services/api'

export function LoadingState({ message = 'Carregando publicações…' }: { message?: string }) {
  return <div role="status" className="flex min-h-40 items-center justify-center gap-3 rounded-lg bg-post p-6"><LoaderCircle aria-hidden="true" className="size-5 animate-spin text-accent" />{message}</div>
}

export function ErrorState({ error, onRetry }: { error: ApiError; onRetry: () => void }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!error.retryAt) return
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [error.retryAt])
  const waiting = Boolean(error.retryAt && error.retryAt > now)
  return <div className="rounded-lg border border-border bg-post p-6">
    <div role="alert" className="flex items-start gap-3"><AlertCircle aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" /><p>{error.message}{waiting && <> Nova tentativa após {new Date(error.retryAt!).toLocaleTimeString('pt-BR')}.</>}</p></div>
    <button className="action mt-4" onClick={onRetry} disabled={waiting}>Tentar novamente</button>
  </div>
}

export function EmptyState() {
  return <div role="status" className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-lg border border-border p-6 text-center"><FileSearch aria-hidden="true" className="size-8 text-label" /><h2 className="text-lg">Nenhuma publicação encontrada</h2><p>Tente outro termo ou limpe a pesquisa. Se o repositório ainda não possui issues, elas aparecerão aqui quando forem criadas.</p></div>
}
