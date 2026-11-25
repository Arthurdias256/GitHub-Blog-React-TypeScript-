# TECH SPEC — GitHub Blog

## Auditoria acadêmica complementar
Regressões reproduzidas antes da correção: Link do logotipo removia q da URL, mas o draft antigo voltava a inseri-lo após debounce; Markdown ## era convertido em h3, gerando heading-order no axe completo. Home agora reconcilia draft quando a query canônica muda, com atualização de estado condicional/guardada antes de commit de render (padrão de ajuste de estado a mudança de entrada), sem depender de evento popstate. Plugin remarkHeadingOrder normaliza a árvore Markdown abaixo do h1 do post; não altera código nem habilita HTML. Testes de regressão acrescentados para logotipo/histórico e hierarquia. Demais fluxos e identidade preservados.

## T10 — estratégia de testes implementada
Vitest/jsdom + Testing Library/user-event + MSW; 31 cenários com respostas HTTP determinísticas, incluindo falha perfil/detalhe, nulos, busca/limpeza/contagem, paginação/reset, especiais, debounce, resposta antiga, 404, PR, rede, 500, 403/429, Retry-After, loading, GFM e segurança. Playwright Chromium: 11 cenários, sete larguras, acesso direto/reload, retorno/URL, teclado e axe (zero violações nos estados auditados). scripts/check-api.mjs verifica integração pública separada (não usa token). E2E usa fixtures só no teste, nunca no bundle. URL com página além do total oferece ação para primeira página. CI e relatório final serão registrados em T12–13.

## T09 — responsividade/a11y e desempenho
Primeira rodada Playwright: sete larguras passaram sem overflow na Home e detalhe; axe não detectou violações nas páginas testadas. Um E2E encontrou card sem nome no navegador (article dentro de link): corrigido com aria-labelledby no título. Verificação completa TypeScript identificou falta da lib DOM nas avaliações Playwright; adicionada ao projeto de ferramentas. Nenhuma regra foi desativada. Detalhe/Markdown carregados via lazy/Suspense para retirar aviso de bundle >500k; fontes limitadas ao subset latin (inclui português).

## T08 — rotas/Markdown
AppRoutes declara /, /post/:issueNumber e *. PostDetails consulta individualmente e valida inteiro positivo seguro, rejeita PR. Estado from contém só caminho local / ou /? para retorno; acesso direto retorna /. Markdown via react-markdown + GFM sem rehype-raw, skipHtml e transformação segura padrão de URLs. Títulos Markdown deslocados um nível; tabelas com rolagem própria, imagens responsivas/lazy, links externos com noopener. Foco no main/título de documento/scroll tratados na mudança de rota, não a cada tecla de busca.

## T07 — pesquisa/paginação
Home controla draft, query/page na URL e efeito debounce 500ms (Enter confirma imediatamente). Normaliza espaços, limita termo a 200 caracteres; nova consulta remove page. URL restaura estado ao voltar. useResource usa chave de consulta/página e cancela a anterior. Resultados antigos ficam ocultos durante nova digitação e controles desativados. Páginas reais com per_page=6; limite conservador 166 páginas/996 itens para nunca pedir uma página que cruze 1.000. Contagem total oficial preservada, aviso de limite e incomplete_results. Query vazia também usa Search API conforme opção oficial. Filtro de PR no servidor e defensivo no cliente.

## T06 — catálogo
Home consulta Search API sem termo (permitido RN-04); IssueCard/IssueList com Props tipadas, keys por id, metadados e resumo sem blocos Markdown cru. Datas via Intl em português. scripts/seed-issues.mjs é administrativo/idempotente por título, verifica usuário/permissões/repositório público e lê credencial apenas em memória; não é importado no cliente. Publicações técnicas preparadas com apoio de IA e identificação explícita.

## T05 — perfil
ProfileCard usa useResource/getProfile, com erro independente das publicações. Props nos estados; dados do perfil tipados; fallback de nome/bio, empresa omitida se nula; avatar com alt/dimensões, link externo seguro. Corresponde RF-01/RF-02/RF-13.

## T04 — dados e resiliência
Configuração em src/config/github.ts e .env.example (Arthurdias256). Interfaces GitHubUser, GitHubIssue, SearchResponse. Axios público com timeout 15s, Accept/API-Version. Erros distinguem rede/404/HTTP/rate limit; retry respeita reset/retry-after quando informado. Hook useResource cancela e ignora respostas antigas, sem retry automático. Consulta fixa repo/is:issue + texto entre aspas, ordenada por criação; filtragem defensiva de PR e rejeição no detalhe. Nenhum token no cliente. Permissões verificadas por credencial local sem imprimir segredo: login Arthurdias256, repositório público, admin/push true; 0 issues antes da preparação.

## T03 — visual
Nunito 400/700 hospedada localmente por @fontsource, line-height 160%. Tokens dark/azul seguem o guia visual observado; valores hex, container 864px útil, Header 296px e sobreposição 64px são aproximações declaradas (sem exportação exata). Header/ícone terminal e linhas geométricas recriados em HTML/SVG, não são assets originais nem screenshots do Figma. Sem tema extra ou gradientes. Tailwind v4 via plugin Vite e @theme; componentes compartilham tokens. Foco visível e skip link desde a base.

## T02 — instalação validada
Setup manual para preservar pasta existente (não vazia). Node 24.11.1/npm 9.3.1 compatíveis com engines do Vite. Vite **8.3.8**, plugin React 6.3.0, Tailwind 4.3.5 e Vitest 5.1.2 confirmados por npm. Lockfile preservado. npm install: zero vulnerabilidades. ESLint e build/tsc -b passaram no scaffold. Sem falhas nativas Rolldown no Windows. Versões completas no package-lock.json; ESLint 9 gera aviso de suporte descontinuado no registro, mas permanece funcional e não tem vulnerabilidades no audit desta instalação.

## Versões efetivamente instaladas
Node 24.11.1; npm 9.3.1; React/React DOM 19.3.1; TypeScript 5.9.3; Vite 8.3.8; plugin React 6.3.0; Tailwind/plugin 4.3.5; Axios 1.21.1; React Router DOM 7.18.7; react-markdown 10.1.0; remark-gfm 4.0.1; Lucide 0.468.0; Nunito 5.3.0; ESLint 9.39.5; Vitest 5.1.2; Testing Library React 16.3.3; user-event 14.6.13; jest-dom 6.9.1; jsdom 27.4.0; MSW 2.15.0; Playwright 1.65.1; axe Playwright 4.14.1. Registro: npm ls --depth=0 e package-lock.json. Node engines do Vite: ^20.19.0 ou >=22.12.0; projeto fixado em 24.x após aviso da Vercel sobre atualização automática de engines aberta, mantendo CI/local/build remoto coerentes.

## Estrutura e fluxo de dados
```
src/
  config/github.ts       configuração pública e seis itens/página
  types/github.ts        GitHubUser, GitHubIssue, SearchResponse
  services/api.ts        instância Axios + ApiError
  services/github.ts     getProfile, searchIssues, getIssue
  hooks/useResource.ts   snapshot/chave, cancelamento, retry
  utils/content.ts       resumo legível e data relativa pt-BR
  components/            Header, ProfileCard, IssueCard/IssueList,
                         SearchInput, Pagination, States, MarkdownContent
  pages/                 Home, PostDetails, NotFound
  routes/AppRoutes.tsx   rotas, lazy/Suspense, foco e título
  tests/                 testes de integração/utilitários e MSW
tests/e2e/               fluxos de navegador e axe
scripts/                 integração real, evidências e seed administrativo
docs/                    SPEC, rubrica, apresentação e evidências
```

Fluxo: usuário → Home/query/page → serviço Axios → GitHub → useResource → componentes por Props. Estado local: input/contagem de tentativas/snapshot e relógio de rate limit. Estado navegável: q/page na URL. Sem contexto global, store ou backend desnecessários. Sem cache persistente: uma volta ao catálogo consulta novamente; reduz complexidade, mas consome quota pública.

### Contratos e endpoints
GitHubUser inclui login, name/bio/company nulos, avatar_url, followers e html_url. GitHubIssue contém id, number, title, body nulo, created_at, comments, html_url, user nulo e pull_request opcional. SearchResponse contém total_count, incomplete_results e items. Todos estão em src/types/github.ts; tipos não constituem validação runtime arbitrária.

| Endpoint | Uso |
|---|---|
| GET /users/{username} | Perfil |
| GET /search/issues | Catálogo e busca, q/page/per_page/sort/order |
| GET /repos/{owner}/{repo}/issues/{number} | Detalhe |
| GET /repos/{owner}/{repo}/issues | Apenas preparação/auditoria administrativa, não catálogo |

## Publicação
Vercel: npm ci, npm run build, dist; vercel.json com fallback SPA sem reescrever /assets e cabeçalhos nosniff/referrer-policy/frame deny. CI em .github/workflows/ci.yml, Node 24, instalações limpas, lint/types/test/E2E/build, relatórios apenas em falha. Sem tokens em variáveis do bundle. Autenticação CLI verificada como arthurdias256. URL real: https://github-blog-arthurdias256.vercel.app, READY e testada no navegador com API pública (producao/browser-real.json). A integração automática GitHub/Vercel falhou; deployment direto CLI teve sucesso. Habilitar deploy por push exige conectar o repositório ao projeto existente pela integração GitHub na Vercel.

## Limitações conhecidas
Busca GitHub tem limites próprios e atraso eventual de indexação. Consultas de múltiplas palavras são frases; aspas/barras invertidas do usuário são substituídas por espaços para preservar escopo. Não há execução de HTML externo nem syntax highlighting extra. Imagens remotas podem ficar indisponíveis. WCAG integral e equivalência pixel-perfect não são afirmadas. Não foi possível exportar os assets originais do Figma; medidas, cores e Header são aproximações. Prazos e avaliação individual no Blackboard dependem do aluno.

GitHub Actions: run 45652648324/commit 4ac179e consultado por API; falha antes dos steps por conta bloqueada devido a faturamento. Workflow não foi enfraquecido nem testes removidos; reexecutar após usuário resolver a conta. Sucesso local/produção não é declarado como sucesso de CI.

## Referências técnicas
[GitHub REST](https://docs.github.com/en/rest), [Vite](https://vite.dev/), [Tailwind](https://tailwindcss.com/), [React Router](https://reactrouter.com/), [Axios](https://axios-http.com/), [Notion/Figma e requisitos](PRD_SPEC.md).
