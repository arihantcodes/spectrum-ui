"use client"

import { cn } from "@/lib/utils"
import React from "react"
import { motion, type Transition } from "framer-motion"

const SPRING_FLUID: Transition = { type: "spring", stiffness: 300, damping: 30 }

export function FloatingBadge({ 
  className, 
  children,
}: { 
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10, scale: 0.95 },
        visible: { opacity: 0, y: 10, scale: 0.95 },
        hover: { opacity: 1, y: -8, scale: 1.05 }
      }}
      transition={SPRING_FLUID}
      className={cn(
        "inline-flex items-center rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-xs font-medium text-neutral-900 shadow-sm backdrop-blur-md dark:border-neutral-800 dark:bg-[#0C0C0C]/80 dark:text-neutral-100",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export function GlowingCircle({
  className,
  color = "bg-neutral-300/30 dark:bg-neutral-700/30"
}: {
  className?: string
  color?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { scale: 1, opacity: 0.4 },
        visible: { scale: 1, opacity: 0.4 },
        hover: { scale: 1.5, opacity: 1 }
      }}
      transition={SPRING_FLUID}
      className={cn(
        "absolute rounded-full blur-2xl", 
        color, 
        className
      )}
    />
  )
}
