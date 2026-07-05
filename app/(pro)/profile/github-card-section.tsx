'use client'

import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { GitHubUserCard, type GitHubUser } from '@/components/github-profile-card'

interface GitHubCardSectionProps {
  username: string
}

export function GitHubCardSection({ username }: GitHubCardSectionProps) {
  const [data, setData] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!username) {
      setLoading(false)
      return
    }

    const fetchGitHubData = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`)
        if (!res.ok) throw new Error('Not found')
        const json = await res.json()
        setData(json as GitHubUser)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [username])

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-6 text-sm text-neutral-500 dark:text-[#666]">
        <Loader2 size={14} className="animate-spin" />
        Loading GitHub profile…
      </div>
    )
  }

  if (error || !data) return null

  return (
    <div className="pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-sm font-semibold text-neutral-900 dark:text-[#F5F5F5] mb-4 tracking-tight">
        GitHub Profile
      </h2>
      <GitHubUserCard user={data} />
    </div>
  )
}
