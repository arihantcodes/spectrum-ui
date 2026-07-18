"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NewsletterSignupProps {
  variant?: "inline" | "card"
}

export function NewsletterSignup({ variant = "inline" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address.")
      return
    }

    setStatus("loading")

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
        return
      }

      setStatus("success")
      setMessage("You're subscribed! Check your inbox.")
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  if (variant === "card") {
    return (
      <div className="w-full max-w-sm mx-auto rounded-xl border border-border bg-card p-6 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Get notified about new templates & components
        </h3>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            className="w-full"
          />
          <Button
            type="submit"
            className="w-full"
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe Now"}
          </Button>
        </form>

        {status === "success" && (
          <p className="mt-3 text-sm text-green-600 dark:text-green-400">{message}</p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">{message}</p>
        )}

        <p className="mt-4 text-xs text-muted-foreground">
          Join 4,000+ developers
        </p>
      </div>
    )
  }

  // inline variant
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-black/[0.07] bg-gradient-to-br from-[#F7F5F3] to-[#EFEBE6] p-8 sm:p-10 dark:border-white/[0.08] dark:from-neutral-900 dark:to-neutral-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-noise opacity-[0.05] mix-blend-multiply dark:mix-blend-screen dark:opacity-[0.08]"
      />
      <div className="relative flex max-w-xl flex-col gap-2">
        <div className="mb-1 flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
          />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
            Newsletter
          </span>
        </div>
        <h3 className="font-spectral text-[24px] font-light leading-[1.15] tracking-[-0.02em] text-neutral-900 sm:text-[28px] dark:text-neutral-50">
          Get new posts in your inbox.
        </h3>
        <p className="font-inter text-[14px] leading-[1.6] text-[#59544f] dark:text-neutral-400">
          New templates, components, and essays on design engineering. Join
          4,000+ developers — no spam, ever.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2.5 sm:flex-row">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            className="h-11 flex-1 rounded-full border-transparent bg-white/80 px-5 font-inter text-[14px] text-neutral-900 ring-1 ring-inset ring-black/[0.06] placeholder:text-[#9a938b] focus-visible:ring-neutral-400 dark:bg-white/[0.06] dark:text-neutral-100 dark:ring-white/[0.08]"
          />
          <Button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="h-11 rounded-full px-7 font-inter text-[14px] font-medium transition-transform active:scale-[0.97]"
          >
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </Button>
        </form>

        {status === "success" && (
          <p className="mt-3 font-inter text-[13px] text-green-600 dark:text-green-400">{message}</p>
        )}
        {status === "error" && (
          <p className="mt-3 font-inter text-[13px] text-red-600 dark:text-red-400">{message}</p>
        )}
      </div>
    </div>
  )
}
