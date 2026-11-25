// Administrative script, never imported by the browser application.
import { execFileSync } from 'node:child_process'
import axios from 'axios'

const repository = 'Arthurdias256/GitHub-Blog-React-TypeScript-'
const posts = [
  {
    title: 'React: componentes, Props e uma interface que evolui',
    introduction: 'Componentes permitem dividir uma interface em partes pequenas. No GitHub Blog, perfil, cards e paginação têm responsabilidades diferentes e podem ser compreendidos isoladamente.',
    sections: 'Uma Prop é uma entrada fornecida pelo componente pai. O card recebe uma issue tipada e não precisa saber como a API foi chamada. Isso facilita reutilização e testes.\n\nEstado guarda valores que mudam ao longo da interação. Props não devem ser alteradas pelo componente filho; uma ação é comunicada por callbacks.',
    code: 'interface CardProps { title: string }\nfunction Card({ title }: CardProps) {\n  return <article><h2>{title}</h2></article>\n}',
    language: 'tsx',
    checklist: ['Separar a busca HTTP da apresentação.', 'Usar chaves estáveis, como issue.id, nas listas.', 'Evitar duplicar em estado dados que podem ser derivados de Props.'],
    url: 'https://react.dev/learn/passing-props-to-a-component',
  },
  {
    title: 'TypeScript: contratos claros para respostas de APIs',
    introduction: 'Uma resposta HTTP pode conter campos nulos, objetos aninhados e propriedades opcionais. Modelar esse contrato reduz ambiguidades no código que apresenta os dados.',
    sections: 'O nome do usuário pode ser null, enquanto login continua sendo o identificador público. O código precisa definir um fallback. A anotação de tipo não valida JSON em tempo de execução: ela ajuda o compilador, mas não transforma uma resposta inválida em válida.\n\nPrefira unknown ao receber algo ainda não verificado. Use refinamentos e verificações antes de acessar propriedades. Evite any para esconder uma dúvida sobre o formato dos dados.',
    code: 'interface Profile { name: string | null; login: string }\nconst displayName = (profile: Profile) => profile.name || profile.login',
    language: 'ts',
    checklist: ['Tipar Props e respostas.', 'Modelar null explicitamente.', 'Executar tsc em todas as configurações do projeto.'],
    url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
  },
  {
    title: 'Axios e REST: consultas canceláveis ao GitHub',
    introduction: 'Centralizar o cliente HTTP evita repetir URL base, timeout e cabeçalhos. Na busca de um blog, cancelamento também faz parte da experiência: uma resposta antiga não deve substituir uma pesquisa recente.',
    sections: 'AbortController fornece um signal que o Axios pode receber. Ao desmontar o componente ou alterar a consulta, abortamos o trabalho anterior. Além disso, verificamos o sinal antes de gravar a resposta no estado.\n\nTimeout, falha de rede, 404 e rate limit têm causas distintas. Uma mensagem genérica pode ser útil como fallback, mas não deve esconder os estados que o leitor consegue resolver.',
    code: 'const controller = new AbortController()\nconst response = await api.get("/search/issues", {\n  signal: controller.signal,\n  params: { q: "repo:owner/blog is:issue", page: 1, per_page: 6 },\n})\n// Na limpeza do efeito: controller.abort()',
    language: 'ts',
    checklist: ['Usar params para codificar a consulta.', 'Definir timeout.', 'Não fazer retry automático infinito.'],
    url: 'https://axios-http.com/docs/cancellation',
  },
  {
    title: 'Tailwind CSS: responsividade sem perder a identidade visual',
    introduction: 'Um layout responsivo reorganiza o conteúdo preservando sua hierarquia. A grade de publicações pode ter duas colunas no desktop e uma no celular sem criar uma segunda aplicação.',
    sections: 'Comece pela largura estreita. Depois adicione breakpoints quando o conteúdo precisar de mais espaço. Min-width: 0 em filhos de flex e grid evita que textos longos empurrem a página para fora da viewport.\n\nBlocos de código precisam de rolagem horizontal própria. Imagens devem respeitar max-width: 100%. Não esconda overflow na página inteira apenas para mascarar um componente maior que o espaço disponível.',
    code: '<section className="grid grid-cols-1 gap-8 md:grid-cols-2">\n  {issues.map(issue => <IssueCard key={issue.id} issue={issue} />)}\n</section>',
    language: 'tsx',
    checklist: ['Testar 320px e desktop amplo.', 'Manter área de toque confortável.', 'Verificar textos e URLs longos.'],
    url: 'https://tailwindcss.com/docs/responsive-design',
  },
  {
    title: 'React Router: URLs que representam o conteúdo do blog',
    introduction: 'Uma SPA não precisa perder URLs compartilháveis. Cada publicação deve ser acessível por uma rota como /post/5, inclusive após atualizar a página.',
    sections: 'Links internos usam o roteador para trocar a tela sem um carregamento completo do documento. O componente de detalhe lê o parâmetro e faz uma requisição individual, em vez de depender de um card aberto anteriormente.\n\nNa hospedagem estática é necessário encaminhar rotas desconhecidas para index.html. Sem esse fallback, a navegação local pode funcionar enquanto um acesso direto em produção retorna 404 do servidor.',
    code: '<Routes>\n  <Route path="/" element={<Home />} />\n  <Route path="/post/:issueNumber" element={<PostDetails />} />\n  <Route path="*" element={<NotFound />} />\n</Routes>',
    language: 'tsx',
    checklist: ['Testar acesso direto.', 'Preservar busca e página na URL.', 'Oferecer retorno mesmo sem histórico anterior.'],
    url: 'https://reactrouter.com/start/declarative/routing',
  },
  {
    title: 'Acessibilidade: teclado, foco e mensagens que fazem sentido',
    introduction: 'Acessibilidade não é apenas acrescentar atributos ARIA. A base é usar elementos HTML adequados e manter as interações compreensíveis por teclado e tecnologias assistivas.',
    sections: 'Links levam a outro recurso; botões executam ações. Um input de busca precisa de label associado, e o foco deve continuar visível. Mensagens de erro precisam explicar o problema e oferecer uma ação útil.\n\nRegiões live podem anunciar a quantidade de resultados sem mover o foco. Não anuncie uma lista inteira a cada tecla. Testes automáticos detectam parte das barreiras, mas não substituem navegação manual e avaliação de leitura.',
    code: '<label htmlFor="search">Buscar publicações</label>\n<input id="search" type="search" />\n<p role="status" aria-live="polite">10 publicações encontradas</p>',
    language: 'html',
    checklist: ['Percorrer links e botões com Tab.', 'Não remover outline sem substituto.', 'Testar zoom e contraste.'],
    url: 'https://www.w3.org/WAI/WCAG22/quickref/',
  },
  {
    title: 'Testes automatizados: confiança além do caminho feliz',
    introduction: 'Uma busca que funciona uma vez não demonstra que ela é resiliente. Testes devem observar também paginação, respostas vazias, falhas e navegação direta para detalhes.',
    sections: 'Mocks HTTP tornam os cenários determinísticos. MSW intercepta a fronteira de rede e permite usar o Axios real sem depender do GitHub a cada execução. A integração pública deve ser verificada separadamente.\n\nE2E confirma o fluxo no navegador. Asserções devem privilegiar papéis e nomes acessíveis. Evite temporizadores arbitrários: espere por um elemento ou uma resposta conhecida.',
    code: 'await page.getByRole("searchbox", { name: "Buscar publicações" }).fill("React")\nawait expect(page.getByRole("status")).toContainText("publicação")',
    language: 'ts',
    checklist: ['Testar falha de rede e retry.', 'Testar pesquisa que volta para página 1.', 'Separar fixtures dos dados de produção.'],
    url: 'https://playwright.dev/docs/best-practices',
  },
  {
    title: 'Git: commits pequenos contam a história de uma solução',
    introduction: 'Versionar não significa guardar apenas o resultado final. Um histórico incremental explica decisões, facilita revisão e permite identificar em qual etapa um comportamento mudou.',
    sections: 'Antes de cada commit, observe o status e revise o diff. Adicione apenas arquivos da tarefa, execute as verificações pertinentes e não inclua segredos ou diretórios gerados.\n\nUma mensagem semântica resume a intenção. O corpo pode registrar uma limitação relevante ou o motivo de uma decisão. Não reescreva o trabalho de outras pessoas para produzir um histórico aparentemente limpo.',
    code: 'git status --short\ngit diff --check\ngit diff --cached\ngit commit -m "feat: implementa busca de publicacoes"',
    language: 'sh',
    checklist: ['Preservar package-lock.json.', 'Ignorar .env e node_modules.', 'Registrar evidência de testes reais.'],
    url: 'https://git-scm.com/docs/git-commit',
  },
  {
    title: 'Segurança em uma SPA: variáveis públicas não guardam segredos',
    introduction: 'Uma aplicação estática é enviada ao navegador. Tudo que compõe esse bundle pode ser inspecionado, inclusive variáveis de ambiente incorporadas durante o build.',
    sections: 'Variáveis VITE_* são configuração pública. Elas servem para indicar usuário e repositório, não para armazenar um token pessoal. Endpoints públicos do GitHub funcionam sem autenticação, sujeitos ao limite de requisições.\n\nMarkdown deve ser renderizado sem executar HTML arbitrário. Links externos usam protocolos seguros e rel apropriado; imagens remotas podem gerar requisições a terceiros. Avaliar essa fronteira é parte do projeto, não um detalhe cosmético.',
    code: '# Configuração pública, não é segredo\nVITE_GITHUB_USERNAME=Arthurdias256\n# Nunca colocar um token pessoal em VITE_*',
    language: 'env',
    checklist: ['Revisar o bundle e o histórico.', 'Não usar dangerouslySetInnerHTML para issues.', 'Tratar limites sem expor uma credencial no cliente.'],
    url: 'https://vite.dev/guide/env-and-mode',
  },
  {
    title: 'Markdown e documentação: conteúdo técnico legível no GitHub Blog',
    introduction: 'Issues podem ser publicações completas. Markdown oferece uma linguagem simples para organizar ideias, destacar conceitos, mostrar código e relacionar referências sem montar HTML manualmente.',
    sections: 'No resumo do card, a sintaxe deve ser removida para priorizar leitura. No detalhe, a estrutura é preservada: títulos, listas, tabelas, citações e código cumprem papéis diferentes.\n\n| Elemento | Uso |\n| --- | --- |\n| **Título** | Organizar o assunto |\n| `código` | Nomear uma expressão |\n| *Ênfase* | Destacar uma observação |\n\n> Documentação útil descreve o que existe, seus limites e como verificar o comportamento.\n\n![Marca do GitHub](https://github.githubassets.com/favicons/favicon.svg)',
    code: '## Uma seção\n\n- Primeiro passo\n- Segundo passo\n\n[Referência](https://docs.github.com/)',
    language: 'md',
    checklist: ['Documentar resultados realmente executados.', 'Manter SPEC em sincronia com o código.', 'Preparar explicações com arquivos concretos.'],
    url: 'https://docs.github.com/en/get-started/writing-on-github',
  },
]

process.env.GIT_TERMINAL_PROMPT = '0'
process.env.GCM_INTERACTIVE = 'Never'
try {
  const raw = execFileSync('git', ['credential', 'fill'], { input: 'protocol=https\nhost=github.com\n\n', encoding: 'utf8', timeout: 15000, stdio: ['pipe', 'pipe', 'pipe'] })
  const token = raw.split('\n').find(line => line.startsWith('password='))?.slice(9).trim()
  if (!token) throw new Error('Credencial indisponível')
  const api = axios.create({ baseURL: 'https://api.github.com', timeout: 20000, headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' } })
  const { data: user } = await api.get('/user')
  const { data: repo } = await api.get(`/repos/${repository}`)
  if (user.login !== 'Arthurdias256' || !repo.permissions.push || repo.private) throw new Error('Permissão ou repositório incorreto')
  const { data: existing } = await api.get(`/repos/${repository}/issues`, { params: { state: 'all', per_page: 100 } })
  for (const post of posts) {
    const found = existing.find(issue => !issue.pull_request && issue.title === post.title)
    if (found) { console.log(`Existente: ${found.html_url}`); continue }
    const body = `${post.introduction}\n\n## Conceitos e decisões\n\n${post.sections}\n\n## Exemplo\n\n\`\`\`${post.language}\n${post.code}\n\`\`\`\n\n## Checklist prático\n\n${post.checklist.map(item => `- ${item}`).join('\n')}\n\n## Referência\n\n[Documentação oficial](${post.url})\n\n---\n\nPublicação preparada com apoio do OpenCode para este projeto acadêmico. Revisão e apresentação individual pelo aluno permanecem necessárias.`
    const { data } = await api.post(`/repos/${repository}/issues`, { title: post.title, body })
    console.log(`Criada: ${data.html_url}`)
  }
} catch (error) {
  console.error('Falha ao preparar issues. Credenciais omitidas.', axios.isAxiosError(error) ? { status: error.response?.status, message: error.response?.data?.message || error.code } : error instanceof Error ? error.message : 'Erro desconhecido')
  process.exitCode = 1
}
