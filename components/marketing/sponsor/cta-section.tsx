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
    <section ref={ref} className={cn("min-h-[70vh] w-full flex flex-col justify-center items-center py-32 text-center relative", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl space-y-16"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.2] text-neutral-900 dark:text-white">
          Founding spots are limited.<br />
          <span className="text-neutral-400 dark:text-neutral-500">Lock in launch pricing before it goes up.</span>
        </h2>

        <div className="flex flex-col items-center space-y-12">
          <div className="flex flex-col items-center space-y-4">
            <span className="text-2xl tracking-widest uppercase font-bold text-neutral-900 dark:text-white">Spectrum UI</span>
            <div className="flex space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <span>Limited inventory.</span>
              <span>·</span>
              <span>Lifetime pricing.</span>
              <span>·</span>
              <span>Cancel anytime.</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '#apply?tier=founding');
                window.dispatchEvent(new CustomEvent('open-sponsor-modal', { detail: { tier: 'founding' } }));
              }}
              className="px-8 py-4 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:scale-105 transition-transform duration-300"
            >
              Become a founding sponsor
            </button>
            <Link href="#slots" className="px-8 py-4 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-900 dark:text-white font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-300">
              View available spots
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
