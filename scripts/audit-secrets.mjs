import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const files = [...new Set(execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean))]
const patterns = [/gh[pousr]_[A-Za-z0-9]{20,}/, /github_pat_[A-Za-z0-9_]{30,}/, /AKIA[A-Z0-9]{16}/, /-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----/]
const suspicious = files.filter(path => {
  const bytes = readFileSync(path)
  if (bytes.includes(0)) return false
  return patterns.some(pattern => pattern.test(bytes.toString('utf8')))
})
if (suspicious.length) {
  console.error('Revisar possíveis segredos nos arquivos:', suspicious)
  process.exitCode = 1
} else console.log(`PASS: ${files.length} arquivos candidatos ao Git verificados; nenhum padrão de credencial encontrado. Esta verificação não substitui revisão humana.`)
