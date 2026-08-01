/**
 * Spectrum UI — FaceRating
 *
 * A five-level feedback rating where one large SVG face morphs between moods.
 * Hovering a segment previews its mood — the mouth path, eye squash, eyebrows
 * and stroke color all spring to the new level — and clicking commits it with
 * a quick joy bounce. Works controlled or uncontrolled, moves with
 * ArrowLeft/ArrowRight as a radio group, and honors prefers-reduced-motion.
 *
 * Dependencies: framer-motion, @/lib/utils
 *
 * @example
 * <FaceRating onValueChange={(value) => save(value)} />
 */

"use client"

import React, { useCallback, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FaceRatingProps {
  /** Controlled rating from 1-5; 0 means unset. Leave undefined for uncontrolled usage */
  value?: number
  /** Initial rating when uncontrolled. Default 0 (unset) */
  defaultValue?: number
  /** Fires with the next rating on every commit */
  onValueChange?: (value: number) => void
  /** Mood names for levels 1-5, shown under the widget and read to screen readers */
  labels?: [string, string, string, string, string]
  /** Show the mood label under the segments. Default true */
  showLabel?: boolean
  /** Visual size of the widget. Default "md" */
  size?: "sm" | "md" | "lg"
  /** Accessible name of the radio group. Default "How was your experience?" */
  label?: string
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const LEVELS = [1, 2, 3, 4, 5] as const

const DEFAULT_LABELS: [string, string, string, string, string] = [
  "Terrible",
  "Bad",
  "Okay",
  "Good",
  "Amazing",
]

/** rose-500, orange-500, amber-400, lime-500, emerald-500 */
const LEVEL_COLORS = ["#f43f5e", "#f97316", "#fbbf24", "#84cc16", "#10b981"]

/** neutral-400 — face color while nothing is hovered or committed */
const UNSET_COLOR = "#a3a3a3"

/** Mouth control-point Y per level: deep frown → flat → big smile */
const MOUTH_CONTROL_Y = [34, 41, 47, 54, 61]

/** Mouth corner Y per level: corners droop when upset, lift when delighted */
const MOUTH_CORNER_Y = [49.5, 48, 47, 46, 44.5]

/** Eye squash per level: narrowed when upset, wide open when amazed */
const EYE_SCALE_Y = [0.45, 0.6, 0.9, 1, 1.25]

/** Softer, organic spring shared by the mouth morph and every color change */
const MORPH_SPRING = { type: "spring", stiffness: 260, damping: 22 } as const

/** Snappy spring for segment press feedback and the checked-ring pop */
const SPRING_SNAPPY = { type: "spring", stiffness: 500, damping: 30 } as const

/** Eyes and eyebrows begin this long after the mouth, in seconds */
const FEATURE_STAGGER = 0.03

/** Ease for the mood label crossfade */
const LABEL_TRANSITION = { duration: 0.18, ease: [0.22, 1, 0.36, 1] } as const

const SIZES = {
  sm: {
    face: 56,
    root: "gap-2",
    row: "gap-1.5",
    segment: "h-6 w-6 text-[10px]",
    labelBox: "h-4",
    labelText: "text-xs",
  },
  md: {
    face: 72,
    root: "gap-3",
    row: "gap-2",
    segment: "h-7 w-7 text-xs",
    labelBox: "h-5",
    labelText: "text-sm",
  },
  lg: {
    face: 96,
    root: "gap-4",
    row: "gap-2.5",
    segment: "h-9 w-9 text-sm",
    labelBox: "h-6",
    labelText: "text-base",
  },
} as const

/** All five mouths share one command structure (M x y Q x y x y) so
 *  framer-motion interpolates them smoothly */
function mouthPath(level: number) {
  const corner = MOUTH_CORNER_Y[level - 1]
  return `M 22 ${corner} Q 36 ${MOUTH_CONTROL_Y[level - 1]} 50 ${corner}`
}

// ─── Component ───────────────────────────────────────────────────────────────

export function FaceRating({
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  labels = DEFAULT_LABELS,
  showLabel = true,
  size = "md",
  label = "How was your experience?",
  className,
}: FaceRatingProps) {
  const shouldReduceMotion = useReducedMotion()
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [hovered, setHovered] = useState(0)
  const [bouncing, setBouncing] = useState(false)
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([])

  const value = valueProp ?? internalValue
  // The face previews the hovered level and falls back to the committed value
  const active = hovered || value
  const level = active || 3
  const faceColor = active ? LEVEL_COLORS[active - 1] : UNSET_COLOR
  const sizes = SIZES[size]

  const spring = shouldReduceMotion ? { duration: 0 } : MORPH_SPRING
  // Eyes and eyebrows trail the mouth slightly so the face reads organically;
  // they share the morph spring, so every feature (and color) moves in step
  const featureTransition = shouldReduceMotion
    ? { duration: 0 }
    : { ...MORPH_SPRING, delay: FEATURE_STAGGER }

  const commit = useCallback(
    (next: number) => {
      if (valueProp === undefined) setInternalValue(next)
      onValueChange?.(next)
      if (!shouldReduceMotion) setBouncing(true)
    },
    [valueProp, onValueChange, shouldReduceMotion],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      let next: number
      if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        next = Math.min(5, value + 1)
      } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        next = value === 0 ? 1 : Math.max(1, value - 1)
      } else {
        return
      }
      event.preventDefault()
      segmentRefs.current[next - 1]?.focus()
      if (next !== value) commit(next)
    },
    [value, commit],
  )

  return (
    <div
      className={cn("flex flex-col items-center", sizes.root, className)}
    >
      {/* Morphing face — decorative; the radio group below carries the state */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={
          bouncing
            ? { y: [0, -6, 0], scale: [1, 1.08, 1] }
            : { y: 0, scale: 1 }
        }
        transition={
          bouncing
            ? { duration: 0.45, times: [0, 0.4, 1], ease: "easeOut" }
            : { duration: 0 }
        }
        onAnimationComplete={() => setBouncing(false)}
      >
        <svg
          viewBox="0 0 72 72"
          width={sizes.face}
          height={sizes.face}
          fill="none"
          strokeLinecap="round"
        >
          {/* Face outline */}
          <motion.circle
            cx={36}
            cy={36}
            r={30}
            strokeWidth={4}
            initial={false}
            animate={{ stroke: faceColor }}
            transition={spring}
          />
          {/* Eyebrows — only surface while upset (levels 1-2) */}
          <motion.line
            x1={19}
            y1={19}
            x2={30}
            y2={23}
            strokeWidth={3}
            initial={false}
            animate={{ stroke: faceColor, opacity: level <= 2 ? 1 : 0 }}
            transition={featureTransition}
          />
          <motion.line
            x1={42}
            y1={23}
            x2={53}
            y2={19}
            strokeWidth={3}
            initial={false}
            animate={{ stroke: faceColor, opacity: level <= 2 ? 1 : 0 }}
            transition={featureTransition}
          />
          {/* Eyes */}
          <motion.ellipse
            cx={25}
            cy={30}
            rx={3.5}
            ry={4}
            style={{ originX: 0.5, originY: 0.5 }}
            initial={false}
            animate={{ fill: faceColor, scaleY: EYE_SCALE_Y[level - 1] }}
            transition={featureTransition}
          />
          <motion.ellipse
            cx={47}
            cy={30}
            rx={3.5}
            ry={4}
            style={{ originX: 0.5, originY: 0.5 }}
            initial={false}
            animate={{ fill: faceColor, scaleY: EYE_SCALE_Y[level - 1] }}
            transition={featureTransition}
          />
          {/* Mouth — the core morph between frown, flat and smile */}
          <motion.path
            strokeWidth={4}
            initial={false}
            animate={{ stroke: faceColor, d: mouthPath(level) }}
            transition={spring}
          />
        </svg>
      </motion.div>

      {/* Segments */}
      <div
        role="radiogroup"
        aria-label={label}
        className={cn("flex items-center", sizes.row)}
        onMouseLeave={() => setHovered(0)}
      >
        {LEVELS.map((segmentLevel) => {
          const isActive = value === segmentLevel
          const color = LEVEL_COLORS[segmentLevel - 1]
          return (
            <motion.button
              key={segmentLevel}
              ref={(node) => {
                segmentRefs.current[segmentLevel - 1] = node
              }}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`Rate ${segmentLevel} of 5 — ${labels[segmentLevel - 1]}`}
              tabIndex={isActive || (value === 0 && segmentLevel === 1) ? 0 : -1}
              onClick={() => commit(segmentLevel)}
              onKeyDown={handleKeyDown}
              onMouseEnter={() => setHovered(segmentLevel)}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.88 }}
              transition={shouldReduceMotion ? { duration: 0 } : SPRING_SNAPPY}
              className={cn(
                "relative inline-flex touch-manipulation select-none items-center justify-center rounded-full border font-medium tabular-nums transition-colors",
                "focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
                sizes.segment,
                isActive
                  ? "border-transparent"
                  : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700 active:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/60 dark:hover:text-neutral-200 dark:active:bg-neutral-800",
              )}
              style={isActive ? { color } : undefined}
            >
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: `${color}1f`,
                      boxShadow: `inset 0 0 0 1px ${color}`,
                    }}
                    initial={
                      shouldReduceMotion ? false : { scale: 0.4, opacity: 0 }
                    }
                    animate={{ scale: 1, opacity: 1 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0, transition: { duration: 0 } }
                        : { scale: 0.4, opacity: 0 }
                    }
                    transition={
                      shouldReduceMotion ? { duration: 0 } : SPRING_SNAPPY
                    }
                  />
                )}
              </AnimatePresence>
              <span className="relative">{segmentLevel}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Mood label */}
      {showLabel && (
        <div
          className={cn(
            "relative flex items-center justify-center overflow-hidden",
            sizes.labelBox,
          )}
        >
          {/* popLayout crossfades the labels so hover → leave never flashes
              an empty frame while settling back to the committed value */}
          <AnimatePresence mode="popLayout" initial={false}>
            {active > 0 && (
              <motion.span
                key={active}
                className={cn(
                  "font-medium text-neutral-500 dark:text-neutral-400",
                  sizes.labelText,
                )}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : LABEL_TRANSITION
                }
              >
                {labels[active - 1]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
