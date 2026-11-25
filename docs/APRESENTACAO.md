# Apresentação individual — roteiro didático

## Preparação
Revise este roteiro, os arquivos citados e as dez issues. Execute `npm ci`, `npm run dev` e `npm run test`. Abra a aplicação com rede disponível. Não afirme que domina um trecho sem estudá-lo: uso do OpenCode é permitido, mas explicar o trabalho é condição mínima. Confira prazo/data no Blackboard e entregue os links reais do README.

## Demonstração sugerida (8–12 minutos, duração não imposta pelo Notion)
1. **Objetivo:** “Este blog usa o perfil público e as issues do meu repositório GitHub. Não há banco ou backend próprio”. Mostre o repositório público e as dez issues.
2. **Home:** mostre avatar/nome/bio/seguidores. Em DevTools Network, identifique GET `/users/Arthurdias256` e `/search/issues` (sem token).
3. **Posts:** mostre seis cards, datas relativas, resumo e comentários. Abra página 2 (quatro posts), depois pesquise React: página volta a 1. Limpe e tente termo sem resultado.
4. **Detalhe:** abra o post de Markdown (/post/10), mostre título/autor/data/link/tabela/código/imagem. Atualize a URL diretamente. Volte: pesquisa/página ficam na URL da listagem.
5. **Mobile/teclado:** largura 375px, percorrer com Tab, foco visível, label da busca, botões e links discerníveis. Código/tabelas têm rolagem interna.
6. **Falhas:** prefira demonstrar os testes, sem provocar rate limit real. Mostre 404 com /post/999999 e rota inválida. Falhas de rede/500/429 têm teste e retry.
7. **Qualidade:** execute scripts de lint, typecheck, test, test:e2e e build; descreva a diferença entre mocks determinísticos e integração pública real.
8. **IA e entrega:** mostre docs/AI_USAGE.md, SPEC/rubrica, histórico de commits e deployment do README; reconheça medidas aproximadas do Figma e pendências acadêmicas.

## Arquivos e conceitos para explicar
| Arquivo | Responsabilidade / conceito |
|---|---|
| src/main.tsx | Inicializa React e BrowserRouter; StrictMode em desenvolvimento |
| src/App.tsx | Header, skip link e main; não contém HTTP |
| src/routes/AppRoutes.tsx | /, /post/:issueNumber, *; lazy/Suspense, título e foco |
| src/config/github.ts | Username/owner/repository públicos e perPage=6 |
| src/types/github.ts | Interfaces do perfil, issue e resposta paginada; campos null |
| src/services/api.ts | Axios com baseURL, timeout, cabeçalhos e mapeamento de erro |
| src/services/github.ts | Parâmetros/consulta segura, chamadas e exclusão de PR |
| src/hooks/useResource.ts | Hook reutilizável: estado/snapshot, efeito, AbortController e retry |
| src/pages/Home.tsx | Busca controlada, debounce 500ms, URL q/page, contagem/paginação |
| src/components/ProfileCard.tsx | Consulta independente de perfil; fallback de campos opcionais |
| src/components/IssueCard.tsx | Props issue, resumo/data, Link com nome acessível e estado de retorno |
| src/components/SearchInput.tsx | Props value/pending/callbacks; form e label |
| src/components/Pagination.tsx | Props page/pages/disabled/onPage; controles e aria-current |
| src/pages/PostDetails.tsx | Parâmetro dinâmico e requisição individual; cabeçalho/retorno |
| src/components/MarkdownContent.tsx | Markdown/GFM, HTML ignorado e links seguros |
| src/utils/remarkHeadingOrder.ts | Normaliza níveis na árvore Markdown abaixo do h1 do post, sem alterar código |
| src/components/States.tsx | Loading/status, erro/alert, espera de rate limit e vazio |
| src/styles/global.css | Tailwind v4, @theme, Nunito e Markdown responsivo |
| src/tests/ e tests/e2e/ | Testing Library/MSW e Playwright/axe com dados exclusivos de teste |
| vercel.json | Build e fallback SPA para URLs diretas |

## Trechos essenciais
- `useResource`: a chave muda por recurso/página/tentativa. A limpeza do efeito aborta a requisição; `signal.aborted` impede atualizar com resposta obsoleta. O loading é derivado da chave, não fica preso após erro.
- `Home`: draft permite digitar imediatamente; query só muda após 500ms ou submit. Ao mudar query, page é removido da URL. `useCallback` estabiliza o loader entre renders da mesma consulta.
- `searchIssues`: `params` do Axios faz encoding; `repo:... is:issue` mantém o escopo. Busca vazia usa a mesma Search API, escolha explicitamente permitida pelo Notion. State=all é equivalente aqui porque não usamos filtro is:open/closed.
- Paginação: o GitHub recebe page/per_page; não dividimos um array local na aplicação. O total_count calcula páginas; 166 páginas de seis respeitam conservadoramente o teto 1.000 (996 acessíveis). Esse limite não afeta as dez publicações.
- Props são entradas do pai; callbacks comunicam ações. Estado contém o que muda. Efeitos sincronizam consulta externa/temporizador. Não há store global porque o problema cabe em estado local e URL.

## Possíveis perguntas
**Por que Axios?** Cliente HTTP obrigatório, centraliza headers/timeout, usa params e AbortSignal. Não usamos fetch no cliente.

**Qual diferença entre perfil e posts?** Endpoints e estados independentes; erro no perfil não bloqueia os cards.

**Como impede pull requests?** Qualificador is:issue, filtragem defensiva de pull_request e rejeição no detalhe.

**Como a URL direta funciona?** O detalhe faz sua própria consulta, sem depender da Home; a Vercel reescreve a rota para index.html e o React Router resolve a tela.

**Por que não há token VITE_GITHUB_TOKEN?** Variáveis VITE_* vão ao navegador. O cliente usa endpoints públicos. Credencial do seed é administrativa/local e nunca importada no bundle.

**Testes usam dados reais?** A suíte padrão usa fixtures/MSW/interceptação para ser reproduzível. `npm run test:api` e capturas de evidência usam a API pública real separadamente.

**A aplicação atende integralmente WCAG?** Não foi feita certificação. Há semântica, teclado, foco e axe sem violações nas páginas testadas, mas isso não comprova todos os critérios.

**Foi copiado o Figma exatamente?** A estrutura e estilo foram observados, mas assets originais e medidas não foram exportados; aproximações constam no TECH_SPEC e na rubrica.

**Qual foi o papel da IA?** Planejamento, implementação, preparação de conteúdo e testes, com falhas reais documentadas/corrigidas. O aluno precisa revisar e explicar; não afirmar validação pessoal antes de realizá-la.

## Antes de entregar
- [ ] Rever cada arquivo e executar a demonstração sem ler o roteiro inteiro.
- [ ] Revisar as dez publicações preparadas com IA.
- [ ] Registrar sua validação em docs/AI_USAGE.md.
- [ ] Conferir URLs reais e prazo no Blackboard.
- [ ] Apresentar individualmente. Testes e pontuação técnica não substituem essa condição.

## Perguntas adicionais após a auditoria final
**O que a auditoria realmente corrigiu?** Um Link do logotipo retirava q da URL, mas o input antigo disparava debounce e restaurava o termo. Também havia salto h1 → h3 no conteúdo e divergência entre nome acessível/label visível dos cards. As correções mantiveram a UI e receberam regressões. O contorno da busca foi ajustado para pelo menos 3:1 e o perfil ganhou @ conforme RF-02. Mostrar commits 5836af6, 542aaf4 e b93554b.

**Por que há atualização de estado durante um render em Home?** Ela é condicional: só quando observedQuery difere da query da URL. Assim o React ajusta draft antes de confirmar o render e rodar efeitos com o termo antigo. O próximo render tem os valores iguais e não repete o ajuste. Não é um setState incondicional, nem depende apenas de popstate: funciona com Link, voltar e avançar. Mostrar o teste “logotipo limpa a consulta e o histórico restaura a pesquisa correta”.

**Como o card inteiro continua clicável sem envolver o artigo num link?** O artigo contém título, data, resumo e comentários. O Link fica no título, e ::after com position absolute/inset:0 estende sua área ao cartão. Seu nome vem do texto visível do título; não é necessário substituir todo o conteúdo por aria-label. focus-within destaca a borda. O E2E clica no padding, não somente no texto.

**Por que um plugin próprio para headings?** O título do post já é h1. O plugin percorre a AST do Markdown e mantém uma pilha dos níveis originais; cada descendência real vira o nível seguinte, começando por h2. Títulos iguais/anteriores encerram a subseção. O limite é h6. Blocos de código não são headings e ficam intactos. Isso evita saltos mesmo se a issue começa em ###. O HTML externo continua desabilitado.

**Quais evidências há de contraste/foco?** Produção registrou texto do input 10,557:1, link externo 5,579:1 e borda 3,051:1 contra página/3,173:1 contra campo. Há teste de :focus-visible e outline sólido 2px. Axe completo passou nas duas páginas; isso não equivale a auditoria WCAG integral em todos os leitores de tela.

**Os testes realmente usam o GitHub?** Os 34 Vitest e 13 E2E são determinísticos com mocks/interceptação. A integração pública e scripts/audit-academic.mjs são separados, sem token e sem mocks. O JSON registra requisições reais de Users, Search API e detalhe, além de duas páginas 6+4 e busca React=3. A reexecução de 13 E2E na URL publicada não adiciona 13 cenários únicos ao total 47.

**O GitHub Actions vermelho reprova?** A seção 14 lista pipeline de CI como extra opcional, sem peso próprio nem condição eliminatória. O job sequer iniciou por bloqueio de faturamento da conta. Os logs locais/publicados estão disponíveis. Não se deve declarar CI aprovada nem esconder o bloqueio. A explicação se baseia no enunciado atual; regras adicionais do Blackboard precisam ser conferidas.

**A nota estimada é garantida?** Não. A matriz usa os nove critérios e seus máximos oficiais para projetar 97/100; 8/10 visual e 4/5 na categoria final reservam riscos de aproximação e validação/explicação pessoal. Esses descontos não são subpesos oficiais. Sem apresentação/explicação ou outra condição mínima, a seção 13 pode impedir aprovação independentemente da projeção.

**O uso de IA está completo?** Há mais de três registros estruturados de prompts reais, resultados, ajustes e verificação do agente. A verificação pelo aluno não pode ser inventada: preencher pessoalmente o formulário de AI_USAGE.md após executar as ações e revisar código/issues. O professor pode pedir explicações de qualquer trecho.

**Onde estão as pendências de entrega?** Em ENTREGA_BLACKBOARD.md: conferir prazo/instruções na plataforma, enviar os dois links, guardar comprovante, revisar evidências e apresentar. Não foi inventada exigência de ZIP, vídeo, PDF ou duração obrigatória.
