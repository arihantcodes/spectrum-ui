/**
 * Spectrum UI — ReactionBar
 *
 * A Slack-style emoji reaction row. Chips toggle your reaction with a quick
 * emoji pop and a direction-aware rolling count; hovering a chip springs the
 * emoji up, and a "+" button opens a popover strip — scaling out of its
 * trigger — where emojis stagger in left-to-right so new reactions can be
 * added. Escape or an outside click closes the picker and returns focus to
 * the trigger. Works controlled or uncontrolled, honors
 * prefers-reduced-motion, and exposes chip state via aria-pressed.
 *
 * Dependencies: framer-motion, lucide-react, @/lib/utils
 *
 * @example
 * <ReactionBar
 *   defaultReactions={[{ emoji: "👍", count: 3 }]}
 *   onReactionsChange={(reactions) => save(reactions)}
 * />
 */

"use client"

import React, { useCallback, useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Reaction {
  /** The emoji character rendered on the chip */
  emoji: string
  /** Total number of reactions for this emoji, including yours */
  count: number
  /** Whether the current user has reacted with this emoji */
  reacted?: boolean
}

export interface ReactionBarProps {
  /** Controlled reactions. Leave undefined for uncontrolled usage */
  reactions?: Reaction[]
  /** Initial reactions when uncontrolled. Default [] */
  defaultReactions?: Reaction[]
  /** Fires with the next reactions array on every change */
  onReactionsChange?: (reactions: Reaction[]) => void
  /** Emojis offered in the add popover */
  availableEmojis?: string[]
  /** Show the "+" add-reaction button. Default true */
  addable?: boolean
  /** Visual size of the chips. Default "md" */
  size?: "sm" | "md"
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DEFAULT_EMOJIS = ["👍", "❤️", "😂", "🎉", "😮", "🚀"]

/** Snappy spring for chip enter/exit and other micro state changes */
const SPRING_SNAPPY = { type: "spring", stiffness: 500, damping: 30 } as const

/** Softer spring for the picker surface scaling out of its anchor */
const SPRING_SURFACE = { type: "spring", stiffness: 260, damping: 22 } as const

/** Spring for the emoji hover lift and the picker options popping in */
const SPRING_POP = { type: "spring", stiffness: 400, damping: 18 } as const

/** Left-to-right stagger between picker emojis, in seconds */
const PICKER_STAGGER = 0.03

/** Exit for the picker: quicker than the entrance so dismissal feels light */
const PICKER_EXIT_TRANSITION = {
  duration: 0.15,
  ease: [0.22, 1, 0.36, 1],
} as const

/** How far the rolling count travels, in px */
const COUNT_ROLL_DISTANCE = 10

const SIZES = {
  sm: { chip: "h-6 gap-1 px-2 text-xs", emoji: "text-xs", add: "h-6 w-6", icon: 12 },
  md: { chip: "h-7 gap-1.5 px-2.5 text-xs", emoji: "text-sm", add: "h-7 w-7", icon: 14 },
} as const

const countVariants = {
  enter: (direction: number) => ({ y: direction * COUNT_ROLL_DISTANCE, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction * -COUNT_ROLL_DISTANCE, opacity: 0 }),
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ReactionBar({
  reactions: reactionsProp,
  defaultReactions = [],
  onReactionsChange,
  availableEmojis = DEFAULT_EMOJIS,
  addable = true,
  size = "md",
  className,
}: ReactionBarProps) {
  const shouldReduceMotion = useReducedMotion()
  const [internalReactions, setInternalReactions] = useState(defaultReactions)
  const [open, setOpen] = useState(false)
  // Wraps the "+" trigger and its popover so outside-click can ignore both
  const anchorRef = useRef<HTMLSpanElement>(null)
  const addButtonRef = useRef<HTMLButtonElement>(null)
  const popoverId = useId()

  const reactions = reactionsProp ?? internalReactions
  const { chip, emoji: emojiSize, add, icon } = SIZES[size]

  const commitReactions = useCallback(
    (next: Reaction[]) => {
      if (reactionsProp === undefined) setInternalReactions(next)
      onReactionsChange?.(next)
    },
    [reactionsProp, onReactionsChange],
  )

  const toggleReaction = useCallback(
    (emoji: string) => {
      const next = reactions
        .map((reaction) =>
          reaction.emoji === emoji
            ? {
                ...reaction,
                count: reaction.count + (reaction.reacted ? -1 : 1),
                reacted: !reaction.reacted,
              }
            : reaction,
        )
        .filter((reaction) => reaction.count > 0)
      commitReactions(next)
    },
    [reactions, commitReactions],
  )

  const addReaction = useCallback(
    (emoji: string) => {
      const existing = reactions.find((reaction) => reaction.emoji === emoji)
      if (!existing) {
        commitReactions([...reactions, { emoji, count: 1, reacted: true }])
      } else if (!existing.reacted) {
        commitReactions(
          reactions.map((reaction) =>
            reaction.emoji === emoji
              ? { ...reaction, count: reaction.count + 1, reacted: true }
              : reaction,
          ),
        )
      }
      setOpen(false)
      // Hand focus back to the trigger so keyboard flow continues from the "+"
      addButtonRef.current?.focus()
    },
    [reactions, commitReactions],
  )

  // Close the popover on outside click and Escape; both listeners are scoped
  // to the open state so they never outlive the popover or the component.
  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event: PointerEvent) => {
      // Ignore the trigger itself — its own onClick handles the toggle
      if (!anchorRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        addButtonRef.current?.focus()
      }
    }
    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  const chipTransition = shouldReduceMotion ? { duration: 0 } : SPRING_SNAPPY

  return (
    <div
      className={cn("relative inline-flex flex-wrap items-center gap-1.5", className)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {reactions.map((reaction) => {
          const reacted = Boolean(reaction.reacted)
          // Reacted means the count just went up, so digits roll upward
          const direction = reacted ? 1 : -1
          return (
            <motion.button
              key={reaction.emoji}
              type="button"
              layout
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={chipTransition}
              whileHover={shouldReduceMotion ? undefined : "hover"}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              onClick={() => toggleReaction(reaction.emoji)}
              aria-pressed={reacted}
              aria-label={`React with ${reaction.emoji}, ${reaction.count} ${
                reaction.count === 1 ? "reaction" : "reactions"
              }`}
              className={cn(
                "inline-flex select-none touch-manipulation items-center rounded-full border font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
                reacted
                  ? "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-400"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-700",
                chip,
              )}
            >
              {/* Transform-only lift so the hover never shifts the chip's layout */}
              <motion.span
                className={cn("inline-flex leading-none", emojiSize)}
                variants={{ hover: { scale: 1.25, y: -1 } }}
                transition={shouldReduceMotion ? { duration: 0 } : SPRING_POP}
              >
                <motion.span
                  className="inline-block"
                  initial={false}
                  animate={
                    reacted && !shouldReduceMotion
                      ? { scale: [1, 1.4, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {reaction.emoji}
                </motion.span>
              </motion.span>

              {/* ch-based min-width keeps the chip steady while digits roll */}
              <span
                className="relative inline-flex justify-center overflow-hidden tabular-nums"
                style={{ minWidth: `${String(reaction.count).length}ch` }}
                aria-hidden="true"
              >
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.span
                    key={reaction.count}
                    className="inline-block"
                    custom={direction}
                    variants={countVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={
                      shouldReduceMotion ? { duration: 0 } : SPRING_SNAPPY
                    }
                  >
                    {reaction.count}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.button>
          )
        })}
      </AnimatePresence>

      {addable && (
        <span ref={anchorRef} className="relative inline-flex">
          <motion.button
            ref={addButtonRef}
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-haspopup="true"
            aria-controls={open ? popoverId : undefined}
            aria-label="Add reaction"
            whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
            className={cn(
              "inline-flex touch-manipulation items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 transition-colors",
              "hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
              add,
            )}
          >
            <motion.span
              className="inline-flex"
              initial={false}
              animate={{ rotate: open ? 45 : 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : SPRING_SNAPPY}
            >
              <Plus size={icon} aria-hidden="true" />
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div
                id={popoverId}
                role="group"
                aria-label="Pick a reaction"
                initial={{ opacity: 0, y: 4, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: 4,
                  scale: 0.9,
                  transition: shouldReduceMotion
                    ? { duration: 0 }
                    : PICKER_EXIT_TRANSITION,
                }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : SPRING_SURFACE
                }
                style={{
                  // Scale out of the "+" trigger, which sits at the bottom-left
                  transformOrigin: "bottom left",
                }}
                className={cn(
                  "absolute bottom-full left-0 z-10 mb-2 flex items-center gap-0.5 rounded-full border border-transparent bg-white px-1.5 py-1",
                  "shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04)]",
                  "dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none",
                )}
              >
                {availableEmojis.map((emoji, index) => (
                  <motion.button
                    key={emoji}
                    type="button"
                    initial={shouldReduceMotion ? false : { scale: 0, y: 4 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : // Stagger reads left-to-right, away from the trigger
                          { ...SPRING_POP, delay: index * PICKER_STAGGER }
                    }
                    whileHover={
                      shouldReduceMotion ? undefined : { scale: 1.25, y: -1 }
                    }
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
                    onClick={() => addReaction(emoji)}
                    aria-label={`React with ${emoji}`}
                    className="flex h-7 w-7 touch-manipulation select-none items-center justify-center rounded-full text-sm leading-none transition-colors hover:bg-neutral-100 active:bg-neutral-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 dark:focus-visible:ring-neutral-300"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </span>
      )}
    </div>
  )
}
