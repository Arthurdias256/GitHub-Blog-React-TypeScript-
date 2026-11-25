# Releitura independente do Notion — 25/11/2026

## Método e alcance
- Página aberta no navegador MCP: `https://deluxe-blue-bc1.notion.site/Projeto-06-Recupera-o-GitHub-Blog-React-TypeScript-Tailwind-OpenCode-422dfca74d8d81e194e9dc0aa13ca6f0`.
- Conteúdo recolhido por rolagem real do contêiner virtualizado, com coleta por `data-block-id`; foram obtidos 127 blocos e cerca de 20 mil caracteres, incluindo as seções 1–14.
- Nenhuma seção do enunciado ficou inacessível. A página ancestral da disciplina e o Blackboard não foram acessados; não foram usados como fonte inventada.
- Esta releitura não reutilizou os checkboxes de `TASKS_SPEC.md` como prova. Cada item foi confrontado com código, configuração, testes, API, Git ou aplicação publicada.

## Seções oficiais efetivamente lidas
1. Contexto e objetivo
2. Referências e materiais obrigatórios
3. Escopo funcional obrigatório — Product SPEC (RF-01 a RF-16 e RN-01 a RN-10)
4. APIs e exemplos de consulta
5. Stack tecnológica e conceitos — Technical SPEC
6. Interface, responsividade e acessibilidade
7. Documentação SPEC — obrigatória antes da implementação
8. Uso de inteligência artificial — permitido e documentado
9. Roteiro de desenvolvimento sugerido
10. Checklist de validação final
11. Entrega final
12. Rubrica de avaliação — 100 pontos
13. Condições de aprovação na recuperação
14. Desafios extras — opcionais, sem substituir requisitos

## Trechos oficiais determinantes

### Seção 8 — IA
> Criar docs/AI_USAGE.md com ao menos três evidências de uso do OpenCode: contexto/prompt, objetivo, resultado, ajustes feitos e verificação pelo aluno. O professor poderá solicitar a explicação de trechos gerados ou modificados pelo assistente.

### Seção 12 — Rubrica
| Critério | Evidência observável | Pontos |
|---|---|---:|
| Perfil e integração GitHub Users API | Campos corretos, requisição real, estados adequados | 10 |
| Repositório, issues, listagem e cards | 10 issues autorais, ordenação, dados completos e resumo | 15 |
| Busca, debounce e paginação | Search API, pesquisa funcional, páginas reais e estados vazios | 15 |
| Detalhe do post e roteamento | /post/:number, requisição individual, Markdown e navegação | 15 |
| Arquitetura React, TypeScript, Axios e Hooks | Componentização, Props, tipos, serviços, useState/useEffect e custom Hook | 15 |
| Figma, Tailwind, responsividade e acessibilidade | Qualidade visual, mobile, contraste, labels e foco | 10 |
| Resiliência, testes e tratamento de erros | Loading, erros, rate limit, 404, retry e cenários testados | 5 |
| PRD_SPEC, TECH_SPEC, TASKS_SPEC e AGENTS.md | Coerência, rastreabilidade, checklist e especificações utilizáveis | 10 |
| Git/GitHub, deploy, README e uso do OpenCode | Repositório, publicação, commits, evidências de IA e explicação | 5 |
| **Total** | | **100** |

Conversão oficial: pontos obtidos ÷ 10. Exemplos oficiais: 71 pontos = 7,1; 70 pontos = 7,0.

### Seção 13 — Condições de aprovação
> Para ser aprovado:
> - Obter nota maior que 7,0 (71/100 pontos ou mais, na correção por pontos inteiros).
> - Apresentar em funcionamento os três fluxos centrais: (a) perfil real da API; (b) listagem e busca paginada de issues reais; (c) detalhe de issue por rota dinâmica com Markdown.
> - Entregar os três documentos obrigatórios PRD_SPEC.md, TECH_SPEC.md, TASKS_SPEC.md, além do código-fonte e repositório de issues públicos.
> - Demonstrar o projeto individualmente e ser capaz de explicar decisões técnicas essenciais.
>
> Nota 7,0 não aprova. A mera apresentação de telas estáticas ou dados fictícios não comprova os requisitos centrais. Se uma condição mínima não for cumprida, o projeto não será considerado aprovado mesmo que a soma parcial da rubrica ultrapasse 70 pontos.

Observação oficial: essa é a regra específica da recuperação e não substitui os critérios gerais de nota e frequência da disciplina SPA.

### Seção 10 — Checklist de validação final
> - Projeto inicia, navega e compila sem erros.
> - Perfil do GitHub é real e mostra todos os campos obrigatórios.
> - Repositório público do aluno contém pelo menos 10 issues originais.
> - Lista de últimos posts aparece sem termo de pesquisa.
> - Busca por texto usa GitHub Search API e permite resultado vazio.
> - Debounce evita requisições excessivas.
> - Paginação real permite mudar de página.
> - Cards exibem título, data relativa, resumo e comentários.
> - Cada card abre /post/:number e a URL funciona em acesso direto.
> - Detalhe apresenta cabeçalho, link externo, retorno e Markdown completo.
> - Loading, erro, 404, rate limit e tentar novamente são tratados.
> - Interface segue o Figma e funciona em celular e desktop.
> - Componentes, Props, Hooks, efeitos e TypeScript estão organizados.
> - PRD_SPEC, TECH_SPEC, TASKS_SPEC, AGENTS, AI_USAGE e README estão no GitHub.
> - Existem testes/evidências e histórico de commits.
> - Aplicação está publicada e pode ser demonstrada ao professor.

### Seção 11 — Entrega final
> Entregar no Blackboard o link do repositório GitHub público e o link da aplicação publicada (Vercel, Netlify ou serviço equivalente). No repositório devem constar o código-fonte, as issues de conteúdo e:
> - docs/PRD_SPEC.md, docs/TECH_SPEC.md, docs/TASKS_SPEC.md.
> - AGENTS.md e docs/AI_USAGE.md com evidências do uso do OpenCode.
> - README.md explicando proposta, Figma, stack, configuração username/repo, execução local, scripts, arquitetura, funcionalidades, decisões e links de publicação.
> - Testes e capturas de tela da Home, dos resultados de busca, do detalhe e de pelo menos uma visualização mobile.
> - Histórico de commits significativos. Não enviar node_modules, tokens, arquivos .env secretos ou outros dados sensíveis.
>
> Apresentação: demonstração individual do fluxo completo e breve explicação de como funcionam componentes, Props, Hooks, consumo HTTP, rotas, TypeScript e documentos SPEC. A data, o período de apresentação e o prazo exato de entrega serão informados no Blackboard.

### Seção 14 — Desafios extras (opcionais, sem substituir requisitos)
> - Filtros por labels/estado das issues ou destaque de posts por etiquetas.
> - Skeleton loading, cache de última resposta válida e botão de atualização.
> - Testes E2E com Playwright e pipeline simples de CI.
> - Modo claro/escuro com preferência persistida.
> - Sumário de headings ou destaque de código para posts longos.
>
> Priorize primeiro os requisitos obrigatórios. Extras não compensam ausências nos fluxos mínimos, na documentação ou na apresentação.

## Limitações desta fonte
- O Notion não informa data, horário ou formato de envio; isso está somente no Blackboard, não acessado.
- A rubrica é oficial; qualquer nota deste repositório é estimativa, não nota do professor.
- A seção 13 exige demonstração/ explicação individual, que o agente não pode realizar pelo aluno.
