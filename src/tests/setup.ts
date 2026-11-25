import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { cleanup, configure } from '@testing-library/react'
import { server } from './server'

configure({ asyncUtilTimeout: 5000 })
beforeAll(() => { server.listen({ onUnhandledRequest: 'error' }); window.scrollTo = vi.fn() })
afterEach(() => { cleanup(); server.resetHandlers() })
afterAll(() => server.close())
