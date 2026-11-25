export const githubConfig = {
  username: import.meta.env.VITE_GITHUB_USERNAME || 'Arthurdias256',
  owner: import.meta.env.VITE_GITHUB_OWNER || 'Arthurdias256',
  repository: import.meta.env.VITE_GITHUB_REPOSITORY || 'GitHub-Blog-React-TypeScript-',
  perPage: 6,
} as const

export const repositoryPath = `/repos/${encodeURIComponent(githubConfig.owner)}/${encodeURIComponent(githubConfig.repository)}`
