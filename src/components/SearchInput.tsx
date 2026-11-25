import { Search, X } from 'lucide-react'
import type { FormEvent } from 'react'

interface SearchInputProps {
  value: string
  pending: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

export function SearchInput({ value, pending, onChange, onSubmit }: SearchInputProps) {
  function submit(event: FormEvent) { event.preventDefault(); onSubmit() }
  return <form role="search" onSubmit={submit} className="mb-10">
    <label htmlFor="search" className="sr-only">Buscar publicações</label>
    <div className="flex items-center rounded-md border border-control bg-input focus-within:border-accent">
      <input id="search" type="search" value={value} onChange={event => onChange(event.target.value)} placeholder="Buscar conteúdo" autoComplete="off" maxLength={200} className="min-w-0 flex-1 rounded-md px-4 py-3 text-text placeholder:text-label" aria-describedby="search-help" />
      {value && <button type="button" onClick={() => onChange('')} aria-label="Limpar pesquisa" className="flex size-11 shrink-0 items-center justify-center text-label hover:text-accent"><X aria-hidden="true" className="size-4" /></button>}
      <button type="submit" aria-label="Pesquisar" className="flex size-11 shrink-0 items-center justify-center text-accent"><Search aria-hidden="true" className="size-5" /></button>
    </div>
    <p id="search-help" className="mt-2 text-xs text-text">{pending ? 'Atualizando pesquisa…' : 'Pesquise pelo conteúdo das publicações. A busca é atualizada ao digitar.'}</p>
  </form>
}
