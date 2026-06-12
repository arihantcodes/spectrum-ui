"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, ArrowRight } from "lucide-react"

const Cta = () => {
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
      setMessage("You're on the list! Welcome to Spectrum UI.")
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="w-full py-20 lg:py-28 px-4 relative overflow-hidden bg-neutral-50/30 dark:bg-neutral-950/10 border-t border-neutral-200/50 dark:border-[#222]/30">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Radial Gradient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container Card */}
      <div className="max-w-4xl mx-auto rounded-3xl  bg-white/40 dark:bg-[#0C0C0C]/30 backdrop-blur-md p-8 md:p-12 relative overflow-hidden z-10">
        
        {/* Sparkle badge
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-200/40 dark:border-indigo-800/30 bg-indigo-50/20 dark:bg-indigo-950/20 text-[11px] font-mono font-medium tracking-wide text-indigo-600 dark:text-indigo-400">
            <Sparkles className="h-3.5 w-3.5" />
            STAY AHEAD OF THE CURVE
          </div>
        </div> */}

        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-[#F5F5F5]">
            Build faster. Ship cleaner.
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-[#666] leading-relaxed">
            Join 4,000+ developers receiving free high-fidelity React components, animation templates, and platform updates directly in their inbox every week.
          </p>
        </div>

        {/* Email Subscription Form */}
        <div className="mt-8 max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading" || status === "success"}
              className="flex-1 h-11 bg-white/60 dark:bg-black/40 border-neutral-200 dark:border-[#222] focus:border-neutral-900 dark:focus:border-neutral-100 rounded-xl px-4 text-sm outline-none transition-all placeholder:text-neutral-400 dark:placeholder:text-[#444]"
            />
            <Button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="h-11 bg-neutral-950 hover:bg-neutral-900 dark:bg-[#F5F5F5] dark:text-black dark:hover:bg-white text-white font-medium text-sm rounded-xl px-6 transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Feedback messages */}
          {status === "success" && (
            <p className="mt-3 text-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {message}
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-center text-xs font-medium text-red-600 dark:text-red-400">
              {message}
            </p>
          )}
          {status === "idle" && (
            <p className="mt-3 text-center text-[10px] text-neutral-400 dark:text-[#555]">
              No spam. Unsubscribe anytime.
            </p>
          )}
        </div>

      

      </div>
    </div>
  )
}

export default Cta
