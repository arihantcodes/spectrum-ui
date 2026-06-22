"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

export interface InventorySectionProps {
  className?: string
}

export function InventorySection({ className }: InventorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className={cn("py-32 w-full max-w-6xl mx-auto", className)}>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-24"
      >
        <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-neutral-900 dark:text-white mb-6">
          Your brand, inside<br />
          <span className="text-neutral-400 dark:text-neutral-600">the developer workflow.</span>
        </h2>
        <p className="text-lg text-neutral-500 dark:text-neutral-400 font-serif max-w-xl">
          Every placement lives where developers are actively building — not scrolling past feeds.
        </p>
      </motion.div>

      <div className="space-y-32">

        {/* 01: Homepage Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <div>
            <span className="text-sm font-mono text-neutral-400 dark:text-neutral-500 mb-4 block">01</span>
            <h3 className="text-3xl md:text-4xl font-medium tracking-tighter text-neutral-900 dark:text-white mb-6">
              Homepage hero
            </h3>
            <div className="space-y-4 text-lg text-neutral-500 dark:text-neutral-400 font-serif leading-relaxed">
              <p>Top-of-page visibility. Your logo and tagline appear right below the hero section.</p>
              <p>The most visited page on Spectrum UI. Every developer sees this first.</p>
            </div>
            <div className="mt-6 text-sm text-neutral-400 dark:text-neutral-600">Avg. 8k impressions/mo</div>
          </div>

          <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-900/80 p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-neutral-300 dark:bg-neutral-700" />
                <div className="w-16 h-2 bg-neutral-200 dark:bg-neutral-800 rounded" />
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-2 bg-neutral-200 dark:bg-neutral-800 rounded" />
                <div className="w-12 h-4 bg-neutral-900 dark:bg-neutral-100 rounded-full" />
              </div>
            </div>
            <div className="py-6 flex flex-col items-center gap-2">
              <div className="w-40 h-3 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="w-56 h-4 bg-neutral-300/80 dark:bg-neutral-700/80 rounded" />
              <div className="flex gap-2 mt-3">
                <div className="w-20 h-5 bg-neutral-900 dark:bg-neutral-100 rounded-lg" />
                <div className="w-20 h-5 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
              </div>
            </div>
            <div className="rounded-xl border-2 border-dashed border-neutral-400/40 dark:border-neutral-600/40 p-3 flex items-center justify-center gap-3 mt-2">
              <div className="w-6 h-6 rounded-lg bg-neutral-300/60 dark:bg-neutral-700/60" />
              <div className="space-y-1">
                <div className="w-20 h-2.5 bg-neutral-300/60 dark:bg-neutral-700/60 rounded" />
                <div className="w-32 h-1.5 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 02: Documentation sidebar — reversed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Mockup first on desktop */}
          <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-900/80 overflow-hidden order-2 lg:order-1">
            <div className="flex min-h-[260px]">
              <div className="w-36 border-r border-neutral-200/40 dark:border-neutral-800/40 p-3 space-y-1.5">
                <div className="text-[8px] font-medium text-neutral-400 dark:text-neutral-600 uppercase tracking-wider mb-2">Components</div>
                {["Accordion", "Button", "Card", "Dialog", "Input"].map((item, i) => (
                  <div key={item} className={cn(
                    "h-4 rounded px-1.5 flex items-center text-[8px]",
                    i === 1 ? "bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-900 dark:text-neutral-100 font-medium" : "text-neutral-400 dark:text-neutral-600"
                  )}>
                    {item}
                  </div>
                ))}
                <div className="pt-3 mt-3 border-t border-neutral-200/40 dark:border-neutral-800/40">
                  <div className="rounded-xl border-2 border-dashed border-neutral-400/40 dark:border-neutral-600/40 p-2 flex flex-col items-center gap-1">
                    <div className="w-5 h-5 rounded bg-neutral-300/60 dark:bg-neutral-700/60" />
                    <div className="w-14 h-1.5 bg-neutral-300/60 dark:bg-neutral-700/60 rounded" />
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4 space-y-2">
                <div className="h-2 bg-neutral-200/60 dark:bg-neutral-800/60 rounded w-16" />
                <div className="h-3 bg-neutral-300/60 dark:bg-neutral-700/60 rounded w-32" />
                <div className="space-y-1 mt-3">
                  <div className="h-1.5 bg-neutral-200/40 dark:bg-neutral-800/40 rounded w-full" />
                  <div className="h-1.5 bg-neutral-200/40 dark:bg-neutral-800/40 rounded w-5/6" />
                  <div className="h-1.5 bg-neutral-200/40 dark:bg-neutral-800/40 rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-sm font-mono text-neutral-400 dark:text-neutral-500 mb-4 block">02</span>
            <h3 className="text-3xl md:text-4xl font-medium tracking-tighter text-neutral-900 dark:text-white mb-6">
              Documentation sidebar
            </h3>
            <div className="space-y-4 text-lg text-neutral-500 dark:text-neutral-400 font-serif leading-relaxed">
              <p>Persistent sidebar placement across every documentation page.</p>
              <p>Developers see your logo while reading docs and copying code snippets.</p>
            </div>
            <div className="mt-6 text-sm text-neutral-400 dark:text-neutral-600">Avg. 15k impressions/mo across 50+ pages</div>
          </div>
        </motion.div>

        {/* 03: Component pages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <div>
            <span className="text-sm font-mono text-neutral-400 dark:text-neutral-500 mb-4 block">03</span>
            <h3 className="text-3xl md:text-4xl font-medium tracking-tighter text-neutral-900 dark:text-white mb-6">
              Component pages
            </h3>
            <div className="space-y-4 text-lg text-neutral-500 dark:text-neutral-400 font-serif leading-relaxed">
              <p>Inline placement below component previews.</p>
              <p>Visible at the exact moment a developer decides to use a component. The highest-intent placement.</p>
            </div>
            <div className="mt-6 text-sm text-neutral-400 dark:text-neutral-600">Avg. 6k impressions/mo per component</div>
          </div>

          <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-900/80 p-5 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 w-14 bg-neutral-200/60 dark:bg-neutral-800/60 rounded text-[7px] flex items-center justify-center text-neutral-500">Preview</div>
              <div className="h-4 w-10 rounded text-[7px] flex items-center justify-center text-neutral-400">Code</div>
              <div className="h-4 w-8 rounded text-[7px] flex items-center justify-center text-neutral-400">CLI</div>
            </div>
            <div className="h-24 bg-white/60 dark:bg-[#0C0C0C]/60 rounded-xl flex items-center justify-center">
              <div className="flex gap-2">
                <div className="w-16 h-6 bg-neutral-900 dark:bg-neutral-100 rounded-lg" />
                <div className="w-16 h-6 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
              </div>
            </div>
            <div className="rounded-xl border-2 border-dashed border-neutral-400/40 dark:border-neutral-600/40 p-2.5 flex items-center gap-3">
              <div className="w-5 h-5 rounded-lg bg-neutral-300/60 dark:bg-neutral-700/60 shrink-0" />
              <div className="space-y-0.5">
                <div className="w-24 h-2 bg-neutral-300/60 dark:bg-neutral-700/60 rounded" />
                <div className="w-36 h-1.5 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
