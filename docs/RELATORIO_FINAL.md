# Relatório final — GitHub Blog

**Registro histórico da primeira entrega técnica (até ed78ce9).** Nova revisão pré-entrega, resultados atuais **34 Vitest + 13 E2E**, estimativa fundamentada, correções e checklist: [AUDITORIA_FINAL.md](AUDITORIA_FINAL.md) e [ENTREGA_BLACKBOARD.md](ENTREGA_BLACKBOARD.md). Os números e limitações descritos abaixo preservam o estado efetivamente verificado naquela etapa, não substituem a auditoria mais recente.

## Resultado
SPA implementada e publicada: **https://github-blog-arthurdias256.vercel.app**.

Código e histórico no único repositório autorizado: **https://github.com/Arthurdias256/GitHub-Blog-React-TypeScript-**. Remote e commit inicial preservados. Permissão push/admin confirmada por API autenticada como Arthurdias256, e dry-run aprovado antes do push real. Nenhuma credencial impressa ou enviada ao bundle. Dez issues técnicas reais: `/issues/1` a `/issues/10` nesse repositório.

## Funcionalidades verificadas
Perfil real, campos opcionais, listagem recente de issues abertas/fechadas sem PR, cards com resumo/data/comentários, busca Search API com debounce 500ms/cancelamento e Enter, contagem/vazio, paginação real de seis itens, reset/preservação de query/page, detalhe individual e direto/reload, Markdown/GFM seguro, retorno/GitHub, rota 404, loading/rede/HTTP/rate limit/retry. Responsividade e teclado; sete larguras testadas.

## Tecnologias efetivamente instaladas
Node 24.11.1 (engines 24.x), npm 9.3.1; React/DOM 19.3.1, TypeScript 5.9.3, Vite 8.3.8, Tailwind 4.3.5, Axios 1.21.1, Router 7.18.7, react-markdown 10.1.0, remark-gfm 4.0.1, ESLint 9.39.5, Vitest 5.1.2, Playwright 1.65.1, MSW 2.15.0. Dependências auxiliares e versões completas no TECH_SPEC/package-lock.

## Validação final real
| Verificação | Resultado |
|---|---|
| npm ci | Aprovado, instalação limpa |
| npm ls vite | 8.3.8, deduplicado |
| npm run lint | Aprovado, sem erros/avisos do lint |
| npx tsc --noEmit | Exit 0; complementado pelo build de referências |
| npm run typecheck (tsc -b) | App + ferramentas/testes aprovados |
| npm run test | 31 aprovados, 0 reprovados; 2 arquivos |
| npm run test:e2e local | 11 aprovados, 0 reprovados, Chromium |
| npm run build | Aprovado; sem aviso de chunk >500k após lazy |
| npm run test:api | Aprovado sem autenticação: perfil/público/10 posts/6+4/React=3/vazio=0/detalhe/sem duplicata |
| npm audit | 0 vulnerabilidades |
| Inspeção de padrões de credenciais | Nenhum padrão encontrado nos candidatos ao Git; não é garantia absoluta |
| E2E na URL publicada | Mesmos 11 cenários aprovados, sem contar como testes únicos adicionais |
| Navegação real publicada | API HTTP 200, páginas 6+4, busca, detalhe/reload e mobile sem overflow |
| Build Vercel Node 24 | READY, alias público verificado |
| GitHub Actions | Bloqueado antes dos steps por problema de faturamento da conta, não por teste reprovado |

Total de cenários únicos da suíte: **42** (31 Vitest + 11 Playwright). Os 11 E2E foram também reexecutados em produção com respostas HTTP controladas. A validação real de API e capturas é separada, sem mocks. Houve falhas intermediárias corrigidas; não foram omitidas do histórico. Log final direto de subprocessos em evidencias/validacao-final.txt e códigos/durações em validacao-final.json.

## Histórico de commits antes desta auditoria
| Hash real | Etapa |
|---|---|
| dd9d8c3 | Initial commit (preservado) |
| 10fa708 | Requisitos e planejamento |
| 241c88b | React/TypeScript/Vite 8 |
| abde3a9 | Identidade visual |
| efc1077 | Integração GitHub (compilação intermediária falhou; correção seguinte) |
| 7ec884c | Corrige tipagem sem relaxar TypeScript |
| ddb6959 | Perfil |
| ed82e42 | Publicações e preparação de conteúdo |
| 23cf9b4 | Busca e paginação |
| cd6059c | Detalhes e Markdown |
| fedc217 | Responsividade/acessibilidade e divisão de bundle |
| 164371c | Testes automatizados |
| 55bf0a6 | Documentação e evidências |
| 4ac179e | Publicação/CI/configuração Node 24 |

O hash do commit que inclui este relatório pode ser consultado com `git log -1 --oneline` e no histórico público, evitando a impossibilidade de inserir o próprio hash no conteúdo do mesmo commit.

## Documentação e evidências
PRD_SPEC, TECH_SPEC e TASKS_SPEC canônicos em docs/; links preservados na raiz. AGENTS, README, RUBRICA, AI_USAGE (quatro registros reais), IA_USAGE histórico, APRESENTACAO e este relatório. Evidências: sete capturas locais/referências (Home/busca/detalhe/mobile e Figma), cinco capturas de produção, browser-real.json local/produção, logs de deploy e E2E, relatório de comandos. Screenshots são arquivos reais; não substituem a UI.

## Rubrica e aprovação
Notion seções 1–14 efetivamente lidas na continuação, inclusive rubrica (100 pontos) e condições mínimas (seção 13). Matriz em RUBRICA.md relaciona todos os nove critérios, pesos oficiais, arquivos, testes e evidências. Fidelidade visual é parcial porque medidas/ícones/Header/assets foram aproximados. Nenhuma nota garantida nem estimativa numérica subjetiva: professor avalia qualidade e apresentação; teste aprovado não concede automaticamente pontos. Aprovação requer 71/100 e todos os fluxos/entregas/explicação individual.

## Limitações e ações pessoais/externas
1. Aluno precisa revisar código e dez issues com apoio de IA, executar sua validação, conferir Blackboard e apresentar individualmente. Prazo/data/frequência não verificados.
2. Figma Projeto/Style Guide consultados visualmente; propriedades/assets exatos não exportados. Mobile/estados complementares foram adaptados. Sem promessa pixel-perfect ou certificação WCAG; axe passou nos estados auditados, com sete larguras/teclado testados.
3. Vercel publicou via CLI. Conexão automática GitHub → Vercel falhou: para automatizar por push, autorizar integração GitHub no projeto Vercel existente. Isso não impede acessar a URL pública já validada.
4. API pública tem quota e indexação eventual; nenhum token no cliente. Cache persistente e backend editorial não implementados, nem exigidos.
5. E2E em Chromium, não Firefox/Safari. ESLint 9 exibe aviso de versão descontinuada na instalação, mas lint funciona e audit retornou zero vulnerabilidades. Build remoto também teve avisos de configuração npm/MSW, sem falha.
6. CI enviado e consultado: run [45652648324](https://github.com/Arthurdias256/GitHub-Blog-React-TypeScript-/actions/runs/45652648324), commit 4ac179e, falhou sem executar steps. Anotação real: “The job was not started because your account is locked due to a billing issue.” Resolver bloqueio da conta/faturamento no GitHub e reexecutar workflow. Não houve teste de CI executado/reprovado; workflow preservado, sem remover verificações. Evidência em evidencias/github-actions.json.

## Apresentação
Siga APRESENTACAO.md: demonstre perfil/API, 6+4 posts, pesquisa/reset/vazio, detalhe Markdown/reload/retorno, mobile/teclado, testes, arquitetura/Props/Hooks/Axios/Router e evidências de IA. Não afirme compreensão ou revisão pessoal antes de realizá-la. Entregue os dois links públicos no Blackboard no prazo informado pelo professor.
