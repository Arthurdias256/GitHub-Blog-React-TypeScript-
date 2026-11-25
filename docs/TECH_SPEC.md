# TECH SPEC — GitHub Blog

## T05 — perfil
ProfileCard usa useResource/getProfile, com erro independente das publicações. Props nos estados; dados do perfil tipados; fallback de nome/bio, empresa omitida se nula; avatar com alt/dimensões, link externo seguro. Corresponde RF-01/RF-02/RF-13.

## T04 — dados e resiliência
Configuração em src/config/github.ts e .env.example (Arthurdias256). Interfaces GitHubUser, GitHubIssue, SearchResponse. Axios público com timeout 15s, Accept/API-Version. Erros distinguem rede/404/HTTP/rate limit; retry respeita reset/retry-after quando informado. Hook useResource cancela e ignora respostas antigas, sem retry automático. Consulta fixa repo/is:issue + texto entre aspas, ordenada por criação; filtragem defensiva de PR e rejeição no detalhe. Nenhum token no cliente. Permissões verificadas por credencial local sem imprimir segredo: login Arthurdias256, repositório público, admin/push true; 0 issues antes da preparação.

## T03 — visual
Nunito 400/700 hospedada localmente por @fontsource, line-height 160%. Tokens dark/azul seguem o guia visual observado; valores hex, container 864px útil, Header 296px e sobreposição 64px são aproximações declaradas (sem exportação exata). Header/ícone terminal e linhas geométricas recriados em HTML/SVG, não são assets originais nem screenshots do Figma. Sem tema extra ou gradientes. Tailwind v4 via plugin Vite e @theme; componentes compartilham tokens. Foco visível e skip link desde a base.

## T02 — instalação validada
Setup manual para preservar pasta existente (não vazia). Node 24.11.1/npm 9.3.1 compatíveis com engines do Vite. Vite **8.3.8**, plugin React 6.3.0, Tailwind 4.3.5 e Vitest 5.1.2 confirmados por npm. Lockfile preservado. npm install: zero vulnerabilidades. ESLint e build/tsc -b passaram no scaffold. Sem falhas nativas Rolldown no Windows. Versões completas no package-lock.json; ESLint 9 gera aviso de suporte descontinuado no registro, mas permanece funcional e não tem vulnerabilidades no audit desta instalação.

**Revisão de continuação:** Node v24.11.1, npm 9.3.1, implementação autorizada. SPEC agora em docs/, conforme Notion. Sem bloqueio de implementação. Usar 6 itens/página via Search API, ordenados created/desc com is:issue e filtro repo. Debounce 500ms, AbortController e proteção de resposta antiga. Tipagem, estados e testes serão registrados por etapa. Histórico inicial abaixo é diagnóstico anterior, não situação atual.

## Ambiente observado
Windows. A pasta de trabalho contém o repositório filho `GitHub-Blog-React-TypeScript-`, inicialmente com `.git` e README de uma linha. Branch `main` acompanhando `origin/main`, sem alterações iniciais. Remote: https://github.com/Arthurdias256/GitHub-Blog-React-TypeScript-.git.

Executáveis node, npm e git localizados. GitHub CLI não localizado por Get-Command. Versões e autenticação não verificadas; não inferir compatibilidade. Não existe package.json, build nem aplicação para testar nesta etapa.

## Stack prevista pelo pedido
React + TypeScript + Vite 8.x; Tailwind CSS; Axios; React Router; ESLint; npm. Vitest, Testing Library e Playwright para testes; mocks/MSW conforme necessidade. Versões efetivas: pendentes de instalação após desbloqueio.

## Arquitetura proposta, sujeita ao enunciado completo
Páginas Home, PostDetails e NotFound; componentes de perfil, card, busca, paginação e estados; serviços Axios centralizados; tipos GitHub; hooks para requisições canceláveis. Estado de busca/página na URL, se compatível com o Notion. Não há interfaces TypeScript implementadas ainda.

Rotas previstas: `/`, `/post/:issueNumber`, `*`. API base `https://api.github.com`: `/users/{username}`, `/repos/{owner}/{repo}/issues`, `/search/issues`, `/repos/{owner}/{repo}/issues/{issue_number}`.

Busca proposta: parâmetros Axios, filtro de repositório e `is:issue`, debounce e AbortController quando disparada durante digitação. Paginação com page/per_page, reset em nova consulta, limite de resultados e ausência de duplicatas. **Modelo exato aguarda Notion.** Markdown com react-markdown/remark-gfm, caso permitidos, sem HTML externo inseguro.

## Segurança, interface e validação previstas
Configuração pública via ambiente, sem tokens VITE_*. Tratar timeout, falhas de rede, 404 e rate limit. Tokens, assets e dimensões do Figma ainda não extraídos; não afirmar fidelidade visual. Validar semântica, foco, teclado, contraste e larguras solicitadas sem declarar conformidade integral antecipadamente.

Testes futuros devem cobrir os fluxos listados pelo usuário, isolados da disponibilidade do GitHub. Integração real separada. Executar npm ci, npm ls vite, lint, TypeScript de todas as configurações, testes, E2E e build; registrar saída real.

## Publicação prevista
Vercel, salvo instrução oficial divergente: npm ci, npm run build, saída dist, fallback SPA. Nenhuma configuração criada ou publicação realizada. Conta, repositório definitivo e acesso de deploy pendentes.

## Limitações atuais
Não há servidor MCP específico de Notion ou Figma nesta sessão. Navegador MCP abriu ambas as referências, mas o Notion só expôs introdução/seção 1 e o Figma exige cadastro para inspecionar. Implementação aguarda fonte oficial completa. Ver docs/evidencias/ACESSO_INICIAL.md.
