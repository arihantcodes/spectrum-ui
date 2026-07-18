'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { Icons } from '@/components/icon'
import { cn } from '@/lib/utils'

// Real, installable components from the library — this panel IS the product demo.
import { AnimatedSwitch } from '@/components/spectrumui/animated-switch'
import { FollowButton } from '@/components/spectrumui/follow-button'
import { LikeButton } from '@/components/spectrumui/like-button'
import { NotificationBell } from '@/components/spectrumui/notification-bell'
import { ReactionBar } from '@/components/spectrumui/reaction-bar'
import { StarRating } from '@/components/spectrumui/star-rating'

// Refined expo-style ease-out: content settles into place instead of sliding
// to a linear stop.
const EASE_OUT = [0.16, 1, 0.3, 1] as const

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * The sign-in page's left rail. A dark, always-dark panel (wrapped in `dark`
 * so every showcased component renders its dark theme regardless of the site
 * theme) that presents live, interactive library components inside a small
 * product mock. Replaces the old washed-out illustration.
 */
export function AuthShowcase() {
  const reduce = useReducedMotion()

  // FollowButton is controlled so the follower count rolls with it.
  const [following, setFollowing] = React.useState(false)
  const followers = 2847 + (following ? 1 : 0)

  // Gently tick the bell so the panel feels alive on load (never for
  // reduced-motion users).
  const [bell, setBell] = React.useState(2)
  React.useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setBell((c) => (c >= 9 ? 1 : c + 1)), 5200)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <div className="dark relative hidden overflow-hidden bg-[#0a0a0a] lg:flex lg:flex-col">
      {/* Halftone dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1.4px)] [background-size:16px_16px]"
      />
      {/* Drifting chroma corner glow (brand palette) */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-32 -top-32 h-[440px] w-[440px] rounded-full opacity-40 blur-[90px]',
          !reduce && 'animate-[spin_26s_linear_infinite]',
        )}
        style={{
          background:
            'conic-gradient(from 120deg, #f9452d, #ffb005, #E1F435, #0358f7, #c679c4, #f9452d)',
        }}
      />
      {/* Vignette for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60"
      />

      {/* Brand + headline */}
      <div className="relative z-10 px-10 pt-10 xl:px-14">
        <Reveal>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white p-1.5">
              <Icons.logo className="h-full w-full text-black" />
            </div>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/80">
              Spectrum UI
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-8">
          <span className="flex items-center gap-2.5">
            <span aria-hidden className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#E1F435]" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-white/50">
              Live components
            </span>
          </span>
          <h2 className="mt-3 max-w-[15ch] font-spectral text-[34px] font-light leading-[1.02] tracking-[-0.03em] text-white">
            Interactions you can feel.
          </h2>
          <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-white/50">
            A live sample of animated components from the open-source library. Go ahead — click
            around.
          </p>
        </Reveal>
      </div>

      {/* Live product mock */}
      <div className="relative z-10 mt-8 flex-1 px-10 xl:px-14">
        <Reveal delay={0.16}>
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-t-2xl border border-white/10 bg-neutral-950/80 shadow-2xl backdrop-blur-sm">
            {/* Window bar */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <span className="mx-auto font-mono text-[11px] text-white/40">
                spectrum/feed
              </span>
              <NotificationBell count={bell} />
            </div>

            {/* Feed of real components in context */}
            <div className="space-y-3 p-4">
              {/* FollowButton */}
              <div className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-neutral-900">
                  AJ
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-neutral-100">
                    Arihant Jain
                  </p>
                  <p className="truncate text-xs tabular-nums text-neutral-400">
                    {followers.toLocaleString('en')} followers
                  </p>
                </div>
                <FollowButton following={following} onFollowingChange={setFollowing} />
              </div>

              {/* ReactionBar */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-xs font-medium text-neutral-300">
                    AK
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-neutral-100">
                        Aisha Khan
                      </span>
                      <span className="text-xs text-neutral-500">2:14 PM</span>
                    </div>
                    <p className="mt-0.5 text-sm text-neutral-400">
                      Just shipped the new onboarding flow 🎉
                    </p>
                    <ReactionBar
                      className="mt-2.5"
                      defaultReactions={[
                        { emoji: '👍', count: 4, reacted: true },
                        { emoji: '🎉', count: 2 },
                        { emoji: '🚀', count: 1 },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* StarRating + LikeButton */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-3">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-neutral-300">
                    Rate your experience
                  </span>
                  <StarRating showValue label="Rate your experience" />
                </div>
                <LikeButton count={1248} />
              </div>

              {/* AnimatedSwitch */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900 px-3.5 py-3">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-neutral-100">
                    Email notifications
                  </span>
                  <span className="text-xs text-neutral-500">
                    Product updates and releases
                  </span>
                </div>
                <AnimatedSwitch defaultChecked label="Email notifications" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
