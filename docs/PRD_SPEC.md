# PRD — GitHub Blog

**Status: requisitos oficiais mapeados; aplicação implementada, testada e publicada.** Fonte primária: Notion, seções 1–14 lidas por rolagem no navegador MCP durante a continuação. Diagnóstico inicial preservado em evidencias/ACESSO_INICIAL.md. Aprovação/apresentação e fidelidade visual exata não são garantidas.

## Requisitos oficiais (IDs do Notion)
Transcrição da tabela da seção 3, relida na auditoria. `:issueNumber` no código é equivalente ao nome de parâmetro `:number` do enunciado.

| ID | Requisito funcional oficial | Critério de aceite verificável oficial |
|---|---|---|
| RF-01 | Consumir o perfil via GET /users/{username} | Dados reais do usuário configurado aparecem na Home. |
| RF-02 | Exibir avatar, nome, bio, @username, seguidores e link de perfil | Todos os elementos existentes na resposta aparecem corretamente; campos nulos têm fallback. |
| RF-03 | Criar repositório público para o blog e cadastrar suas issues | O repositório do próprio aluno está público e contém ao menos 10 issues autorais, com títulos e conteúdo Markdown pertinente. |
| RF-04 | Listar issues mais recentes na Home quando a busca estiver vazia | Posts reais são exibidos em ordem decrescente de criação, incluindo issues abertas e fechadas conforme estratégia documentada. |
| RF-05 | Implementar busca textual utilizando a Search API do GitHub | Digitar um termo e confirmar a busca retorna resultados do repositório; a pesquisa consulta a API, não apenas uma lista local. |
| RF-06 | Implementar debounce na busca (sugestão: 400–600 ms) | A API não é chamada a cada tecla imediatamente; nova busca reinicia na página 1. |
| RF-07 | Implementar paginação de posts e resultados | Controles Anterior/Próxima (ou equivalentes) funcionam; usar per_page menor que 10 para comprovar múltiplas páginas. |
| RF-08 | Exibir cards de issues | Cada card contém título, data relativa, resumo do corpo e número de comentários (ou outros metadados úteis). |
| RF-09 | Abrir detalhes em rota dinâmica /post/:number | Clicar em um card navega para a URL da issue correta, sem reload completo. |
| RF-10 | Consultar a issue completa via GET /repos/{owner}/{repo}/issues/{number} | O detalhe é obtido por requisição individual, inclusive ao acessar a URL diretamente. |
| RF-11 | Renderizar o corpo do post em Markdown | Títulos, listas, links e blocos de código Markdown são apresentados corretamente (por exemplo, react-markdown). |
| RF-12 | Exibir cabeçalho detalhado e navegação de retorno | Título, autor, data, comentários, link “Ver no GitHub” e ação “Voltar” aparecem e funcionam. |
| RF-13 | Tratar loading, erro HTTP e resultados vazios | Cada consulta apresenta estados claros de carregando, falha, nenhum resultado ou sucesso; disponibilizar ação “Tentar novamente”. |
| RF-14 | Tratar limite de requisições da API | Respostas 403/429 por limite de API recebem mensagem compreensível; evitar chamadas repetitivas e permitir nova tentativa quando apropriado. |
| RF-15 | Implementar interface responsiva com Tailwind | Home e detalhe utilizáveis em celular, tablet e desktop, sem rolagem horizontal indevida. |
| RF-16 | Garantir acessibilidade e navegação SPA | Links/botões com nomes acessíveis, labels de busca, foco visível, contraste e rota inválida/404 tratada. |

### Regras oficiais RN-01 a RN-10
- **RN-01:** perfil/publicações da API GitHub; dados fixos não substituem chamadas obrigatórias.
- **RN-02:** repositório público do aluno com pelo menos dez issues e conteúdo para busca/paginação.
- **RN-03:** apenas issues; incluir is:issue ou equivalente para evitar PR.
- **RN-04:** busca vazia mostra recentes decrescentes; endpoint de issues com state=all e filtro de PR ou Search API equivalente. Busca textual exige Search API.
- **RN-05:** paginação real via page/per_page; sem fatiar apenas os primeiros resultados; indicar controles indisponíveis.
- **RN-06:** remover espaços excedentes e usar params Axios ou encodeURIComponent, sem concatenação insegura.
- **RN-07:** resumo legível sem blocos longos de Markdown cru, fallback de conteúdo ausente e links Markdown seguros.
- **RN-08:** distinguir 404, rate limit, rede e vazio; falha não pode manter loading eterno.
- **RN-09:** não publicar tokens em código/README/repositório/VITE_*; SPA sem token, autenticação extra somente por backend/proxy seguro.
- **RN-10:** centralizar username/repo em configuração pública ou módulo, sem valores espalhados na interface.

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

Auditoria complementar RF-09/11/16: logotipo deve efetivamente retornar ao catálogo sem restaurar consulta obsoleta; headings do corpo devem começar abaixo do h1 do post, sem saltos. Casos reproduzidos, corrigidos e cobertos por regressões, sem alterar o escopo do produto.

RF-02/16: exibir prefixo @ do identificador e garantir contraste do contorno de busca. Ajuste limitado à borda azul-acinzentada do campo para atingir 3:1 entre superfícies adjacentes, mantendo identidade e layout.

RF-08/09/16: o card mantém clique em toda a área, mas o nome de seu link corresponde ao título visível; resumo/metadados permanecem conteúdo do artigo. Ajuste semântico após achado real de label-content-name-mismatch, não nova funcionalidade.

## Pendências da entrega acadêmica
Conferir datas/regras complementares no Blackboard, enviar links e apresentar pessoalmente. Propriedades/exports exatos do Figma permanecem limitados; as páginas Projeto e Style Guide foram vistas e capturadas. Não há seção do enunciado principal 1–14 conhecida que permaneça sem leitura após a continuação; não foram encontrados documentos relacionados de requisitos no corpo. A disciplina ancestral e o Blackboard não foram auditados como parte do enunciado.

## Referências
- https://app.notion.com/p/422dfca74d8d81e194e9dc0aa13ca6f0
- https://www.figma.com/design/UklolDw90CmcDAj9piQVUJ/GitHub-Blog--Community---Copy-?node-id=2-1297
- Pedido inicial do usuário nesta sessão (fonte secundária).
