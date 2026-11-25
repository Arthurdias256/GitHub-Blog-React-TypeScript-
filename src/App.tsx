import { Header } from './components/Header'
import { AppRoutes } from './routes/AppRoutes'

export default function App() {
  return <><a className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-input focus:p-4" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo" tabIndex={-1} className="page-container relative -mt-16 pb-16 focus:outline-none"><AppRoutes /></main></>
}
