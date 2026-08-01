/**
 * Spectrum UI — FollowButton
 *
 * A morphing social follow/unfollow button. Following springs the pill's
 * width to fit the new label, crossfades the solid fill into an outline, and
 * draws a check in; hovering or focusing the followed pill previews a rose
 * "Unfollow" affordance, and clicking again dips and morphs back. Works
 * controlled or uncontrolled, honors prefers-reduced-motion, and exposes its
 * state to screen readers via aria-pressed.
 *
 * Dependencies: framer-motion, lucide-react, @/lib/utils
 *
 * @example
 * <FollowButton onFollowingChange={(following) => save(following)} />
 */

"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FollowButtonProps {
  /** Controlled following state. Leave undefined for uncontrolled usage */
  following?: boolean
  /** Initial following state when uncontrolled. Default false */
  defaultFollowing?: boolean
  /** Fires with the next following state on every toggle */
  onFollowingChange?: (following: boolean) => void
  /** Label of the idle call-to-action pill. Default "Follow" */
  followLabel?: string
  /** Label shown while followed. Default "Following" */
  followingLabel?: string
  /** Label revealed on hover or focus while followed. Default "Unfollow" */
  unfollowLabel?: string
  /** Visual size of the button. Default "md" */
  size?: "sm" | "md" | "lg"
  /** Disables pointer and keyboard interaction */
  disabled?: boolean
  className?: string
}

/**
 * How the current label swap should animate: follow-state changes roll
 * vertically, intent previews (Following ⇄ Unfollow) crossfade in place
 */
type LabelSwapCustom = { mode: "roll" | "fade"; reduce: boolean }

// ─── Constants ───────────────────────────────────────────────────────────────

const SIZES = {
  sm: { button: "h-8 gap-1.5 px-3.5 text-xs", icon: 14 },
  md: { button: "h-10 gap-2 px-4 text-sm", icon: 16 },
  lg: { button: "h-12 gap-2.5 px-5 text-base", icon: 18 },
} as const

/** Snappy micro spring — label rolls between follow states */
const SNAPPY_SPRING = { type: "spring", stiffness: 500, damping: 30 } as const
/** Softer surface spring — the pill's width morph */
const LAYOUT_SPRING = { type: "spring", stiffness: 260, damping: 22 } as const
/** Entrance/reveal ease — the check stroke draw */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Seconds for the in-place crossfade of an intent preview */
const INTENT_FADE_DURATION = 0.12
/** Seconds for the icon crossfade between plus and check */
const ICON_FADE_DURATION = 0.15
/** Seconds the check stroke takes to draw */
const CHECK_DRAW_DURATION = 0.3
/** Seconds the check draw waits behind the icon crossfade */
const CHECK_DRAW_DELAY = 0.05
/** Quick negative dip when unfollowing — tight and small, no overshoot */
const DIP_SCALE = 0.95
const DIP_DURATION = 0.1

/** Lucide check, drawn manually so the stroke can animate its pathLength */
const CHECK_PATH = "M20 6 9 17l-5-5"

const labelVariants = {
  enter: ({ mode, reduce }: LabelSwapCustom) =>
    reduce || mode === "fade" ? { y: 0, opacity: 0 } : { y: 8, opacity: 0 },
  center: { y: 0, opacity: 1 },
  // Exit carries its own transition so the outgoing label always matches the
  // swap that removed it, even when props changed since it rendered
  exit: ({ mode, reduce }: LabelSwapCustom) =>
    reduce
      ? { opacity: 0, transition: { duration: 0 } }
      : mode === "fade"
        ? { opacity: 0, transition: { duration: INTENT_FADE_DURATION } }
        : { y: -8, opacity: 0, transition: SNAPPY_SPRING },
}

// ─── Component ───────────────────────────────────────────────────────────────

export function FollowButton({
  following: followingProp,
  defaultFollowing = false,
  onFollowingChange,
  followLabel = "Follow",
  followingLabel = "Following",
  unfollowLabel = "Unfollow",
  size = "md",
  disabled = false,
  className,
}: FollowButtonProps) {
  const shouldReduceMotion = useReducedMotion()
  const [internalFollowing, setInternalFollowing] = useState(defaultFollowing)
  const [intent, setIntent] = useState(false)
  const [dipping, setDipping] = useState(false)
  // Layout morphs are armed only after the first toggle so the pill never
  // animates its width on first render or unrelated page reflows
  const [hasToggled, setHasToggled] = useState(false)

  const following = followingProp ?? internalFollowing
  const prevFollowingRef = useRef(following)
  const { button: sizeClasses, icon } = SIZES[size]
  // Hovering or focusing the followed pill previews the destructive action
  const unfollowIntent = following && intent
  const label = following
    ? unfollowIntent
      ? unfollowLabel
      : followingLabel
    : followLabel
  // Follow-state changes roll the label; intent previews crossfade in place
  const swapMode: LabelSwapCustom["mode"] =
    following !== prevFollowingRef.current ? "roll" : "fade"
  const swapCustom: LabelSwapCustom = {
    mode: swapMode,
    reduce: shouldReduceMotion ?? false,
  }

  useEffect(() => {
    // Controlled changes from outside also count as interaction
    if (following !== prevFollowingRef.current) setHasToggled(true)
    prevFollowingRef.current = following
  }, [following])

  const animateLayout =
    (hasToggled || following !== prevFollowingRef.current) &&
    !shouldReduceMotion

  const handleClick = useCallback(() => {
    const next = !following
    if (followingProp === undefined) setInternalFollowing(next)
    onFollowingChange?.(next)
    setHasToggled(true)
    // Quick dip on unfollow before the pill morphs back to the solid state
    if (!next && !shouldReduceMotion) setDipping(true)
    // Require a fresh hover before re-arming the unfollow preview
    setIntent(false)
  }, [following, followingProp, onFollowingChange, shouldReduceMotion])

  const handleHoverStart = useCallback(() => setIntent(true), [])
  const handleHoverEnd = useCallback(() => setIntent(false), [])

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>) => {
      // Only keyboard-driven focus previews the destructive state; pointer
      // focus is handled by hover so clicking Follow doesn't flash Unfollow
      if (event.currentTarget.matches(":focus-visible")) setIntent(true)
    },
    [],
  )
  const handleBlur = useCallback(() => setIntent(false), [])

  const labelTransition = shouldReduceMotion
    ? { duration: 0 }
    : swapMode === "fade"
      ? { duration: INTENT_FADE_DURATION, ease: EASE_OUT }
      : SNAPPY_SPRING

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      aria-pressed={following}
      aria-label={following ? unfollowLabel : followLabel}
      layout={animateLayout}
      style={{ borderRadius: 9999 }}
      animate={{ scale: dipping ? DIP_SCALE : 1 }}
      onAnimationComplete={() => {
        if (dipping) setDipping(false)
      }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
      transition={{
        layout: LAYOUT_SPRING,
        scale: { duration: DIP_DURATION, ease: "easeInOut" },
      }}
      className={cn(
        "relative inline-flex touch-manipulation select-none items-center justify-center rounded-full border font-medium transition-colors",
        "focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
        "disabled:pointer-events-none disabled:opacity-50",
        following
          ? unfollowIntent
            ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400"
            : "border-neutral-200 bg-white text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
          : "border-transparent bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200",
        sizeClasses,
        className,
      )}
    >
      <motion.span
        layout={animateLayout ? "position" : false}
        aria-hidden="true"
        className="relative inline-flex items-center justify-center"
        style={{ width: icon, height: icon }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {following ? (
            <motion.svg
              key="check"
              viewBox="0 0 24 24"
              width={icon}
              height={icon}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: ICON_FADE_DURATION }
              }
            >
              <motion.path
                d={CHECK_PATH}
                // Draw only on interaction; defaultFollowing mounts settled
                initial={
                  shouldReduceMotion || !hasToggled ? false : { pathLength: 0 }
                }
                animate={{ pathLength: 1 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: CHECK_DRAW_DURATION,
                        ease: EASE_OUT,
                        delay: CHECK_DRAW_DELAY,
                      }
                }
              />
            </motion.svg>
          ) : (
            <motion.span
              key="plus"
              className="inline-flex"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: ICON_FADE_DURATION }
              }
            >
              <Plus size={icon} strokeWidth={2} aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>

      <motion.span
        layout={animateLayout ? "position" : false}
        aria-hidden="true"
        className="relative inline-flex overflow-hidden"
      >
        <AnimatePresence mode="popLayout" initial={false} custom={swapCustom}>
          <motion.span
            key={label}
            className="inline-block whitespace-nowrap"
            custom={swapCustom}
            variants={labelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={labelTransition}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </motion.button>
  )
}
