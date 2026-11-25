import { Header } from './components/Header'
import { Home } from './pages/Home'

export default function App() {
  return <><a className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-input focus:p-4" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo" className="page-container relative -mt-16 pb-16"><Home /></main></>
}
