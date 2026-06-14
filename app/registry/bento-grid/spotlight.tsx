"use client"

import { cn } from "@/lib/utils"
import { motion, MotionValue, useMotionTemplate } from "framer-motion"
import React from "react"

export interface SpotlightProps {
  className?: string
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  isHovered: boolean
  color?: string
}

export function Spotlight({
  className,
  mouseX,
  mouseY,
  isHovered,
  color = "rgba(255, 255, 255, 0.06)",
}: SpotlightProps) {
  const background = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      ${color},
      transparent 80%
    )
  `

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute -inset-px z-0 transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0",
        className
      )}
      style={{ background }}
    />
  )
}
