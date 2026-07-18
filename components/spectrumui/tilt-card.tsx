/**
 * Spectrum UI — TiltCard
 *
 * A 3D perspective tilt card. The surface rotates toward the pointer with
 * spring smoothing, TiltCardItem children lift toward the viewer on their own
 * translateZ depth for a parallax effect, and a glare highlight follows the
 * pointer across the card. Tilt only engages for mouse pointers and is
 * disabled entirely under prefers-reduced-motion.
 *
 * Dependencies: framer-motion, @/lib/utils
 *
 * @example
 * <TiltCard className="max-w-sm p-6">
 *   <TiltCardItem depth={60}>Floats above the card</TiltCardItem>
 * </TiltCard>
 */

"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TiltCardProps {
  children: React.ReactNode
  /** Maximum rotation toward the pointer in degrees. Default 12 */
  maxTilt?: number
  /** Invert the tilt so the card leans away from the pointer. Default false */
  tiltReverse?: boolean
  /** Scale applied while hovered. Default 1.02 */
  scale?: number
  /** CSS perspective distance in pixels. Default 1000 */
  perspective?: number
  /** Show the pointer-following glare highlight. Default true */
  glare?: boolean
  /** Color at the center of the glare gradient */
  glareColor?: string
  /** Classes for the outer perspective wrapper */
  containerClassName?: string
  /** Classes for the card surface */
  className?: string
}

export interface TiltCardItemProps {
  children: React.ReactNode
  /** Lift toward the viewer in pixels while the card is hovered. Default 0 */
  depth?: number
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

/** Spring used while the pointer is tracking across the card */
const TRACK_SPRING = {
  type: "spring",
  stiffness: 260,
  damping: 22,
  mass: 0.6,
} as const
/** Softer spring so the card settles gently back to rest on pointer leave */
const RESET_SPRING = {
  type: "spring",
  stiffness: 140,
  damping: 18,
  mass: 1,
} as const
/** Normalized pointer position at rest (card center) */
const REST_POINT = 0.5
/** Subtle press-down while the card is clicked */
const PRESS_SCALE = 0.99

const TiltCardContext = createContext<{ hovered: boolean }>({ hovered: false })

// ─── Components ──────────────────────────────────────────────────────────────

export function TiltCard({
  children,
  maxTilt = 12,
  tiltReverse = false,
  scale = 1.02,
  perspective = 1000,
  glare = true,
  glareColor = "rgba(255, 255, 255, 0.35)",
  containerClassName,
  className,
}: TiltCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  // Smoothed normalized pointer position; animated toward each pointer sample
  // with TRACK_SPRING and back to rest with the softer RESET_SPRING
  const tiltX = useMotionValue(REST_POINT)
  const tiltY = useMotionValue(REST_POINT)
  const cardScale = useSpring(1, TRACK_SPRING)

  const tiltSign = tiltReverse ? -1 : 1
  const rotateX = useTransform(
    tiltY,
    [0, 1],
    [maxTilt * tiltSign, -maxTilt * tiltSign],
  )
  const rotateY = useTransform(
    tiltX,
    [0, 1],
    [-maxTilt * tiltSign, maxTilt * tiltSign],
  )
  const glarePosX = useTransform(tiltX, (value) => value * 100)
  const glarePosY = useTransform(tiltY, (value) => value * 100)
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glarePosX}% ${glarePosY}%, ${glareColor}, transparent 65%)`

  // Stop any in-flight tilt animations if the card unmounts mid-gesture
  useEffect(
    () => () => {
      tiltX.stop()
      tiltY.stop()
    },
    [tiltX, tiltY],
  )

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || shouldReduceMotion) return
      const rect = event.currentTarget.getBoundingClientRect()
      animate(tiltX, (event.clientX - rect.left) / rect.width, TRACK_SPRING)
      animate(tiltY, (event.clientY - rect.top) / rect.height, TRACK_SPRING)
    },
    [tiltX, tiltY, shouldReduceMotion],
  )

  const handlePointerEnter = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse" || shouldReduceMotion) return
      setHovered(true)
      cardScale.set(scale)
    },
    [cardScale, scale, shouldReduceMotion],
  )

  const handlePointerLeave = useCallback(() => {
    setHovered(false)
    cardScale.set(1)
    animate(tiltX, REST_POINT, RESET_SPRING)
    animate(tiltY, REST_POINT, RESET_SPRING)
  }, [cardScale, tiltX, tiltY])

  const handlePointerDown = useCallback(() => {
    if (shouldReduceMotion) return
    cardScale.set(PRESS_SCALE)
  }, [cardScale, shouldReduceMotion])

  const handlePointerUp = useCallback(() => {
    cardScale.set(hovered ? scale : 1)
  }, [cardScale, hovered, scale])

  return (
    <div
      className={cn("relative", containerClassName)}
      style={{ perspective: `${perspective}px` }}
    >
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          scale: cardScale,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative rounded-2xl border border-neutral-200 bg-white will-change-transform",
          "shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04)]",
          "dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none",
          className,
        )}
      >
        <TiltCardContext.Provider value={{ hovered }}>
          <div style={{ transformStyle: "preserve-3d" }}>{children}</div>
        </TiltCardContext.Provider>

        {glare && !shouldReduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBackground, transform: "translateZ(1px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </div>
  )
}

export function TiltCardItem({
  children,
  depth = 0,
  className,
}: TiltCardItemProps) {
  const shouldReduceMotion = useReducedMotion()
  const { hovered } = useContext(TiltCardContext)
  const lifted = hovered && !shouldReduceMotion

  return (
    <div
      className={cn(
        "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none",
        className,
      )}
      style={{
        transform: lifted ? `translateZ(${depth}px)` : "translateZ(0px)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  )
}
