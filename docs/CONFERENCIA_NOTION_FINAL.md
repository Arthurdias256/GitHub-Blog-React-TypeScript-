# Conferência definitiva — Notion × código × aplicação publicada

**Data da auditoria:** 25/11/2026  
**Repositório:** https://github.com/Arthurdias256/GitHub-Blog-React-TypeScript-  
**Aplicação:** https://github-blog-arthurdias256.vercel.app  
**Método:** releitura do Notion e do Figma pelo navegador; inspeção direta do código, configuração, testes, Git, API pública e app publicado. Os checkboxes de `TASKS_SPEC.md` **não** foram tratados como prova.

## Veredito curto

- **Não há requisito técnico obrigatório em falta** nos 61 itens de produto, arquitetura, interface, documentação e entrega verificáveis pelo agente.
- Dos **65 itens oficiais distintos**, **61 estão integralmente atendidos**, **2 parcialmente atendidos**, **0 não atendidos** e **2 não podem ser verificados pelo agente** (nota do professor e apresentação individual).
- Os 2 parciais são a **verificação pessoal do aluno nas evidências de IA** e a **submissão no Blackboard**. Os 2 não verificados são a **nota** e a **demonstração/explicação individual**.
- **Estimativa condicional:** **97/100 (9,7)**, com faixa conservadora plausível de **94–98**. Não é nota oficial, não garante aprovação e não substitui a apresentação.
- O CI está **bloqueado por faturamento antes de qualquer step** (`run 45660255633`); isso é um extra opcional da seção 14, **não uma condição eliminatória**.

## 1. Fontes, acesso real e limitações

| Fonte | O que foi consultado | Resultado real | Limitação |
|---|---|---|---|
| Notion oficial | Página do Projeto 06, site público `deluxe-blue-bc1.notion.site` | Seções **1–14** lidas por rolagem virtualizada (127 blocos, ~20 mil caracteres); RF-01–16, RN-01–10, APIs, stack, interface, SPEC, IA, checklist, entrega, rubrica, seção 13 e extras | O Blackboard e a página ancestral da disciplina não foram acessados |
| Figma | `node-id=0-1` (Home/Post) e `node-id=2-1297` (guia visual) | Frames e guia recapturados; estrutura, paleta, Nunito, header, perfil, grade e detalhe comparados | Sem login/exportação técnica de assets e propriedades; comparação não é pixel-perfect |
| GitHub | Repositório, issues, commits, Actions e API pública | Repositório público; 10 issues próprias; 20 commits até o commit de teste `93cb686` (21 com este relatório); lockfile versionado; Actions falha antes dos steps por faturamento | Sem token; perfil público tem 1 seguidor no momento da consulta |
| API GitHub | Users, Search API, issue individual | Perfil real, 10 itens, páginas 6+4, “React”=3, termo inexistente=0, `/post/10` HTTP 200 | API pública sujeita a rate limit; a auditoria usa sem autenticação |
| Produção | Home, busca, páginas, detalhe/reload, 404, assets, headers | HTTP 200; sem overflow em 8 larguras; axe sem violações; 13/13 E2E na suíte de produção | A URL publicada pode mudar; Vercel é externo ao repositório |
| Blackboard | Prazo, formato de envio, links a entregar | **Não acessado** | Não há data, ZIP/PDF/vídeo ou exigência inventada |
| GitHub Actions | Runs públicos | Run `45660255633` (commit `8561f3c`) falhou sem iniciar steps: “account is locked due to a billing issue” | Correção depende do proprietário da conta; não é requisito oficial |

A íntegra dos trechos determinantes do Notion está em [`evidencias/auditoria/notion-releitura-2026-11-25.md`](evidencias/auditoria/notion-releitura-2026-11-25.md). As capturas atuais do Figma estão em `evidencias/auditoria/figma-projeto-atual.png` e `figma-home-crop.png`/`figma-post-crop.png`.

## 2. Como os requisitos foram contados

Foram contados **65 itens oficiais distintos**:

| Grupo | Itens | Origem |
|---|---:|---|
| Requisitos funcionais | 16 | seção 3, RF-01 a RF-16 |
| Regras de negócio | 10 | seção 3, RN-01 a RN-10 |
| Stack, arquitetura e cuidados técnicos | 14 | seção 5 |
| Interface, responsividade e acessibilidade | 8 | seção 6 |
| Documentos obrigatórios | 4 | seção 7 |
| Evidências de IA | 2 | seção 8 |
| Entrega e repositório | 7 | seção 11 |
| Condições de aprovação | 4 | seção 13 |
| **Total** | **65** | |

O checklist da seção 10 é uma **visão de conferência**, não uma segunda pontuação; ele duplica itens já contados. A rubrica da seção 12 é uma **matriz de pesos**, também separada. Os extras da seção 14 são opcionais e **não entram** nos 65.

A coluna “Pontuação máxima” abaixo indica o critério da rubrica que avalia o item; **não se deve somar essa coluna**. A soma oficial é apenas a da seção 12.

## 3. Resultado quantitativo

| Status | Quantidade | Percentual dos 65 |
|---|---:|---:|
| **ATENDIDO** | **61** | **93,8%** |
| **PARCIALMENTE ATENDIDO** | **2** | **3,1%** |
| **NÃO ATENDIDO** | **0** | **0%** |
| **NÃO VERIFICADO** | **2** | **3,1%** |
| **NÃO APLICÁVEL** | **0** | **0%** |

Nos 61 itens técnicos/documentais (todos exceto as 4 condições finais): **60 integrais + 1 parcial** (verificação pessoal de IA). Nas 4 condições finais: **1 tecnicamente atendida + 1 parcial + 2 não verificadas**. Não existe requisito de produto “não atendido”.

## 4. Matriz completa de rastreabilidade

### 4.1 Requisitos funcionais — seção 3

| Seção do Notion | Requisito oficial | Obrigatório? | Pontuação máxima | Arquivo responsável | Evidência real | Status | Pendência |
|---|---|---|---|---|---|---|---|
| 3 / RF-01 | Perfil via `GET /users/{username}` | Sim | 10 (crit. 1) | `src/services/github.ts`, `src/config/github.ts` | `getProfile`; resposta real HTTP 200 para `Arthurdias256` | ATENDIDO | Nenhuma |
| 3 / RF-02 | Avatar, nome, bio, @username, seguidores e link | Sim | 10 (crit. 1) | `src/components/ProfileCard.tsx` | Campos reais; fallback para bio/nome; link e `(abre em nova aba)`; screenshot | ATENDIDO | Nenhuma |
| 3 / RF-03 | Repositório público com ≥10 issues autorais em Markdown | Sim | 15 (crit. 2) | GitHub + issues | Repositório público; 10 issues de Arthurdias256, 1.063–1.225 caracteres, Markdown/código | ATENDIDO | Revisão pessoal do aluno recomendada |
| 3 / RF-04 | Issues recentes na Home em ordem decrescente | Sim | 15 (crit. 2) | `src/services/github.ts`, `src/pages/Home.tsx` | `sort=created&order=desc`; API real 10 itens; páginas 6+4 | ATENDIDO | Dataset atual tem 10 abertas e 0 fechadas; a consulta não filtra estado |
| 3 / RF-05 | Busca textual com GitHub Search API | Sim | 15 (crit. 3) | `src/services/github.ts` | `/search/issues` real; “React”=3; resposta antiga é abortada | ATENDIDO | Nenhuma |
| 3 / RF-06 | Debounce de 400–600 ms e reset para página 1 | Sim | 15 (crit. 3) | `src/pages/Home.tsx` | 500 ms; `setParams({q})` remove `page`; teste de debounce | ATENDIDO | Nenhuma |
| 3 / RF-07 | Paginação real com `page`/`per_page` <10 | Sim | 15 (crit. 3) | `src/config/github.ts`, `src/components/Pagination.tsx` | 6 por página; API real 6+4; Anterior/Próxima desabilitados nos limites | ATENDIDO | Nenhuma |
| 3 / RF-08 | Cards com título, data relativa, resumo e comentários | Sim | 15 (crit. 2) | `src/components/IssueCard.tsx` | Card real, `article`, data em pt-BR, `excerpt`, contador de comentários | ATENDIDO | Nenhuma |
| 3 / RF-09 | Detalhe em `/post/:number` sem reload | Sim | 15 (crit. 4) | `src/routes/AppRoutes.tsx`, `IssueCard.tsx` | Rota e Link SPA; E2E clica e preserva query/página | ATENDIDO | Nenhuma |
| 3 / RF-10 | Issue completa por `GET /repos/.../issues/{number}` | Sim | 15 (crit. 4) | `src/services/github.ts`, `PostDetails.tsx` | Requisição individual; `/post/10` direto HTTP 200 | ATENDIDO | Nenhuma |
| 3 / RF-11 | Markdown com títulos, listas, links e código | Sim | 15 (crit. 4) | `src/components/MarkdownContent.tsx` | GFM, tabela, bloco de código, imagem e links seguros na issue #10 | ATENDIDO | Nenhuma |
| 3 / RF-12 | Cabeçalho detalhado, GitHub e voltar | Sim | 15 (crit. 4) | `src/pages/PostDetails.tsx` | Título, autor, data, comentários, link externo e “Voltar” | ATENDIDO | Nenhuma |
| 3 / RF-13 | Loading, erro HTTP, vazio e retry | Sim | 5 (crit. 7) | `src/components/States.tsx`, `Home.tsx` | Estados com `role=status`/`alert`, retry e teste de 404/500/vazio | ATENDIDO | Nenhuma |
| 3 / RF-14 | 403/429 de rate limit com mensagem e retry | Sim | 5 (crit. 7) | `src/services/api.ts`, `States.tsx` | `ApiError` distingue rate limit, usa `Retry-After`/reset e espera antes do retry | ATENDIDO | Nenhuma |
| 3 / RF-15 | Interface responsiva com Tailwind | Sim | 10 (crit. 6) | `src/styles/global.css`, componentes | 8 larguras, 16 combinações Home/detalhe sem overflow | ATENDIDO | Nenhuma |
| 3 / RF-16 | Acessibilidade, navegação SPA e 404 | Sim | 10 (crit. 6) | componentes, CSS, rotas | Labels/alt/foco, `axe` completo sem violações, 404 com retorno | ATENDIDO | Nenhuma |

### 4.2 Regras de negócio — seção 3

| Seção do Notion | Requisito oficial | Obrigatório? | Pontuação máxima | Arquivo responsável | Evidência real | Status | Pendência |
|---|---|---|---|---|---|---|---|
| 3 / RN-01 | Dados reais da API; fixtures não substituem | Sim | Transversal (crit. 1–4) | `src/services/github.ts` | Produção consulta `/users` e `/search/issues`; fixtures apenas em testes | ATENDIDO | Nenhuma |
| 3 / RN-02 | Repositório do aluno com ≥10 issues de conteúdo | Sim | 15 (crit. 2) | GitHub | 10 issues reais, Markdown e código; API e app confirmam | ATENDIDO | Revisão pessoal recomendada |
| 3 / RN-03 | Apenas issues; excluir pull requests | Sim | 15 (crit. 3) | `src/services/github.ts` | `is:issue` na consulta e filtro defensivo de `pull_request` | ATENDIDO | Nenhuma |
| 3 / RN-04 | Busca vazia usa lista/consulta equivalente | Sim | 15 (crit. 3) | `src/services/github.ts` | Search API com `repo:... is:issue`; sem filtro de estado; estratégia documentada | ATENDIDO | 0 issues fechadas no dataset; a consulta aceita ambas |
| 3 / RN-05 | Paginação real no servidor, não fatia local | Sim | 15 (crit. 3) | `src/pages/Home.tsx`, `Pagination.tsx` | `page`/`per_page=6` enviados à API; 6+4 reais; limites desabilitados | ATENDIDO | Nenhuma |
| 3 / RN-06 | Normalizar espaços e codificar a consulta | Sim | 15 (crit. 3) | `src/services/github.ts` | `normalizeSearch`, `params` do Axios, remoção de aspas/barra | ATENDIDO | Nenhuma |
| 3 / RN-07 | Resumo sem Markdown cru; conteúdo nulo; links seguros | Sim | 15 (crit. 2/4) | `src/utils/content.ts`, `MarkdownContent.tsx` | `excerpt` remove blocos/HTML; fallback de corpo; `skipHtml` e URL segura | ATENDIDO | Nenhuma |
| 3 / RN-08 | Distinguir 404, rate limit, rede e vazio; não travar | Sim | 5 (crit. 7) | `src/services/api.ts`, `useResource.ts`, `States.tsx` | `ApiError.kind`, abort, retry, estado vazio separado | ATENDIDO | Nenhuma |
| 3 / RN-09 | Sem tokens no código/README/repositório/VITE_* | Sim | 5 (crit. 9) | `.gitignore`, `src/config/github.ts`, histórico | API sem Authorization; scanner e auditoria não acharam padrões; `.env` ausente | ATENDIDO | Verificação é heurística, não prova matemática |
| 3 / RN-10 | Username/repo centralizados | Sim | 15 (crit. 5) | `src/config/github.ts` | `githubConfig` e `repositoryPath`; nenhum valor espalhado na UI | ATENDIDO | Nenhuma |

### 4.3 Stack, arquitetura e cuidados técnicos — seção 5

| Seção do Notion | Requisito oficial | Obrigatório? | Pontuação máxima | Arquivo responsável | Evidência real | Status | Pendência |
|---|---|---|---|---|---|---|---|
| 5 / stack | React + Vite + TypeScript em `.tsx` | Sim | 15 (crit. 5) | `package.json`, `tsconfig*`, `src/` | Vite 8.3.8, React 19, TS estrito, build e `tsc -b` aprovados | ATENDIDO | Nenhuma |
| 5 / stack | Tailwind CSS | Sim | 10 (crit. 6) | `src/styles/global.css` | Tokens, utilitários e classes responsivas; CSS gerado no build | ATENDIDO | Nenhuma |
| 5 / stack | Axios configurado, funções e erros/cancelamento | Sim | 15 (crit. 5) | `src/services/api.ts`, `github.ts` | Instância Axios, três funções, timeout, `ApiError`, `AbortSignal` | ATENDIDO | Nenhuma |
| 5 / stack | React Router com `/`, `/post/:number` e fallback | Sim | 15 (crit. 4) | `src/routes/AppRoutes.tsx` | Rotas e NotFound; `BrowserRouter`; rewrites da Vercel | ATENDIDO | Nenhuma |
| 5 / stack | `useState` + `useEffect` | Sim | 15 (crit. 5) | `Home.tsx`, `useResource.ts`, `States.tsx` | Busca controlada, debounce, página, assíncrono e efeitos de consulta | ATENDIDO | Nenhuma |
| 5 / stack | Props e componentes reutilizáveis | Sim | 15 (crit. 5) | `src/components/` | Props tipadas; Header/SearchInput/IssueCard/IssueList/Pagination/Estados | ATENDIDO | Nenhuma |
| 5 / stack | Pelo menos um custom Hook | Sim | 15 (crit. 5) | `src/hooks/useResource.ts` | Snapshot por chave, abort, retry e estados derivados | ATENDIDO | Nenhuma |
| 5 / stack | `react-markdown` | Sim | 15 (crit. 4) | `MarkdownContent.tsx` | ReactMarkdown + remark-gfm + plugin local de headings | ATENDIDO | Sem syntax highlighting; não exigido |
| 5 / stack | Git + GitHub, commits semânticos | Sim | 5 (crit. 9) | histórico | 20 commits até `93cb686` (19 com prefixo semântico + 1 “Initial commit” herdado); este relatório será o 21º | ATENDIDO | Não reescrever o commit inicial |
| 5 / stack | OpenCode usado e documentado | Sim | 5 (crit. 9) | `docs/AI_USAGE.md` | 6 evidências com prompt, objetivo, resultado, ajustes e validação do agente | ATENDIDO | Campo pessoal do aluno pendente |
| 5 / stack | ≥3 cenários de teste cobrindo busca, detalhe e falha | Sim | 5 (crit. 7) | `src/tests/`, `tests/e2e/` | 34 Vitest + 13 E2E = 47 cenários únicos; falhas simuladas | ATENDIDO | Nenhuma |
| 5 / arquitetura | Separar `pages/`, `components/`, `services/`, `hooks/`, `types/`, `utils/`, `config/` | Sim | 15 (crit. 5) | árvore `src/` | Todas as pastas existem; HTTP fora de `App.tsx` | ATENDIDO | Nenhuma |
| 5 / componentes | Equivalentes a ProfileCard, SearchInput, IssueCard, IssueList, Pagination, LoadingState e ErrorState | Sim | 15 (crit. 5) | `src/components/` | Todos presentes; tabela de responsabilidades em `TECH_SPEC.md` | ATENDIDO | Nenhuma |
| 5 / cuidados | Cancelar obsoletas, evitar resposta antiga, mapear HTTP, links seguros | Sim | 15 (crit. 5/7) | `useResource`, `api`, `MarkdownContent` | Abort/guard por chave; erros 404/403/429/rede; links `noopener` | ATENDIDO | Nenhuma |

### 4.4 Interface, responsividade e acessibilidade — seção 6

| Seção do Notion | Requisito oficial | Obrigatório? | Pontuação máxima | Arquivo responsável | Evidência real | Status | Pendência |
|---|---|---|---|---|---|---|---|
| 6 / Figma | Seguir o protótipo como referência | Sim | 10 (crit. 6) | `global.css`, componentes | Home/Post e guia visual recapturados; estrutura/paleta/Nunito comparadas | ATENDIDO | Assets/medidas exatas não exportados; aproximação declarada |
| 6 / identidade | Identidade consistente nas duas páginas | Sim | 10 (crit. 6) | Header/global.css | Header, perfil, busca, grade e detalhe no mesmo sistema visual | ATENDIDO | Nenhuma |
| 6 / mobile | ~375/390 px | Sim | 10 (crit. 6) | CSS/E2E | 320, 375 e 390 px sem overflow; screenshots reais | ATENDIDO | Nenhuma |
| 6 / tablet | ~768 px | Sim | 10 (crit. 6) | CSS/E2E | 768 px sem overflow; coluna adaptada | ATENDIDO | Nenhuma |
| 6 / desktop | ~1280/1440 px | Sim | 10 (crit. 6) | CSS/E2E | 1280, 1440 e 1920 px sem overflow; container de 904 px | ATENDIDO | Nenhuma |
| 6 / a11y | Foco, labels reais, links discerníveis, alt e erros acessíveis | Sim | 10 (crit. 6) | componentes/CSS | Label, alt, foco 2 px, `role=alert`, `axe` completo zero violações | ATENDIDO | Não é certificação WCAG integral |
| 6 / conteúdo | Resumo legível, data relativa em português, botão desabilitado | Sim | 10 (crit. 6) | `content.ts`, `Pagination.tsx` | `Intl.RelativeTimeFormat('pt-BR')`; resumo com “…” e `disabled` real | ATENDIDO | Nenhuma |
| 6 / rotas | GitHub externo, detalhe SPA, 404 com retorno | Sim | 10 (crit. 4/6) | Header, IssueCard, NotFound | Link externo seguro; card usa `Link`; rota inválida com retorno | ATENDIDO | Nenhuma |

### 4.5 Documentos obrigatórios — seção 7

| Seção do Notion | Requisito oficial | Obrigatório? | Pontuação máxima | Arquivo responsável | Evidência real | Status | Pendência |
|---|---|---|---|---|---|---|---|
| 7 / PRD | `docs/PRD_SPEC.md` com contexto, fluxos, RF/RN, escopo, RNF e decisões | Sim | 10 (crit. 8) | `docs/PRD_SPEC.md` | RF-01–16, RN-01–10, fluxo Home→Busca→Detalhe→Voltar, fora de escopo e aceite | ATENDIDO | Nenhuma |
| 7 / TECH | `docs/TECH_SPEC.md` com tecnologias, arquitetura, diretórios, componentes, contratos, HTTP, hooks, rotas, Markdown, a11y, testes e IDs | Sim | 10 (crit. 8) | `docs/TECH_SPEC.md` | Tabela de componentes/responsabilidades, endpoints, erros, testes e mapeamento RF/RN | ATENDIDO | Nenhuma |
| 7 / TASKS | `docs/TASKS_SPEC.md` incremental com ID, descrição, pré-requisitos, RF/RN, arquivos, pronto e status | Sim | 10 (crit. 8) | `docs/TASKS_SPEC.md` | T01–T13 e auditorias A01–A04 com colunas exigidas e commits | ATENDIDO | Atualização documental desta rodada será commitada |
| 7 / AGENTS | `AGENTS.md` na raiz com contexto, stack, links, padrão, TS, regras, consulta, qualidade, testes e commits | Sim | 10 (crit. 8) | `AGENTS.md` | Seções explícitas de stack, TS, qualidade, Git e fontes; regras de não inventar | ATENDIDO | Nenhuma |

### 4.6 Evidências de IA — seção 8

| Seção do Notion | Requisito oficial | Obrigatório? | Pontuação máxima | Arquivo responsável | Evidência real | Status | Pendência |
|---|---|---|---|---|---|---|---|
| 8 / AI-01 | `docs/AI_USAGE.md` com ≥3 evidências de OpenCode: contexto/prompt, objetivo, resultado e ajustes | Sim | 5 (crit. 9) | `docs/AI_USAGE.md` | 6 registros reais, incluindo a auditoria definitiva; prompt/objetivo/resultado/ajustes/validação do agente | ATENDIDO | Nenhuma para a estrutura |
| 8 / AI-02 | **Verificação pelo aluno** em cada evidência exigida | Sim | 5 (crit. 9) | `docs/AI_USAGE.md` | Tabela pessoal existe, mas todas as linhas estão “Pendente” | PARCIALMENTE ATENDIDO | Aluno deve executar e preencher ao menos 3 linhas; o agente não pode fabricar |

### 4.7 Entrega e repositório — seção 11

| Seção do Notion | Requisito oficial | Obrigatório? | Pontuação máxima | Arquivo responsável | Evidência real | Status | Pendência |
|---|---|---|---|---|---|---|---|
| 11 / repo | Repositório público com código e issues | Sim | 15 (crit. 2) | GitHub | `Arthurdias256/GitHub-Blog-React-TypeScript-`, `private=false`; 10 issues | ATENDIDO | Nenhuma |
| 11 / app | Aplicação publicada e demonstrável | Sim | 5 (crit. 9) | Vercel | `https://github-blog-arthurdias256.vercel.app`, Home/detalhe 200 | ATENDIDO | Nenhuma |
| 11 / docs | Código, issues e três SPEC no repositório | Sim | 10 (crit. 8) | repositório | `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASKS_SPEC.md` versionados | ATENDIDO | Nenhuma |
| 11 / README | README com proposta, Figma, stack, config, execução, scripts, arquitetura, funcionalidades, decisões e links | Sim | 5 (crit. 9) | `README.md` | Todas as seções presentes, incluindo limitações e links | ATENDIDO | Nenhuma |
| 11 / evidências | Testes e capturas de Home, busca, detalhe e mobile | Sim | 5 (crit. 7/9) | `docs/evidencias/` | Screenshots reais, logs, JSON de auditoria e screenshots de produção | ATENDIDO | Nenhuma |
| 11 / commits | Histórico de commits significativos | Sim | 5 (crit. 9) | Git | 20 commits até `93cb686`; etapas semânticas e incrementais; este relatório é o 21º | ATENDIDO | Commit inicial herdado não é reescrito |
| 11 / segurança | Não enviar `node_modules`, tokens, `.env` ou dados sensíveis | Sim | 5 (crit. 9) | `.gitignore`, histórico | Nenhum arquivo proibido versionado; scanner sem padrões; `.env` ausente | ATENDIDO | Heurística, não certificação absoluta |

### 4.8 Condições de aprovação — seção 13

| Seção do Notion | Requisito oficial | Obrigatório? | Pontuação máxima | Arquivo responsável | Evidência real | Status | Pendência |
|---|---|---|---|---|---|---|---|
| 13 / nota | Nota **maior que 7,0** (mínimo 7,1) | Sim | Eliminatória | avaliação do professor | Estimativa 97/100; **não é nota oficial** | NÃO VERIFICADO | Somente o professor pode atribuir a nota |
| 13 / fluxos | Perfil real, listagem/busca paginada e detalhe por rota com Markdown funcionando | Sim | Eliminatória | app publicado | Home, 6+4, “React”=3, `/post/10` direto; 13 E2E e API real | ATENDIDO | Demonstração pessoal está em H04 |
| 13 / entrega | Três SPEC, código e issues públicos entregues | Sim | Eliminatória | repositório + Blackboard | Documentos e links públicos; **envio ao Blackboard não comprovado** | PARCIALMENTE ATENDIDO | Aluno deve enviar os links e confirmar prazo |
| 13 / apresentação | Demonstração individual e explicação de decisões | Sim | Eliminatória | aluno | Sem evidência de apresentação realizada; roteiro em `APRESENTACAO.md` | NÃO VERIFICADO | Aluno deve demonstrar e explicar; agente não substitui |

## 5. Rubrica oficial: estimativa, não nota

| Critério oficial | Máximo | Estimativa | Fundamento observável | Reserva |
|---|---:|---:|---|---|
| Perfil e integração GitHub Users API | 10 | 10 | Perfil real, campos, nulos, loading/erro, link | Nenhuma |
| Repositório, issues, listagem e cards | 15 | 15 | 10 issues próprias, ordem, cards completos, 6+4 | Dataset sem issue fechada |
| Busca, debounce e paginação | 15 | 15 | Search API, 500 ms, reset, contador, vazio, página real | Nenhuma |
| Detalhe do post e roteamento | 15 | 15 | Rota, GET individual, Markdown/GFM, reload, retorno | Nenhuma |
| Arquitetura React, TypeScript, Axios e Hooks | 15 | 15 | Componentes, Props, tipos, services, hooks, cancelamento | Nenhuma |
| Figma, Tailwind, responsividade e acessibilidade | 10 | **8** | Estrutura/paleta/Nunito fiéis ao protótipo; 8 larguras, axe 0, teclado | Decoração do Header, ícones e medidas aproximados; sem exportação exata |
| Resiliência, testes e tratamento de erros | 5 | 5 | 47 cenários, rate limit/rede/404/vazio/retry, axe | Nenhuma |
| PRD_SPEC, TECH_SPEC, TASKS_SPEC e AGENTS.md | 10 | 10 | Coerência, rastreabilidade, tabela de componentes, checklist | Nenhuma |
| Git/GitHub, deploy, README e uso do OpenCode | 5 | **4** | Repositório, Vercel, README, 20 commits até `93cb686`, 6 evidências de IA | Verificação pessoal do aluno e apresentação ainda pendentes |
| **Total** | **100** | **97** | **9,7** | **Estimativa condicional** |

**Faixa plausível:** 94–98. O desconto de 2 pontos em Figma e 1 em Git/OpenCode é uma reserva de julgamento, não uma penalidade oficial. Não há pontos oficialmente atribuídos a CI, e o bloqueio do Actions não autoriza inventar reprovação de testes nem remover checks. Uma apresentação fraca pode reduzir o critério 9 e, mais importante, reprovar pela condição eliminatória da seção 13, independentemente da soma.

## 6. Correções, testes e arquivos desta rodada

### 6.1 O que foi realmente corrigido agora

Nenhum **código de aplicação** foi alterado nesta auditoria. As correções de app anteriores foram reconfirmadas no código e na produção: retorno pela logo sem perder a busca, headings Markdown por AST, card com Link estendido/nome acessível, contraste da borda da busca e prefixo `@username`.

Correções desta etapa:

1. A suíte e a auditoria passaram a cobrir **1280 px**, largura explicitamente citada na seção 6; agora são 13 E2E e 16 combinações página/largura.
2. A auditoria pública passou a verificar **perfil real, ordem por criação, estados aberto/fechado, arquivos gerados/segredos versionados e presença de `package-lock.json`**.
3. `TECH_SPEC.md` ganhou tabela de **componentes, Props, responsabilidades e não responsabilidades**.
4. `AGENTS.md` foi explicitado em **stack/arquitetura, convenções TypeScript, qualidade/testes e commits**.
5. `AI_USAGE.md` recebeu a evidência 6 desta auditoria e deixou de atribuir um nome de modelo não verificável; a validação pessoal continua pendente.
6. Contagens e rastreabilidade foram atualizadas para **34 Vitest + 13 E2E**, **47 cenários únicos** e **8 larguras**.
7. Foi criada esta conferência, a transcrição independente do Notion e novas capturas do Figma.

### 6.2 Testes e verificações executados

| Verificação | Resultado real |
|---|---|
| `node scripts/validate.mjs` | 11 comandos; resultado final registrado em `docs/evidencias/validacao-final.txt`/`.json` |
| `npm ci`, `npm ls vite` | Instalação limpa; Vite **8.3.8** |
| ESLint | Aprovado |
| `tsc --noEmit` + `tsc -b` | Aprovados |
| Vitest | **34/34** |
| Playwright local | **13/13** (inclui 320, 375, 390, 768, 1024, 1280, 1440, 1920) |
| Playwright contra produção | **13/13**, mesma suíte, não 13 cenários únicos extras |
| Build | Vite 8.3.8 aprovado |
| `npm audit` | Zero vulnerabilidades no momento da auditoria |
| API real | 10 issues, 6+4, React=3, vazio=0, detalhe 200, sem IDs duplicados/PR |
| Axe completo | `/` e `/post/10` sem violações nos estados auditados |
| Responsividade real | **16** combinações Home/detalhe × 8 larguras sem overflow |
| Contraste | Borda da busca 3,05:1 contra a página; foco visível 2 px; links externos 5,58:1 |
| Scanner de credenciais | Nenhum padrão encontrado; `.env` ausente; nenhum arquivo proibido versionado |
| GitHub Actions | Run `45660255633` falhou antes dos steps por faturamento; extra opcional |
| **Total único de testes** | **47** (34 Vitest + 13 E2E) |

O `npm test` usa MSW e fixtures; a auditoria pública é separada, sem token e sem mocks. A presença de fixtures no repositório de testes não significa dados fictícios em produção: o bundle publicado foi inspecionado e a auditoria acessou a API real.

### 6.3 Arquivos alterados nesta auditoria

- `tests/e2e/blog.spec.ts` — largura 1280.
- `scripts/audit-academic.mjs` — perfil, ordem, estados, arquivos proibidos e lockfile.
- `docs/TECH_SPEC.md` — componentes/responsabilidades, contratos/erros e contagens.
- `AGENTS.md` — seções normativas completas.
- `docs/AI_USAGE.md` e `docs/IA_USAGE.md` — evidência 6 e identificação honesta do modelo.
- `README.md`, `docs/APRESENTACAO.md`, `docs/AUDITORIA_FINAL.md`, `docs/ENTREGA_BLACKBOARD.md`, `docs/RELATORIO_FINAL.md`, `docs/RUBRICA.md`, `docs/TASKS_SPEC.md`, `docs/evidencias/AUDITORIA_FONTES.md` — contagens/rastreabilidade.
- `docs/evidencias/auditoria/notion-releitura-2026-11-25.md` — transcrição independente.
- `docs/evidencias/auditoria/figma-projeto-atual.png`, `figma-home-crop.png`, `figma-post-crop.png` — Figma recapturado.
- `docs/CONFERENCIA_NOTION_FINAL.md` — este relatório.

### 6.4 Commits

Os commits reais desta rodada são:

- `93cb686` — `test: amplia validacao responsiva e auditoria publica` (testes/script, auditoria pública com 20 commits).
- `docs: atualiza rastreabilidade e registra conferencia definitiva` — **este commit documental**, que inclui este relatório, a transcrição do Notion, as capturas do Figma e as evidências finais. O hash final deve ser conferido em `git log -1` após o push.

O histórico total passa a **21 commits**, sendo 20 com prefixo semântico e o `Initial commit` herdado. Nenhum histórico foi reescrito.

## 7. Pendências por prioridade

### Crítica — impede declarar aprovação ou demonstrar autoria
1. **Preencher a verificação pessoal de IA** em `docs/AI_USAGE.md` (pelo menos 3 linhas da tabela, com data, ação e resultado reais). O agente não pode inventar.
2. **Revisar as 10 issues e o código** para conseguir explicar decisões; a seção 13 exige demonstração individual.
3. **Entregar no Blackboard** o link do repositório e o da aplicação no prazo real; o agente não acessou a data/formato.
4. **Apresentar os três fluxos** e explicar componentes, Props, Hooks, HTTP, rotas, TypeScript e SPEC.

### Alta — reduz risco de perda na rubrica
1. Ensaiar a demonstração com o roteiro de `APRESENTACAO.md`, incluindo busca/paginação e `/post/10` direto.
2. Conferir que a conta GitHub está acessível e que as issues continuam públicas; o perfil real mudou para 1 seguidor, portanto não usar números antigos de screenshot como argumento.
3. Se quiser CI verde, resolver o faturamento da conta; **não** remover o workflow, mascarar a falha ou alterar a cobrança sem autorização. CI continua opcional.

### Média — melhoria de fidelidade ou evidência
1. Aproximar a decoração do Header, ícones e detalhes tipográficos do Figma, se houver tempo; não é requisito de pixel-perfect.
2. Opcionalmente, criar uma issue fechada ou documentar melhor que a consulta não filtra estado; hoje há 10 abertas e 0 fechadas.
3. Avaliar syntax highlighting no Markdown; o Figma sugere destaque, mas o requisito só exige blocos de código legíveis.
4. Reexecutar auditoria após qualquer alteração de app e republicar na Vercel; nesta rodada não houve alteração de app, logo não houve novo deploy.

### Baixa — opcional
1. Exportar propriedades/assets exatos do Figma, se a conta permitir.
2. Implementar extras da seção 14 (filtros/labels, skeleton/cache, tema, sumário), sem contar como compensação.
3. Limpar documentos históricos duplicados (`IA_USAGE.md` vs `AI_USAGE.md`) somente se isso não apagar o registro inicial; hoje ambos são preservados.
4. Resolver alerta de depreciação do ESLint 9 e aviso de CLI/npm; não afetam o build.

## 8. Condições eliminatórias e mínimos

| Condição oficial | Situação | Evidência/limite |
|---|---|---|
| Nota >7,0 (mínimo 7,1) | **NÃO VERIFICADA** | Estimativa 97/100 é do agente; somente o professor atribui nota |
| Três fluxos centrais funcionando | **ATENDIDO tecnicamente** | Perfil real, busca paginada, detalhe `/post/10`; demonstração pessoal pendente |
| Três SPEC + código/issues públicos | **PARCIALMENTE ATENDIDO** | Tudo está público; envio ao Blackboard não comprovado |
| Demonstração/explicação individual | **NÃO VERIFICADA** | Sem evidência de apresentação; é ação exclusiva do aluno |
| 7,0 não aprova | Confirmado | A página oficial exige 7,1 no mínimo (71/100) |
| Telas estáticas ou dados fictícios não comprovam | Confirmado | App consulta API real; fixtures só em testes; auditoria sem mocks |
| ≥10 issues | **10** | 10 issues reais de Arthurdias256, Markdown/código |
| ≥3 cenários de teste | **47** | 34 Vitest + 13 E2E; cobre busca, detalhe e falhas |
| Evidências de IA | **6 registros** | Estrutura completa; validação do aluno parcial |
| Commits significativos | **19** | 18 semânticos + “Initial commit” herdado; sem reescrita |
| CI | **Opcional** | Seção 14, extra; workflow existe, mas conta bloqueada por faturamento |

**CI é realmente opcional?** Sim. O texto o coloca em “Desafios extras — opcionais, sem substituir requisitos”. Não há pontuação, condição eliminatória ou desconto oficial previsto por CI. A falha do runner é relatada, não escondida.

**Nota mínima:** 7,1 (71/100); **nota máxima:** 100 (10,0). A estimativa de 97 é condicional e não garante aprovação.

## 9. Checklist final de entrega

### Já comprovado tecnicamente
- [x] Repositório público, código e 10 issues próprias.
- [x] Perfil real, listagem 6+4, busca Search API, debounce e paginação.
- [x] Detalhe por rota, GET individual, Markdown/GFM, reload e retorno.
- [x] Loading, erro, vazio, 404, rate limit e retry.
- [x] `PRD_SPEC`, `TECH_SPEC`, `TASKS_SPEC`, `AGENTS.md`, `AI_USAGE.md` e README.
- [x] 34 Vitest + 13 E2E, lint, tipos, build, API real, axe, 8 larguras e `npm audit`.
- [x] Vercel publicada e verificada; headers de segurança presentes.
- [x] Nenhum token, `.env` ou `node_modules` versionado; lockfile presente.
- [x] Nenhum requisito técnico obrigatório não atendido.

### Ações do aluno — ainda abertas
- [ ] Preencher pelo menos 3 verificações pessoais em `docs/AI_USAGE.md`.
- [ ] Revisar as 10 issues e o código para explicar decisões.
- [ ] Conferir data, formato e links no Blackboard e **entregar**.
- [ ] Demonstrar individualmente perfil, busca/paginação e detalhe/Markdown.
- [ ] Confirmar a nota com o professor; não tratar 97 como nota oficial.
- [ ] Opcional: resolver faturamento do GitHub Actions ou aceitar CI vermelho documentado.
- [ ] Se alterar o app, repetir testes, commit/push e novo deploy na Vercel.

## 10. Respostas objetivas às 11 perguntas da solicitação

1. **Seções do Notion consultadas:** 1–14, integralmente, por leitura real do conteúdo virtualizado; nenhuma seção do enunciado ficou inacessível. Blackboard e página ancestral da disciplina não foram acessados.
2. **Quantidade de requisitos oficiais:** 65 itens distintos; 61 atendidos, 2 parciais, 0 não atendidos e 2 não verificáveis pelo agente. Se contarmos só os 61 artefatos técnicos: 60 integrais e 1 parcial.
3. **Requisitos obrigatórios ainda não atendidos:** nenhum requisito técnico de produto. Parciais: verificação pessoal de IA (`AI_USAGE`) e envio ao Blackboard. Não verificados: nota e demonstração individual.
4. **Correções feitas:** 1280 px na suíte/auditoria, auditoria de perfil/ordem/estado/arquivos proibidos, tabela de componentes no TECH, AGENTS explícito, evidência 6 de IA, contagens e transcrição do Notion. Nenhum código de aplicação mudou nesta rodada; as cinco correções de app anteriores foram reconfirmadas.
5. **Arquivos alterados:** listados na seção 6.3, incluindo testes, script, SPEC, AGENTS, README, evidências e este relatório.
6. **Testes executados:** `validate.mjs` com 11 comandos; 34 Vitest, 13 E2E locais, 13 E2E em produção, lint, TS, build, API real, axe, 16 combinações de largura, `npm audit` e scanner de credenciais.
7. **Commits:** `93cb686` (`test: amplia validacao responsiva e auditoria publica`) e o commit documental `docs: atualiza rastreabilidade e registra conferencia definitiva`, que contém este relatório; total de 21 commits. Hash do HEAD final no `git log -1` remoto.
8. **Pontuação estimada:** 97/100 (9,7), faixa 94–98, condicional; não é nota oficial.
9. **Riscos de desconto:** Figma sem exportação exata (reserva de 2), validação pessoal de IA/demonstração (reserva de 1), possível exigência de issue fechada, explicação fraca na apresentação e nota do professor. CI não tem desconto oficial.
10. **Condições eliminatórias:** três fluxos e artefatos públicos estão tecnicamente comprovados; nota, envio ao Blackboard e demonstração individual não estão comprovados. Portanto **não é possível declarar aprovação**.
11. **O que falta para entregar:** preencher a validação pessoal de IA, revisar/explicar o projeto, enviar os links no Blackboard e realizar a demonstração. O agente não pode fazer essas etapas pelo aluno.

## 11. Conclusão

O projeto está tecnicamente completo e acima do mínimo de 71/100 na estimativa, com margem ampla. A entrega ainda **não pode ser chamada de aprovada**: faltam ações pessoais do aluno e não há acesso ao Blackboard nem à nota do professor. A recomendação é concluir as quatro pendências críticas, ensaiar a demonstração e manter este relatório como registro honesto do que foi verificado e do que permanece sob responsabilidade do aluno.
