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

| Tarefa | Dependências | Requisitos | Critério de conclusão / teste | Evidência / situação |
|---|---|---|---|---|
| T01 — análise oficial e SPEC | Referências | Todos | Rubrica/aceites documentados | 10fa708; NOTION_CONTINUACAO.md |
| T02 — configuração | T01 | Stack | Vite 8/lint/build | 241c88b |
| T03 — identidade visual | T01–T02 | RF-15/16 | Guia visual e base responsiva | abde3a9; aproximações declaradas |
| T04 — API GitHub | T02 | RF-01/05/10/13/14 | Serviços e erros tipados | efc1077 + correção 7ec884c |
| T05 — perfil | T03–T04 | RF-01/02 | Dados/fallback/estados | ddb6959 |
| T06 — publicações | T03–T04 | RF-03/04/08 | Issues sem PR, metadados | ed82e42; dez issues públicas |
| T07 — busca/paginação | T06 | RF-05/06/07 | API/reset/cancelamento | 23cf9b4 |
| T08 — detalhes/Markdown | T04, T06 | RF-09/10/11/12 | Rota direta/Markdown/retorno | cd6059c |
| T09 — responsividade/a11y | T05–T08 | RF-15/16 | Larguras, teclado, axe | fedc217 |
| T10 — testes | T02–T09 | RF-13/14 e fluxos | 31 Vitest/11 E2E | 164371c |
| T11 — documentação/evidências | T01–T10 | Entrega/IA | Docs/screenshots/roteiro | 55bf0a6 |
| T12 — publicação | T10–T11, autenticação | Entrega | Build e URL real | 4ac179e; Vercel READY; produção testada |
| T13 — auditoria final | Todas | Rubrica | Repetir validações e matriz | validacao-final.txt/json; RELATORIO_FINAL.md; hash disponível no histórico após commit |

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
