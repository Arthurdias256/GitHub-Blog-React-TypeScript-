# PRD — GitHub Blog

**Status: levantamento oficial recuperado; implementação autorizada.** Esta revisão substitui o bloqueio inicial abaixo, mantido como histórico. Fonte primária: Notion, seções 1–14 lidas por rolagem no navegador MCP durante a continuação.

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

## Histórico da revisão inicial (superado onde indicado)

## Identificação e contexto verificados
Projeto individual de recuperação da disciplina Single Page Application (SPA). Objetivo: transformar issues de um repositório público em publicações de um blog, exibindo o perfil do autor, catálogo, busca com paginação e leitura em rota própria sem recarregar a aplicação.

O trecho acessível do Notion exige React, TypeScript, Tailwind CSS, Axios, React Router, OpenCode, PRD_SPEC, TECH_SPEC e TASKS_SPEC. A entrega inclui repositório público, aplicação publicada e apresentação/demonstração individual.

A aprovação exige nota estritamente maior que 7,0 (mínimo 7,1 com uma casa decimal) **e** condições mínimas da seção 13. Essa seção não foi acessada. Não é possível avaliar aprovação ou estimar nota.

## Escopo inicial solicitado pelo usuário — ainda não confrontado integralmente com o Notion
- RF-01: perfil público real, com tratamento de campos opcionais.
- RF-02: listagem real de issues sem pull requests.
- RF-03: busca restrita ao repositório, contagem, estados vazios e erros.
- RF-04: paginação real integrada à busca; modelo oficial pendente.
- RF-05: detalhes em rota própria, acesso direto e link para a issue.
- RF-06: Markdown seguro, incluindo tabelas e código.
- RF-07: React Router, página não encontrada e preservação da consulta.
- RF-08: carregamento, falhas, rate limit e possibilidade de nova tentativa.
- RNF-01: fidelidade ao Figma, responsividade e acessibilidade verificadas.
- RNF-02: TypeScript estrito, testes isolados da API e lint/build válidos.
- RNF-03: ausência de segredos no cliente e no histórico.
- RNF-04: documentação, evidências reais, versionamento incremental e publicação verificável.

## Histórias iniciais e aceitação provisória
Como leitor, quero pesquisar publicações, navegar pelos resultados e ler um post completo. Aceitação inicial: consultar API real, excluir PRs, reiniciar a página ao alterar a busca, abrir detalhes diretamente pela URL e apresentar mensagens compreensíveis em falhas. Esses critérios vêm do pedido, não constituem transcrição da rubrica oficial.

## Matriz de rastreabilidade oficial — parcial
| Critério verificável | Pontuação oficial | Implementação | Arquivo | Teste | Evidência | Status |
|---|---|---|---|---|---|---|
| Perfil, catálogo, busca paginada e rota de leitura | Não acessível | Não iniciada | — | Não executado | docs/evidencias/ACESSO_INICIAL.md | Não atendido |
| Documentos PRD_SPEC, TECH_SPEC e TASKS_SPEC | Não acessível | Rascunhos com bloqueios | Arquivos SPEC na raiz | Revisão documental | Documentos existentes | Parcialmente atendido |
| Repositório público, publicação e apresentação individual | Não acessível | Não verificadas nesta etapa | — | Não executado | Trecho inicial do Notion | Não verificável |
| Condições mínimas da seção 13 e rubrica completa | Não acessível | Aguardando fonte | — | — | Registro de acesso parcial | Não verificável |

## Pendências indispensáveis
Exportação integral do Notion, incluindo subpáginas, rubrica, seção 13 e instruções de entrega; inspeção técnica completa do Figma; resolução da divergência entre remote existente e conta sugerida. Público-alvo detalhado, regras de negócio específicas, critérios eliminatórios e quantidade oficial de testes ainda não verificados.

## Referências
- https://app.notion.com/p/422dfca74d8d81e194e9dc0aa13ca6f0
- https://www.figma.com/design/UklolDw90CmcDAj9piQVUJ/GitHub-Blog--Community---Copy-?node-id=2-1297
- Pedido inicial do usuário nesta sessão (fonte secundária).
