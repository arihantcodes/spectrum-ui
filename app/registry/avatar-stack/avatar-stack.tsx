/**
 * Spectrum UI — AvatarStack
 *
 * An overlapping avatar row that fans apart on hover. Hovering or focusing a
 * single avatar lifts it and springs a name tooltip in above it; a "+N" pill
 * expands the hidden members one by one with a stagger and morphs into a
 * collapse button. Fully keyboard operable with roving focus, honors
 * prefers-reduced-motion, and announces itself as a labelled group.
 *
 * Dependencies: framer-motion, @/lib/utils
 *
 * @example
 * <AvatarStack
 *   items={[{ name: "Ada Lovelace" }, { name: "Alan Turing" }]}
 *   onAvatarClick={(item) => openProfile(item)}
 * />
 */

"use client"

import React, { useCallback, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AvatarItem {
  /** Person's display name; also used for the tooltip and initials fallback */
  name: string
  /** Optional image URL; initials derived from the name are shown when omitted */
  src?: string
}

export interface AvatarStackProps {
  /** People to render; the first `max` are visible, the rest sit behind "+N" */
  items: AvatarItem[]
  /** Number of avatars shown before overflowing into the "+N" pill. Default 4 */
  max?: number
  /** Avatar diameter: 28, 36 or 44px. Default "md" */
  size?: "sm" | "md" | "lg"
  /** Whether the "+N" pill expands the hidden avatars on click. Default true */
  expandable?: boolean
  /** Fires when an avatar is clicked or activated with Enter/Space */
  onAvatarClick?: (item: AvatarItem, index: number) => void
  /** Additional classes merged onto the group container */
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

/** Negative margin overlapping the resting stack, in px */
const OVERLAP_MARGIN = -10
/** Gap between avatars once the stack fans apart on hover, in px */
const FAN_GAP = 4
/** Vertical lift of a hovered/focused avatar, in px */
const LIFT_Y = -4
/** Scale of a hovered/focused avatar */
const LIFT_SCALE = 1.1
/** z-index applied to the lifted avatar so it clears its neighbors */
const LIFTED_Z_INDEX = 10
/** Delay between each hidden avatar springing in/out, in seconds (30ms) */
const STAGGER_S = 0.03
/** Distance the tooltip travels while springing in, in px */
const TOOLTIP_SHIFT_Y = 4
/** Initial scale of the tooltip before it springs in */
const TOOLTIP_INITIAL_SCALE = 0.9

/** Snappy spring for micro-interactions: lift, tooltip, pill crossfade */
const SPRING_SNAPPY = { type: "spring", stiffness: 500, damping: 30 } as const
/** Softer spring for positional moves: fan-out and row reflow */
const SPRING_SOFT = { type: "spring", stiffness: 260, damping: 22 } as const
/** Ease used by non-spring reveals/exits */
const REVEAL_EASE = [0.22, 1, 0.36, 1] as const
const INSTANT = { duration: 0 } as const

const SIZES = {
  sm: { px: 28, text: "text-[10px]" },
  md: { px: 36, text: "text-xs" },
  lg: { px: 44, text: "text-sm" },
} as const

const TOOLTIP_SHADOW =
  "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04)]"

/** First letters of the first two words: "Ada Lovelace" → "AL" */
function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("")
}

// ─── Component ───────────────────────────────────────────────────────────────

export function AvatarStack({
  items,
  max = 4,
  size = "md",
  expandable = true,
  onAvatarClick,
  className,
}: AvatarStackProps) {
  const shouldReduceMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [rovingIndex, setRovingIndex] = useState(0)

  const avatarRefs = useRef<(HTMLButtonElement | null)[]>([])
  const pillRef = useRef<HTMLButtonElement | null>(null)

  const visibleMax = Math.max(1, max)
  const overflowCount = Math.max(0, items.length - visibleMax)
  const hasOverflow = overflowCount > 0
  const shownItems = expanded ? items : items.slice(0, visibleMax)
  const pillIsInteractive = hasOverflow && expandable
  // Roving order: shown avatars first, then the pill (when it is a button)
  const focusableCount = shownItems.length + (pillIsInteractive ? 1 : 0)
  const pillIndex = shownItems.length
  const roving = Math.min(rovingIndex, Math.max(0, focusableCount - 1))

  const fanned = hovered || focusWithin
  const { px, text } = SIZES[size]
  const layoutTransition = shouldReduceMotion ? INSTANT : SPRING_SOFT

  const focusAt = useCallback(
    (index: number, isPill: boolean) => {
      setRovingIndex(index)
      if (isPill) pillRef.current?.focus()
      else avatarRefs.current[index]?.focus()
    },
    [],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        if (expanded) {
          event.preventDefault()
          setExpanded(false)
          setRovingIndex(visibleMax)
          pillRef.current?.focus()
        }
        return
      }
      if (focusableCount === 0) return
      let next: number | null = null
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          next = (roving + 1) % focusableCount
          break
        case "ArrowLeft":
        case "ArrowUp":
          next = (roving - 1 + focusableCount) % focusableCount
          break
        case "Home":
          next = 0
          break
        case "End":
          next = focusableCount - 1
          break
      }
      if (next !== null) {
        event.preventDefault()
        focusAt(next, pillIsInteractive && next === pillIndex)
      }
    },
    [expanded, visibleMax, focusableCount, roving, focusAt, pillIsInteractive, pillIndex],
  )

  return (
    <div
      role="group"
      aria-label={`${items.length} team members`}
      className={cn("flex items-center", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocusWithin(false)
        }
      }}
      onKeyDown={handleKeyDown}
    >
      <AnimatePresence initial={false}>
        {shownItems.map((item, index) => {
          const isExtra = index >= visibleMax
          const extraOrder = index - visibleMax
          const isActive = activeIndex === index
          return (
            <motion.div
              key={`${index}-${item.name}`}
              layout
              className="relative"
              style={{
                marginLeft: index === 0 ? 0 : fanned ? FAN_GAP : OVERLAP_MARGIN,
                zIndex: isActive ? LIFTED_Z_INDEX : undefined,
              }}
              transition={{ layout: layoutTransition }}
              initial={
                isExtra
                  ? shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.4 }
                  : false
              }
              animate={{
                opacity: 1,
                scale: 1,
                transition: shouldReduceMotion
                  ? INSTANT
                  : { ...SPRING_SOFT, delay: isExtra ? extraOrder * STAGGER_S : 0 },
              }}
              exit={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.4,
                transition: shouldReduceMotion
                  ? INSTANT
                  : {
                      duration: 0.18,
                      ease: REVEAL_EASE,
                      // Reverse stagger: last revealed avatar leaves first
                      delay: isExtra
                        ? (overflowCount - 1 - extraOrder) * STAGGER_S
                        : 0,
                    },
              }}
            >
              <motion.button
                ref={(node) => {
                  avatarRefs.current[index] = node
                }}
                type="button"
                aria-label={item.name}
                tabIndex={roving === index ? 0 : -1}
                onClick={() => onAvatarClick?.(item, index)}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() =>
                  setActiveIndex((current) => (current === index ? null : current))
                }
                onFocus={() => {
                  setActiveIndex(index)
                  setRovingIndex(index)
                }}
                onBlur={() =>
                  setActiveIndex((current) => (current === index ? null : current))
                }
                initial={false}
                animate={isActive ? { y: LIFT_Y, scale: LIFT_SCALE } : { y: 0, scale: 1 }}
                transition={shouldReduceMotion ? INSTANT : SPRING_SNAPPY}
                className={cn(
                  "flex select-none items-center justify-center overflow-hidden rounded-full bg-neutral-100 font-medium text-neutral-600 ring-2 ring-white dark:bg-neutral-800 dark:text-neutral-300 dark:ring-neutral-900",
                  "focus-visible:outline-hidden focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
                  text,
                )}
                style={{ width: px, height: px }}
              >
                {item.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.name}
                    draggable={false}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span aria-hidden="true">{getInitials(item.name)}</span>
                )}
              </motion.button>

              <AnimatePresence>
                {isActive && (
                  <motion.span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute bottom-full left-1/2 mb-2 whitespace-nowrap rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white dark:bg-white dark:text-neutral-900",
                      TOOLTIP_SHADOW,
                    )}
                    style={{ transformOrigin: "bottom center" }}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0, x: "-50%" }
                        : {
                            opacity: 0,
                            x: "-50%",
                            y: TOOLTIP_SHIFT_Y,
                            scale: TOOLTIP_INITIAL_SCALE,
                          }
                    }
                    animate={
                      shouldReduceMotion
                        ? { opacity: 1, x: "-50%" }
                        : { opacity: 1, x: "-50%", y: 0, scale: 1 }
                    }
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0, x: "-50%" }
                        : {
                            opacity: 0,
                            x: "-50%",
                            y: TOOLTIP_SHIFT_Y,
                            scale: TOOLTIP_INITIAL_SCALE,
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.15, ease: REVEAL_EASE }
                        : SPRING_SNAPPY
                    }
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {hasOverflow &&
        (pillIsInteractive ? (
          <motion.button
            ref={pillRef}
            type="button"
            layout
            aria-expanded={expanded}
            aria-label={
              expanded ? "Show fewer" : `Show ${overflowCount} more`
            }
            tabIndex={roving === pillIndex ? 0 : -1}
            onClick={() => setExpanded((current) => !current)}
            onFocus={() => setRovingIndex(pillIndex)}
            transition={{ layout: layoutTransition }}
            className={cn(
              "relative flex select-none items-center justify-center rounded-full bg-neutral-100 font-medium text-neutral-600 ring-2 ring-white dark:bg-neutral-800 dark:text-neutral-300 dark:ring-neutral-900",
              "focus-visible:outline-hidden focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
              text,
            )}
            style={{
              width: px,
              height: px,
              marginLeft: fanned ? FAN_GAP : OVERLAP_MARGIN,
            }}
          >
            <AnimatePresence initial={false}>
              <motion.span
                key={expanded ? "collapse" : "count"}
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center"
                initial={
                  shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6 }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0.15, ease: REVEAL_EASE }
                    : SPRING_SNAPPY
                }
              >
                {expanded ? "−" : `+${overflowCount}`}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        ) : (
          <motion.span
            layout
            transition={{ layout: layoutTransition }}
            className={cn(
              "flex select-none items-center justify-center rounded-full bg-neutral-100 font-medium text-neutral-600 ring-2 ring-white dark:bg-neutral-800 dark:text-neutral-300 dark:ring-neutral-900",
              text,
            )}
            style={{
              width: px,
              height: px,
              marginLeft: fanned ? FAN_GAP : OVERLAP_MARGIN,
            }}
          >
            +{overflowCount}
          </motion.span>
        ))}
    </div>
  )
}
