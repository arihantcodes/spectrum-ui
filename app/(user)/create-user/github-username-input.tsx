'use client'

import { useState } from 'react'
import { IconBrandGithub } from '@tabler/icons-react'
import { Loader2, CheckCircle2 } from 'lucide-react'

interface GitHubUsernameInputProps {
  defaultValue?: string
}

export function GitHubUsernameInput({ defaultValue = '' }: GitHubUsernameInputProps) {
  const [githubError, setGithubError] = useState<string | null>(null)
  const [githubLoading, setGithubLoading] = useState(false)
  const [isValid, setIsValid] = useState<boolean | null>(null)

  const handleGithubBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const username = e.target.value.trim()
    if (!username) {
      setGithubError(null)
      setIsValid(null)
      return
    }

    setGithubLoading(true)
    setGithubError(null)
    setIsValid(null)

    try {
      const res = await fetch(`https://api.github.com/users/${username}`)
      if (!res.ok) {
        if (res.status === 404) throw new Error('User not found')
        else throw new Error('Failed to fetch')
      }
      setIsValid(true)
    } catch {
      setGithubError('Please enter a valid GitHub username')
      setIsValid(false)
    } finally {
      setGithubLoading(false)
    }
  }

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-neutral-900 dark:text-[#CCC] uppercase tracking-wider flex items-center justify-between">
        <span>GitHub Username</span>
        <span className="text-[10px] text-neutral-400 dark:text-[#555] normal-case tracking-normal font-normal">Required for repo access</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <IconBrandGithub size={16} className="text-neutral-400 dark:text-[#555]" />
        </div>
        <input 
          type="text" 
          name="github_username"
          required
          defaultValue={defaultValue}
          placeholder="e.g. torvalds"
          onBlur={handleGithubBlur}
          className={`w-full bg-white dark:bg-[#0C0C0C] border ${
            isValid === true
              ? 'border-green-500 dark:border-green-500'
              : isValid === false
              ? 'border-red-500 dark:border-red-500'
              : 'border-neutral-300 dark:border-[#333]'
          } focus:border-neutral-900 dark:focus:border-neutral-100 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 text-neutral-900 dark:text-[#F5F5F5] pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all placeholder:text-neutral-400 dark:placeholder:text-[#444]`}
        />
        {/* Status icon inside input */}
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
          {githubLoading && <Loader2 size={14} className="animate-spin text-neutral-400" />}
          {isValid === true && <CheckCircle2 size={14} className="text-green-500" />}
        </div>
      </div>

      {/* Error message */}
      {githubError && (
        <p className="text-sm text-red-500 dark:text-red-400">
          {githubError}
        </p>
      )}
    </div>
  )
}

