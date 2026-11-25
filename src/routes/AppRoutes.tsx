import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Home } from '../pages/Home'
import { PostDetails } from '../pages/PostDetails'
import { NotFound } from '../pages/NotFound'

export function AppRoutes() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = 'GitHub Blog'
    document.getElementById('conteudo')?.focus({ preventScroll: true })
    window.scrollTo(0, 0)
  }, [pathname])
  return <Routes><Route path="/" element={<Home />} /><Route path="/post/:issueNumber" element={<PostDetails />} /><Route path="*" element={<NotFound />} /></Routes>
}
