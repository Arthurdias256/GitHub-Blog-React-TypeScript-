# Evidências de utilização do OpenCode

Ferramenta: OpenCode. O identificador exato do modelo pode variar entre sessões e não é requisito do Notion; não é usado como critério de autoria nem como prova. Este documento usa o nome exigido pelo Notion; o registro inicial em [IA_USAGE.md](IA_USAGE.md) é preservado. Os prompts abaixo são trechos literais de mensagens reais, não conversas inventadas. O histórico integral permanece na sessão; exportação manual da conversa é recomendada como evidência complementar.

**Situação após a auditoria definitiva:** os resultados das evidências 1–5 abaixo são históricos. A suíte atual tem **34 Vitest + 13 E2E** aprovados. A estrutura/quantidade de registros foi conferida contra a seção 8; a **verificação pelo aluno permanece pendente**, conforme formulário final. Não confundir teste executado pelo agente com validação pessoal exigida pelo professor.

## Evidência 1 — levantamento e desbloqueio
- **Contexto/prompt real inicial:** “Primeiramente, inspecione a pasta atual e consulte integralmente o Notion e o Figma através dos mecanismos MCP disponíveis.”
- **Objetivo:** identificar requisitos sem fabricar rubrica ou sobrescrever trabalho.
- **Resultado:** inspeção do README/repositório; tentativa HTTP, descoberta MCP sem conectores específicos e navegação MCP com acesso parcial. SPEC/AGENTS criados antes do código. Registro em evidencias/ACESSO_INICIAL.md.
- **Ajuste:** usuário autorizou continuar: “Esta instrução substitui a regra anterior que bloqueava a implementação por falta de acesso integral às referências.” Novas rolagens recuperaram seções 1–14, rubrica/seção 13. SPEC movidos para docs/ e conta correta definida.
- **Verificação executada pelo agente:** conteúdo efetivamente retornado pela página; NOTION_CONTINUACAO.md e commits 10fa708/241c88b.
- **Verificação pelo aluno:** pendente de leitura e confirmação pessoal; não foi afirmada pelo agente.

## Evidência 2 — arquitetura e implementação orientada
- **Prompt real de continuação:** “Instale as dependências, configure o ambiente, execute os testes, corrija os erros e realize os commits correspondentes.”
- **Objetivo:** implementar React/TypeScript/Vite 8/Tailwind/Axios/Router, perfil, issues reais, busca paginada e Markdown.
- **Resultado:** componentes tipados, serviços centralizados, useResource, debounce/cancelamento e rotas; dez issues técnicas originais preparadas com IA e publicadas no repositório autorizado.
- **Ajustes reais:** parameter properties incompatíveis com erasableSyntaxOnly causaram TS1294; reescritas como propriedades explícitas. Commit de serviços foi criado indevidamente após compilação falhar no PowerShell; erro preservado no histórico e corrigido no commit 7ec884c, sem fingir aprovação anterior. Bundle dividido com lazy após aviso >500k.
- **Validação do agente:** lint/build/types executados incrementalmente; API confirmou login Arthurdias256 e push/admin, sem imprimir segredo. Script seed retomou após HTTP 500/502/503 e verificou títulos para não duplicar.
- **Verificação pelo aluno:** pendente de revisão do código e das dez issues, conforme APRESENTACAO.md.

## Evidência 3 — testes, acessibilidade e evidência real
- **Prompt real:** “Valide a aplicação utilizando o navegador, tanto em desktop quanto em mobile.”
- **Objetivo:** executar testes em vez de apenas sugeri-los, corrigir falhas e preservar screenshots reais.
- **Resultado:** 31 cenários Vitest e 11 E2E Chromium aprovados; sete larguras; axe Home/detalhe sem violações nos estados testados. Capturas locais reais: Home/busca/detalhe desktop, Home/detalhe mobile.
- **Ajustes reais:** mock de resposta lenta capturava React no nome do repositório (corrigido para termo entre aspas); card sem nome no Chromium corrigido com aria-labelledby; lib DOM adicionada à configuração dos testes de ferramentas; timeout assíncrono RTL 5s para import lazy no Windows.
- **Validação do agente:** integração pública sem token confirmou 10 posts, páginas 6+4, React 3, busca inexistente 0, detalhe e IDs sem duplicação. browser-real.json registra endpoints e HTTP 200, sem mocks. Capturas Figma originais da sessão em figma-projeto.png/figma-style-guide.png; não usadas como interface.
- **Verificação pelo aluno:** pendente de executar os comandos, conferir screenshots e demonstrar teclado pessoalmente. Ausência de violações axe não significa certificação WCAG.

## Evidência 4 — publicação e auditoria
- **Prompt real:** “Prepare o repositório público e publique a aplicação na Vercel, caso o Notion não determine outra plataforma e existam permissões disponíveis.”
- **Objetivo:** deployment real, sem inventar URL.
- **Resultado:** acesso ao GitHub e login CLI Vercel como arthurdias256 confirmados; configuração SPA/CI preparada. Deployment READY em https://github-blog-arthurdias256.vercel.app; Home, busca, páginas 6+4, detalhe/reload e mobile com API real verificados em evidencias/producao/browser-real.json. Conexão automática GitHub/Vercel falhou; deploy CLI independente funcionou. engines ajustada para Node 24.x após aviso do build remoto.
- **Verificação pelo aluno:** conferir links e registrar sua demonstração no prazo do Blackboard.
- **Auditoria remota:** Actions run 45652648324 retornou falha sem iniciar steps por conta bloqueada devido a faturamento. Mensagem real preservada em evidencias/github-actions.json; não foi declarada aprovação de CI nem realizada alteração de cobrança.

## O que não foi inventado
Não há garantia de nota, conformidade integral WCAG ou comparação pixel-perfect. Não há registro de conhecimento pessoal do aluno nem apresentação já realizada. Nenhum token está no código/README/VITE_*. Capturas representam a aplicação e referências reais, não mockups fabricados.

## Evidência 5 — auditoria pré-entrega solicitada pelo usuário
- **Contexto/prompt real:** “Realize uma auditoria final completa do projeto GitHub Blog antes da entrega acadêmica.” e “Corrija somente os problemas identificados.”
- **Objetivo:** reler o Notion/Figma, confrontar rubrica, corrigir apenas achados, repetir testes e criar checklist de entrega/roteiro.
- **Consultas reais:** navegador MCP releu seções 1–14 com rolagem e leituras adicionais para virtualização; Figma Projeto foi recapturado. API pública confirmou dez issues próprias e Actions bloqueado sem steps. Nenhum acesso ao Blackboard foi declarado.
- **Resultados e ajustes:** corrigidos retorno pelo logotipo, headings, contraste da borda/@ e semântica dos cards após falhas reais. SPEC explicitados no formato de conteúdo da seção 7. Dois testes de regressão falharam antes e passaram depois. A auditoria axe completa com dados reais encontrou label-content-name-mismatch que o filtro anterior não abrangia; teste foi ampliado, sem desligar regras.
- **Verificação executada pelo agente:** npm ci, lint, tsc --noEmit/tsc -b, 34 Vitest, 13 E2E, build, API, audit e scanner aprovados. Após republicar, os mesmos 13 E2E passaram; script real confirmou axe completo sem violações, 16 combinações página/largura, contraste/foco, histórico/assets sem padrões de credencial. Evidências em auditoria/verificacao-publica.json, antes-correcao-cards.json, deploy.txt/e2e-producao.txt e screenshots. Commits de correções 5836af6/542aaf4/b93554b.
- **Estimativa:** docs/AUDITORIA_FINAL.md projeta 97/100 usando só máximos oficiais, com reservas de julgamento explícitas, sem declarar nota do professor nem apresentação concluída.
- **Verificação pelo aluno:** **pendente**. Revisar as correções, executar a demonstração e registrar abaixo resultados reais. Nenhuma dessas ações foi preenchida pelo agente como se fosse o aluno.

## Evidência 6 — auditoria definitiva independente
- **Contexto/prompt real:** “Realize uma auditoria definitiva do projeto, comparando o enunciado oficial do Notion com o código-fonte atual e a aplicação publicada. Não confie nos relatórios anteriores: releia o Notion, verifique o código e o app, e registre o que não conseguiu acessar.”
- **Objetivo:** refazer a conferência sem presumir os checklists internos, identificar lacunas reais, corrigir apenas o que fosse comprovado e registrar limites acadêmicos.
- **Consultas reais:** Notion relido por rolagem virtualizada (seções 1–14, 127 blocos, RF-01–16, RN-01–10, rubrica, seção 13 e extras); Figma Projeto recapturado nos nodes 0-1 e 2-1297. API pública consultada sem token; Blackboard e exportação técnica de propriedades/assets do Figma não foram acessíveis.
- **Resultado:** 10 issues reais de Arthurdias256, todas abertas, em ordem decrescente, com 1.063–1.225 caracteres de Markdown e código; nenhuma é PR; perfil público com avatar/bio/link; páginas 6+4; busca “React” = 3; termo inexistente = 0; acesso direto a `/post/10` HTTP 200. Assets publicados sem padrões de credencial; 20 commits até o commit de teste `93cb686`; `package-lock.json` versionado.
- **Ajustes reais:** acrescentada a largura 1280 px à suíte e à auditoria; a auditoria passou a verificar perfil, ordem por criação, estado aberto/fechado, arquivos proibidos versionados e lockfile; documentação técnica ganhou tabela de componentes/responsabilidades; AGENTS explicitou stack, convenções, qualidade e commits; contagens atualizadas para 34 Vitest + 13 E2E. Nenhum código de aplicação foi alterado.
- **Verificação executada pelo agente:** npm ci, lint, `tsc --noEmit`, `tsc -b`, 34 Vitest, 13 E2E locais e 13 E2E em produção, build, API real, `npm audit`, scanner de credenciais, axe completo e 16 combinações página/largura. Evidências em `docs/evidencias/validacao-final.*`, `docs/evidencias/auditoria/verificacao-publica.json`, screenshots e no relatório `docs/CONFERENCIA_NOTION_FINAL.md`.
- **Limites:** o GitHub Actions continua bloqueado antes de qualquer step por faturamento da conta (`45660255633`); CI é extra opcional. O Blackboard não foi acessado. A revisão do aluno, a demonstração individual e o preenchimento da tabela abaixo continuam pendentes.
- **Verificação pelo aluno:** **pendente**. Deve revisar esta auditoria, executar pelo menos um fluxo real e registrar suas próprias palavras na tabela.

## Registro pessoal do aluno — preencher somente após realizar
O Notion exige contexto/prompt, objetivo, resultado, ajustes e **verificação pelo aluno** em pelo menos três evidências. Os registros acima têm os primeiros campos e indicam a pendência final. Escolha ao menos três, execute uma ação verificável e complete a tabela com suas próprias palavras. Nome/data/resultados não devem ser preenchidos pelo agente.

| Evidência | Ação de verificação sugerida | Data e identificação do aluno | Resultado observado pessoalmente / ajustes necessários |
|---|---|---|---|
| 1 — levantamento | Comparar RF/RN e rubrica com o Notion; localizar SPEC/AGENTS no histórico | Pendente | Pendente |
| 2 — implementação | Explicar Home/useResource/getIssue e revisar as dez issues; abrir fluxo real | Pendente | Pendente |
| 3 — testes | Executar testes/lint/types e conferir ao menos um caso de busca, detalhe e falha | Pendente | Pendente |
| 5 — auditoria | Testar logotipo/back/forward, clique no padding, foco e headings após correção | Pendente | Pendente |
| 6 — auditoria definitiva | Abrir o app publicado, conferir 10 issues, páginas 6+4, busca e `/post/10`; comparar com este relatório | Pendente | Pendente |

Captura/exportação integral da sessão pode complementar, mas o enunciado consultado não determina um formato de imagem/log exclusivo para cada evidência. Não fabricar prints ou assinaturas para substituir a revisão.
