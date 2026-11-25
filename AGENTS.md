# Diretrizes do GitHub Blog

## Situação atual
O usuário autorizou implementar com limitações de referência. Na continuação, a rolagem do Notion permitiu ler as seções 1–14, incluindo rubrica e seção 13. Consultar docs/PRD_SPEC.md, docs/TECH_SPEC.md e docs/TASKS_SPEC.md antes de alterar código. Não presumir prazos do Blackboard. O repositório autorizado é Arthurdias256/GitHub-Blog-React-TypeScript-; preservar origin e confirmar permissão antes de push.

## Fontes
- Notion: https://app.notion.com/p/422dfca74d8d81e194e9dc0aa13ca6f0
- Figma: https://www.figma.com/design/UklolDw90CmcDAj9piQVUJ/GitHub-Blog--Community---Copy-?node-id=2-1297
- O Notion prevalece em divergências. Não declarar leitura integral com acesso parcial.

## Implementação e manutenção
React, TypeScript estrito, Vite 8.x, Tailwind CSS, Axios, React Router, npm e ESLint. Não usar Next.js, fetch no lugar de Axios nem segredos em VITE_*. Confirmar versões e compatibilidade antes de instalar. Preservar package-lock.json.

Separar componentes, páginas, serviços, tipos e hooks sem arquitetura excessiva. Integrar endpoints reais do GitHub; excluir pull requests. Testes determinísticos com mocks, separados de verificações reais de API. Validar teclado, estados de erro e larguras de 320 a 1920 px.

## Documentação e Git
Atualizar os três SPEC em docs/ por etapa; registrar resultados reais, limitações e evidências. Nunca inventar testes, screenshots, hashes, URLs ou notas. Preservar README, histórico e remote existentes. Usar somente Arthurdias256.

Antes de cada commit: git status, revisão do diff, verificações pertinentes e inspeção de credenciais. Commits incrementais apenas para etapas efetivamente realizadas. Não versionar .env, node_modules, dist, coverage ou relatórios temporários. Não fazer push --force. Publicação e criação de issues apenas no repositório autorizado.
