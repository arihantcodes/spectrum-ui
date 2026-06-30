"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { Github } from "lucide-react"
import Image from "next/image"

export interface SponsorsGridProps {
  className?: string
}

export function SponsorsGrid({ className }: SponsorsGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className={cn("py-10 w-full max-w-5xl mx-auto", className)}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600 mb-5">
          Past &amp; active sponsors
        </p>

        <div className="flex flex-wrap items-center gap-4">

          {/* shadcnblocks.com — past sponsor with backlink */}
          <a
            href="https://www.shadcnblocks.com/?utm_source=spectrum-ui&utm_medium=referral&utm_campaign=sponsor"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
          >
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative w-5 h-5 shrink-0 overflow-hidden">
                <Image
                  src="https://www.shadcnblocks.com/images/press/logo/shadcnblocks-logo.svg"
                  alt="shadcnblocks.com"
                  fill
                  className="object-contain dark:invert"
                  unoptimized
                />
              </div>
              <span className="text-sm font-medium text-neutral-900 dark:text-white">shadcnblocks.com</span>
            </div>
           
            <div className="w-px h-4 bg-neutral-200 dark:bg-neutral-800 shrink-0" />
            <div>
              <div className="text-[10px] text-neutral-400 dark:text-neutral-600">
                Sponsored for 1 year
              </div>
            </div>
            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
              Alumni
            </span>
          </a>

          {/* Active GitHub sponsor */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40">
            <div className="w-7 h-7 rounded-md bg-neutral-900 dark:bg-white flex items-center justify-center shrink-0">
              <Github className="w-3.5 h-3.5 text-white dark:text-neutral-900" />
            </div>
            <div>
              <div className="text-sm font-medium text-neutral-900 dark:text-white leading-tight">
                GitHub Sponsor
              </div>
              <div className="text-[10px] text-neutral-400 dark:text-neutral-600 mt-0.5">
                Active · $5 / month
              </div>
            </div>
            <span className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900">
              <span className="w-1 h-1 rounded-full bg-green-500 inline-block" />
              Active
            </span>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
