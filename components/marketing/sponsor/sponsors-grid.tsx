"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { Component, Hexagon, Triangle, CircleDashed, Pentagon, Diamond } from "lucide-react"

export interface SponsorsGridProps {
  className?: string
}

const sponsors = [
  { name: "Acme Corp", icon: Component },
  { name: "GlobalTech", icon: Hexagon },
  { name: "Nexus Labs", icon: Triangle },
  { name: "Orbit", icon: CircleDashed },
  { name: "Apex Dev", icon: Pentagon },
  { name: "Zenith", icon: Diamond },
]

export function SponsorsGrid({ className }: SponsorsGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section ref={ref} className={cn("py-16 w-full", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600 whitespace-nowrap shrink-0">
          Trusted by
        </span>

        {/* Marquee */}
        <div className="relative flex overflow-x-hidden w-full">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...sponsors, ...sponsors].map((sponsor, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 mx-8 opacity-30 hover:opacity-70 transition-opacity duration-300"
              >
                <sponsor.icon className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
                <span className="text-sm font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                  {sponsor.name}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute top-0 animate-marquee2 flex whitespace-nowrap">
            {[...sponsors, ...sponsors].map((sponsor, i) => (
              <div
                key={`second-${i}`}
                className="flex items-center gap-2.5 mx-8 opacity-30 hover:opacity-70 transition-opacity duration-300"
              >
                <sponsor.icon className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
                <span className="text-sm font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                  {sponsor.name}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-50 dark:from-[#0C0C0C] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-50 dark:from-[#0C0C0C] to-transparent pointer-events-none z-10" />
        </div>
      </motion.div>
    </section>
  )
}
