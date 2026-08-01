/**
 * Spectrum UI — HoldToConfirmButton
 *
 * A press-and-hold confirmation button for destructive actions. Holding the
 * button (pointer, Space or Enter) fills a circular progress ring around the
 * icon; releasing early springs the ring back and nothing fires. Holding to
 * completion fires onConfirm exactly once, draws a check in with a spring pop,
 * staggers the label swap behind it, tints the button emerald and then resets
 * to idle. Honors prefers-reduced-motion and announces confirmation to screen
 * readers.
 *
 * Dependencies: framer-motion, lucide-react, @/lib/utils
 *
 * @example
 * <HoldToConfirmButton onConfirm={() => deleteProject(id)} />
 */

"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion"
import { Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface HoldToConfirmButtonProps {
  /** Fires exactly once when the hold reaches completion */
  onConfirm: () => void
  /** How long the button must be held, in milliseconds. Default 1200 */
  duration?: number
  /** Idle label. Default "Hold to delete" */
  label?: string
  /** Label shown after a completed hold. Default "Deleted" */
  confirmedLabel?: string
  /** Replaces the default trash icon */
  icon?: React.ReactNode
  /** Visual size of the button. Default "md" */
  size?: "sm" | "md" | "lg"
  /** Milliseconds before resetting to idle after confirming; 0 stays confirmed. Default 1500 */
  resetDelay?: number
  /** Disables pointer and keyboard interaction */
  disabled?: boolean
  className?: string
}

/** Input channels that can drive a hold; both may be active at once */
type HoldSource = "pointer" | "keyboard"

// ─── Constants ───────────────────────────────────────────────────────────────

const SIZES = {
  sm: { button: "h-8 gap-1.5 pl-2 pr-3 text-xs", icon: 12, ring: 20, stroke: 2 },
  md: { button: "h-10 gap-2 pl-2.5 pr-4 text-sm", icon: 14, ring: 24, stroke: 2 },
  lg: { button: "h-12 gap-2.5 pl-3 pr-5 text-base", icon: 17, ring: 30, stroke: 2.5 },
} as const

/** Snappy micro spring — release spring-back, icon pops */
const SNAPPY_SPRING = { type: "spring", stiffness: 500, damping: 30 } as const
/** Spring for the label roll between idle and confirmed */
const SWAP_SPRING = { type: "spring", stiffness: 400, damping: 30 } as const
/** Check pop overshoots slightly — reserved for the positive confirmation */
const CHECK_POP_SPRING = { type: "spring", stiffness: 500, damping: 22 } as const
/** Entrance/reveal ease */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Scale while the button is held down */
const HOLD_SCALE = 0.97
/** Seconds the press scale-down takes — eases in mechanically, no bounce */
const HOLD_SCALE_DURATION = 0.2
/** Seconds the check waits after confirmation before drawing in */
const CHECK_DRAW_DELAY = 0.05
/** Seconds the check stroke takes to draw */
const CHECK_DRAW_DURATION = 0.25
/** Seconds the label swap trails the check draw on confirmation */
const LABEL_STAGGER = 0.12
/** Seconds the ring takes to unwind when resetting to idle */
const RING_RESET_DURATION = 0.3

/** Lucide check, drawn manually so the stroke can animate its pathLength */
const CHECK_PATH = "M20 6 9 17l-5-5"

const labelVariants = {
  enter: (reduce: boolean) => (reduce ? { opacity: 0 } : { y: 6, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  // Exit carries its own transition so the confirmed label's entrance delay
  // never leaks into the outgoing label when the button resets
  exit: (reduce: boolean) =>
    reduce
      ? { opacity: 0, transition: { duration: 0 } }
      : { y: -6, opacity: 0, transition: SWAP_SPRING },
}

// ─── Component ───────────────────────────────────────────────────────────────

export function HoldToConfirmButton({
  onConfirm,
  duration = 1200,
  label = "Hold to delete",
  confirmedLabel = "Deleted",
  icon,
  size = "md",
  resetDelay = 1500,
  disabled = false,
  className,
}: HoldToConfirmButtonProps) {
  const shouldReduceMotion = useReducedMotion()
  const [holding, setHolding] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  // 0 → 1 hold progress driving the ring's stroke-dashoffset
  const progress = useMotionValue(0)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const confirmedRef = useRef(false)
  // Active input channels — a combined pointer+key hold must neither restart
  // the fill nor cancel it while the other channel is still held
  const holdSourcesRef = useRef<Set<HoldSource>>(new Set())

  const { button: sizeClasses, icon: iconSize, ring, stroke } = SIZES[size]
  const radius = (ring - stroke) / 2
  const circumference = 2 * Math.PI * radius

  const dashOffset = useTransform(progress, (p) => circumference * (1 - p))
  // Ring (and its faint track) fades in as soon as a hold begins
  const ringOpacity = useTransform(progress, [0, 0.04], [0, 1])

  const holdSeconds = (duration / 1000).toFixed(1).replace(/\.0$/, "")

  const handleComplete = useCallback(() => {
    if (confirmedRef.current) return
    confirmedRef.current = true
    // Physical holds outstanding at confirmation are consumed
    holdSourcesRef.current.clear()
    setHolding(false)
    setConfirmed(true)
    onConfirm()

    if (resetDelay > 0) {
      resetTimerRef.current = setTimeout(() => {
        setConfirmed(false)
        confirmedRef.current = false
        animationRef.current?.stop()
        animationRef.current = animate(progress, 0, {
          duration: shouldReduceMotion ? 0.1 : RING_RESET_DURATION,
          ease: "easeOut",
        })
      }, resetDelay)
    }
  }, [onConfirm, progress, resetDelay, shouldReduceMotion])

  const startHold = useCallback(
    (source: HoldSource) => {
      if (disabled || confirmedRef.current) return
      const sources = holdSourcesRef.current
      const alreadyHolding = sources.size > 0
      sources.add(source)
      // A second input joining an active hold must not restart the fill
      if (alreadyHolding) return
      setHolding(true)
      animationRef.current?.stop()
      // Resume from wherever the ring is, keeping the fill rate constant —
      // linear on purpose: the ring is a functional progress readout
      animationRef.current = animate(progress, 1, {
        duration: (duration * (1 - progress.get())) / 1000,
        ease: "linear",
        onComplete: handleComplete,
      })
    },
    [disabled, duration, handleComplete, progress],
  )

  const cancelHold = useCallback(
    (source?: HoldSource) => {
      const sources = holdSourcesRef.current
      if (source) sources.delete(source)
      else sources.clear()
      // Another input channel is still holding — keep filling
      if (sources.size > 0) return
      setHolding(false)
      if (confirmedRef.current) return
      animationRef.current?.stop()
      animationRef.current = animate(
        progress,
        0,
        shouldReduceMotion ? { duration: 0.15, ease: "linear" } : SNAPPY_SPRING,
      )
    },
    [progress, shouldReduceMotion],
  )

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      // Capture so slight finger drift doesn't cancel and pointerup is
      // received even when released outside the button
      try {
        event.currentTarget.setPointerCapture(event.pointerId)
      } catch {
        // Pointer already inactive — nothing to capture
      }
      startHold("pointer")
    },
    [startHold],
  )

  const cancelPointerHold = useCallback(() => cancelHold("pointer"), [cancelHold])
  const cancelAllHolds = useCallback(() => cancelHold(), [cancelHold])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== " " && event.key !== "Enter") return
      // Keep the native button from firing click; ignore held-key repeats
      event.preventDefault()
      if (event.repeat) return
      startHold("keyboard")
    },
    [startHold],
  )

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== " " && event.key !== "Enter") return
      event.preventDefault()
      cancelHold("keyboard")
    },
    [cancelHold],
  )

  useEffect(() => {
    return () => {
      animationRef.current?.stop()
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    }
  }, [])

  return (
    <motion.button
      type="button"
      disabled={disabled}
      aria-label={`${label}. Press and hold for ${holdSeconds} seconds to confirm`}
      onPointerDown={handlePointerDown}
      onPointerUp={cancelPointerHold}
      onPointerLeave={cancelPointerHold}
      onPointerCancel={cancelPointerHold}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={cancelAllHolds}
      onContextMenu={(event) => event.preventDefault()}
      animate={{ scale: holding && !shouldReduceMotion ? HOLD_SCALE : 1 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : holding
            ? // Pressing in eases down mechanically…
              { duration: HOLD_SCALE_DURATION, ease: EASE_OUT }
            : // …releasing springs back snappily
              SNAPPY_SPRING
      }
      className={cn(
        "relative inline-flex touch-none select-none items-center justify-center rounded-full border font-medium transition-colors",
        "focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
        "disabled:pointer-events-none disabled:opacity-50",
        confirmed
          ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400"
          : "border-rose-200 bg-white text-rose-600 hover:bg-rose-50 dark:border-rose-500/30 dark:bg-neutral-900 dark:text-rose-400 dark:hover:bg-rose-500/10",
        sizeClasses,
        className,
      )}
    >
      {/* Icon + progress ring */}
      <span
        className="relative inline-flex shrink-0 items-center justify-center"
        style={{ width: ring, height: ring }}
        aria-hidden="true"
      >
        <motion.span
          className="inline-flex items-center justify-center"
          initial={false}
          animate={{
            scale: confirmed ? 0 : 1,
            opacity: confirmed ? 0 : 1,
          }}
          transition={shouldReduceMotion ? { duration: 0 } : SNAPPY_SPRING}
        >
          {icon ?? <Trash2 size={iconSize} strokeWidth={2} />}
        </motion.span>
        {/* Success check — pops with a slight overshoot while its stroke draws */}
        <motion.span
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            scale: confirmed ? 1 : 0,
            opacity: confirmed ? 1 : 0,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  ...CHECK_POP_SPRING,
                  delay: confirmed ? CHECK_DRAW_DELAY : 0,
                }
          }
        >
          <svg
            viewBox="0 0 24 24"
            width={iconSize}
            height={iconSize}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d={CHECK_PATH}
              initial={false}
              animate={{ pathLength: confirmed ? 1 : 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : confirmed
                    ? {
                        duration: CHECK_DRAW_DURATION,
                        ease: EASE_OUT,
                        delay: CHECK_DRAW_DELAY,
                      }
                    : { duration: 0.1 }
              }
            />
          </svg>
        </motion.span>

        <motion.svg
          viewBox={`0 0 ${ring} ${ring}`}
          width={ring}
          height={ring}
          className="absolute inset-0 -rotate-90"
          style={{ opacity: ringOpacity }}
        >
          <circle
            cx={ring / 2}
            cy={ring / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.2}
            strokeWidth={stroke}
          />
          <motion.circle
            cx={ring / 2}
            cy={ring / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: dashOffset }}
          />
        </motion.svg>
      </span>

      {/* Label */}
      <span
        className={cn(
          "relative inline-flex overflow-hidden transition-opacity duration-200",
          holding && "opacity-60",
        )}
      >
        <AnimatePresence
          mode="popLayout"
          initial={false}
          custom={shouldReduceMotion ?? false}
        >
          <motion.span
            key={confirmed ? "confirmed" : "idle"}
            className="inline-block whitespace-nowrap"
            custom={shouldReduceMotion ?? false}
            variants={labelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    ...SWAP_SPRING,
                    // Label swap trails the check draw on confirmation
                    delay: confirmed ? CHECK_DRAW_DELAY + LABEL_STAGGER : 0,
                  }
            }
          >
            {confirmed ? confirmedLabel : label}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* Screen reader confirmation announcement */}
      <span className="sr-only" role="status" aria-live="polite">
        {confirmed ? confirmedLabel : ""}
      </span>
    </motion.button>
  )
}
