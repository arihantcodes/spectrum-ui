"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { submitSponsorApplication } from "@/app/(marketing)/sponsor/actions"
import { Check, Loader2, Building, Globe, Mail, MessageSquare } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const FormSchema = z.object({
  contact_email: z.string().email("Please enter a valid email address."),
  company_name: z.string().min(2, "Company name must be at least 2 characters."),
  product_link: z.string().url("Please enter a valid URL (e.g., https://acme.com)."),
  ads_title: z.string().min(3, "Title must be at least 3 characters."),
  ads_description: z.string().min(10, "Description must be at least 10 characters."),
})

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
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      contact_email: "",
      company_name: "",
      product_link: "",
      ads_title: "",
      ads_description: "",
    }
  })

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

  const onSubmit = async (data: z.infer<typeof FormSchema>, e?: React.BaseSyntheticEvent) => {
    if (!e) return
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    setSubmitStatus(null)

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
        reset()
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
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
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

            {/* Input Fields */}
            <div className="space-y-4">
              
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="contact_email" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" />
                  <input
                    id="contact_email"
                    type="email"
                    placeholder="jane@acme.com"
                    {...register("contact_email")}
                    className={cn(
                      "w-full pl-9 pr-3 py-2.5 rounded-lg border bg-transparent text-xs placeholder:text-neutral-400 focus:outline-none transition-colors",
                      errors.contact_email 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white"
                    )}
                  />
                </div>
                {errors.contact_email && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.contact_email.message}</p>
                )}
              </div>

              {/* Company Name */}
              <div className="space-y-1.5">
                <label htmlFor="company_name" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" />
                  <input
                    id="company_name"
                    type="text"
                    placeholder="Acme Corp"
                    {...register("company_name")}
                    className={cn(
                      "w-full pl-9 pr-3 py-2.5 rounded-lg border bg-transparent text-xs placeholder:text-neutral-400 focus:outline-none transition-colors",
                      errors.company_name 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white"
                    )}
                  />
                </div>
                {errors.company_name && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.company_name.message}</p>
                )}
              </div>

              {/* Product Link */}
              <div className="space-y-1.5">
                <label htmlFor="product_link" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                  Product Link
                </label>
                <p className="text-[10px] text-neutral-500 mb-1">Link of your product. E.g spectrumhq.in</p>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" />
                  <input
                    id="product_link"
                    type="url"
                    placeholder="https://spectrumhq.in"
                    {...register("product_link")}
                    className={cn(
                      "w-full pl-9 pr-3 py-2.5 rounded-lg border bg-transparent text-xs placeholder:text-neutral-400 focus:outline-none transition-colors",
                      errors.product_link 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white"
                    )}
                  />
                </div>
                {errors.product_link && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.product_link.message}</p>
                )}
              </div>

              {/* Brand Logo */}
              <div className="space-y-1.5">
                <label htmlFor="image_ads" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                  Brand Logo
                </label>
                <p className="text-[10px] text-neutral-500 mb-1">Please upload your product&apos;s logo or icon (1:1 aspect ratio is recommended). For best display quality, export at @2x resolution.</p>
                <div className="relative mt-2">
                  <input
                    id="image_ads"
                    name="image_ads"
                    type="file"
                    accept="image/*"
                    className="w-full text-xs text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200 dark:file:bg-neutral-800 dark:file:text-neutral-300 dark:hover:file:bg-neutral-700"
                  />
                </div>
              </div>

              {/* Ads Title */}
              <div className="space-y-1.5">
                <label htmlFor="ads_title" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                  Ads Title
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" />
                  <input
                    id="ads_title"
                    type="text"
                    placeholder="Acme Developer Tools"
                    {...register("ads_title")}
                    className={cn(
                      "w-full pl-9 pr-3 py-2.5 rounded-lg border bg-transparent text-xs placeholder:text-neutral-400 focus:outline-none transition-colors",
                      errors.ads_title 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white"
                    )}
                  />
                </div>
                {errors.ads_title && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.ads_title.message}</p>
                )}
              </div>

              {/* Ads Description */}
              <div className="space-y-1.5">
                <label htmlFor="ads_description" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                  Ads Description
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600" />
                  <textarea
                    id="ads_description"
                    rows={2}
                    placeholder="The fastest way to build your next big idea."
                    {...register("ads_description")}
                    className={cn(
                      "w-full pl-9 pr-3 py-2.5 rounded-lg border bg-transparent text-xs placeholder:text-neutral-400 focus:outline-none transition-colors resize-none",
                      errors.ads_description 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white"
                    )}
                  />
                </div>
                {errors.ads_description && (
                  <p className="text-red-500 text-[10px] mt-1">{errors.ads_description.message}</p>
                )}
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
