'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import {
  Zap,
  LayoutTemplate,
  Component,
  MessageCircle,
  LifeBuoy,
  Infinity,
  Check,
  Loader2,
} from 'lucide-react'
import { PRO_CONFIG, PRO_FEATURES } from '@/lib/pro-config'
import { trackEvent } from '@/lib/events'

const FEATURE_ICONS = {
  templates: LayoutTemplate,
  components: Component,
  discord: MessageCircle,
  support: LifeBuoy,
  license: Infinity,
  updates: Zap, // Changed to 'Zap' icon for 'updates'
} as const

interface ProWaitlistCardProps {
  alreadyJoined?: boolean
}

export function ProWaitlistCard({ alreadyJoined = false }: ProWaitlistCardProps) {
  const { data: session } = useSession()
  const [githubUsername, setGithubUsername] = useState(
    () => session?.user?.githubUsername ?? ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (session?.user?.githubUsername) {
      setGithubUsername(session.user.githubUsername)
    }
  }, [session?.user?.githubUsername])

  useEffect(() => {
    trackEvent({ name: 'pro_page_viewed' })
  }, [])

  const handleJoin = async () => {
    if (!githubUsername.trim()) {
      setError('GitHub username is required')
      return
    }

    setLoading(true)
    setError('')
    trackEvent({ name: 'pro_waitlist_checkout_initiated' })

    try {
      const res = await fetch('/api/checkout/pro-waitlist', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          githubUsername: githubUsername.replace(/^@/, '').trim(),
        }),
      })

      const contentType = res.headers.get('content-type') ?? ''
      const data = contentType.includes('application/json')
        ? ((await res.json()) as { error?: string; checkout_url?: string })
        : { error: await res.text() }

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
        return
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url
        return
      }

      setError('Checkout URL missing. Please try again or contact support.')
    } catch {
      setError('Failed to start checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="relative px-6 pt-8 pb-10 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-sky-100 via-sky-50 to-white dark:from-sky-950/60 dark:via-sky-900/20 dark:to-neutral-950"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(14 165 233 / 0.35) 1px, transparent 0)',
            backgroundSize: '18px 18px',
          }}
          aria-hidden
        />

        <div className="relative">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 text-white mb-4 shadow-lg shadow-sky-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
            {PRO_CONFIG.name}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 px-2">
            {PRO_CONFIG.tagline}
          </p>

          <div className="mb-1">
            <span className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
              ${PRO_CONFIG.waitlistFeeUsd}
            </span>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Early-bird waitlist · Perpetual license
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-5 space-y-3.5 border-t border-neutral-100 dark:border-neutral-800">
        {PRO_FEATURES.map((feature) => {
          const Icon = FEATURE_ICONS[feature.icon]
          return (
            <div key={feature.label} className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {feature.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <div className="px-6 pb-6 pt-2 space-y-3">
        {alreadyJoined ? (
          <div className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 text-green-700 dark:text-green-400 text-sm font-semibold">
            <Check className="w-4 h-4" />
            You&apos;re on the waitlist
          </div>
        ) : !session ? (
          <Link
            href={`/sign-in?callbackUrl=${encodeURIComponent('/pro')}`}
            className="flex items-center justify-center w-full py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-semibold transition-colors"
          >
            Sign in to join waitlist
          </Link>
        ) : (
          <>
            {!session.user?.githubUsername && (
              <div>
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1.5 block">
                  GitHub username
                </label>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => {
                    setGithubUsername(e.target.value)
                    setError('')
                  }}
                  placeholder="your-handle"
                  className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              onClick={handleJoin}
              disabled={loading || !githubUsername.trim()}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-semibold transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Redirecting to checkout…
                </>
              ) : (
                `Join waitlist — $${PRO_CONFIG.waitlistFeeUsd}`
              )}
            </button>
          </>
        )}

      </div>
    </div>
  )
}
