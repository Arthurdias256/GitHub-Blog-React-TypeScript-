import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'

export function NotFound({ publication = false }: { publication?: boolean }) {
  return <section className="panel flex flex-col items-center gap-4 text-center"><FileQuestion aria-hidden="true" className="size-10 text-accent" /><h1 className="text-2xl">{publication ? 'Publicação não encontrada' : 'Página não encontrada'}</h1><p>{publication ? 'A issue pode não existir, ter sido removida ou ser um pull request.' : 'O endereço solicitado não existe neste blog.'}</p><Link className="action" to="/">Voltar para publicações</Link></section>
}
