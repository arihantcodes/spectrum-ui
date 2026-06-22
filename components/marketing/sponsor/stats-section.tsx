"use client"

import React, { useRef, useEffect } from "react"
import { motion, useInView, animate } from "framer-motion"
import { cn } from "@/lib/utils"

export interface StatsSectionProps {
  className?: string
}

function Counter({ from, to, duration = 2, delay = 0, suffix = "" }: { from: number; to: number; duration?: number; delay?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView && ref.current) {
      setTimeout(() => {
        animate(from, to, {
          duration,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (latest) => {
            if (ref.current) {
              ref.current.textContent = Math.round(latest).toLocaleString() + suffix
            }
          }
        })
      }, delay * 1000)
    }
  }, [isInView, from, to, duration, delay, suffix])

  return <span ref={ref}>{from}{suffix}</span>
}

export function StatsSection({ className }: StatsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className={cn("py-24 md:py-32 w-full max-w-5xl mx-auto flex flex-col items-center", className)}>

      {/* Animated divider */}
      <div className="w-full flex justify-center mb-20">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-neutral-200 dark:bg-neutral-800 max-w-xs"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="text-6xl md:text-7xl font-light tracking-tighter text-neutral-900 dark:text-white tabular-nums">
            <Counter from={0} to={1000} suffix="+" />
          </div>
          <span className="text-xl font-medium text-neutral-500 dark:text-neutral-400">
            github Stars.
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="text-6xl md:text-7xl font-light tracking-tighter text-neutral-900 dark:text-white tabular-nums">
            <Counter from={0} to={5000} suffix="+" />
          </div>
          <span className="text-xl font-medium text-neutral-500 dark:text-neutral-400">
            developers visiting every month
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="text-6xl md:text-7xl font-light tracking-tighter text-neutral-900 dark:text-white tabular-nums">
            <Counter from={0} to={20000} suffix="+" />
          </div>
          <span className="text-xl font-medium text-neutral-500 dark:text-neutral-400">
            Page Views per months
          </span>
        </motion.div>
      </div>
    </section>
  )
}
