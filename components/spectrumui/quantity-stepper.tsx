/**
 * Spectrum UI — QuantityStepper
 *
 * An animated quantity input for carts and forms. A rounded pill holds a
 * minus button, a rolling value and a plus button. Changing the value rolls
 * the digits vertically in the direction of travel, pressing a button gives
 * it a quick squish, and pushing past min or max shakes the value with a
 * brief rose tint. Holding a button repeats the step with acceleration.
 * Works controlled or uncontrolled, honors prefers-reduced-motion, and is a
 * full keyboard-operable ARIA spinbutton.
 *
 * Dependencies: framer-motion, lucide-react, @/lib/utils
 *
 * @example
 * <QuantityStepper defaultValue={1} min={1} max={10} onValueChange={(qty) => update(qty)} />
 */

"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface QuantityStepperProps {
  /** Controlled value. Leave undefined for uncontrolled usage */
  value?: number
  /** Initial value when uncontrolled. Default 1 */
  defaultValue?: number
  /** Fires with the next clamped value on every change */
  onValueChange?: (value: number) => void
  /** Lowest allowed value. Default 0 */
  min?: number
  /** Highest allowed value. Default 99 */
  max?: number
  /** Amount added or removed per press. Default 1 */
  step?: number
  /** Visual size of the stepper. Default "md" */
  size?: "sm" | "md" | "lg"
  /** Disables pointer and keyboard interaction */
  disabled?: boolean
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const HOLD_DELAY = 400
const HOLD_INTERVAL = 80
const HOLD_FAST_INTERVAL = 40
const HOLD_FAST_AFTER = 10
const FLASH_DURATION = 400

/** Snappy spring for the press squish on the +/- buttons */
const SPRING_SNAPPY = { type: "spring", stiffness: 500, damping: 30 } as const

/** Spring for a single-press digit roll */
const ROLL_SPRING = { type: "spring", stiffness: 400, damping: 30 } as const

/** Short tween for the digit roll while hold-to-repeat is firing, so
 *  rolls never queue up behind the repeat rate */
const ROLL_REPEAT_TRANSITION = { duration: 0.1, ease: "easeOut" } as const

/** Boundary shake: tight and small (max 4px, 300ms) */
const SHAKE_KEYFRAMES = [0, -4, 4, -2, 2, 0]
const SHAKE_DURATION = 0.3

const SIZES = {
  sm: {
    container: "h-8 gap-0.5 px-1",
    button: "h-6 w-6",
    icon: 13,
    value: "h-6 min-w-[1.75rem] text-xs",
  },
  md: {
    container: "h-10 gap-1 px-1",
    button: "h-8 w-8",
    icon: 15,
    value: "h-8 min-w-[2rem] text-sm",
  },
  lg: {
    container: "h-12 gap-1 px-1.5",
    button: "h-10 w-10",
    icon: 17,
    value: "h-10 min-w-[2.5rem] text-base",
  },
} as const

// Incrementing (direction 1): the new value slides up in from below.
// Decrementing (direction -1): it drops in from above.
const valueVariants = {
  enter: (direction: number) => ({ y: direction * 12, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction * -12, opacity: 0 }),
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

// ─── Component ───────────────────────────────────────────────────────────────

export function QuantityStepper({
  value: valueProp,
  defaultValue = 1,
  onValueChange,
  min = 0,
  max = 99,
  step = 1,
  size = "md",
  disabled = false,
  className,
}: QuantityStepperProps) {
  const shouldReduceMotion = useReducedMotion()
  const [internalValue, setInternalValue] = useState(() =>
    clamp(defaultValue, min, max),
  )
  // 1 while incrementing, -1 while decrementing; drives the roll variants
  const [direction, setDirection] = useState(1)
  // Incremented on every blocked press; retriggers the shake and times the tint
  const [flash, setFlash] = useState(0)
  // True while hold-to-repeat is firing; switches the roll to a short tween
  const [repeating, setRepeating] = useState(false)
  // Pointer-only announcements; keyboard changes are announced by the
  // spinbutton's aria-valuenow, so a live region there would double-announce
  const [announcement, setAnnouncement] = useState("")
  const shakeControls = useAnimationControls()

  const current = clamp(valueProp ?? internalValue, min, max)
  const atMin = current <= min
  const atMax = current >= max
  const { container, button, icon, value: valueClasses } = SIZES[size]

  // Latest value for hold-to-repeat callbacks that outlive a render
  const valueRef = useRef(current)
  useEffect(() => {
    valueRef.current = current
  }, [current])

  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const repeatRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const repeatCountRef = useRef(0)

  const stopRepeat = useCallback(() => {
    if (delayRef.current !== null) {
      clearTimeout(delayRef.current)
      delayRef.current = null
    }
    if (repeatRef.current !== null) {
      clearInterval(repeatRef.current)
      repeatRef.current = null
    }
    repeatCountRef.current = 0
    setRepeating(false)
  }, [])

  useEffect(() => stopRepeat, [stopRepeat])

  // Every blocked press restarts the shake from rest — the roll is forced
  // instant while flash > 0 (see the roll transition), so they never overlap
  useEffect(() => {
    if (flash === 0) return
    if (!shouldReduceMotion) {
      shakeControls.set({ x: 0 })
      void shakeControls.start({
        x: SHAKE_KEYFRAMES,
        transition: { duration: SHAKE_DURATION, ease: "easeInOut" },
      })
    }
    const id = setTimeout(() => setFlash(0), FLASH_DURATION)
    return () => clearTimeout(id)
  }, [flash, shouldReduceMotion, shakeControls])

  /** Applies a delta; returns false (and flashes) when blocked at a boundary */
  const stepBy = useCallback(
    (delta: number) => {
      const next = clamp(valueRef.current + delta, min, max)
      if (next === valueRef.current) {
        setFlash((count) => count + 1)
        setAnnouncement(
          delta < 0 ? `Minimum quantity is ${min}` : `Maximum quantity is ${max}`,
        )
        return false
      }
      valueRef.current = next
      setDirection(delta > 0 ? 1 : -1)
      if (valueProp === undefined) setInternalValue(next)
      onValueChange?.(next)
      setAnnouncement(`Quantity ${next}`)
      return true
    },
    [min, max, valueProp, onValueChange],
  )

  const startHold = useCallback(
    (delta: number) => (event: React.PointerEvent<HTMLButtonElement>) => {
      if (disabled) return
      if (event.pointerType === "mouse" && event.button !== 0) return
      stopRepeat()
      // Stop immediately when the first press is already blocked at a boundary
      if (!stepBy(delta)) return
      delayRef.current = setTimeout(() => {
        setRepeating(true)
        const tick = () => {
          // Repeat also stops at boundaries, not only on pointer up/leave
          if (!stepBy(delta)) {
            stopRepeat()
            return
          }
          repeatCountRef.current += 1
          if (repeatCountRef.current === HOLD_FAST_AFTER) {
            if (repeatRef.current !== null) clearInterval(repeatRef.current)
            repeatRef.current = setInterval(tick, HOLD_FAST_INTERVAL)
          }
        }
        repeatRef.current = setInterval(tick, HOLD_INTERVAL)
      }, HOLD_DELAY)
    },
    [disabled, stepBy, stopRepeat],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLSpanElement>) => {
      if (disabled) return
      let next: number
      switch (event.key) {
        case "ArrowUp":
          next = current + step
          break
        case "ArrowDown":
          next = current - step
          break
        case "PageUp":
          next = current + step * 10
          break
        case "PageDown":
          next = current - step * 10
          break
        case "Home":
          next = min
          break
        case "End":
          next = max
          break
        default:
          return
      }
      event.preventDefault()
      const clamped = clamp(next, min, max)
      if (clamped === current) {
        // Only shake when pushing past a boundary, not when already at Home/End
        if (event.key !== "Home" && event.key !== "End") {
          setFlash((count) => count + 1)
          // aria-valuenow does not change here, so the live region fills in
          setAnnouncement(
            next < current
              ? `Minimum quantity is ${min}`
              : `Maximum quantity is ${max}`,
          )
        }
        return
      }
      valueRef.current = clamped
      setDirection(clamped > current ? 1 : -1)
      if (valueProp === undefined) setInternalValue(clamped)
      onValueChange?.(clamped)
    },
    [disabled, current, step, min, max, valueProp, onValueChange],
  )

  const buttonClasses = cn(
    "flex shrink-0 touch-manipulation items-center justify-center rounded-full text-neutral-600 transition-colors",
    "hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
    button,
  )

  // The squish rides the press state (whileTap), so it holds steady during
  // hold-to-repeat instead of re-triggering on every repeated step
  const pressSquish =
    shouldReduceMotion || disabled ? undefined : { scale: 0.85 }

  const rollTransition = shouldReduceMotion
    ? { duration: 0 }
    : flash > 0
      ? // Never roll while the boundary shake is running
        { duration: 0 }
      : repeating
        ? ROLL_REPEAT_TRANSITION
        : ROLL_SPRING

  return (
    <div
      role="group"
      aria-label="Quantity"
      className={cn(
        "inline-flex select-none items-center rounded-full bg-white",
        "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04)]",
        "dark:border dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none",
        disabled && "pointer-events-none opacity-50",
        container,
        className,
      )}
    >
      <motion.button
        type="button"
        tabIndex={-1}
        disabled={disabled}
        aria-label="Decrease quantity"
        onPointerDown={startHold(-step)}
        onPointerUp={stopRepeat}
        onPointerLeave={stopRepeat}
        onPointerCancel={stopRepeat}
        whileTap={pressSquish}
        transition={shouldReduceMotion ? { duration: 0 } : SPRING_SNAPPY}
        className={cn(buttonClasses, atMin && "opacity-40")}
      >
        <Minus size={icon} aria-hidden="true" />
      </motion.button>

      <motion.span
        role="spinbutton"
        aria-valuenow={current}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label="Quantity"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        animate={shakeControls}
        className={cn(
          "flex items-center justify-center overflow-hidden px-1 font-medium tabular-nums transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
          flash > 0
            ? "text-rose-500 dark:text-rose-400"
            : "text-neutral-900 dark:text-neutral-100",
          valueClasses,
        )}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.span
            key={current}
            className="inline-block"
            custom={direction}
            variants={valueVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={rollTransition}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      <motion.button
        type="button"
        tabIndex={-1}
        disabled={disabled}
        aria-label="Increase quantity"
        onPointerDown={startHold(step)}
        onPointerUp={stopRepeat}
        onPointerLeave={stopRepeat}
        onPointerCancel={stopRepeat}
        whileTap={pressSquish}
        transition={shouldReduceMotion ? { duration: 0 } : SPRING_SNAPPY}
        className={cn(buttonClasses, atMax && "opacity-40")}
      >
        <Plus size={icon} aria-hidden="true" />
      </motion.button>

      {/* Speaks pointer-driven changes and boundary blocks; successful keyboard
          changes are already announced through the spinbutton's aria-valuenow */}
      <span className="sr-only" aria-live="polite">
        {announcement}
      </span>
    </div>
  )
}
