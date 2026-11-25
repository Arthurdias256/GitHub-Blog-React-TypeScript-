# Diretrizes do GitHub Blog

## Situação atual
O usuário autorizou implementar com limitações de referência. Na continuação, a rolagem do Notion permitiu ler as seções 1–14, incluindo rubrica e seção 13. Consultar docs/PRD_SPEC.md, docs/TECH_SPEC.md e docs/TASKS_SPEC.md antes de alterar código. Não presumir prazos do Blackboard. O repositório autorizado é Arthurdias256/GitHub-Blog-React-TypeScript-; preservar origin e confirmar permissão antes de push.

## Fontes
- Notion: https://app.notion.com/p/422dfca74d8d81e194e9dc0aa13ca6f0
- Figma: https://www.figma.com/design/UklolDw90CmcDAj9piQVUJ/GitHub-Blog--Community---Copy-?node-id=2-1297
- O Notion prevalece em divergências. Não declarar leitura integral com acesso parcial.

## Implementação e manutenção
Antes da entrega, consultar também docs/AUDITORIA_FINAL.md e docs/ENTREGA_BLACKBOARD.md. Preservar correções de sincronização query/draft, headings por AST e card com Link estendido (título como nome acessível, conteúdo fora do Link). Executar axe completo, não apenas subset de tags, e manter testes de histórico/clique no padding/contraste/foco. Não preencher validação pessoal de IA, comprovante do Blackboard ou apresentação em nome do aluno. CI é extra opcional na seção 14; bloqueio da conta deve ser relatado, nunca contornado por remoção de checks ou mudança de cobrança.

## Stack e arquitetura
React, TypeScript estrito, Vite 8.x, Tailwind CSS, Axios, React Router, npm e ESLint. Não usar Next.js, fetch no lugar de Axios nem segredos em VITE_*. Confirmar versões e compatibilidade antes de instalar. Preservar package-lock.json.

Separar `pages/`, `components/`, `services/`, `hooks/`, `types/`, `utils/` e `config/` sem arquitetura excessiva. Componentes recebem Props tipadas; HTTP fica em services; estado assíncrono reutilizável em hooks; rotas em AppRoutes. Integrar endpoints reais do GitHub; excluir pull requests e centralizar username/repo.

## Convenções TypeScript
Manter `strict` e `erasableSyntaxOnly`, evitar `any` indiscriminado, modelar campos nulos da API e validar parâmetros de rota em runtime. Props, respostas e erros devem ter contratos explícitos. Não relaxar tsconfig, ESLint ou testes para fazer uma etapa passar.

## Qualidade e testes
Testes determinísticos com mocks, separados de verificações reais de API. Cobrir no mínimo busca/paginação, detalhe/Markdown e falhas; manter loading, vazio, 404, rate limit, retry, cancelamento, segurança de Markdown e responsividade. Validar teclado, contraste, foco, axe completo e larguras de 320 a 1920 px, incluindo 375/390, 768, 1280 e 1440. Executar npm ci, lint, tsc, Vitest, Playwright e build antes de publicar.

## Documentação e Git
Atualizar os três SPEC em docs/ por etapa; registrar resultados reais, limitações e evidências. Nunca inventar testes, screenshots, hashes, URLs ou notas. Preservar README, histórico e remote existentes. Usar somente Arthurdias256.

Usar commits semânticos (`feat:`, `fix:`, `docs:`, `test:`, `chore:`, `refactor:`). O histórico inicial pré-existente não deve ser reescrito. Commits de documentação não exigem redeploy da aplicação.

Antes de cada commit: git status, revisão do diff, verificações pertinentes e inspeção de credenciais. Commits incrementais apenas para etapas efetivamente realizadas. Não versionar .env, node_modules, dist, coverage ou relatórios temporários. Não fazer push --force. Publicação e criação de issues apenas no repositório autorizado.
