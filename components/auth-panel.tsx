'use client'

import * as React from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { Icons } from '@/components/icon'
import { cn } from '@/lib/utils'
import { signInWithProvider } from '@/app/sign-in/actions'

// Strong ease-out for entrances (Emil Kowalski's UI easing).
const EASE_OUT = [0.23, 1, 0.32, 1] as const

function GitHubIcon() {
  return (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.615 24 12.255 24z" />
      <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z" />
      <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
    </svg>
  )
}

type Mode = 'signin' | 'signup'

/**
 * Right column of the sign-in page. OAuth-only (GitHub / Google), so the
 * sign-in / sign-up toggle just reframes the copy — both trigger the same
 * provider flow, which is exactly how an OAuth-only product should behave.
 */
export function AuthPanel({ redirectTo }: { redirectTo: string }) {
  const reduce = useReducedMotion()
  const [mode, setMode] = React.useState<Mode>('signin')
  const isSignin = mode === 'signin'

  const githubAction = signInWithProvider.bind(null, 'github', redirectTo)
  const googleAction = signInWithProvider.bind(null, 'google', redirectTo)

  const enter = (i: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: i * 0.05 } }
      : {
          initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: 0.5, delay: 0.05 + i * 0.06, ease: EASE_OUT },
        }

  const tap = reduce ? undefined : { scale: 0.98 }

  return (
    <div className="flex flex-col bg-white px-6 transition-colors sm:px-12 lg:px-16 xl:px-20 dark:bg-[#080808]">
      {/* Top bar */}
      <motion.div {...enter(0)} className="flex items-center justify-between pb-4 pt-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 p-1.5 shadow-sm transition-shadow group-hover:shadow-md dark:border-transparent dark:bg-white">
            <Icons.logo className="h-full w-full text-black" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-[#F5F5F5]">
            Spectrum UI
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-neutral-400 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white"
        >
          Back home
        </Link>
      </motion.div>

      {/* Centered content */}
      <div className="mx-auto flex w-full max-w-[380px] flex-1 flex-col justify-center py-10">
        {/* Sign in / Sign up segmented toggle */}
        <motion.div
          {...enter(1)}
          className="mx-auto mb-8 inline-flex rounded-full border border-neutral-200 bg-neutral-100/70 p-1 dark:border-neutral-800 dark:bg-neutral-900/70"
        >
          {(['signin', 'signup'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className="relative rounded-full px-5 py-1.5 text-sm font-medium outline-none"
            >
              {mode === m && (
                <motion.span
                  layoutId="auth-seg"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-neutral-800"
                />
              )}
              <span
                className={cn(
                  'relative z-10 transition-colors',
                  mode === m
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-500 dark:text-neutral-400',
                )}
              >
                {m === 'signin' ? 'Sign in' : 'Sign up'}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Heading (crossfades between modes) */}
        <motion.div {...enter(2)} className="mb-8 text-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, filter: 'blur(4px)' }}
              transition={{ duration: 0.24, ease: EASE_OUT }}
            >
              <h1 className="font-spectral text-[30px] font-light leading-tight tracking-[-0.02em] text-neutral-900 dark:text-[#F5F5F5]">
                {isSignin ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-[#8a8a8a]">
                {isSignin
                  ? 'Sign in to your components, CLI & templates.'
                  : 'Free forever — no credit card required.'}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* OAuth */}
        <motion.div {...enter(3)} className="flex flex-col gap-3">
          <form action={githubAction}>
            <motion.button
              type="submit"
              whileTap={tap}
              className="flex h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-neutral-900 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-800 dark:bg-white dark:text-[#0a0a0a] dark:hover:bg-neutral-100"
            >
              <GitHubIcon />
              Continue with GitHub
            </motion.button>
          </form>

          <div className="my-1 flex items-center gap-3">
            <div className="h-px flex-1 bg-neutral-200 dark:bg-[#1f1f1f]" />
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
              or
            </span>
            <div className="h-px flex-1 bg-neutral-200 dark:bg-[#1f1f1f]" />
          </div>

          <form action={googleAction}>
            <motion.button
              type="submit"
              whileTap={tap}
              className="flex h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 dark:border-[#2a2a2a] dark:bg-[#111] dark:text-[#F5F5F5] dark:hover:bg-[#1a1a1a]"
            >
              <GoogleIcon />
              Continue with Google
            </motion.button>
          </form>
        </motion.div>

        {/* Terms */}
        <motion.p
          {...enter(4)}
          className="mt-8 text-center text-[11px] leading-relaxed text-neutral-400 dark:text-neutral-600"
        >
          By continuing you agree to our{' '}
          <a
            href="/tos"
            className="underline underline-offset-2 transition-colors hover:text-neutral-600 dark:hover:text-neutral-400"
          >
            Terms
          </a>
          . Free forever · No credit card required.
        </motion.p>
      </div>

      <div className="pb-8" />
    </div>
  )
}
