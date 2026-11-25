import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 15000,
  headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
})

export class ApiError extends Error {
  readonly kind: 'not-found' | 'rate-limit' | 'network' | 'http'
  readonly retryAt?: number

  constructor(message: string, kind: ApiError['kind'], retryAt?: number) {
    super(message)
    this.name = 'ApiError'
    this.kind = kind
    this.retryAt = retryAt
  }
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const headers = error.response?.headers
    if (status === 404) return new ApiError('Conteúdo não encontrado. Confira o usuário, o repositório ou o número da publicação.', 'not-found')
    const rateMessage = typeof error.response?.data?.message === 'string' && /rate limit/i.test(error.response.data.message)
    if (status === 429 || (status === 403 && (headers?.['x-ratelimit-remaining'] === '0' || headers?.['retry-after'] || rateMessage))) {
      const retryAfter = Number(headers?.['retry-after'])
      const reset = Number(headers?.['x-ratelimit-reset'])
      const retryAt = retryAfter > 0 ? Date.now() + retryAfter * 1000 : reset > 0 ? reset * 1000 : undefined
      return new ApiError('Limite de requisições do GitHub atingido. Aguarde antes de tentar novamente.', 'rate-limit', retryAt)
    }
    if (!error.response) return new ApiError('Não foi possível conectar ao GitHub. Verifique sua conexão e tente novamente.', 'network')
    return new ApiError(status === 422 ? 'O GitHub não aceitou esta consulta. Tente outro termo de pesquisa.' : 'O GitHub não conseguiu atender à solicitação. Tente novamente.', 'http')
  }
  return new ApiError('Ocorreu uma falha inesperada. Tente novamente.', 'http')
}
