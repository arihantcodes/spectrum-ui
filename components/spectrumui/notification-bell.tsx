/**
 * Spectrum UI — NotificationBell
 *
 * A bell icon button micro-interaction. When the unread count increases the
 * bell swings from its hinge like a settling pendulum while the clapper
 * wiggles the opposite way in phase, and a rose badge springs in and rolls
 * its count like an odometer. A dot mode swaps the number for an indicator
 * that pings once per increase. Honors prefers-reduced-motion and announces
 * unread changes to screen readers.
 *
 * Dependencies: framer-motion, @/lib/utils
 *
 * @example
 * <NotificationBell count={3} onClick={() => openInbox()} />
 */

"use client"

import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface NotificationBellProps {
  /** Number of unread notifications. Default 0 */
  count?: number
  /** Counts above this render as "max+". Default 99 */
  max?: number
  /** Show a small pinging dot instead of the numeric badge. Default false */
  dot?: boolean
  /** Play the ring swing once when the component mounts. Default false */
  ringOnMount?: boolean
  /** Click handler for the bell button */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  /** Visual size of the button. Default "md" */
  size?: "sm" | "md" | "lg"
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

/** Seconds a full ring swing takes to settle */
const SWING_DURATION = 0.9
/** Bell rotation keyframes — amplitude decays like a released pendulum */
const BELL_SWING = [0, 15, -12, 8, -5, 3, -1.5, 0]
/** Clapper counter-rotation; same keyframe count so it stays in phase */
const CLAPPER_SWING = [0, -17, 14, -10, 6, -3.5, 2, 0]
/**
 * Keyframe times — a quick initial impulse, then near-constant half-periods
 * so the decay reads as physics rather than a linear ramp
 */
const SWING_TIMES = [0, 0.1, 0.26, 0.42, 0.58, 0.74, 0.88, 1]
/** Ease per swing segment — slow at the extremes, fast through center */
const SWING_EASE = "easeInOut" as const

/** Seconds the dot's ping halo takes to expand and fade */
const PING_DURATION = 0.9
/** Badge entrance overshoots slightly — a positive "you've got mail" pop */
const BADGE_SPRING = { type: "spring", stiffness: 500, damping: 22 } as const
/** Snappy micro spring — odometer roll and pressed feedback */
const COUNT_SPRING = { type: "spring", stiffness: 400, damping: 30 } as const
const TAP_SPRING = { type: "spring", stiffness: 500, damping: 30 } as const

const BELL_DOME_PATH = "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
const BELL_CLAPPER_PATH = "M10.3 21a1.94 1.94 0 0 0 3.4 0"

const SIZES = {
  sm: { button: "h-9 w-9", icon: 16 },
  md: { button: "h-11 w-11", icon: 20 },
  lg: { button: "h-[52px] w-[52px]", icon: 24 },
} as const

const countVariants = {
  enter: (direction: number) => ({ y: direction * 10, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction * -10, opacity: 0 }),
}

// ─── Component ───────────────────────────────────────────────────────────────

export function NotificationBell({
  count = 0,
  max = 99,
  dot = false,
  ringOnMount = false,
  onClick,
  size = "md",
  className,
}: NotificationBellProps) {
  const shouldReduceMotion = useReducedMotion()
  const prevCountRef = useRef(count)
  // Monotonically increasing swing trigger — re-keying the bell restarts the
  // swing cleanly on every increase instead of queueing animations
  const [ringKey, setRingKey] = useState(() => (ringOnMount ? 1 : 0))

  const { button: sizeClasses, icon } = SIZES[size]
  const displayValue = count > max ? `${max}+` : String(count)
  // While the count is rising, digits roll upward (and downward when falling)
  const direction = count >= prevCountRef.current ? 1 : -1

  useEffect(() => {
    if (count > prevCountRef.current) setRingKey((key) => key + 1)
    prevCountRef.current = count
  }, [count])

  const swinging = ringKey > 0 && !shouldReduceMotion

  const swingTransition = swinging
    ? { duration: SWING_DURATION, times: SWING_TIMES, ease: SWING_EASE }
    : { duration: 0 }

  const badgeTransition = shouldReduceMotion ? { duration: 0 } : BADGE_SPRING

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={
        count > 0 ? `Notifications, ${count} unread` : "Notifications"
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
      transition={TAP_SPRING}
      className={cn(
        "relative inline-flex touch-manipulation select-none items-center justify-center rounded-full border transition-colors",
        "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100",
        "dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800",
        "focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
        sizeClasses,
        className,
      )}
    >
      {/* Re-keying by ringKey replays the swing on every count increase; the
          explicit rotate: 0 initial makes each remount start from rest */}
      <motion.span
        key={`bell-${ringKey}`}
        className="inline-flex"
        style={{ transformOrigin: "top center" }}
        initial={{ rotate: 0 }}
        animate={swinging ? { rotate: BELL_SWING } : { rotate: 0 }}
        transition={swingTransition}
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
          <path d={BELL_DOME_PATH} />
          <motion.path
            d={BELL_CLAPPER_PATH}
            style={{ transformBox: "fill-box", transformOrigin: "top center" }}
            initial={{ rotate: 0 }}
            animate={swinging ? { rotate: CLAPPER_SWING } : { rotate: 0 }}
            transition={swingTransition}
          />
        </svg>
      </motion.span>

      {dot ? (
        <AnimatePresence initial={false}>
          {count > 0 && (
            <motion.span
              key="dot"
              aria-hidden="true"
              className="absolute right-1 top-1 flex h-2.5 w-2.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={badgeTransition}
            >
              {/* Re-keyed by ringKey so the halo pings exactly once per increase */}
              {swinging && (
                <motion.span
                  key={`ping-${ringKey}`}
                  className="absolute inset-0 rounded-full bg-rose-500"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: PING_DURATION, ease: "easeOut" }}
                />
              )}
              <span className="relative h-2.5 w-2.5 rounded-full bg-rose-500" />
            </motion.span>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence initial={false}>
          {count > 0 && (
            <motion.span
              key="badge"
              aria-hidden="true"
              className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold leading-none text-white"
              // Grow outward from where the badge attaches to the bell
              style={{ transformOrigin: "left bottom" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={badgeTransition}
            >
              <span className="relative inline-flex overflow-hidden tabular-nums">
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                >
                  <motion.span
                    key={displayValue}
                    className="inline-block"
                    custom={direction}
                    variants={countVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={
                      shouldReduceMotion ? { duration: 0 } : COUNT_SPRING
                    }
                  >
                    {displayValue}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      )}

      <span className="sr-only" role="status" aria-live="polite">
        {count > 0
          ? `${count} unread notification${count === 1 ? "" : "s"}`
          : ""}
      </span>
    </motion.button>
  )
}
