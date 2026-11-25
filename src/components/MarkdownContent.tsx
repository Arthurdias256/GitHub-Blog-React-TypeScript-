import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { remarkHeadingOrder } from '../utils/remarkHeadingOrder'

export function MarkdownContent({ content }: { content: string | null }) {
  return <div className="markdown">
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkHeadingOrder]} skipHtml components={{
      a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (abre em nova aba)</span></a>,
      img: ({ src, alt }) => <img src={src} alt={alt || 'Imagem da publicação'} loading="lazy" referrerPolicy="no-referrer" />,
      table: ({ children }) => <div className="max-w-full overflow-x-auto" role="region" aria-label="Tabela da publicação" tabIndex={0}><table>{children}</table></div>,
    }}>{content?.trim() ? content : 'Esta publicação ainda não possui conteúdo.'}</ReactMarkdown>
  </div>
}
