export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  company: string | null
  followers: number
  html_url: string
}

export interface GitHubIssue {
  id: number
  number: number
  title: string
  body: string | null
  created_at: string
  comments: number
  html_url: string
  user: { login: string } | null
  pull_request?: { url: string }
}

export interface SearchResponse {
  total_count: number
  incomplete_results: boolean
  items: GitHubIssue[]
}
