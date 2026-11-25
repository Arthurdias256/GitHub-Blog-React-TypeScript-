# Auditoria da rubrica oficial

Fonte: Notion, seções 12 e 13, lidas via navegador MCP; pontuações oficiais, não estimadas. As classificações abaixo são auditoria técnica, não atribuição de nota. A avaliação visual e a apresentação dependem do professor/aluno.

| Critério | Pontuação oficial | Implementação | Arquivo | Teste | Evidência | Status |
|---|---:|---|---|---|---|---|
| Perfil e integração GitHub Users API | 10 | Perfil real, campos/fallback/estados | src/components/ProfileCard.tsx; src/services/github.ts | app: Home/nulos/falha perfil | home-desktop.png; browser-real.json | Atendido |
| Repositório, issues, listagem e cards | 15 | Público, dez issues técnicas com IA declarada, recentes, sem PR, resumo/metadados | src/components/IssueCard.tsx; scripts/seed-issues.mjs | app: catálogo/PR; test:api | issues/1–10; browser-real.json | Atendido |
| Busca, debounce e paginação | 15 | Search API, 500ms, cancelamento, page/per_page=6, total/vazio | src/pages/Home.tsx; src/services/github.ts; src/hooks/useResource.ts | app: debounce/concorrência/página/reset/limpeza; E2E fluxo | busca-desktop.png; browser-real.json | Atendido |
| Detalhe do post e roteamento | 15 | Individual, rota direta, Markdown, retorno e link | src/pages/PostDetails.tsx; src/routes/AppRoutes.tsx; src/components/MarkdownContent.tsx | app: detalhe/direto/404/GFM; E2E reload | detalhe-desktop.png; detalhe-mobile.png | Atendido |
| Arquitetura React, TypeScript, Axios e Hooks | 15 | Props, useState/useEffect, useResource, serviços e tipos separados | src/types/github.ts; src/hooks/useResource.ts; src/services/ | typecheck/lint; app.test.tsx | TECH_SPEC.md; histórico Git | Atendido |
| Figma, Tailwind, responsividade e acessibilidade | 10 | Base visual observada, mobile/teclado/labels/foco; assets/medidas aproximados | src/styles/global.css; src/components/ | E2E sete larguras + axe | figma-projeto.png; figma-style-guide.png; home-mobile.png | Parcialmente atendido |
| Resiliência, testes e tratamento de erros | 5 | Loading, rede, HTTP, rate limit/reset, 404, retry | src/components/States.tsx; src/services/api.ts | 31 Vitest e 11 E2E | Resultados e logs de validação | Atendido |
| PRD_SPEC, TECH_SPEC, TASKS_SPEC e AGENTS.md | 10 | Docs canônicos em docs/, orientações na raiz, aceites/rastreabilidade | docs/*SPEC.md; AGENTS.md | Revisão documental | Arquivos e commits | Atendido |
| Git/GitHub, deploy, README e uso do OpenCode | 5 | Histórico incremental, dez issues, README e quatro registros IA; Vercel READY com fluxos reais | README.md; docs/AI_USAGE.md; vercel.json | Build remoto; integração pública; 11 E2E também contra produção | evidencias/producao/browser-real.json; e2e-producao.txt; histórico | Atendido |

## Condições mínimas (seção 13)
- [x] Fluxos implementados e verificados com API real: perfil; listagem/busca paginada; detalhe dinâmico/Markdown.
- [x] Código, SPEC e dez issues autorais preparados no repositório correto. Verificar push remoto na auditoria final.
- [ ] Apresentação individual e explicação das decisões pelo aluno (não verificável pelo agente).
- [ ] Obter 71/100 ou mais (não verificável; nota exclusiva do professor).

## Estimativa e limites
Não é apresentada nota numérica como previsão: componentes subjetivos da correção visual, avaliação da originalidade/revisão das issues e apresentação individual não podem ser pontuados pelo agente. Os pesos oficiais somam 100, mas marcar um critério como Atendido não equivale a receber automaticamente sua pontuação integral. Não há garantia de aprovação mesmo com testes passando.

As issues foram redigidas para este projeto com apoio explícito de IA, publicadas na conta do aluno; ele deve revisar o conteúdo e explicá-lo. Blackboard: prazo/data e regras gerais de frequência não verificados. As capturas e resultados mencionados estão em docs/evidencias/.
