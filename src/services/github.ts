import { githubConfig, repositoryPath } from '../config/github'
import type { GitHubIssue, GitHubUser, SearchResponse } from '../types/github'
import { api, ApiError } from './api'

export const normalizeSearch = (term: string) => term.trim().replace(/\s+/g, ' ')

export function buildSearchQuery(term: string) {
  const normalized = normalizeSearch(term)
  // Quoting user text keeps search qualifiers inside the configured repository scope.
  const text = normalized ? ` "${normalized.replace(/["\\]/g, ' ')}"` : ''
  return `repo:${githubConfig.owner}/${githubConfig.repository} is:issue${text}`
}

export async function getProfile(signal?: AbortSignal): Promise<GitHubUser> {
  const { data } = await api.get<GitHubUser>(`/users/${encodeURIComponent(githubConfig.username)}`, { signal })
  return data
}

export async function searchIssues(term: string, page: number, signal?: AbortSignal): Promise<SearchResponse> {
  const { data } = await api.get<SearchResponse>('/search/issues', {
    signal, params: { q: buildSearchQuery(term), sort: 'created', order: 'desc', page, per_page: githubConfig.perPage },
  })
  return { ...data, items: data.items.filter(issue => !issue.pull_request) }
}

export async function getIssue(number: string, signal?: AbortSignal): Promise<GitHubIssue> {
  if (!/^[1-9]\d*$/.test(number) || !Number.isSafeInteger(Number(number))) throw new ApiError('Publicação não encontrada.', 'not-found')
  const { data } = await api.get<GitHubIssue>(`${repositoryPath}/issues/${number}`, { signal })
  if (data.pull_request) throw new ApiError('Pull requests não são publicações do blog.', 'not-found')
  return data
}
