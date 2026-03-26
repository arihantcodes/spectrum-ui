'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconBrandGithub, IconX, IconLock } from '@tabler/icons-react'
import Link from 'next/link'
import { createPortal } from 'react-dom'
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
  const [mounted, setMounted] = useState(false)

  // Handle mounting state for Portal
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Pre-fill GitHub username from session
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
          githubUsername: githubUsername.replace(/^@/, '').trim(),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
        return
      }
      window.location.href = data.checkout_url
    } catch {
      setError('Failed to start checkout. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999]
            flex items-end sm:items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background border border-border rounded-3xl p-6 md:p-8
              w-full max-w-lg shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] my-auto transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="font-bold text-foreground text-2xl tracking-tight">
                  {template.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-primary font-bold">Starting from ${template.price / 100}</span>
                  <span className="text-muted-foreground text-sm">•</span>
                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {template.tagline}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-all 
                  hover:bg-muted p-2 rounded-full -mt-2 -mr-2"
              >
                <IconX size={20} />
              </button>
            </div>

            {/* Content Logic */}
            {!session ? (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto">
                   <IconLock size={32} className="text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Secure Purchase</h3>
                  <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
                    Sign in with GitHub to purchase this template and receive instant repository access.
                  </p>
                </div>
                <Link
                  href={`/sign-in?callbackUrl=${encodeURIComponent(`/pro?buy=${template.slug}`)}`}
                  className="inline-flex items-center justify-center gap-2 w-full
                    bg-foreground text-background hover:opacity-90
                    font-bold text-sm h-12 rounded-xl transition-all"
                >
                  <IconBrandGithub size={18} />
                  Sign in with GitHub
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Form Fields... */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">
                      Account Access
                    </label>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 border border-border rounded-xl text-sm">
                       <span className="text-muted-foreground">Connected:</span>
                       <span className="font-mono font-medium">{session.user?.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">
                      GitHub Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">@</span>
                      <input
                        type="text"
                        value={githubUsername}
                        readOnly={!!(session.user as any)?.githubUsername}
                        onChange={(e) => {
                          setGithubUsername(e.target.value)
                          setError('')
                        }}
                        placeholder="your-handle"
                        className={`w-full bg-background border border-border h-12
                          focus:border-primary focus:ring-4 focus:ring-primary/10
                          rounded-xl pl-8 pr-4 text-sm font-mono outline-none transition-all
                          ${(session.user as any)?.githubUsername ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-500 font-medium">
                    {error}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={handleBuy}
                    disabled={loading || !githubUsername.trim()}
                    className="w-full bg-primary hover:scale-[0.98] active:scale-95
                      disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed
                      text-primary-foreground font-bold h-12 rounded-xl transition-all
                      flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-white rounded-full animate-spin" />
                        Generating Checkout...
                      </span>
                    ) : (
                      <>
                        <IconLock size={18} />
                        Pay Now — Instant Access
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-muted-foreground mt-4 font-medium uppercase tracking-widest">
                    Safe & Secure · 100% Guaranteed Access
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
