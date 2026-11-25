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
