# TASKS SPEC — acompanhamento

Status de continuação: **implementação autorizada; T01 documentada**. Notion seções 1–14 recuperadas pela rolagem, rubrica e seção 13 transcritas no PRD. Repositório Arthurdias256 confirmado pelo usuário. Figma visualmente consultado; medidas exatas/assets ainda limitados. Histórico anterior abaixo preservado para auditoria e superado por esta revisão.

## Execução atual
- [x] T01: requisitos oficiais, rubrica, planejamento e orientações registrados antes do código.
- [x] T02: setup Vite 8.3.8 e ferramentas; npm ls vite, lint e build (inclui tsc -b) aprovados no scaffold. T01: 10fa708.
- [x] T03: tokens, Nunito local, Header e estilos compartilhados; validação técnica lint/build. Fidelidade pixel-perfect não afirmada.
- [x] T04: serviços GitHub, tipagens, cancelamento e erros; permissão pública/autenticada verificada (testes de serviços em T10). Primeira compilação falhou TS1294 por parameter properties com erasableSyntaxOnly; corrigidas para propriedades explícitas, sem relaxar TypeScript. O commit efc1077 foi criado indevidamente após a falha por comandos PowerShell não interromperem automaticamente; correção e nova validação registradas no commit seguinte.
- [x] T05: ProfileCard integrado ao endpoint real; campos opcionais, loading e retry. Lint/build aprovados; integração real auditada em T10.
- [ ] T06: IssueCard/IssueList.
- [ ] T07: busca e paginação.
- [ ] T08: detalhes e Markdown.
- [ ] T09: responsividade/acessibilidade.
- [ ] T10: suíte automatizada.
- [ ] T11: documentação final e evidências.
- [ ] T12: build, CI e deploy quando autenticado.
- [ ] T13: auditoria final.

| Tarefa | Dependências | Requisitos | Critério de conclusão / teste | Evidência / situação |
|---|---|---|---|---|
| T01 — análise oficial e SPEC | Exportação integral e Figma inspecionável | Todos | Fontes lidas, rubrica e critérios rastreados | Parcial: inspeção local e rascunhos; acesso incompleto |
| T02 — configuração | T01 | Stack obrigatória | Vite 8 confirmado, instalações e lint | Pendente |
| T03 — identidade visual | T01–T02 | RNF-01 | Tokens extraídos e comparação visual | Pendente |
| T04 — API GitHub | T02 | RF-01–RF-08 | Serviços tipados e testes de falha | Pendente |
| T05 — perfil | T03–T04 | RF-01 | Dados reais e estados testados | Pendente |
| T06 — publicações | T03–T04 | RF-02 | Issues reais sem PRs | Pendente |
| T07 — busca/paginação | T06 | RF-03–RF-04 | Modelo oficial e testes de concorrência | Pendente |
| T08 — detalhes/Markdown | T04, T06 | RF-05–RF-07 | Acesso direto, Markdown e retorno testados | Pendente |
| T09 — responsividade/a11y | T05–T08 | RNF-01 | Larguras, teclado e auditoria documentados | Pendente |
| T10 — testes | T02–T09 | RNF-02 | Suíte real executada e resultados salvos | Pendente |
| T11 — documentação/evidências | T01–T10 | RNF-04 | README, SPEC, screenshots e roteiro reais | Pendente |
| T12 — publicação | T10–T11, autenticação | RNF-03–RNF-04 | Build e URL pública verificados | Pendente |
| T13 — auditoria final | Todas | Rubrica oficial | Matriz completa e validações repetidas | Pendente |

- [x] Inspecionar pasta e preservar README/remote existentes.
- [x] Buscar ferramentas MCP específicas e recursos disponíveis: nenhum para Notion/Figma encontrado.
- [x] Tentar HTTP e navegador MCP nas referências.
- [x] Registrar o acesso parcial e preparar rascunhos SPEC.
- [ ] Ler integralmente Notion, rubrica, seção 13 e subpáginas.
- [ ] Extrair tokens, assets e estados do Figma.
- [ ] Confirmar conta/repositório definitivo antes de publicar ou criar issues.
- [ ] Concluir T01 e realizar seu commit de conclusão.
- [ ] Implementar e validar T02–T13.

## Verificações reais desta etapa
`git status --short --branch`: main...origin/main, inicialmente limpo. `git remote -v`: remote Arthurdias256. Leitura do README: título único. Não executados testes, lint, TypeScript ou build: projeto npm ainda inexistente. Zero testes executados; não há resultado de aprovação/reprovação.

## Histórico
- Levantamento inicial: documentos provisórios criados; bloqueio registrado em docs/evidencias/ACESSO_INICIAL.md. Nenhum hash de commit de conclusão de etapa disponível.
