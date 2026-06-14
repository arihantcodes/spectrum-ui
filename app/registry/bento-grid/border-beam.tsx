"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import React from "react"

export interface BorderBeamProps {
  className?: string
  duration?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
  isHovered?: boolean
}

export function BorderBeam({
  className,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = "rgba(163, 163, 163, 0)",
  colorTo = "rgba(163, 163, 163, 0.4)",
  isHovered = false,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 rounded-[inherit] border border-transparent",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        className
      )}
      style={{
        borderWidth: borderWidth,
      }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `conic-gradient(from 0deg, ${colorFrom} 0%, ${colorTo} 50%, ${colorFrom} 100%)`,
          opacity: isHovered ? 1 : 0.3,
          transition: "opacity 0.3s ease",
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: duration,
        }}
      />
    </div>
  )
}
