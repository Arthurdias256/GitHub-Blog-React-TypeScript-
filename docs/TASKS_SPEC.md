# TASKS SPEC — acompanhamento

Status: etapas técnicas T01–T13 realizadas, aplicação publicada e repositório enviado. Pendências pessoais/externas explicitadas abaixo. Notion seções 1–14 consultadas; Figma visualmente consultado, sem exportação de propriedades. Histórico inicial preservado em evidencias/ACESSO_INICIAL.md (não representa situação atual).

## Execução atual
- [x] T01: requisitos oficiais, rubrica, planejamento e orientações registrados antes do código.
- [x] T02: setup Vite 8.3.8 e ferramentas; npm ls vite, lint e build (inclui tsc -b) aprovados no scaffold. T01: 10fa708.
- [x] T03: tokens, Nunito local, Header e estilos compartilhados; validação técnica lint/build. Fidelidade pixel-perfect não afirmada.
- [x] T04: serviços GitHub, tipagens, cancelamento e erros; permissão pública/autenticada verificada (testes de serviços em T10). Primeira compilação falhou TS1294 por parameter properties com erasableSyntaxOnly; corrigidas para propriedades explícitas, sem relaxar TypeScript. O commit efc1077 foi criado indevidamente após a falha por comandos PowerShell não interromperem automaticamente; correção e nova validação registradas no commit seguinte.
- [x] T05: ProfileCard integrado ao endpoint real; campos opcionais, loading e retry. Lint/build aprovados; integração real auditada em T10.
- [x] T06: IssueCard/IssueList, resumos/datas/comentários e listagem real; lint/build aprovados. Script para dez issues no único repositório autorizado.
- [x] Dados RF-03: dez issues /issues/1 a /issues/10 criadas e confirmadas na API pública. 5xx intermitentes foram tratados com retomada/checagem por título, sem duplicações. Teste real: total 10, páginas 6+4, pesquisa React 3, termo inexistente 0.
- [x] T07: SearchInput/Pagination, debounce/cancelamento, contagem, estado URL, limites e estados de consulta; lint/build aprovados. Testes automatizados em T10.
- [x] T08: rotas, consulta individual, retorno, GFM seguro e 404; lint/build aprovados. Fluxos de acesso direto e navegação cobertos em T10.
- [x] T09: sete larguras sem overflow, teclado e axe na Home/detalhe; nome acessível dos cards corrigido após falha E2E real. Compilação de testes corrigida. Nova execução exigida em T10.
- [x] T10: 31 testes Vitest (27 fluxos/componentes + 4 utilitários) e 11 Playwright aprovados; MSW e interceptação E2E independentes do GitHub. Lint/tsc -b aprovados. Primeira falha de mock (React no nome do repo) corrigida; espera assíncrona RTL 5s para import lazy em ambiente Windows, sem remover cenário. Resultados finais repetidos em T13.
- [x] T11: README, SPEC revisados, matriz oficial, AI_USAGE com quatro registros e roteiro de apresentação; cinco screenshots reais da aplicação + duas capturas Figma, browser-real.json. Revisão pessoal do aluno ainda pendente e explícita.
- [x] T12: build remoto Vercel READY; https://github-blog-arthurdias256.vercel.app validada com API real, screenshots desktop/mobile e reload direto. CI preparado. Conexão automática GitHub/Vercel falhou; deploy CLI independente aprovado. Node fixado em 24.x para evitar atualização automática no build.
- [x] T13: instalação limpa repetida com Node 24.x/lockfile final; npm ci, Vite 8.3.8, lint, tsc --noEmit, tsc -b, 31 Vitest, 11 E2E, build, integração real, audit e inspeção de credenciais aprovados (validacao-final.txt/json). Build remoto Node 24 READY e 11 E2E contra produção aprovados. Push autorizado/verificado até 4ac179e; commit desta auditoria será enviado em seguida e confirmado pelo HEAD remoto.

Tabela complementada na auditoria para explicitar **todos** os campos pedidos na seção 7. RF/RN referem-se aos IDs oficiais do PRD; “seção” indica requisito documental/técnico sem inventar novo ID.

| ID/descrição | Pré-requisitos | RF/RN relacionados | Arquivos envolvidos | Critério de pronto/teste | Status | Commit/evidência |
|---|---|---|---|---|---|---|
| T01 — análise oficial/SPEC | Referências | Todos; seção 7 | docs/*SPEC.md, AGENTS.md | Rubrica/aceites documentados antes do código | Concluído, complementado nesta auditoria | 10fa708; NOTION_CONTINUACAO.md |
| T02 — configurar stack | T01 | Seção 5; RN-10 | package*.json, vite.config.ts, tsconfig*.json, eslint.config.js | Vite 8/lint/build válidos | Concluído | 241c88b |
| T03 — base visual | T01–T02 | RF-15/16; RNF-01 | src/styles/global.css, src/components/Header.tsx | Guia visual e layout base; aproximações documentadas | Concluído com limitação de assets | abde3a9 |
| T04 — serviços HTTP | T02 | RF-01/05/10/13/14; RN-01/03/06/08/09/10 | src/services/*.ts, src/types/github.ts, src/config/github.ts, src/hooks/useResource.ts | Tipos/erros/cancelamento, lint/types/build | Concluído após correção | efc1077 + 7ec884c |
| T05 — perfil | T03–T04 | RF-01/02/13; RN-01/08 | src/components/ProfileCard.tsx, src/components/States.tsx | Dados reais, nulos, loading e retry testados | Concluído | ddb6959; app.test.tsx |
| T06 — issues/cards | T03–T04 | RF-03/04/08; RN-01/02/03/04/07 | src/components/IssueCard.tsx, src/utils/content.ts, scripts/seed-issues.mjs | Dez issues próprias, recentes, sem PR; resumo/metadados | Concluído | ed82e42; issues/1–10; test:api |
| T07 — busca/páginas | T06 | RF-05/06/07; RN-03/04/05/06 | src/pages/Home.tsx, src/components/SearchInput.tsx, src/components/Pagination.tsx | Search API/debounce/reset/contagem/concorrência | Concluído; navegação corrigida nesta auditoria | 23cf9b4 + 5836af6; app/E2E |
| T08 — detalhe/Markdown | T04/T06 | RF-09/10/11/12; RN-07/08/09 | src/routes/AppRoutes.tsx, src/pages/PostDetails.tsx, src/components/MarkdownContent.tsx | Acesso direto/reload/retorno e Markdown | Concluído; headings corrigidos | cd6059c + 5836af6; app/E2E |
| T09 — responsividade/a11y | T05–T08 | RF-15/16; RNF-04 | src/styles/global.css, src/pages/NotFound.tsx, src/components/IssueCard.tsx | Sete larguras, teclado, foco, contraste e axe | Concluído com ajustes auditados | fedc217 + 542aaf4 |
| T10 — testes | T02–T09 | RF-13/14 e fluxos; RN-08 | src/tests/*, tests/e2e/blog.spec.ts, *test.config.ts, playwright.config.ts | Suíte independente da API; integração real separada | Concluído, ampliado | 164371c; novos casos em 5836af6/542aaf4 |
| T11 — documentação/IA | T01–T10 | Seções 7/8/11 | README.md, docs/*SPEC.md, docs/AI_USAGE.md, docs/APRESENTACAO.md, docs/evidencias/ | Docs, rastreabilidade e capturas reais | Artefatos concluídos; revisão pessoal pendente | 55bf0a6; auditoria complementar |
| T12 — publicação | T10/T11, autenticação | Seção 11; RN-09 | vercel.json, .github/workflows/ci.yml | Build/deploy real, rota direta; sem segredos | Publicado; CI externo bloqueado | 4ac179e; deploy-final.txt |
| T13 — auditar entrega | Todas | Seções 10–13 | docs/RELATORIO_FINAL.md, scripts/validate.mjs, docs/RUBRICA.md | Repetir validações e confrontar critérios | Primeira auditoria concluída; revisão atual em andamento | ed78ce9; validacao-final.txt/json |

- [x] Inspecionar pasta e preservar README/remote existentes.
- [x] Buscar ferramentas MCP específicas e recursos disponíveis: nenhum para Notion/Figma encontrado.
- [x] Tentar HTTP e navegador MCP nas referências.
- [x] Registrar o acesso parcial e preparar rascunhos SPEC.
- [x] Ler seções 1–14 do Notion, rubrica e seção 13; não encontradas subpáginas de requisitos no corpo.
- [ ] Exportar propriedades/assets exatos do Figma (aproximação visual autorizada; não bloqueante).
- [x] Confirmar conta/repositório definitivo e permissão push/admin pela API autenticada, sem expor credencial.
- [x] Concluir T01 e realizar seu commit de conclusão.
- [ ] Entregar links no Blackboard e apresentar individualmente (responsabilidade do aluno).

## Verificações reais desta etapa
API pública sem autenticação: perfil correto, repositório público, total 10, primeira página 6, segunda 4, IDs sem duplicação, busca React 3 e busca vazia de resultados 0. Navegador real: screenshots desktop/mobile e reload do detalhe com HTTP 200 (browser-real.json). Testes determinísticos independentes: 31 Vitest + 11 E2E aprovados, repetidos na auditoria após npm ci.

Auditoria repetida efetivamente por `node scripts/validate.mjs`: todos os onze comandos com exit code 0 em evidencias/validacao-final.json. A saída padrão/erro real está em validacao-final.txt (substitui a transcrição PowerShell anterior, que não capturou subprocessos). Produção: 11/11 E2E novamente aprovados após novo build Node 24; e2e-producao.txt. Logs possuem avisos de depreciação do ESLint e da CLI/npm remoto, sem erro de compilação nem vulnerabilidade no audit. Seed: HTTP 5xx transitórios recuperados, dez issues confirmadas.

## Pendências que não são implementação faltante
- Revisão pessoal do aluno, demonstração individual e envio dos links no Blackboard, incluindo prazo/data.
- Conectar integração GitHub/Vercel para deploy automático opcional; publicação CLI real já funciona.
- Refinamento pixel-perfect depende de exportação das propriedades/assets do Figma; aproximações autorizadas e auditadas como parciais.
- Workflow CI foi preparado, enviado e consultado. Run 45652648324 falhou antes de iniciar qualquer step: “The job was not started because your account is locked due to a billing issue.” Desbloqueio de faturamento/conta depende do usuário/GitHub; não foi tentada alteração de cobrança. evidencias/github-actions.json.

## Histórico
- Levantamento inicial bloqueado; continuação autorizada; Notion recuperado por rolagem e fonte oficial integrada ao PRD. Os hashes acima são reais e preservam também a correção de compilação intermediária.

## Nova auditoria pré-entrega
- [x] A01 — reler Notion 1–14/rubrica/condições e comparar SPEC (RF-01–16/RN-01–10). Fonte retornada via navegador MCP; nenhuma mudança de rubrica encontrada.
- [x] A02 — reproduzir regressões de navegação e hierarquia: dois testes novos falharam antes das correções; axe completo publicado apontou heading-order. Corrigidos somente esses problemas, com regressões adicionais. Arquivos: Home.tsx, MarkdownContent.tsx, remarkHeadingOrder.ts, global.css, app/utils/E2E tests. RF-09/11/16, RN-07/08. Lint/types, 34 Vitest e 12 E2E aprovados após correção.
- [ ] A03 — complementar SPEC no formato da seção 7, evidências IA e checklist Blackboard; matriz/estimativa oficial.
- [x] A02b — corrigir contorno da busca (1,35:1 → 3,05:1 contra página) e prefixo @ do RF-02. Arquivos: global.css, SearchInput.tsx, ProfileCard.tsx. RF-02/16, RNF-04. Sem mudança de layout, fonte, superfícies ou funcionalidades.
- [ ] A04 — repetir instalação/validações, verificar API/visibilidade/credenciais, publicar correções e auditar produção.
- [x] A02c — corrigido label-content-name-mismatch identificado em seis cards reais pelo axe completo; visual/clique preservados, clique no padding e axe completo testados. Arquivos: IssueCard.tsx, app.test.tsx, blog.spec.ts. RF-08/09/16. 12 E2E aprovados; erro TypeScript no novo teste (opção exact do Playwright usada na RTL) corrigido sem relaxar tipagem. Evidência anterior: auditoria/antes-correcao-cards.json.
