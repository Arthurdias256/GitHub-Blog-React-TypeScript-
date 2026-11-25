import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'
import { LoadingState } from '../components/States'

const PostDetails = lazy(() => import('../pages/PostDetails').then(module => ({ default: module.PostDetails })))

export function AppRoutes() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = 'GitHub Blog'
    document.getElementById('conteudo')?.focus({ preventScroll: true })
    window.scrollTo(0, 0)
  }, [pathname])
  return <Suspense fallback={<LoadingState message="Carregando publicação…" />}><Routes><Route path="/" element={<Home />} /><Route path="/post/:issueNumber" element={<PostDetails />} /><Route path="*" element={<NotFound />} /></Routes></Suspense>
}
