import { Header } from './components/Header'

export default function App() {
  return <><a className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-input focus:p-4" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo" className="page-container relative -mt-16 pb-16"><section className="panel"><h1 className="text-2xl">GitHub Blog</h1><p>Publicações sobre desenvolvimento de software.</p></section></main></>
}
