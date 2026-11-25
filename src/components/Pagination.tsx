import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination({ page, pages, disabled, onPage }: { page: number; pages: number; disabled: boolean; onPage: (page: number) => void }) {
  return <nav aria-label="Paginação de publicações" className="mt-8 flex flex-wrap items-center justify-center gap-4">
    <button type="button" className="action" disabled={disabled || page <= 1} onClick={() => onPage(page - 1)}><ChevronLeft aria-hidden="true" className="size-4" />Anterior</button>
    <span aria-current="page" className="text-sm">Página {page} de {Math.max(1, pages)}</span>
    <button type="button" className="action" disabled={disabled || page >= pages} onClick={() => onPage(page + 1)}>Próxima<ChevronRight aria-hidden="true" className="size-4" /></button>
  </nav>
}
