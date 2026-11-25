# PRD — GitHub Blog

**Status: requisitos oficiais mapeados; aplicação implementada, testada e publicada.** Fonte primária: Notion, seções 1–14 lidas por rolagem no navegador MCP durante a continuação. Diagnóstico inicial preservado em evidencias/ACESSO_INICIAL.md. Aprovação/apresentação e fidelidade visual exata não são garantidas.

## Requisitos oficiais (IDs do Notion)
| ID | Requisito e aceite |
|---|---|
| RF-01 | GET /users/{username}; perfil real na Home |
| RF-02 | Avatar, nome, bio, username, seguidores e link; fallback para nulos |
| RF-03 | Repositório público do aluno com ao menos 10 issues autorais Markdown |
| RF-04 | Últimas issues por criação decrescente; abertas e fechadas |
| RF-05 | Busca textual na Search API, restrita ao repositório |
| RF-06 | Debounce (sugestão 400–600ms), reset da página na nova busca |
| RF-07 | Paginação por page/per_page, per_page < 10, anterior/próxima desabilitáveis |
| RF-08 | Cards com título, data relativa, resumo e comentários |
| RF-09 | Navegação SPA /post/:number |
| RF-10 | Requisição individual de issue, inclusive acesso direto |
| RF-11 | Markdown com títulos, listas, links e código |
| RF-12 | Título, autor, data, comentários, GitHub e Voltar no detalhe |
| RF-13 | Loading, erro, vazio e retry por consulta |
| RF-14 | Rate limit 403/429 com mensagem, sem repetição automática |
| RF-15 | Tailwind responsivo, sem overflow indevido |
| RF-16 | Labels, foco, nomes acessíveis, contraste e 404 |

### Regras oficiais RN-01 a RN-10
1. Somente dados reais da API em produção.
2. Repositório do aluno e dez issues originais.
3. Apenas issues, usar is:issue na busca.
4. Busca vazia lista recentes; Search API equivalente é permitida.
5. Paginação real no servidor, sem fatias locais.
6. Normalizar espaços e usar params Axios/encoding seguro.
7. Resumo legível sem Markdown cru; fallback para corpo vazio; links seguros.
8. Distinguir 404, rate limit, rede e vazio; não carregar indefinidamente.
9. Sem tokens no cliente, README ou VITE_*; autenticação não obrigatória.
10. Configuração de usuário/repositório centralizada.

## Rubrica oficial (100 pontos)
| Critério | Pontos |
|---|---:|
| Perfil e integração GitHub Users API | 10 |
| Repositório, issues, listagem e cards | 15 |
| Busca, debounce e paginação | 15 |
| Detalhe do post e roteamento | 15 |
| Arquitetura React, TypeScript, Axios e Hooks | 15 |
| Figma, Tailwind, responsividade e acessibilidade | 10 |
| Resiliência, testes e tratamento de erros | 5 |
| PRD_SPEC, TECH_SPEC, TASKS_SPEC e AGENTS.md | 10 |
| Git/GitHub, deploy, README e uso do OpenCode | 5 |

Seção 13: mínimo 71/100, os três fluxos reais funcionando (perfil; listagem/busca paginada; detalhe/Markdown), SPEC/código/repositório de issues públicos e demonstração individual com explicação. Falhar uma condição mínima impede aprovação independentemente da soma. Nota atribuída pelo professor.

### Entregas oficiais e complementares
Oficiais: SPEC em docs/, AGENTS na raiz, docs/AI_USAGE.md com três evidências (contexto, objetivo, resultado, ajustes, validação pelo aluno); mínimo três cenários de teste (busca/paginação, detalhe, falha); screenshots Home/busca/detalhe/mobile; README; deploy público; links no Blackboard. Data/prazo apenas no Blackboard (não acessado). Sem backend, banco, login ou editor obrigatórios. Extras opcionais não substituem requisitos.

Complementares do usuário: Vite 8, Vitest/Testing Library/Playwright, larguras 320–1920, GFM, evidências adicionais e Vercel preferencial. Decisão: seis itens/página; Search API para busca vazia e preenchida; autor/repo Arthurdias256/GitHub-Blog-React-TypeScript-.

## Identificação, problema e solução
Projeto individual de recuperação de Single Page Application (SPA). Problema: disponibilizar conteúdo técnico do aluno com navegação, pesquisa e leitura acessível sem manter backend editorial. Solução: perfil público GitHub + issues como publicações numa SPA. Objetivo acadêmico: demonstrar componentes/Props, estados/efeitos, custom Hook, TypeScript, HTTP, rotas, documentação, testes e explicação individual.

Público-alvo adotado como decisão de produto: leitores de conteúdo técnico e professor avaliador. Fluxo principal: Home → pesquisar → paginar → abrir detalhe → voltar preservando consulta/página. Fora de escopo: login, banco, edição/criação de posts pela UI, comentários interativos, temas adicionais e filtros extras. Issues criadas apenas administrativamente na conta autorizada.

## Requisitos não funcionais adotados
- RNF-01: identidade do Figma e layout utilizável de 320 a 1920px; aproximações registradas, sem afirmar pixel-perfect.
- RNF-02: TypeScript estrito, separação pages/components/services/hooks/types/utils/config e validação lint/build.
- RNF-03: sem segredos no cliente/histórico, Markdown seguro e links externos protegidos.
- RNF-04: mensagens acessíveis, foco/teclado, alt/labels e testes axe como evidência parcial, sem prometer certificação WCAG.
- RNF-05: testes reproduzíveis sem depender do GitHub, integração real separada e lockfile versionado.
- RNF-06: README, SPEC, IA, commits incrementais, screenshots reais, deployment e roteiro de apresentação.

## Histórias e aceitação
| História | Aceite | Requisitos |
|---|---|---|
| Como leitor, quero conhecer o autor | Perfil vindo da Users API, campos nulos legíveis | RF-01/02 |
| Quero explorar publicações reais recentes | Dez issues próprias, seis por página, sem PR, título/resumo/data/comentários | RF-03/04/07/08 |
| Quero encontrar um assunto | Search API com escopo fixo, debounce 500ms, nova consulta página 1, contador/vazio | RF-05/06/07 |
| Quero compartilhar e ler um post | Rota individual funciona diretamente/reload, Markdown completo e retorno | RF-09/10/11/12 |
| Quero me recuperar de falhas | Loading termina, erro contextual, retry sem repetição automática e rate limit | RF-13/14 |
| Quero usar celular/teclado | Sem overflow indevido, foco e nomes/labels acessíveis | RF-15/16 |

## Rastreabilidade e aprovação
Matriz oficial completa com pontuação, arquivos, testes, evidências e status: [RUBRICA.md](RUBRICA.md). Testes: src/tests/app.test.tsx, src/tests/utils.test.ts e tests/e2e/blog.spec.ts. Implementações/decisões: TECH_SPEC.md. Commits/checklist: TASKS_SPEC.md. A nota final e a apresentação individual não podem ser atestadas pelo agente.

## Pendências da entrega acadêmica
Conferir datas/regras complementares no Blackboard, enviar links e apresentar pessoalmente. Propriedades/exports exatos do Figma permanecem limitados; as páginas Projeto e Style Guide foram vistas e capturadas. Não há seção do enunciado principal 1–14 conhecida que permaneça sem leitura após a continuação; não foram encontrados documentos relacionados de requisitos no corpo. A disciplina ancestral e o Blackboard não foram auditados como parte do enunciado.

## Referências
- https://app.notion.com/p/422dfca74d8d81e194e9dc0aa13ca6f0
- https://www.figma.com/design/UklolDw90CmcDAj9piQVUJ/GitHub-Blog--Community---Copy-?node-id=2-1297
- Pedido inicial do usuário nesta sessão (fonte secundária).
