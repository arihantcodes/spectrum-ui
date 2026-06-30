"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

export interface InventorySectionProps {
  className?: string
}

const placements = [
  {
    num: "01",
    title: "Homepage Hero",
    description: "Top-of-page visibility. Your logo and tagline appear right below the hero — the first thing every visitor sees.",
    impressions: "~8k impressions / mo",
    mockup: (
      <div className="rounded-xl bg-neutral-100 dark:bg-neutral-900/80 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-neutral-300 dark:bg-neutral-700" />
            <div className="w-12 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>
          <div className="w-10 h-4 bg-neutral-900 dark:bg-neutral-100 rounded-full" />
        </div>
        <div className="py-3 flex flex-col items-center gap-1.5">
          <div className="w-32 h-2 bg-neutral-200 dark:bg-neutral-800 rounded" />
          <div className="w-44 h-3 bg-neutral-300/70 dark:bg-neutral-700/70 rounded" />
          <div className="flex gap-2 mt-2">
            <div className="w-16 h-4 bg-neutral-900 dark:bg-neutral-100 rounded-md" />
            <div className="w-16 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
          </div>
        </div>
        <div className="rounded-lg border-2 border-dashed border-neutral-400/40 dark:border-neutral-600/40 p-2.5 flex items-center gap-2.5">
          <div className="w-5 h-5 rounded bg-neutral-300/60 dark:bg-neutral-700/60 shrink-0" />
          <div className="space-y-1">
            <div className="w-20 h-1.5 bg-neutral-300/60 dark:bg-neutral-700/60 rounded" />
            <div className="w-28 h-1 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
          </div>
        </div>
      </div>
    ),
  },
  {
    num: "02",
    title: "Docs Sidebar",
    description: "Persistent placement across every documentation page. Developers see your brand while copying code snippets.",
    impressions: "~15k impressions / mo · 50+ pages",
    mockup: (
      <div className="rounded-xl bg-neutral-100 dark:bg-neutral-900/80 overflow-hidden">
        <div className="flex min-h-[160px]">
          <div className="w-28 border-r border-neutral-200/40 dark:border-neutral-800/40 p-2.5 space-y-1">
            <div className="text-[7px] font-medium text-neutral-400 uppercase tracking-wider mb-2">Components</div>
            {["Button", "Card", "Dialog", "Input"].map((item, i) => (
              <div key={item} className={cn(
                "h-3.5 rounded px-1.5 flex items-center text-[7px]",
                i === 2 ? "bg-neutral-200/60 dark:bg-neutral-800/60 text-neutral-900 dark:text-neutral-100 font-medium" : "text-neutral-400"
              )}>
                {item}
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-neutral-200/40 dark:border-neutral-800/40">
              <div className="rounded-lg border-2 border-dashed border-neutral-400/40 dark:border-neutral-600/40 p-1.5 flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded bg-neutral-300/60 dark:bg-neutral-700/60" />
                <div className="w-12 h-1 bg-neutral-300/60 dark:bg-neutral-700/60 rounded" />
              </div>
            </div>
          </div>
          <div className="flex-1 p-3 space-y-1.5">
            <div className="h-1.5 bg-neutral-200/60 dark:bg-neutral-800/60 rounded w-12" />
            <div className="h-2.5 bg-neutral-300/60 dark:bg-neutral-700/60 rounded w-24" />
            <div className="space-y-1 mt-2">
              {[1, 0.85, 0.7].map((w, i) => (
                <div key={i} className="h-1 bg-neutral-200/40 dark:bg-neutral-800/40 rounded" style={{ width: `${w * 100}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    num: "03",
    title: "Component Pages",
    description: "Inline placement below component previews. Highest-intent placement — right when a developer decides to copy the code.",
    impressions: "~6k impressions / mo per component",
    mockup: (
      <div className="rounded-xl bg-neutral-100 dark:bg-neutral-900/80 p-4 space-y-2.5">
        <div className="flex items-center gap-2 text-[7px]">
          <div className="h-4 px-2 bg-neutral-200/60 dark:bg-neutral-800/60 rounded flex items-center text-neutral-500 font-medium">Preview</div>
          <div className="h-4 px-2 rounded flex items-center text-neutral-400">Code</div>
        </div>
        <div className="h-16 bg-white/60 dark:bg-[#0C0C0C]/60 rounded-lg flex items-center justify-center gap-2">
          <div className="w-14 h-5 bg-neutral-900 dark:bg-neutral-100 rounded-md" />
          <div className="w-14 h-5 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
        </div>
        <div className="rounded-lg border-2 border-dashed border-neutral-400/40 dark:border-neutral-600/40 p-2.5 flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-md bg-neutral-300/60 dark:bg-neutral-700/60 shrink-0" />
          <div className="space-y-0.5">
            <div className="w-20 h-1.5 bg-neutral-300/60 dark:bg-neutral-700/60 rounded" />
            <div className="w-28 h-1 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
          </div>
        </div>
      </div>
    ),
  },
]

export function InventorySection({ className }: InventorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-80px" })

  return (
    <section ref={containerRef} className={cn("py-20 w-full max-w-6xl mx-auto", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-neutral-900 dark:text-white mb-3">
          Your brand, inside the developer workflow.
        </h2>
        <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-lg">
          Every placement lives where developers are actively building — not in banner ads they scroll past.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {placements.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            {p.mockup}
            <div>
              <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600">{p.num}</span>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mt-1 mb-1.5">
                {p.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {p.description}
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-2 font-mono">
                {p.impressions}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
