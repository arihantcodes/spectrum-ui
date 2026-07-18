/**
 * Spectrum UI — LikeButton
 *
 * A heart like-button micro-interaction. Liking pops the heart with a spring
 * scale, fires a ring pulse plus a radial particle burst, and rolls the count
 * up like an odometer; unliking rolls it back down. Works controlled or
 * uncontrolled, honors prefers-reduced-motion, and exposes its state to
 * screen readers via aria-pressed.
 *
 * Dependencies: framer-motion, @/lib/utils
 *
 * @example
 * <LikeButton count={128} onLikedChange={(liked) => save(liked)} />
 */

"use client"

import React, { useCallback, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LikeButtonProps {
  /** Controlled liked state. Leave undefined for uncontrolled usage */
  liked?: boolean
  /** Initial liked state when uncontrolled. Default false */
  defaultLiked?: boolean
  /** Fires with the next liked state on every toggle */
  onLikedChange?: (liked: boolean) => void
  /** Like total excluding the current user; +1 is shown while liked */
  count?: number
  /** Hide the rolling counter even when count is provided. Default true */
  showCount?: boolean
  /** Visual size of the button. Default "md" */
  size?: "sm" | "md" | "lg"
  /** Colors cycled across the burst particles */
  particleColors?: string[]
  /** Disables pointer and keyboard interaction */
  disabled?: boolean
  /** Accessible name of the action. Default "Like" */
  label?: string
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 8
const BURST_DURATION = 0.55

/** Snappy micro spring for the heart fill scaling in */
const FILL_SPRING: Transition = { type: "spring", stiffness: 500, damping: 30 }
/** Tight tween for the un-fill so the heart never overshoots past zero scale */
const UNFILL_TWEEN: Transition = { duration: 0.15, ease: "easeOut" }
/** Spring for the rolling odometer digits */
const COUNT_SPRING: Transition = { type: "spring", stiffness: 400, damping: 30 }
/** Celebratory squash-and-stretch pop when liking */
const POP_KEYFRAMES = [1, 0.6, 1.3, 1]
const POP_TRANSITION: Transition = {
  duration: 0.45,
  times: [0, 0.25, 0.6, 1],
  ease: "easeOut",
}
/** The heart's visual mass sits below center, so pops anchor slightly low */
const HEART_ORIGIN = "50% 60%"

const DEFAULT_PARTICLE_COLORS = [
  "#f43f5e",
  "#fb923c",
  "#facc15",
  "#4ade80",
  "#38bdf8",
  "#a78bfa",
]

const SIZES = {
  sm: { button: "h-8 gap-1.5 px-3 text-xs", icon: 14 },
  md: { button: "h-10 gap-2 px-4 text-sm", icon: 17 },
  lg: { button: "h-12 gap-2.5 px-5 text-base", icon: 20 },
} as const

const HEART_PATH =
  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"

const countVariants = {
  enter: (direction: number) => ({ y: direction * 12, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction * -12, opacity: 0 }),
}

function formatCount(value: number) {
  return value >= 1000
    ? new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(value)
    : String(value)
}

// ─── Component ───────────────────────────────────────────────────────────────

export function LikeButton({
  liked: likedProp,
  defaultLiked = false,
  onLikedChange,
  count,
  showCount = true,
  size = "md",
  particleColors = DEFAULT_PARTICLE_COLORS,
  disabled = false,
  label = "Like",
  className,
}: LikeButtonProps) {
  const shouldReduceMotion = useReducedMotion()
  const [internalLiked, setInternalLiked] = useState(defaultLiked)
  // Monotonic id per burst; null while idle so unmount/cleanup can't race a re-click
  const [burst, setBurst] = useState<number | null>(null)
  const burstIdRef = useRef(0)

  const liked = likedProp ?? internalLiked
  const { button: sizeClasses, icon } = SIZES[size]
  const displayCount = count !== undefined ? count + (liked ? 1 : 0) : undefined
  // While liked the count just went up, so digits roll upward (and vice versa)
  const direction = liked ? 1 : -1
  // Reserve the wider of the liked/unliked renderings so toggling never
  // shifts the pill width (tabular-nums keeps digit widths uniform)
  const countWidthCh =
    count !== undefined
      ? Math.max(formatCount(count).length, formatCount(count + 1).length)
      : 0

  const handleClick = useCallback(() => {
    const next = !liked
    if (likedProp === undefined) setInternalLiked(next)
    onLikedChange?.(next)
    if (next && !shouldReduceMotion) {
      burstIdRef.current += 1
      setBurst(burstIdRef.current)
    }
  }, [liked, likedProp, onLikedChange, shouldReduceMotion])

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={liked}
      aria-label={
        displayCount !== undefined && showCount
          ? `${label} (${displayCount})`
          : label
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
      className={cn(
        "group relative inline-flex touch-manipulation select-none items-center justify-center rounded-full border font-medium transition-colors",
        "shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04)] dark:shadow-none",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
        "disabled:pointer-events-none disabled:opacity-50",
        liked
          ? "border-rose-200 bg-rose-50 text-rose-600 hover:border-rose-300 hover:bg-rose-100/70 active:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:border-rose-500/50 dark:hover:bg-rose-500/15 dark:active:bg-rose-500/20"
          : "border-neutral-200 bg-white text-neutral-600 hover:border-rose-200 hover:bg-rose-50/60 hover:text-rose-500 active:bg-rose-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-rose-500/40 dark:hover:bg-rose-500/[0.06] dark:hover:text-rose-400 dark:active:bg-rose-500/10",
        sizeClasses,
        className,
      )}
    >
      <motion.span
        className="relative flex items-center justify-center"
        style={{ transformOrigin: HEART_ORIGIN }}
        initial={false}
        animate={
          liked && !shouldReduceMotion
            ? { scale: POP_KEYFRAMES }
            : { scale: 1 }
        }
        transition={POP_TRANSITION}
      >
        <span
          className="relative inline-flex"
          style={{ width: icon, height: icon }}
        >
          <svg
            viewBox="0 0 24 24"
            width={icon}
            height={icon}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d={HEART_PATH} />
          </svg>
          <motion.svg
            viewBox="0 0 24 24"
            width={icon}
            height={icon}
            className="absolute inset-0 text-rose-500 dark:text-rose-400"
            style={{ transformOrigin: HEART_ORIGIN }}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            initial={false}
            animate={{ scale: liked ? 1 : 0, opacity: liked ? 1 : 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : liked
                  ? FILL_SPRING
                  : UNFILL_TWEEN
            }
          >
            <path d={HEART_PATH} />
          </motion.svg>
        </span>

        {burst !== null && !shouldReduceMotion && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <motion.span
              key={`ring-${burst}`}
              className="absolute rounded-full border-2 border-rose-400"
              style={{ width: icon * 1.6, height: icon * 1.6 }}
              initial={{ scale: 0.3, opacity: 0.9 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: BURST_DURATION, ease: "easeOut" }}
              // Only clear if a newer burst hasn't replaced this one meanwhile
              onAnimationComplete={() =>
                setBurst((current) => (current === burst ? null : current))
              }
            />
            {Array.from({ length: PARTICLE_COUNT }).map((_, index) => {
              const angle = (index / PARTICLE_COUNT) * Math.PI * 2 - Math.PI / 2
              const distance = icon * (index % 2 === 0 ? 1.9 : 1.5)
              const dotSize = Math.max(3, Math.round(icon * 0.26))
              return (
                <motion.span
                  key={`particle-${burst}-${index}`}
                  className="absolute rounded-full"
                  style={{
                    width: dotSize,
                    height: dotSize,
                    backgroundColor:
                      particleColors[index % particleColors.length],
                  }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    scale: [0, 1, 0.4],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: BURST_DURATION, ease: "easeOut" }}
                />
              )
            })}
          </span>
        )}
      </motion.span>

      {displayCount !== undefined && showCount && (
        <span
          className="relative inline-flex justify-center overflow-hidden tabular-nums"
          style={{ minWidth: `${countWidthCh}ch` }}
          aria-hidden="true"
        >
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.span
              key={displayCount}
              className="inline-block"
              custom={direction}
              variants={countVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={shouldReduceMotion ? { duration: 0 } : COUNT_SPRING}
            >
              {formatCount(displayCount)}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </motion.button>
  )
}
