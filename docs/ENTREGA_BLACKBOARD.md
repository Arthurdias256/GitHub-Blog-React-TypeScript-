# Checklist específico — entrega no Blackboard

Fonte: Notion, seções 11 e 13. Data, horário, local de envio e regras adicionais só estão no Blackboard e **não foram consultados pelo agente**. Não inventar prazo nem exigência de ZIP/PDF/vídeo.

## 1. Conferência técnica já realizada pelo agente
- [x] Repositório do aluno público, mantendo código e histórico existentes.
- [x] Dez issues de conteúdo reais na conta Arthurdias256; conteúdo Markdown e apoio de IA declarado.
- [x] Aplicação pública com perfil, busca/paginação real e detalhe Markdown direto/reload.
- [x] PRD_SPEC, TECH_SPEC e TASKS_SPEC em docs/; AGENTS.md na raiz.
- [x] README com instalação, configuração, scripts, arquitetura, links e limitações.
- [x] docs/AI_USAGE.md com mais de três registros e distinção entre verificação do agente/aluno.
- [x] Testes e screenshots reais de Home, busca, detalhe e mobile.
- [x] Lint, TypeScript, 34 Vitest, 12 E2E e build aprovados; logs anexos ao repositório.
- [x] CI vermelho explicado com anotação real; não declarado teste reprovado nem ocultado.

## 2. Ações que o aluno precisa realizar antes de enviar
- [ ] Abrir o Blackboard e conferir disciplina, atividade correta, prazo/data e instruções adicionais. Registrar essas informações pessoalmente.
- [ ] Revisar os dez textos das issues e o código que será explicado; não afirmar compreensão apenas por ter recebido a aplicação.
- [ ] Executar sua verificação pessoal de pelo menos três evidências de IA e preencher o registro no final de AI_USAGE.md com data, ação e resultado reais.
- [ ] Abrir os dois links abaixo em janela anônima, sem login: conferir repositório/SPEC/issues públicos e aplicação acessível.
- [ ] Demonstrar Home → busca → página → detalhe → reload → Voltar, sem dados fictícios. Conferir pelo menos um celular/viewport mobile.
- [ ] Confirmar que a última revisão e docs/AUDITORIA_FINAL.md aparecem no GitHub; comparar o último commit com `git log -1` local, se disponível.
- [ ] Testar a apresentação com APRESENTACAO.md e explicar Props, estados, efeitos, Hook, Axios, tipos e rotas sem inventar experiências.

## 3. Texto-base para o campo de entrega
Copie os links; personalize a identificação do aluno se o Blackboard solicitar. Não copie declarações de apresentação/revisão como já concluídas sem realizá-las.

```text
Projeto de recuperação — GitHub Blog

Repositório público:
https://github.com/Arthurdias256/GitHub-Blog-React-TypeScript-

Aplicação publicada:
https://github-blog-arthurdias256.vercel.app

Especificações, testes, evidências de IA, screenshots e auditoria final estão na pasta docs/ do repositório.
As publicações são issues reais do próprio repositório.
Uso de OpenCode/IA documentado em docs/AI_USAGE.md.
GitHub Actions não iniciou por bloqueio de faturamento da conta; validações locais e da aplicação publicada estão registradas.
```

## 4. Envio e apresentação — não executáveis pelo agente
- [ ] Colar os **dois links exigidos** no local correto; verificar se continuam clicáveis após salvar.
- [ ] Confirmar envio efetivo no Blackboard, não apenas rascunho; guardar comprovante real quando a plataforma permitir.
- [ ] Comparecer/demonstrar individualmente na data informada, explicar decisões essenciais e responder às perguntas sobre o código real.
- [ ] Resolver o bloqueio da conta GitHub se desejar reexecutar a CI; não pagar/alterar cobrança por recomendação automática do agente sem conferir a conta.

**Atenção:** mínimo 71/100 não substitui as condições da seção 13. Não apresentar/explicar ou não entregar os artefatos públicos pode impedir aprovação mesmo com a estimativa técnica de 9,7 da auditoria.
