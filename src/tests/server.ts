import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { issues, profile, searchFixture } from './fixtures'

export const base = 'https://api.github.com'
export const issuePath = `${base}/repos/Arthurdias256/GitHub-Blog-React-TypeScript-/issues/:number`
export const handlers = [
  http.get(`${base}/users/:username`, () => HttpResponse.json(profile)),
  http.get(`${base}/search/issues`, ({ request }) => HttpResponse.json(searchFixture(new URL(request.url)))),
  http.get(issuePath, ({ params }) => {
    const issue = issues.find(item => String(item.number) === params.number)
    return issue ? HttpResponse.json(issue) : HttpResponse.json({ message: 'Not Found' }, { status: 404 })
  }),
]
export const server = setupServer(...handlers)
