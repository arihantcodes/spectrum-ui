/**
 * Spectrum UI — StarRating
 *
 * An animated star rating input. Hovering previews the rating with a spring
 * fill and a small scale wave around the pointer, clicking commits with a pop
 * and a tiny amber sparkle burst, and an optional rolling value label tracks
 * the current or previewed rating. Works controlled or uncontrolled, supports
 * fractional read-only display, honors prefers-reduced-motion, and exposes
 * radiogroup semantics with full keyboard support.
 *
 * Dependencies: framer-motion, @/lib/utils
 *
 * @example
 * <StarRating showValue onValueChange={(value) => save(value)} />
 */

"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface StarRatingProps {
  /** Controlled rating value. Leave undefined for uncontrolled usage */
  value?: number
  /** Initial rating when uncontrolled. Default 0 */
  defaultValue?: number
  /** Fires with the next rating on every commit */
  onValueChange?: (value: number) => void
  /** Number of stars rendered. Default 5 */
  max?: number
  /** Visual size of the stars. Default "md" */
  size?: "sm" | "md" | "lg"
  /** Clicking the committed star clears the rating to 0. Default true */
  allowClear?: boolean
  /** Display-only mode; supports fractional values like 4.3. Default false */
  readOnly?: boolean
  /** Show a rolling "4/5" value label next to the stars. Default false */
  showValue?: boolean
  /** Accessible name of the rating group. Default "Rating" */
  label?: string
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SPARKLE_COUNT = 5
const BURST_DURATION = 0.5

/** Snappy micro spring for the hover wave and star fills */
const FILL_SPRING: Transition = { type: "spring", stiffness: 500, damping: 30 }
/** Tight tween for un-fills so stars never overshoot past zero scale */
const UNFILL_TWEEN: Transition = { duration: 0.15, ease: "easeOut" }
/** Spring for the rolling value label digits */
const VALUE_SPRING: Transition = { type: "spring", stiffness: 400, damping: 30 }
/** Celebratory squash-and-stretch pop on commit */
const POP_KEYFRAMES = [1, 0.7, 1.3, 1]
const POP_TRANSITION: Transition = {
  duration: 0.45,
  times: [0, 0.25, 0.6, 1],
  ease: "easeOut",
}
/** Hovered star scale and the falloff applied to its direct neighbors */
const WAVE_PRIMARY_SCALE = 1.2
const WAVE_NEIGHBOR_SCALE = 1.08

// pad keeps every star's hit area at least 24px square
const SIZES = {
  sm: { icon: 16, pad: "p-1", text: "text-xs", value: "ml-1.5" },
  md: { icon: 22, pad: "p-0.5", text: "text-sm", value: "ml-2" },
  lg: { icon: 28, pad: "p-0.5", text: "text-sm", value: "ml-2.5" },
} as const

const STAR_PATH =
  "M12 2L14.65 8.36L21.51 8.91L16.28 13.39L17.88 20.09L12 16.5L6.12 20.09L7.72 13.39L2.49 8.91L9.35 8.36Z"

const valueVariants = {
  enter: (direction: number) => ({ y: direction * 12, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction * -12, opacity: 0 }),
}

function formatValue(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

// ─── Star icon ───────────────────────────────────────────────────────────────

function Star({
  size,
  filled = false,
  className,
}: {
  size: number
  filled?: boolean
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("block", className)}
    >
      <path d={STAR_PATH} />
    </svg>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export function StarRating({
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  max = 5,
  size = "md",
  allowClear = true,
  readOnly = false,
  showValue = false,
  label = "Rating",
  className,
}: StarRatingProps) {
  const shouldReduceMotion = useReducedMotion()
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [hovered, setHovered] = useState<number | null>(null)
  const [burst, setBurst] = useState<{ key: number; index: number } | null>(
    null,
  )
  const starRefs = useRef<(HTMLButtonElement | null)[]>([])

  const value = valueProp ?? internalValue
  const { icon, pad: padClass, text: textClass, value: valueGapClass } = SIZES[size]
  // Hovering previews the rating; pointer leave falls back to the commit
  const previewValue = !readOnly && hovered !== null ? hovered : value
  // Reserve the widest rendering so the "/max" suffix never shifts as digits roll
  const valueWidthCh = Math.max(
    String(max).length,
    formatValue(previewValue).length,
  )

  // Digits roll up while the preview rises and back down while it falls
  const previousPreviewRef = useRef(previewValue)
  const direction = previewValue >= previousPreviewRef.current ? 1 : -1
  useEffect(() => {
    previousPreviewRef.current = previewValue
  }, [previewValue])

  const commitValue = useCallback(
    (next: number) => {
      if (valueProp === undefined) setInternalValue(next)
      onValueChange?.(next)
    },
    [valueProp, onValueChange],
  )

  const handleSelect = useCallback(
    (starValue: number) => {
      const next = allowClear && starValue === value ? 0 : starValue
      commitValue(next)
      if (next > 0 && !shouldReduceMotion) {
        setBurst((previous) => ({
          key: (previous?.key ?? 0) + 1,
          index: starValue - 1,
        }))
      }
    },
    [allowClear, value, commitValue, shouldReduceMotion],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      let next: number
      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = Math.min(value + 1, max)
          break
        case "ArrowLeft":
        case "ArrowDown":
          next = Math.max(value - 1, 1)
          break
        case "Home":
          next = 1
          break
        case "End":
          next = max
          break
        default:
          return
      }
      event.preventDefault()
      if (next !== value) commitValue(next)
      starRefs.current[next - 1]?.focus()
    },
    [value, max, commitValue],
  )

  // Hovered star scales up, direct neighbors follow at a falloff — a wave
  const getScale = (index: number) => {
    if (shouldReduceMotion || readOnly || hovered === null) return 1
    const distance = Math.abs(index + 1 - hovered)
    if (distance === 0) return WAVE_PRIMARY_SCALE
    if (distance === 1) return WAVE_NEIGHBOR_SCALE
    return 1
  }

  // Roving tabindex: the committed star is tabbable, else the first star
  const focusIndex = value >= 1 && value <= max ? Math.round(value) - 1 : 0

  return (
    <div
      role={readOnly ? "img" : "radiogroup"}
      aria-label={
        readOnly ? `${label}: ${formatValue(value)} out of ${max}` : label
      }
      onKeyDown={readOnly ? undefined : handleKeyDown}
      onPointerLeave={readOnly ? undefined : () => setHovered(null)}
      className={cn("inline-flex select-none items-center", className)}
    >
      <div className="flex items-center">
        {Array.from({ length: max }).map((_, index) => {
          const starValue = index + 1

          if (readOnly) {
            // clip-path clips the filled overlay at subpixel precision, so
            // fractional values render crisply at any icon size
            const fillPercent =
              Math.max(0, Math.min(1, value - index)) * 100
            return (
              <span key={index} className={cn("relative block", padClass)}>
                <span
                  className="relative block"
                  style={{ width: icon, height: icon }}
                >
                  <Star
                    size={icon}
                    className="text-neutral-300 dark:text-neutral-700"
                  />
                  {fillPercent > 0 && (
                    <span
                      className="absolute inset-0 text-amber-400"
                      style={{
                        clipPath: `inset(0 ${100 - fillPercent}% 0 0)`,
                      }}
                    >
                      <Star size={icon} filled />
                    </span>
                  )}
                </span>
              </span>
            )
          }

          const filled = starValue <= previewValue
          const isBursting = burst?.index === index

          return (
            <button
              key={index}
              ref={(node) => {
                starRefs.current[index] = node
              }}
              type="button"
              role="radio"
              aria-checked={starValue === value}
              aria-label={`${starValue} ${starValue === 1 ? "star" : "stars"}`}
              tabIndex={index === focusIndex ? 0 : -1}
              onClick={() => handleSelect(starValue)}
              onPointerEnter={(event) => {
                // Touch taps emulate hover but never fire a matching leave,
                // which would strand the preview — only track mouse pointers
                if (event.pointerType === "mouse") setHovered(starValue)
              }}
              className={cn(
                "relative touch-manipulation rounded-md outline-hidden",
                "transition-transform duration-150 ease-out active:scale-90 motion-reduce:transition-none motion-reduce:active:scale-100",
                "focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
                padClass,
              )}
            >
              <motion.span
                className="relative block"
                style={{ width: icon, height: icon }}
                initial={false}
                animate={
                  isBursting
                    ? { scale: POP_KEYFRAMES }
                    : { scale: getScale(index) }
                }
                transition={
                  isBursting
                    ? POP_TRANSITION
                    : shouldReduceMotion
                      ? { duration: 0 }
                      : FILL_SPRING
                }
              >
                <Star
                  size={icon}
                  className="text-neutral-300 dark:text-neutral-700"
                />
                <motion.span
                  className="absolute inset-0 text-amber-400"
                  initial={false}
                  animate={{
                    scale: filled ? 1 : 0,
                    opacity: filled ? 1 : 0,
                  }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : filled
                        ? FILL_SPRING
                        : UNFILL_TWEEN
                  }
                >
                  <Star size={icon} filled />
                </motion.span>
              </motion.span>

              {isBursting && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  {Array.from({ length: SPARKLE_COUNT }).map(
                    (_, sparkleIndex) => {
                      const angle =
                        (sparkleIndex / SPARKLE_COUNT) * Math.PI * 2 -
                        Math.PI / 2
                      const distance = icon * 1.2
                      const dotSize = Math.max(2, Math.round(icon * 0.16))
                      const burstKey = burst.key
                      return (
                        <motion.span
                          key={`sparkle-${burstKey}-${sparkleIndex}`}
                          className="absolute rounded-full bg-amber-400"
                          style={{ width: dotSize, height: dotSize }}
                          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                          animate={{
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            scale: [0, 1, 0.3],
                            opacity: [1, 1, 0],
                          }}
                          transition={{
                            duration: BURST_DURATION,
                            ease: "easeOut",
                          }}
                          // Only clear if a newer burst hasn't replaced this one
                          onAnimationComplete={
                            sparkleIndex === 0
                              ? () =>
                                  setBurst((current) =>
                                    current?.key === burstKey ? null : current,
                                  )
                              : undefined
                          }
                        />
                      )
                    },
                  )}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {showValue && (
        <span
          className={cn(
            "inline-flex font-medium tabular-nums text-neutral-500 dark:text-neutral-400",
            textClass,
            valueGapClass,
          )}
          aria-hidden="true"
        >
          <span
            className="relative inline-flex justify-end overflow-hidden"
            style={{ minWidth: `${valueWidthCh}ch` }}
          >
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              <motion.span
                key={formatValue(previewValue)}
                className="inline-block"
                custom={direction}
                variants={valueVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={shouldReduceMotion ? { duration: 0 } : VALUE_SPRING}
              >
                {formatValue(previewValue)}
              </motion.span>
            </AnimatePresence>
          </span>
          <span>/{max}</span>
        </span>
      )}
    </div>
  )
}
