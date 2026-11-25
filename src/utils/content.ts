export function excerpt(markdown: string | null, limit = 220): string {
  if (!markdown?.trim()) return 'Esta publicação ainda não possui conteúdo.'
  const plain = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/^[\s]*[>#*-]+\s?/gm, '')
    .replace(/[*_`~|]/g, '')
    .replace(/\s+/g, ' ').trim()
  return plain.length > limit ? `${plain.slice(0, limit).trimEnd()}…` : plain || 'Esta publicação ainda não possui conteúdo.'
}

export function relativeDate(value: string, now = Date.now()): string {
  const seconds = (new Date(value).getTime() - now) / 1000
  if (!Number.isFinite(seconds)) return 'Data indisponível'
  const formatter = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })
  const units = [['year', 31536000], ['month', 2592000], ['day', 86400], ['hour', 3600], ['minute', 60]] as const
  const unit = units.find(([, size]) => Math.abs(seconds) >= size)
  return unit ? formatter.format(Math.round(seconds / unit[1]), unit[0]) : 'há poucos instantes'
}
