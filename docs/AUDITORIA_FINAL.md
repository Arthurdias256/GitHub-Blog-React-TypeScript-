# Auditoria final acadêmica — GitHub Blog

> **Auditoria definitiva mais recente:** [CONFERENCIA_NOTION_FINAL.md](CONFERENCIA_NOTION_FINAL.md). Este arquivo preserva a rodada anterior; a estimativa de 97/100 foi reavaliada de forma independente e mantida, com 34 Vitest + 13 E2E e 8 larguras.

**Data:** 25/11/2026. **Resultado técnico:** verificações aprovadas após correções pontuais e republicação. **Resultado acadêmico:** não pode ser declarado aprovado antes da avaliação e apresentação individual.

- Código: https://github.com/Arthurdias256/GitHub-Blog-React-TypeScript-
- Produção: https://github-blog-arthurdias256.vercel.app
- Fonte oficial relida: https://app.notion.com/p/422dfca74d8d81e194e9dc0aa13ca6f0, redirecionada para o site público. Foram percorridas as seções **1–14**, a tabela RF-01–16, RN-01–10, documentação, IA, checklist, entrega, rubrica e seção 13. Nenhuma alteração de pesos foi encontrada em relação ao levantamento anterior.
- Figma revisitado: páginas Projeto (node 0-1, Home/Post) e guia visual já registrado em evidencias/figma-style-guide.png; captura atual em evidencias/auditoria/figma-projeto.png. Sem acesso a exportação técnica dos assets/propriedades. Não houve acesso ao Blackboard nem à página ancestral da disciplina como fonte de regras adicionais.

## 1. Matriz da rubrica oficial
Os nomes e máximos são transcritos da seção 12. A coluna **estimada é juízo técnico desta auditoria**, não pontuação oficial obtida. O Notion não publica subpesos nem uma tabela de descontos por defeito; portanto, as reservas abaixo não são apresentadas como penalidades do professor.

| Critério oficial do Notion | Pontuação máxima | Pontuação estimada | Evidência | Status |
|---|---:|---:|---|---|
| Perfil e integração GitHub Users API | 10 | 10 | Evidência oficial: “Campos corretos, requisição real, estados adequados”. ProfileCard/getProfile; API real HTTP 200; avatar/nome/bio/@username/seguidores/link e nulos/falha testados. | Atendido tecnicamente |
| Repositório, issues, listagem e cards | 15 | 15 | “10 issues autorais, ordenação, dados completos e resumo”. Dez issues distintas de Arthurdias256, 1.063–1.225 caracteres, Markdown/código, sem PR; sort=created/order=desc e cards/metadados/resumo. verificacao-publica.json e test:api. Apoio de IA explícito; revisão intelectual pelo aluno não é inferida do login. | Atendido tecnicamente; revisão pessoal necessária |
| Busca, debounce e paginação | 15 | 15 | “Search API, pesquisa funcional, páginas reais e estados vazios”. Axios params, is:issue/repo, debounce 500ms, cancelamento, page/per_page=6, 6+4 posts, React=3 e vazio=0. Testes de reset/concorrência/limpeza/retorno e tráfego publicado. | Atendido tecnicamente |
| Detalhe do post e roteamento | 15 | 15 | “/post/:number, requisição individual, Markdown e navegação”. /post/:issueNumber equivalente; GET individual, conteúdo integral, GFM, cabeçalho, links, retorno e reload direto publicados. | Atendido tecnicamente |
| Arquitetura React, TypeScript, Axios e Hooks | 15 | 15 | “Componentização, Props, tipos, serviços, useState/useEffect e custom Hook”. Diretórios exigidos, interfaces, useResource/AbortController, Axios central, estado e efeitos; lint/tsc -b/build aprovados. | Atendido tecnicamente; explicação individual pendente |
| Figma, Tailwind, responsividade e acessibilidade | 10 | 8 | “Qualidade visual, mobile, contraste, labels e foco”. Nunito/base escura/azul/perfil sobreposto/grade/detalhe mantidos. Sete larguras, contraste medido, foco 2px, axe completo Home/detalhe sem violações após correções. Header/ícones/medidas são aproximações, não exportação pixel-perfect. | Parcial: limite de fidelidade exata |
| Resiliência, testes e tratamento de erros | 5 | 5 | “Loading, erros, rate limit, 404, retry e cenários testados”. 34 Vitest + 13 E2E locais aprovados, mesmos 13 E2E em produção; 403/429/reset/500/rede/404/vazio e retry testados com mocks; API real verificada separadamente. | Atendido tecnicamente |
| PRD_SPEC, TECH_SPEC, TASKS_SPEC e AGENTS.md | 10 | 10 | “Coerência, rastreabilidade, checklist e especificações utilizáveis”. Seção 7 conferida item a item; aceites RF explícitos, RN identificadas, fluxo/contratos/decisões, tarefas com pré-requisitos/RF/RN/arquivos/pronto/status/commits; documentos anteriores ao código confirmados no histórico. | Atendido documentalmente |
| Git/GitHub, deploy, README e uso do OpenCode | 5 | 4 | “Repositório, publicação, commits, evidências de IA e explicação”. Público, histórico preservado/incremental, Vercel READY, README/screenshots/logs e mais de três registros IA. Falta confirmar pessoalmente as verificações do aluno nos registros de IA e realizar a explicação. CI opcional não fundamenta desconto automático. | Parcial: validação e explicação pessoais |
| **Total** | **100** | **97** | Pesos oficiais somados sem bônus por extras. | **Estimativa condicional, não nota atribuída** |

### Fundamentação e limites da estimativa
- **Máximo possível:** 100 pontos = 10,0.
- **Estimativa:** 10 + 15 + 15 + 15 + 15 + 8 + 5 + 10 + 4 = **97/100 = 9,7**.
- Reserva discricionária de dois pontos na categoria visual pela ausência de assets/medidas exatos; reserva de um ponto na categoria final pela validação pessoal/explicação ainda não demonstradas. **Esses descontos não constam como valores fixos oficiais.** São uma projeção prudente dentro dos máximos, sujeita a julgamento diferente do professor.
- A estimativa assume que o aluno validará/revisará o trabalho e conseguirá demonstrar o que está implementado. Não representa 97 pontos já conquistados. Não atribui bônus por CI, tabelas, screenshots extras ou quantidade de testes.
- Nota só é definida pelo professor. **Se a apresentação/explicação mínima não for cumprida, a projeção técnica não produz aprovação**, mesmo acima de 70.

## 2. Condições mínimas e possíveis fatores eliminatórios
Transcrição substantiva da seção 13, sem inventar regras adicionais:

| Condição oficial | Situação verificada |
|---|---|
| Obter nota maior que 7,0 (71/100 ou mais) | **Não verificável pelo agente:** a nota é do professor; estimativa não substitui correção. |
| Apresentar perfil real, listagem/busca paginada de issues reais e detalhe dinâmico com Markdown funcionando | **Atendido tecnicamente:** API pública, navegação e testes reais/publicados. O aluno ainda deve demonstrar os fluxos. |
| Entregar três SPEC, código-fonte e repositório de issues públicos | **Artefatos presentes e repositório público.** Entrega dos links no Blackboard depende do aluno; confirmar HEAD remoto ao finalizar o push desta revisão. |
| Demonstrar individualmente e explicar decisões essenciais | **Pendente pessoal:** não pode ser concluído pelo agente. Roteiro atualizado em APRESENTACAO.md. |

Podem impedir aprovação: **nota 7,0 ou inferior**, ausência de qualquer um dos três fluxos reais, substituir integração por telas/dados fictícios, não entregar SPEC/código/issues públicos ou não demonstrar/explicar individualmente. O enunciado afirma que falhar uma condição mínima impede aprovação independentemente da soma parcial. Não existe, na seção 13, eliminação explícita por CI vermelho, diferença isolada de ícone ou ausência de backend. Regras gerais de frequência/prazo do Blackboard não foram verificadas e continuam válidas conforme a disciplina.

**Conclusão sobre mínimos:** as condições técnicas verificáveis estão atendidas; **não é possível declarar todas as condições de aprovação concluídas**, pois nota, entrega pessoal e apresentação continuam externas.

## 3. Problemas encontrados e correções limitadas
| Achado reproduzido | Correção | Verificação |
|---|---|---|
| Logotipo voltava para /, mas o draft antigo reinseria q=React após debounce | Home sincroniza o input quando a query canônica muda; retirado listener limitado a popstate | Teste falhou antes, passou depois; Link/back/forward e API real conferidos |
| Markdown ## gerava h3 após o h1 do post | remarkHeadingOrder normaliza headings na AST abaixo do h1, sem alterar blocos de código ou habilitar HTML | Regressão unitária/componente, heading-order e axe completo |
| Contorno de busca com 1,35:1 contra página | Somente borda do campo passou de #1c2f41 a #486581; sem alterar superfícies, fonte ou grade | 3,051:1 contra página e 3,173:1 contra campo, medidos em produção |
| Perfil sem o prefixo @ mencionado em RF-02 | Prefixo adicionado ao login real | Teste do perfil e screenshot atual |
| Cards reais com label-content-name-mismatch no axe completo | Article contém conteúdo; Link do título tem área estendida por pseudo-elemento; clique total preservado | Antes: antes-correcao-cards.json. Depois: axe completo sem violações; teste clica no padding do card |
| SPEC resumidos não explicitavam todos os campos de seção 7 | PRD com requisito/aceite em colunas; RN identificadas; TECH com responsabilidades e IDs; TASKS com arquivos/RN/status explícitos | Revisão documental abaixo e histórico de commits |

Commits de correção: **5836af6**, **542aaf4**, **b93554b**. Não foram recriados a aplicação, a stack, o repositório, o conjunto de publicações ou a identidade. Sem dependências novas, sem remoção de testes/regras de qualidade.

## 4. Comparação visual e acessibilidade
Figma e screenshots atuais foram comparados visualmente. Mantidos: base escura e azul, Nunito, cabeçalho central, perfil/cabeçalho sobreposto, busca, duas colunas desktop, hierarquia do detalhe, bordas/cantos e espaçamentos gerais. Conteúdo real é diferente do exemplo do protótipo e produz títulos/bios maiores, sem ser defeito por si só.

Diferenças remanescentes: Header com linhas simplificadas, ícones Lucide em vez dos originais e valores dimensionais aproximados. Não foi possível exportar propriedades/recursos originais. Não foram inventadas novas telas/temas/gradientes para aparentar fidelidade. A correção visual aplicada foi o contorno da busca por legibilidade/contraste; nenhuma divergência estrutural relevante restante foi observada nas telas auditadas. Não se afirma equivalência pixel-perfect.

Produção real, sem interceptar API:
- Home e /post/10: **14 verificações de largura** (duas páginas × 320, 375, 390, 768, 1024, 1440 e 1920px) sem overflow de documento.
- Axe **completo** nas duas páginas: nenhuma violação retornada após as correções. Auditoria com filtros anteriores não era suficiente para detectar o problema dos cards; testes foram ampliados, não enfraquecidos.
- Contraste medido: texto do input **10,557:1**; link externo **5,579:1**; bordas **3,051:1 / 3,173:1**. Elementos desabilitados não são usados para afirmar contraste de controles ativos.
- Campo focado por teclado: :focus-visible verdadeiro, outline sólido de **2px**. E2E percorre Tab/Enter e verifica foco; link do card também realça a borda por focus-within.
- Essas evidências **não constituem certificação integral WCAG 2.2 AA**, auditoria com todos os leitores de tela ou validação Safari/Firefox.

## 5. Conferência exata do conteúdo documental exigido
O Notion pede Markdown em caminhos específicos e conteúdos, **não um template fechado com quantidade de páginas**.

| Documento | Exigência da seção 7/8 | Resultado |
|---|---|---|
| docs/PRD_SPEC.md | Contexto/problema/objetivo/público, fluxo Home → Busca → Detalhe → Voltar, RF-01–16 com aceite, RN-01–10, escopo/exclusões, RNF e decisões de interface | Presente; RF transcritos com aceites separados; IDs RN explícitos, complementares distinguidos |
| docs/TECH_SPEC.md | Tecnologias/decisões, arquitetura/dados/diretórios, componentes, interfaces usuário/issue/paginada, Axios/headers/erros, Hooks/rotas/busca/debounce/paginação, Markdown/a11y/testes e IDs PRD | Presente; tabela explícita de responsabilidades/IDs e descrições dos contratos |
| docs/TASKS_SPEC.md | Checklist incremental com ID/descrição/pré-requisitos/RF/RN/arquivos/pronto/status; atualizar e fazer commits | Presente; tabela completada com todos os campos, evidências e hashes reais |
| AGENTS.md | Contexto/stack/fontes/arquitetura/TS/regras de consulta/qualidade/testes/commits | Presente na raiz, versionado antes da aplicação |
| docs/AI_USAGE.md | Ao menos três evidências com contexto/prompt, objetivo, resultado, ajustes e verificação pelo aluno | Há quatro registros históricos + nova auditoria; quantidade/estrutura suficientes. **Validação pessoal do aluno ainda pendente**, com formulário explícito para preenchimento real |

O histórico confirma SPEC/AGENTS em 10fa708 antes do setup 241c88b; os documentos foram refinados durante o desenvolvimento. Os três links SPEC na raiz são atalhos; os arquivos canônicos obrigatórios estão em docs/.

## 6. Testes, dados reais, segurança e publicação
Última instalação limpa: `node scripts/validate.mjs`, com **todos os onze comandos exit 0**, incluindo npm ci, Vite 8.3.8, lint, tsc --noEmit, tsc -b, testes, E2E, build, API, audit e scanner. Logs reais em evidencias/validacao-final.txt/json.

| Verificação | Resultado efetivamente obtido |
|---|---|
| Vitest | **34 aprovados, 0 reprovados**, dois arquivos |
| Playwright local | **12 aprovados, 0 reprovados** |
| Playwright em produção | **13 aprovados, 0 reprovados**, mesma suíte, não 13 cenários únicos extras |
| ESLint / TypeScript completo / build | Aprovados |
| npm audit | Zero vulnerabilidades relatadas |
| Integração pública | Perfil/repo públicos; 10 issues; páginas 6+4; React=3; inexistente=0; detalhe e IDs sem duplicação |
| Issues | Dez corpos distintos e pertinentes, Markdown/código, autoria GitHub Arthurdias256; nenhuma criação adicional nesta auditoria |
| Histórico | 18 commits inspecionados por padrões até b93554b, sem correspondência de credenciais |
| Assets publicados | JS principal, chunk PostDetails e CSS HTTP 200, sem padrões inspecionados de token/fixtures |
| Hospedagem | Home e acesso direto ao detalhe HTTP 200, assets com MIME correto, nosniff e frame DENY |
| Republicação | Deployment **dpl_29GBthq9wSLriZ21ttPkP152HjdB**, READY, alias público verificado |

Total da suíte: **47 cenários únicos** (34 + 13). Houve falhas reais durante a auditoria e correções subsequentes; o resultado acima é o último, não uma afirmação de que nunca houve falha. A detecção de credenciais é heurística, não prova matemática de ausência de qualquer segredo possível.

## 7. GitHub Actions e impacto na nota
A consulta pública mais recente registrada em verificacao-publica.json identificou run **45653281397**, commit ed78ce9, status completed/failure, **nenhum step executado** e a anotação:

> The job was not started because your account is locked due to a billing issue.

Na seção **14**, “Testes E2E com Playwright e pipeline simples de CI” é **opcional**. A seção 12 exige testes/resiliência observáveis e a seção 5 pelo menos três cenários verificáveis; isso foi atendido independentemente do runner. A seção 13 **não exige CI verde**. Consequentemente, não existe base no enunciado consultado para aplicar eliminação ou um desconto numérico automático por essa falha administrativa. A estimativa da matriz não desconta CI. O professor ainda pode avaliar qualidade das evidências e explicação na categoria correspondente.

Não foram removidas etapas nem ocultado o workflow. Resolver bloqueio/faturamento da conta e reexecutar Actions depende do titular e do GitHub; nenhuma mudança de cobrança foi feita. O deploy Vercel e a validação local/publicada estão funcionais. A conexão automática GitHub → Vercel também é uma pendência operacional opcional; deploy CLI foi utilizado com sucesso.

## 8. Pendências e possíveis motivos de desconto
- **Pessoal/indispensável:** revisar e explicar código/issues, preencher verificações reais de IA, demonstrar individualmente e enviar links no Blackboard no prazo.
- **Visual:** exportação exata dos assets/propriedades do Figma não disponível; pequenas diferenças podem reduzir o critério visual.
- **Avaliação:** originalidade/compreensão não são provadas apenas por autoria GitHub; o professor pode pedir explicações de conteúdo e trechos gerados com IA.
- **Operacional:** CI bloqueado pela conta e integração de deploy automático não configurada, sem desconto fixo previsto no enunciado.
- **Limites técnicos conhecidos:** quota/indexação da API pública, limite conservador 996 resultados, sem cache persistente; nenhum desses extras foi apresentado como obrigatório. Aviso de suporte do ESLint 9 na instalação está documentado; lint/build/audit passaram.

## 9. Arquivos e links de entrega
Obrigatórios no repositório: código e configurações, docs/PRD_SPEC.md, docs/TECH_SPEC.md, docs/TASKS_SPEC.md, AGENTS.md, docs/AI_USAGE.md, README.md, testes e screenshots Home/busca/detalhe/mobile, histórico significativo e issues de conteúdo. package-lock.json permanece versionado. Não incluir node_modules, dist, .env com segredo ou credenciais.

Enviar ao professor pelo Blackboard:
1. **Repositório:** https://github.com/Arthurdias256/GitHub-Blog-React-TypeScript-
2. **Aplicação:** https://github-blog-arthurdias256.vercel.app

Complementares úteis: [issues](https://github.com/Arthurdias256/GitHub-Blog-React-TypeScript-/issues), [detalhe direto](https://github-blog-arthurdias256.vercel.app/post/10), este documento e APRESENTACAO.md. Não são substitutos dos dois links exigidos. Checklist operacional: **ENTREGA_BLACKBOARD.md**. Ações pessoais permanecem desmarcadas até execução real pelo aluno.

## 10. Evidências preservadas
- evidencias/auditoria/verificacao-publica.json: dados/URLs/HTTP/assets/histórico/a11y/contraste/foco/tamanhos/Actions sem mocks.
- evidencias/auditoria/antes-correcao-cards.json: falha real anterior, não removida para aparentar sucesso.
- evidencias/auditoria/home-desktop.png, busca-desktop.png, detalhe-desktop.png, home-mobile.png, detalhe-mobile.png e figma-projeto.png.
- evidencias/auditoria/e2e-producao.txt e deploy.txt; evidencias/validacao-final.txt/json.
- Notion/rubrica relidos via navegador MCP nesta sessão; evidencias/AUDITORIA_FONTES.md registra escopo e trechos, sem alegar acesso ao Blackboard ou exportação técnica do Figma.
