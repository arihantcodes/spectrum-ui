'use client'

import { useEffect } from 'react'
import { completeUserProfile } from './actions'
import { GitHubUsernameInput } from './github-username-input'
import { SubmitButton } from './submit-button'
import { trackEvent } from '@/lib/events'
import { useState } from 'react'

interface OnboardingFormProps {
  userName: string
  userEmail: string
  defaultGithub: string
  nextUrl: string
}

export function OnboardingForm({
  userName,
  userEmail,
  defaultGithub,
  nextUrl,
}: OnboardingFormProps) {
  const [githubValid, setGithubValid] = useState(false)

  useEffect(() => {
    trackEvent({ name: 'onboarding_started' })
  }, [])

  return (
    <form action={completeUserProfile} className="space-y-5">
      <input type="hidden" name="next" value={nextUrl} />

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-700 dark:text-[#888] uppercase tracking-wider">
          Full Name
        </label>
        <input
          type="text"
          disabled
          value={userName}
          className="w-full bg-neutral-50 dark:bg-[#111] border border-neutral-200 dark:border-[#222] text-neutral-500 dark:text-[#666] px-4 py-2.5 rounded-xl text-sm cursor-not-allowed"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-700 dark:text-[#888] uppercase tracking-wider">
          Email Address
        </label>
        <input
          type="email"
          disabled
          value={userEmail}
          className="w-full bg-neutral-50 dark:bg-[#111] border border-neutral-200 dark:border-[#222] text-neutral-500 dark:text-[#666] px-4 py-2.5 rounded-xl text-sm cursor-not-allowed"
        />
      </div>

      <GitHubUsernameInput
        defaultValue={defaultGithub}
        onValidationChange={setGithubValid}
      />

      <div className="pt-4">
        <SubmitButton disabled={!githubValid} />
      </div>
    </form>
  )
}
