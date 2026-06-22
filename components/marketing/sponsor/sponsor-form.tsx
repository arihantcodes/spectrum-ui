"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { submitSponsorApplication } from "@/app/(marketing)/sponsor/actions"
import { Check, Loader2, Building, Globe, User, Mail, MessageSquare } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export interface SponsorFormProps {
  className?: string
}

const TIERS = [
  { id: "founding", name: "Founding Sponsor", price: "$49/mo", description: "Homepage hero, limited to 3" },
  { id: "docs", name: "Docs Sponsor", price: "$29/mo", description: "Persistent docs sidebar" },
  { id: "component", name: "Component Sponsor", price: "$9/mo", description: "Inline placement below previews" },
]

export function SponsorForm({ className }: SponsorFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState("founding")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null)

  // Listen to hash changes and custom events to auto-open dialog and select tier
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith("#apply")) {
        setIsOpen(true)
        const match = hash.match(/tier=([a-zA-Z0-9_-]+)/)
        if (match && match[1]) {
          const matchingTier = TIERS.find(t => t.id === match[1])
          if (matchingTier) {
            setSelectedTier(matchingTier.id)
          }
        }
      } else {
        setIsOpen(false)
      }
    }

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent
      setIsOpen(true)
      if (customEvent.detail?.tier) {
        const matchingTier = TIERS.find(t => t.id === customEvent.detail.tier)
        if (matchingTier) {
          setSelectedTier(matchingTier.id)
        }
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    window.addEventListener("open-sponsor-modal", handleCustomEvent)
    
    handleHashChange() // Check on initial mount

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      window.removeEventListener("open-sponsor-modal", handleCustomEvent)
    }
  }, [])

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      // Clear hash safely
      if (window.location.hash.startsWith("#apply")) {
        history.replaceState(null, "", window.location.pathname)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    // Make sure the selected tier is passed
    const activeTierName = TIERS.find(t => t.id === selectedTier)?.name || selectedTier
    formData.set("sponsor_tier", activeTierName)

    try {
      const result = await submitSponsorApplication(formData)
      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Thanks for your interest! The team will reach out to you via email shortly.",
        })
        form.reset()
      } else {
        setSubmitStatus({
          success: false,
          message: result.error || "Something went wrong. Please try again.",
        })
      }
    } catch (err) {
      setSubmitStatus({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl bg-white dark:bg-[#0C0C0C] border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 overflow-y-auto max-h-[90vh] shadow-xl">
        {!submitStatus?.success ? (
          <DialogHeader className="text-left space-y-2 mb-6">
            <DialogTitle className="text-3xl font-medium tracking-tighter text-neutral-900 dark:text-white">
              Become a Sponsor.<br />
              <span className="text-neutral-400 dark:text-neutral-500">Put your product in front of builders.</span>
            </DialogTitle>
          </DialogHeader>
        ) : (
          <DialogTitle className="sr-only">Application Submitted</DialogTitle>
        )}

        {submitStatus?.success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center text-center py-8 space-y-6"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-neutral-900/10 dark:bg-white/10 blur-xl w-14 h-14" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <Check className="h-6 w-6 text-neutral-900 dark:text-white" />
              </div>
            </div>
            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-white">
                Application Submitted
              </h3>
              <p className="text-xs font-serif leading-relaxed text-neutral-500 dark:text-neutral-400">
                {submitStatus.message}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSubmitStatus(null)}
              className="text-[10px] font-mono underline uppercase tracking-widest text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Submit another application
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Tier Selector */}
            <div className="space-y-3">
              <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                Select Sponsorship Tier
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {TIERS.map(tier => {
                  const active = selectedTier === tier.id
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier.id)}
                      className={cn(
                        "relative text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between min-h-[95px]",
                        active
                          ? "border-neutral-900 dark:border-white bg-neutral-50/50 dark:bg-neutral-900/40 shadow-sm"
                          : "border-neutral-200 dark:border-neutral-800 bg-transparent hover:border-neutral-400 dark:hover:border-neutral-700"
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="modal-active-glow"
                          className="absolute -inset-px rounded-xl border-2 border-neutral-900 dark:border-white pointer-events-none"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                      <div>
                        <div className="text-sm font-semibold text-neutral-900 dark:text-white leading-tight">
                          {tier.name}
                        </div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                          {tier.description}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-neutral-900 dark:text-white mt-3">
                        {tier.price}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Rows 2 & 3: Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company Name */}
              <div className="space-y-1.5">
                <label htmlFor="company_name" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" />
                  <input
                    id="company_name"
                    name="company_name"
                    type="text"
                    required
                    placeholder="Acme Corp"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-xs placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Website URL */}
              <div className="space-y-1.5">
                <label htmlFor="website" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                  Website URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" />
                  <input
                    id="website"
                    name="website"
                    type="text"
                    required
                    placeholder="acme.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-xs placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Contact Person Name */}
              <div className="space-y-1.5">
                <label htmlFor="contact_name" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                  Contact Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" />
                  <input
                    id="contact_name"
                    name="contact_name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-xs placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Contact Email */}
              <div className="space-y-1.5">
                <label htmlFor="contact_email" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                  Contact Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" />
                  <input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    required
                    placeholder="jane@acme.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-xs placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                Message / Details
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" />
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Tell us about your product or any custom requests..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent text-xs placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors resize-none"
                />
              </div>
            </div>

            {/* Error feedback if non-success */}
            {submitStatus && !submitStatus.success && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono"
              >
                {submitStatus.message}
              </motion.div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-xs hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
