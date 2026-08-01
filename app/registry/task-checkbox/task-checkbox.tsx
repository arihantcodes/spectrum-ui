/**
 * Spectrum UI — TaskCheckbox
 *
 * A deeply satisfying todo checkbox row. Checking fills the box with a snappy
 * spring, draws the check in, pops the box and fires a tiny confetti burst
 * while a strikethrough sweeps across the label; unchecking reverses quickly
 * with no fanfare. Works controlled or uncontrolled, honors
 * prefers-reduced-motion, and exposes real checkbox semantics via
 * role="checkbox" and aria-checked.
 *
 * Dependencies: framer-motion, @/lib/utils
 *
 * @example
 * <TaskCheckbox
 *   label="Ship the changelog"
 *   description="Blocks the Friday release"
 *   onCheckedChange={(checked) => save(checked)}
 * />
 */

"use client"

import React, { useCallback, useId, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TaskCheckboxProps {
  /** Controlled checked state. Leave undefined for uncontrolled usage */
  checked?: boolean
  /** Initial checked state when uncontrolled. Default false */
  defaultChecked?: boolean
  /** Fires with the next checked state on every toggle */
  onCheckedChange?: (checked: boolean) => void
  /** Task text next to the box; struck through while checked */
  label: React.ReactNode
  /** Optional secondary line rendered under the label */
  description?: React.ReactNode
  /** Visual size of the row. Default "md" */
  size?: "sm" | "md" | "lg"
  /** Disables pointer and keyboard interaction */
  disabled?: boolean
  /** Additional classes merged onto the row wrapper */
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

/** Snappy spring for micro moves (box fill scaling in) */
const MICRO_SPRING = { type: "spring", stiffness: 500, damping: 30 } as const
/** Ease for line reveals (label strikethrough) */
const REVEAL_EASE = [0.22, 1, 0.36, 1] as const

/** Check stroke starts drawing shortly after the fill lands */
const CHECK_DRAW_DELAY = 0.06
const CHECK_DRAW_DURATION = 0.2

/** Strikethrough grows on check, shrinks faster on uncheck */
const STRIKE_DURATION = 0.25
const UNSTRIKE_DURATION = 0.15
const STRIKE_HEIGHT = 1.5

/** Box pop on check only — overshoot is reserved for the positive moment */
const POP_KEYFRAMES = [1, 0.9, 1.05, 1]
const POP_DURATION = 0.4
const POP_TIMES = [0, 0.3, 0.7, 1]

/** Confetti burst fired from the box on check */
const CONFETTI_COUNT = 6
const CONFETTI_DURATION = 0.5
/** Radial travel, as multiples of the box size (alternating far/near) */
const CONFETTI_DISTANCE_FAR = 1.6
const CONFETTI_DISTANCE_NEAR = 1.25
/** neutral-400 and emerald-500 — emerald is the celebration accent */
const CONFETTI_COLORS = ["#a3a3a3", "#10b981"]

const CHECK_PATH = "M5 12.5L10 17.5L19 7.5"

const SIZES = {
  sm: {
    gap: "gap-2.5",
    // 24px hit target; negative margins keep the layout footprint at box size
    hit: "-m-1 -mt-0.5 h-6 w-6",
    box: "h-4 w-4",
    radius: "rounded",
    boxPx: 16,
    label: "text-sm leading-5",
    description: "text-xs leading-4",
  },
  md: {
    gap: "gap-3",
    hit: "-m-1 h-7 w-7",
    box: "h-5 w-5",
    radius: "rounded-md",
    boxPx: 20,
    label: "text-sm leading-5",
    description: "text-xs leading-4",
  },
  lg: {
    gap: "gap-3",
    hit: "-m-1 h-8 w-8",
    box: "h-6 w-6",
    radius: "rounded-md",
    boxPx: 24,
    label: "text-base leading-6",
    description: "text-sm leading-5",
  },
} as const

// ─── Component ───────────────────────────────────────────────────────────────

export function TaskCheckbox({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  label,
  description,
  size = "md",
  disabled = false,
  className,
}: TaskCheckboxProps) {
  const shouldReduceMotion = useReducedMotion()
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const [burstKey, setBurstKey] = useState(0)
  const labelId = useId()
  const descriptionId = useId()

  const checked = checkedProp ?? internalChecked
  const sizes = SIZES[size]
  const confettiDotSize = Math.max(3, Math.round(sizes.boxPx * 0.2))

  const toggle = useCallback(() => {
    if (disabled) return
    const next = !checked
    if (checkedProp === undefined) setInternalChecked(next)
    onCheckedChange?.(next)
    if (next && !shouldReduceMotion) setBurstKey((key) => key + 1)
  }, [checked, checkedProp, disabled, onCheckedChange, shouldReduceMotion])

  return (
    <div
      className={cn(
        "group flex select-none touch-manipulation items-start",
        sizes.gap,
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {/* Native button gives us Space/Enter toggling for free */}
      <motion.button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-describedby={description ? descriptionId : undefined}
        disabled={disabled}
        onClick={toggle}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
        transition={MICRO_SPRING}
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-md",
          "focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
          sizes.hit,
        )}
      >
        <motion.span
          className={cn(
            "relative flex items-center justify-center border bg-white transition-colors duration-200 dark:bg-neutral-900",
            checked
              ? "border-neutral-900 dark:border-white"
              : "border-neutral-200 group-hover:border-neutral-400 dark:border-neutral-800 dark:group-hover:border-neutral-600",
            sizes.box,
            sizes.radius,
          )}
          initial={false}
          animate={
            checked && !shouldReduceMotion
              ? { scale: POP_KEYFRAMES }
              : { scale: 1 }
          }
          transition={
            checked && !shouldReduceMotion
              ? { duration: POP_DURATION, times: POP_TIMES, ease: "easeOut" }
              : { duration: 0.15 }
          }
        >
          {/* Fill scales in from center under the check */}
          <motion.span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 bg-neutral-900 dark:bg-white",
              sizes.radius,
            )}
            initial={false}
            animate={{ scale: checked ? 1 : 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : checked
                  ? MICRO_SPRING
                  : { duration: 0.15, ease: "easeOut" }
            }
          />

          {/* Check draws in just after the fill lands; stroke inverts the fill */}
          <svg
            viewBox="0 0 24 24"
            className="relative h-full w-full p-[15%] text-white dark:text-neutral-900"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <motion.path
              d={CHECK_PATH}
              initial={false}
              animate={{
                pathLength: checked ? 1 : 0,
                opacity: checked ? 1 : 0,
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : checked
                    ? {
                        pathLength: {
                          delay: CHECK_DRAW_DELAY,
                          duration: CHECK_DRAW_DURATION,
                          ease: "easeOut",
                        },
                        opacity: { delay: CHECK_DRAW_DELAY, duration: 0.01 },
                      }
                    : { duration: 0.1 }
              }
            />
          </svg>

          {/* Confetti burst — remounts per check via burstKey, unmounts on completion */}
          {burstKey > 0 && !shouldReduceMotion && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              {Array.from({ length: CONFETTI_COUNT }).map((_, index) => {
                const angle =
                  (index / CONFETTI_COUNT) * Math.PI * 2 - Math.PI / 2
                const distance =
                  sizes.boxPx *
                  (index % 2 === 0
                    ? CONFETTI_DISTANCE_FAR
                    : CONFETTI_DISTANCE_NEAR)
                return (
                  <motion.span
                    key={`confetti-${burstKey}-${index}`}
                    className="absolute rounded-full"
                    style={{
                      width: confettiDotSize,
                      height: confettiDotSize,
                      backgroundColor:
                        CONFETTI_COLORS[index % CONFETTI_COLORS.length],
                    }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * distance,
                      y: Math.sin(angle) * distance,
                      scale: [0, 1, 0.3],
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: CONFETTI_DURATION,
                      ease: "easeOut",
                    }}
                    onAnimationComplete={
                      index === CONFETTI_COUNT - 1
                        ? () => setBurstKey(0)
                        : undefined
                    }
                  />
                )
              })}
            </span>
          )}
        </motion.span>
      </motion.button>

      {/* Text is a click target too; the button carries the semantics */}
      <div
        onClick={toggle}
        className={cn("flex min-w-0 flex-col", !disabled && "cursor-pointer")}
      >
        <span
          id={labelId}
          className={cn(
            "relative w-fit transition-colors",
            checked
              ? "text-neutral-400 duration-200 dark:text-neutral-600"
              : "text-neutral-900 duration-150 dark:text-neutral-100",
            sizes.label,
          )}
        >
          {label}
          {/* Strikethrough grows from the left on check, retreats right on uncheck */}
          <motion.span
            aria-hidden="true"
            className="absolute left-0 right-0 bg-neutral-400 dark:bg-neutral-600"
            style={{
              height: STRIKE_HEIGHT,
              top: `calc(50% - ${STRIKE_HEIGHT / 2}px)`,
              transformOrigin: checked ? "0% 50%" : "100% 50%",
            }}
            initial={false}
            animate={{ scaleX: checked ? 1 : 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: checked ? STRIKE_DURATION : UNSTRIKE_DURATION,
                    ease: REVEAL_EASE,
                  }
            }
          />
        </span>
        {description && (
          <span
            id={descriptionId}
            className={cn(
              "mt-0.5 transition-colors duration-200",
              checked
                ? "text-neutral-400 dark:text-neutral-700"
                : "text-neutral-500 dark:text-neutral-400",
              sizes.description,
            )}
          >
            {description}
          </span>
        )}
      </div>
    </div>
  )
}
