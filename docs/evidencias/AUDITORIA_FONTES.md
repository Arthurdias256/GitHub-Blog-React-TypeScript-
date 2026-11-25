# Releitura das fontes na auditoria pré-entrega

## Notion — consulta real via navegador MCP
Página: https://app.notion.com/p/422dfca74d8d81e194e9dc0aa13ca6f0, site público deluxe-blue-bc1.notion.site, em 25/11/2026.

Foram lidas novamente as seções 1–14. A página virtualiza o conteúdo: uma passagem por scrollTop em incrementos de 900 retornou introdução, referências, RF/RN, APIs, stack/interface e seções finais; leituras adicionais em 6500 e 8300, após aguardar renderização, retornaram integralmente a documentação/IA/roteiro. Rubrica e seção 13 foram lidas em texto, não inferidas dos SPEC existentes. Não foram identificadas subpáginas de requisitos no corpo; links de referências são documentação externa, o ancestral é a disciplina e não o enunciado. Blackboard não acessado.

Transcrição da rubrica: Perfil e integração GitHub Users API (10); Repositório, issues, listagem e cards (15); Busca, debounce e paginação (15); Detalhe do post e roteamento (15); Arquitetura React, TypeScript, Axios e Hooks (15); Figma, Tailwind, responsividade e acessibilidade (10); Resiliência, testes e tratamento de erros (5); PRD_SPEC, TECH_SPEC, TASKS_SPEC e AGENTS.md (10); Git/GitHub, deploy, README e uso do OpenCode (5). Total 100. A tabela integral com evidência observável está em AUDITORIA_FINAL.md.

Trechos oficiais conferidos:
> Criar docs/AI_USAGE.md com ao menos três evidências de uso do OpenCode: contexto/prompt, objetivo, resultado, ajustes feitos e verificação pelo aluno.

> Construir checklist incremental com ID, descrição, pré-requisitos, RF/RN relacionados, arquivos envolvidos, critério de pronto e status.

> Nota 7,0 não aprova. A mera apresentação de telas estáticas ou dados fictícios não comprova os requisitos centrais. Se uma condição mínima não for cumprida, o projeto não será considerado aprovado mesmo que a soma parcial da rubrica ultrapasse 70 pontos.

> Testes E2E com Playwright e pipeline simples de CI.

O último trecho pertence à seção **14. Desafios extras — opcionais, sem substituir requisitos**, não à seção de condições eliminatórias. Não há pontuação oficial específica para CI nem desconto fixo por bloqueio do runner. Datas/prazo dependem do Blackboard.

## Figma — consulta e comparação visual reais
Arquivo oficial aberto no navegador MCP; página Projeto node-id=0-1 vista novamente, com Home e Post. Captura real copiada para auditoria/figma-projeto.png. Guia Nunito/cores/componentes visto na etapa anterior e preservado em figma-style-guide.png. Comparação com capturas reais publicadas após correções em auditoria/.

Mantidos organização, cores gerais, Nunito e sobreposição/grade/detalhe. Diferenças remanescentes explicitadas: decoração do Header, ícones e medidas aproximadas; sem exportação dos assets nem declaração pixel-perfect. Borda da busca ajustada apenas por contraste. Mobile adaptado ao mesmo estilo; não foi afirmado existir um frame mobile oficial separado.

## Falhas e verificações da auditoria
- Navegação pelo logotipo e heading-order foram reproduzidos em produção; dois novos testes falharam antes da correção. A primeira execução ad hoc de Playwright precisou corrigir encoding de texto no stdin do PowerShell e uso de browser.newContext pelo axe; essas falhas da ferramenta não foram contadas como defeitos do produto.
- Novo teste TypeScript usou por engano opção exact de Playwright na API RTL; compilador identificou, teste corrigido, sem desligar regra.
- Axe completo real encontrou label-content-name-mismatch em seis cards; antes-correcao-cards.json preserva o achado. Cards foram corrigidos semanticamente, clique no padding testado e análise completa repetida.
- Validação final após npm ci: 34 Vitest + 13 Playwright, lint/types/build/audit/API aprovados. Produção repetida com mesma suíte e API real em script separado. Nenhum resultado de validação pessoal do aluno foi fabricado.

## Auditoria definitiva — nova releitura independente
- Notion relido novamente por rolagem virtualizada: **127 blocos**, seções 1–14, incluindo RF-01–16, RN-01–10, rubrica, seção 13 e extras. Nenhuma seção do enunciado inacessível. Transcrição em `auditoria/notion-releitura-2026-11-25.md`.
- Figma recapturado em `node-id=0-1` (Home/Post) e `node-id=2-1297` (guia); capturas atuais em `auditoria/figma-projeto-atual.png`, `figma-home-crop.png` e `figma-post-crop.png`.
- API pública: perfil real (`Francisco Arthur`, login `Arthurdias256`, 1 seguidor no momento), 10 issues próprias, todas abertas, em ordem decrescente, sem PR; 1.063–1.225 caracteres de Markdown e código; páginas 6+4; React=3; vazio=0; `/post/10` HTTP 200.
- Validação: 11 comandos do `validate.mjs` exit 0; 34 Vitest + 13 E2E locais + 13 E2E em produção; axe completo 0 violações; 16 combinações página/largura; `npm audit` 0; scanner sem credenciais; `package-lock.json` versionado.
- Nenhum código de aplicação foi alterado nesta rodada; as correções anteriores foram reconfirmadas. A Vercel não precisou de novo deploy. O CI continua bloqueado antes dos steps por faturamento e permanece extra opcional.
- A matriz completa, os 61/65 atendidos e as pendências pessoais estão em `../CONFERENCIA_NOTION_FINAL.md`.
