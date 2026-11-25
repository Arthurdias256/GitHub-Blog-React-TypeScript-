import { Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Header() {
  return <header className="relative h-[250px] overflow-hidden bg-profile sm:h-[296px]">
    <div aria-hidden="true" className="absolute inset-0 opacity-30">
      <div className="absolute top-16 -left-20 h-24 w-[38%] -skew-x-12 border-y border-accent" />
      <div className="absolute top-28 -right-20 h-20 w-[38%] -skew-x-12 border-y border-accent" />
      <div className="absolute top-24 left-0 w-[24%] border-t border-accent" />
      <div className="absolute top-40 right-0 w-[26%] border-t border-accent" />
    </div>
    <Link to="/" aria-label="GitHub Blog — página inicial" className="relative mx-auto flex w-fit flex-col items-center gap-3 pt-12 text-accent sm:pt-14">
      <Terminal aria-hidden="true" className="size-10" strokeWidth={1.5} />
      <span className="text-xl font-bold tracking-wider">GITHUB BLOG</span>
    </Link>
  </header>
}
