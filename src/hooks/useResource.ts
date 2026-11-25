import { useEffect, useState } from 'react'
import { normalizeApiError } from '../services/api'
import type { ApiError } from '../services/api'

interface Snapshot<T> { key: string; data?: T; error?: ApiError }

export function useResource<T>(resourceKey: string, load: (signal: AbortSignal) => Promise<T>) {
  const [attempt, setAttempt] = useState(0)
  const key = `${resourceKey}:${attempt}`
  const [snapshot, setSnapshot] = useState<Snapshot<T>>({ key: '' })

  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal).then(
      data => { if (!controller.signal.aborted) setSnapshot({ key, data }) },
      error => { if (!controller.signal.aborted) setSnapshot({ key, error: normalizeApiError(error) }) },
    )
    return () => controller.abort()
  }, [key, load])

  const current = snapshot.key === key
  return { data: current ? snapshot.data : undefined, error: current ? snapshot.error : undefined, loading: !current, retry: () => setAttempt(value => value + 1) }
}
