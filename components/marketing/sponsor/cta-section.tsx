"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

export interface CtaSectionProps {
  className?: string
}

export function CtaSection({ className }: CtaSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className={cn("w-full py-20 text-center relative", className)}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <h2 className="text-3xl md:text-5xl font-medium tracking-tighter leading-[1.15] text-neutral-900 dark:text-white">
          Founding spots are limited.{" "}
          <span className="text-neutral-400 dark:text-neutral-500">Lock in launch pricing before it goes up.</span>
        </h2>

        <p className="text-sm font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
          Limited inventory · Lifetime pricing · Cancel anytime
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, '', '#apply?tier=founding');
              window.dispatchEvent(new CustomEvent('open-sponsor-modal', { detail: { tier: 'founding' } }));
            }}
            className="px-7 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm hover:scale-105 transition-transform duration-300"
          >
            Become a founding sponsor
          </button>
          <Link href="#slots" className="px-7 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-medium text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-300">
            View available spots
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
