import { spawnSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const commands = ['npm ci', 'npm ls vite', 'npm run lint', 'npx tsc --noEmit', 'npm run typecheck', 'npm run test', 'npm run test:e2e', 'npm run build', 'npm run test:api', 'npm audit', 'node scripts/audit-secrets.mjs']
const results = []
let log = `Validação real — ${new Date().toISOString()}\nNode ${process.version}\n`
mkdirSync('docs/evidencias', { recursive: true })
for (const command of commands) {
  const start = Date.now()
  const env = { ...process.env }
  delete env.PLAYWRIGHT_BASE_URL
  const result = process.platform === 'win32'
    ? spawnSync('cmd.exe', ['/d', '/s', '/c', command], { encoding: 'utf8', env, timeout: 180000, windowsHide: true })
    : spawnSync('/bin/sh', ['-c', command], { encoding: 'utf8', env, timeout: 180000 })
  const output = `${result.stdout || ''}${result.stderr || ''}`
  console.log(`\n$ ${command}\n${output}`)
  log += `\n$ ${command}\n${output}\nExit code: ${result.status}\n`
  results.push({ command, exitCode: result.status, durationMs: Date.now() - start })
  writeFileSync('docs/evidencias/validacao-final.txt', log)
  writeFileSync('docs/evidencias/validacao-final.json', JSON.stringify({ node: process.version, results }, null, 2))
  if (result.status !== 0) { process.exitCode = 1; break }
}
