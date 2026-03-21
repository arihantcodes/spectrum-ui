'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconBrandGithub, IconX, IconLock } from '@tabler/icons-react'
import Link from 'next/link'

import { type Template } from '@/types'

interface BuyModalProps {
  isOpen:   boolean
  onClose:  () => void
  template: Pick<Template, 'slug' | 'name' | 'price' | 'tagline'>
}

export function BuyModal({ isOpen, onClose, template }: BuyModalProps) {
  const { data: session } = useSession()
  const [githubUsername, setGithubUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  // Pre-fill GitHub username from session when it loads
  useEffect(() => {
    if (session?.user) {
      const ghUser = (session.user as any)?.githubUsername
      if (ghUser) setGithubUsername(ghUser)
    }
  }, [session])

  const handleBuy = async () => {
    if (!githubUsername.trim()) {
      setError('GitHub username is required for repo access')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateSlug:   template.slug,
          githubUsername: githubUsername.replace('@', '').trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
        return
      }

      // Redirect to Dodo hosted checkout
      window.location.href = data.checkout_url
    } catch {
      setError('Failed to start checkout. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50
            flex items-end sm:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111] border border-[#222] rounded-2xl p-6
              w-full max-w-md
              [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05),
                0_24px_64px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="font-semibold text-[#F5F5F5] text-lg">
                  {template.name}
                </h2>
                <p className="text-sm text-[#666] mt-0.5">
                  {template.tagline}
                </p>
              </div>
              <button onClick={onClose}
                className="text-[#444] hover:text-[#888] transition-colors p-1">
                <IconX size={18} />
              </button>
            </div>

            {/* Not signed in — redirect to sign in, then bounce back with ?buy=slug */}
            {!session ? (
              <div className="text-center py-4">
                <p className="text-sm text-[#666] mb-4">
                  Sign in to purchase this template
                </p>
                <Link
                  href={`/sign-in?callbackUrl=${encodeURIComponent(`/pro?buy=${template.slug}`)}`}
                  className="inline-flex items-center gap-2
                    bg-[#F5F5F5] hover:bg-white text-[#080808]
                    font-semibold text-sm px-5 py-2.5 rounded-lg
                    transition-colors"
                >
                  <IconBrandGithub size={16} />
                  Sign in with GitHub
                </Link>
              </div>
            ) : (
              <>
                {/* Signed in — show purchase form */}
                <div className="space-y-4">

                  {/* Email — pre-filled, read only */}
                  <div>
                    <label className="text-xs text-[#555] mb-1.5 block font-medium uppercase tracking-wider">
                      Email
                    </label>
                    <div className="bg-[#0D0D0D] border border-[#1A1A1A]
                      rounded-lg px-4 py-2.5 text-sm text-[#555] font-mono">
                      {session.user?.email}
                    </div>
                  </div>

                  {/* GitHub username */}
                  <div>
                    <label className="text-xs text-[#555] mb-1.5 block font-medium uppercase tracking-wider">
                      GitHub Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2
                        text-[#444] text-sm">
                        @
                      </span>
                      <input
                        type="text"
                        value={githubUsername}
                        onChange={(e) => {
                          setGithubUsername(e.target.value)
                          setError('')
                        }}
                        placeholder="yourusername"
                        className="w-full bg-[#161616] border border-[#222]
                          focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/20
                          rounded-lg pl-7 pr-4 py-2.5 text-sm text-[#F5F5F5]
                          placeholder:text-[#333] outline-none transition-all font-mono"
                      />
                    </div>
                    <p className="text-xs text-[#444] mt-1.5">
                      We&apos;ll add this account to the private repo on purchase
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-xs text-red-400 bg-red-500/8
                      border border-red-500/15 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}
                </div>

                {/* Price + CTA */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleBuy}
                    disabled={loading || !githubUsername.trim()}
                    className="w-full bg-[#6366F1] hover:bg-[#4F46E5]
                      disabled:opacity-40 disabled:cursor-not-allowed
                      text-white font-semibold text-sm
                      py-3 rounded-xl transition-colors
                      flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      'Redirecting to checkout…'
                    ) : (
                      <>
                        <IconLock size={15} />
                        Pay ${template.price / 100} — Get instant access
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[#444]">
                    One-time payment · Full source code · Yours forever
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
