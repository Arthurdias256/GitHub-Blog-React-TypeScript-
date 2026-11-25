import { ArrowUpRight, Building2, Github, Users } from 'lucide-react'
import { getProfile } from '../services/github'
import { useResource } from '../hooks/useResource'
import { ErrorState, LoadingState } from './States'

export function ProfileCard() {
  const { data: profile, loading, error, retry } = useResource('profile', getProfile)
  if (loading) return <LoadingState message="Carregando perfil…" />
  if (error) return <ErrorState error={error} onRetry={retry} />
  if (!profile) return null

  return <section aria-labelledby="profile-name" className="panel flex flex-col gap-6 sm:flex-row sm:gap-8">
    <img className="size-28 shrink-0 rounded-lg object-cover sm:size-[148px]" src={profile.avatar_url} alt={`Avatar de ${profile.name || profile.login}`} width="148" height="148" />
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 id="profile-name" className="break-words text-2xl">{profile.name || profile.login}</h1>
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="external-link">GitHub <ArrowUpRight aria-hidden="true" className="size-3" /><span className="sr-only">(abre em nova aba)</span></a>
      </div>
      <p className="mt-2">{profile.bio || 'Este perfil ainda não possui uma biografia.'}</p>
      <div className="metadata mt-5">
        <span><Github aria-hidden="true" />{profile.login}</span>
        {profile.company && <span><Building2 aria-hidden="true" />{profile.company}</span>}
        <span><Users aria-hidden="true" />{profile.followers} {profile.followers === 1 ? 'seguidor' : 'seguidores'}</span>
      </div>
    </div>
  </section>
}
