/**
 * Spectrum UI — AnimatedSwitch
 *
 * An iOS-quality toggle switch. Pressing stretches the knob toward the far
 * side (anchored to the side it currently sits on) and releasing springs it
 * back round; dragging carries the knob across the track and commits to the
 * nearest side on release, and a quick flick commits in the flick direction.
 * The track color crossfades, optional knob icons rotate through a crossfade,
 * and prefers-reduced-motion collapses everything to an instant jump. Works
 * controlled or uncontrolled and announces itself via role="switch".
 *
 * Dependencies: framer-motion, @/lib/utils
 *
 * @example
 * <AnimatedSwitch defaultChecked onCheckedChange={(checked) => save(checked)} />
 */

"use client"

import React, { useCallback, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AnimatedSwitchProps {
  /** Controlled checked state. Leave undefined for uncontrolled usage */
  checked?: boolean
  /** Initial checked state when uncontrolled. Default false */
  defaultChecked?: boolean
  /** Fires with the next checked state whenever a toggle commits */
  onCheckedChange?: (checked: boolean) => void
  /** Icon shown inside the knob while on; crossfades with offIcon on toggle */
  onIcon?: React.ReactNode
  /** Icon shown inside the knob while off; crossfades with onIcon on toggle */
  offIcon?: React.ReactNode
  /** Visual size of the switch. Default "md" */
  size?: "sm" | "md" | "lg"
  /** Disables pointer and keyboard interaction */
  disabled?: boolean
  /** Accessible name of the switch. Default "Toggle" */
  label?: string
  /** Additional classes merged with the default track styles */
  className?: string
}

interface PointerSample {
  /** Pointer clientX, px */
  x: number
  /** Event timestamp, ms */
  t: number
}

interface GestureState {
  /** Pointer captured for this gesture */
  pointerId: number
  /** clientX where the press started, px */
  originClientX: number
  /** Knob x in inner-track coordinates when the press started, px */
  originKnobX: number
  /** Whether the press has travelled far enough to count as a drag */
  dragging: boolean
  /** Recent samples used for the release-velocity estimate */
  samples: PointerSample[]
}

// ─── Constants ───────────────────────────────────────────────────────────────

/** Gap between the knob and the track edge on every side, px */
const TRACK_PADDING = 2
/** Horizontal knob growth while pressed — the signature iOS stretch */
const STRETCH_FACTOR = 1.35
/** Pointer travel before a press becomes a drag instead of a click, px */
const DRAG_START_DISTANCE = 3
/** Release velocity that commits a toggle in the flick direction, px/s */
const FLICK_VELOCITY = 250
/** Recent pointer samples kept for the release-velocity estimate */
const VELOCITY_SAMPLE_COUNT = 5
/** Knob icon rotation while crossfading, deg */
const ICON_ROTATION = 45

/** Snappy spring for knob travel and the press stretch */
const SNAPPY_SPRING = { type: "spring", stiffness: 500, damping: 30 } as const
/** Softer spring for the icon crossfade */
const SOFT_SPRING = { type: "spring", stiffness: 260, damping: 22 } as const

const SIZES = {
  sm: { trackWidth: 32, trackHeight: 18, icon: 8 },
  md: { trackWidth: 44, trackHeight: 24, icon: 10 },
  lg: { trackWidth: 56, trackHeight: 30, icon: 12 },
} as const

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

// ─── Component ───────────────────────────────────────────────────────────────

export function AnimatedSwitch({
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  onIcon,
  offIcon,
  size = "md",
  disabled = false,
  label = "Toggle",
  className,
}: AnimatedSwitchProps) {
  const shouldReduceMotion = useReducedMotion()
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const [pressed, setPressed] = useState(false)
  // Knob x while dragging (inner-track coordinates); null when not dragging
  const [dragX, setDragX] = useState<number | null>(null)

  const gesture = useRef<GestureState | null>(null)
  // A drag commits on pointerup, so the click the browser fires right after
  // must not toggle a second time
  const suppressClick = useRef(false)

  const checked = checkedProp ?? internalChecked
  const { trackWidth, trackHeight, icon: iconSize } = SIZES[size]

  const knobSize = trackHeight - TRACK_PADDING * 2
  const stretchedWidth = Math.round(knobSize * STRETCH_FACTOR)
  const innerWidth = trackWidth - TRACK_PADDING * 2
  // Stretch only applies while pressed; reduced motion keeps the knob round
  const knobWidth = pressed && !shouldReduceMotion ? stretchedWidth : knobSize
  const maxX = innerWidth - knobWidth
  // Off rests at the left edge and on hugs the right edge, so x and width
  // spring in lockstep and the stretch stays anchored to the near side
  const knobX = dragX !== null ? clamp(dragX, 0, maxX) : checked ? maxX : 0

  const setChecked = useCallback(
    (next: boolean) => {
      if (checkedProp === undefined) setInternalChecked(next)
      onCheckedChange?.(next)
    },
    [checkedProp, onCheckedChange],
  )

  const handleClick = useCallback(() => {
    if (suppressClick.current) {
      suppressClick.current = false
      return
    }
    setChecked(!checked)
  }, [checked, setChecked])

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled || !event.isPrimary) return
      suppressClick.current = false
      event.currentTarget.setPointerCapture(event.pointerId)
      const width = shouldReduceMotion ? knobSize : stretchedWidth
      gesture.current = {
        pointerId: event.pointerId,
        originClientX: event.clientX,
        originKnobX: checked ? innerWidth - width : 0,
        dragging: false,
        samples: [{ x: event.clientX, t: event.timeStamp }],
      }
      setPressed(true)
    },
    [checked, disabled, innerWidth, knobSize, shouldReduceMotion, stretchedWidth],
  )

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const state = gesture.current
      if (!state || event.pointerId !== state.pointerId) return
      state.samples.push({ x: event.clientX, t: event.timeStamp })
      if (state.samples.length > VELOCITY_SAMPLE_COUNT) state.samples.shift()
      const deltaX = event.clientX - state.originClientX
      if (!state.dragging && Math.abs(deltaX) < DRAG_START_DISTANCE) return
      state.dragging = true
      setDragX(state.originKnobX + deltaX)
    },
    [],
  )

  const endGesture = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      gesture.current = null
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }
      setPressed(false)
      setDragX(null)
    },
    [],
  )

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      const state = gesture.current
      if (!state || event.pointerId !== state.pointerId) return
      if (state.dragging) {
        suppressClick.current = true
        const width = shouldReduceMotion ? knobSize : stretchedWidth
        const knobEnd = clamp(
          state.originKnobX + (event.clientX - state.originClientX),
          0,
          innerWidth - width,
        )
        const oldest = state.samples[0]
        const elapsed = event.timeStamp - oldest.t
        const velocity =
          elapsed > 0 ? ((event.clientX - oldest.x) / elapsed) * 1000 : 0
        // A fast flick wins; otherwise commit to whichever side the knob
        // center is closest to
        const next =
          Math.abs(velocity) >= FLICK_VELOCITY
            ? velocity > 0
            : knobEnd + width / 2 > innerWidth / 2
        if (next !== checked) setChecked(next)
      }
      endGesture(event)
    },
    [checked, endGesture, innerWidth, knobSize, setChecked, shouldReduceMotion, stretchedWidth],
  )

  const hasIcons = onIcon != null || offIcon != null
  const activeIcon = checked ? onIcon : offIcon

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={endGesture}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer touch-manipulation select-none items-center rounded-full",
        "transition-colors duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-neutral-300 dark:focus-visible:ring-offset-neutral-950",
        "disabled:pointer-events-none disabled:opacity-50",
        checked
          ? "bg-neutral-900 dark:bg-white"
          : "bg-neutral-200 dark:bg-neutral-700",
        className,
      )}
      style={{ width: trackWidth, height: trackHeight }}
    >
      {/* Invisible hit-area extender: keeps the target at least 24px square */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[max(100%,24px)] w-[max(100%,24px)] -translate-x-1/2 -translate-y-1/2"
      />

      <motion.span
        aria-hidden="true"
        className="absolute rounded-full bg-white shadow-sm dark:bg-neutral-900"
        style={{ top: TRACK_PADDING, left: TRACK_PADDING, height: knobSize }}
        initial={false}
        animate={{ x: knobX, width: knobWidth }}
        transition={shouldReduceMotion ? { duration: 0 } : SNAPPY_SPRING}
      >
        {hasIcons && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-neutral-600 dark:text-neutral-300">
            <AnimatePresence initial={false}>
              {activeIcon != null && (
                <motion.span
                  key={checked ? "on" : "off"}
                  className="absolute flex items-center justify-center [&_svg]:h-full [&_svg]:w-full"
                  style={{
                    width: iconSize,
                    height: iconSize,
                    fontSize: iconSize,
                    lineHeight: 1,
                  }}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, rotate: -ICON_ROTATION, scale: 0.5 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, rotate: 0, scale: 1 }
                  }
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, rotate: ICON_ROTATION, scale: 0.5 }
                  }
                  transition={shouldReduceMotion ? { duration: 0 } : SOFT_SPRING}
                >
                  {activeIcon}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        )}
      </motion.span>
    </button>
  )
}
