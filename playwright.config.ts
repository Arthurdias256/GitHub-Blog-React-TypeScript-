import { defineConfig, devices } from '@playwright/test'

const productionURL = process.env.PLAYWRIGHT_BASE_URL

export default defineConfig({
  testDir: './tests/e2e', fullyParallel: true, workers: 2,
  reporter: [['list'], ['json', { outputFile: 'test-results/e2e.json' }]],
  use: { baseURL: productionURL || 'http://127.0.0.1:5173', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: productionURL ? undefined : { command: 'npm run dev -- --port 5173 --strictPort', url: 'http://127.0.0.1:5173', reuseExistingServer: !process.env.CI },
})
