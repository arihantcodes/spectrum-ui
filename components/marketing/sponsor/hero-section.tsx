"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={cn("relative w-full pt-24 pb-12 md:pt-32 md:pb-16", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Left: Copy ── */}
        <div>
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              1 spot taken · 2 founding spots left
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.08] mb-5"
          >
            Your brand,<br />
            inside the code<br />
            <span className="text-neutral-400 dark:text-neutral-500">
              they&apos;re copying right now.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8 max-w-md"
          >
            Spectrum UI brings 5,000+ frontend developers every month — not scrolling a feed, but actively reading docs and copying components. Your slot lives exactly where they&apos;re looking.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10"
          >
            <button
              onClick={(e) => {
                e.preventDefault()
                window.history.pushState(null, "", "#apply?tier=founding")
                window.dispatchEvent(
                  new CustomEvent("open-sponsor-modal", { detail: { tier: "founding" } })
                )
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
            >
              Claim your spot
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <Link
              href="#slots"
              className="px-6 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-sm font-medium hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              View available spots
            </Link>
          </motion.div>

        </div>

        {/* ── Right: Mockup ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col gap-3"
        >
          {/* Browser window */}
          <div className="rounded-2xl border border-neutral-200/70 dark:border-neutral-800/70 bg-white dark:bg-[#0A0A0A] overflow-hidden shadow-xl">
            {/* Chrome bar */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-neutral-100 dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-900/50">
              <div className="flex gap-1.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                ))}
              </div>
              <div className="flex-1 mx-3">
                <div className="h-5 bg-white dark:bg-black border border-neutral-100 dark:border-neutral-800 rounded-md w-52 mx-auto flex items-center justify-center">
                  <span className="text-[9px] text-neutral-400 font-mono">
                    ui.spectrumhq.in/docs/button
                  </span>
                </div>
              </div>
            </div>

            {/* Page layout */}
            <div className="flex" style={{ minHeight: 240 }}>
              {/* Sidebar */}
              <div className="w-40 border-r border-neutral-100 dark:border-neutral-800/60 p-3 space-y-1 shrink-0">
                <div className="text-[8px] uppercase tracking-wider text-neutral-400 font-medium mb-2">
                  Components
                </div>
                {["Accordion", "Button", "Card", "Dialog", "Input"].map((item, i) => (
                  <div
                    key={item}
                    className={cn(
                      "h-5 rounded px-1.5 flex items-center text-[9px]",
                      i === 1
                        ? "bg-neutral-100 dark:bg-neutral-800 font-medium text-neutral-900 dark:text-white"
                        : "text-neutral-400 dark:text-neutral-600"
                    )}
                  >
                    {item}
                  </div>
                ))}

                {/* Sidebar sponsor slot */}
                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
                  <div className="text-[7px] uppercase tracking-widest text-neutral-400 font-mono mb-1.5">
                    Sponsored
                  </div>
                  <div className="rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-700 p-2 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-neutral-900 dark:bg-white shrink-0" />
                      <div className="text-[9px] font-semibold text-neutral-900 dark:text-white leading-tight">
                        Your Brand
                      </div>
                    </div>
                    <div className="text-[8px] text-neutral-500 leading-tight">
                      One-line description here.
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 space-y-2.5 min-w-0">
                <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded w-10" />
                <div className="h-4 bg-neutral-200/60 dark:bg-neutral-700/40 rounded w-24" />
                <div className="space-y-1.5 pt-0.5">
                  {[1, 0.8, 0.55].map((w, i) => (
                    <div
                      key={i}
                      className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded"
                      style={{ width: `${w * 100}%` }}
                    />
                  ))}
                </div>

                {/* Component preview */}
                <div className="rounded-lg border border-neutral-100 dark:border-neutral-800 overflow-hidden mt-3">
                  <div className="flex items-center gap-3 px-3 h-6 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30">
                    <span className="text-[8px] font-medium text-neutral-900 dark:text-white border-b border-neutral-900 dark:border-white">
                      Preview
                    </span>
                    <span className="text-[8px] text-neutral-400">Code</span>
                  </div>
                  <div className="h-14 bg-white dark:bg-black flex items-center justify-center">
                    <div className="h-5 px-3 bg-neutral-900 dark:bg-white rounded text-[8px] flex items-center font-medium text-white dark:text-black">
                      Open Dialog
                    </div>
                  </div>
                </div>

                {/* Inline sponsor slot */}
                <div className="flex items-center gap-2.5 rounded-lg border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-2 mt-1">
                  <div className="w-6 h-6 rounded-md bg-neutral-900 dark:bg-white shrink-0" />
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-[9px] font-semibold text-neutral-900 dark:text-white truncate">
                      Your Brand
                    </div>
                    <div className="text-[8px] text-neutral-500 truncate">
                      Your product in one line.
                    </div>
                  </div>
                  <div className="ml-auto shrink-0 text-[7px] border border-neutral-200 dark:border-neutral-700 rounded-full px-2 py-0.5 text-neutral-400">
                    Visit
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-[11px] text-neutral-400 dark:text-neutral-600 font-mono">
            Sidebar + inline — both placements shown simultaneously
          </p>
        </motion.div>

      </div>
    </section>
  )
}
