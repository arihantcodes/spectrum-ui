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
    <div className="w-full max-w-md mx-auto text-center">
      <p className="text-sm font-medium text-muted-foreground mb-4">
        Get notified about new templates & components
      </p>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className="flex-1 h-10 rounded-lg"
        />
        <Button
          type="submit"
          variant="outline"
          disabled={status === "loading" || status === "success"}
          className="h-10 rounded-lg px-5 text-sm"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </Button>
      </form>

      {status === "success" && (
        <p className="mt-3 text-sm text-green-600 dark:text-green-400">{message}</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{message}</p>
      )}

      {status === "idle" && (
        <p className="mt-3 text-xs text-muted-foreground">
          Join 4,000+ developers. No spam, ever.
        </p>
      )}
    </div>
  )
}
