"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring, useTransform, type Transition } from "framer-motion"
import React, { ReactNode, useRef, useState } from "react"
import { Spotlight } from "./spotlight"
import { BorderBeam } from "./border-beam"

const SPRING_TACTILE: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
  mass: 1,
}

const SPRING_ENTRANCE: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
}

export interface BentoCardProps {
  className?: string
  children?: ReactNode
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  background?: ReactNode
  colSpan?: number
  rowSpan?: number
  tilt?: boolean
  spotlight?: boolean
  borderAnim?: boolean
}

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: SPRING_ENTRANCE 
  },
  hover: {
    scale: 1.01,
    y: -4,
    transition: SPRING_TACTILE
  }
}

export function BentoCard({
  className,
  children,
  title,
  description,
  icon,
  background,
  colSpan = 1,
  rowSpan = 1,
  tilt = false,
  spotlight = true,
  borderAnim = true,
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const spotlightX = useMotionValue(0)
  const spotlightY = useMotionValue(0)

  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)

  // Smooth springs for tilt
  const smoothTiltX = useSpring(tiltX, { stiffness: 300, damping: 30 })
  const smoothTiltY = useSpring(tiltY, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(smoothTiltY, [-150, 150], [5, -5])
  const rotateY = useTransform(smoothTiltX, [-150, 150], [-5, 5])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    
    // For Spotlight (relative to top left)
    spotlightX.set(e.clientX - rect.left)
    spotlightY.set(e.clientY - rect.top)

    // For Tilt (relative to center)
    if (tilt) {
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      tiltX.set(e.clientX - rect.left - centerX)
      tiltY.set(e.clientY - rect.top - centerY)
    }
  }

  function handleMouseEnter() {
    setIsHovered(true)
  }

  function handleMouseLeave() {
    setIsHovered(false)
    if (tilt) {
      tiltX.set(0)
      tiltY.set(0)
    }
  }

  // Calculate CSS grid spans
  const colSpanClass = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
  }[colSpan] || "md:col-span-1"

  const rowSpanClass = {
    1: "row-span-1",
    2: "row-span-2",
    3: "row-span-3",
  }[rowSpan] || "row-span-1"

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      transition={SPRING_TACTILE}
      style={{
        ...(tilt && { rotateX, rotateY }),
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl",
        "bg-neutral-50 dark:bg-[#0C0C0C]",
        "border border-neutral-200 dark:border-neutral-800",
        "shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-black/50",
        "col-span-1",
        colSpanClass,
        rowSpanClass,
        className
      )}
    >
      {/* Spotlight Effect */}
      {spotlight && (
        <Spotlight 
          mouseX={spotlightX} 
          mouseY={spotlightY} 
          isHovered={isHovered} 
        />
      )}

      {/* Border Beam */}
      {borderAnim && <BorderBeam isHovered={isHovered} />}

      {/* Background Effect */}
      {background && (
        <div className="absolute inset-0 z-0 opacity-50 transition-opacity duration-300 group-hover:opacity-100">
          {background}
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 xl:p-6">
        {/* Render children first if it's the main visual */}
        <div className="flex-1">{children}</div>

        {/* Header / Footer text area */}
        {(title || description || icon) && (
          <div className={cn("flex items-start space-x-4", children ? "mt-4 sm:mt-6" : "")}>
            {icon && (
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-200/50 dark:bg-neutral-800/50 text-neutral-900 dark:text-neutral-100">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
