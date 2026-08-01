/**
 * Spectrum UI — ShareButton
 *
 * A share trigger that fans out into a row of action buttons. Opening springs
 * each action out from behind the trigger with a 30ms stagger while the share
 * icon morphs into an X; closing reverses the stagger. Ships an optional
 * copy-link action with emerald success feedback, tooltip labels on hover,
 * keyboard support (focus moves to the first action, Tab and arrow keys
 * cycle, Escape closes and restores focus) and honors prefers-reduced-motion
 * with a fade-only expansion.
 *
 * Dependencies: framer-motion, lucide-react, @/lib/utils
 *
 * @example
 * <ShareButton
 *   copyValue="https://ui.spectrumhq.in"
 *   actions={[
 *     { icon: <Twitter size={15} />, label: "Share on X", onSelect: shareOnX },
 *   ]}
 * />
 */

"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion"
import { Check, Link, X } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ShareAction {
  /** Icon rendered inside the action button, e.g. a lucide icon element */
  icon: React.ReactNode
  /** Tooltip text and accessible name of the action */
  label: string
  /** Fires when the action is clicked */
  onSelect: () => void
}

export interface ShareButtonProps {
  /** Custom actions fanned out after the built-in copy action. Default [] */
  actions?: ShareAction[]
  /** URL or text for the built-in copy-link first action; omit to hide it */
  copyValue?: string
  /** Side the actions fan out toward. Default "right" */
  direction?: "left" | "right"
  /** Visual size of the trigger; actions are one step smaller. Default "md" */
  size?: "sm" | "md" | "lg"
  /** Accessible name of the trigger. Default "Share" */
  label?: string
  /** Collapse the row shortly after a custom action is selected. Default true */
  closeOnSelect?: boolean
  /** Additional classes merged onto the root element */
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

/** Snappy micro spring for icon morphs and tooltip pops */
const MICRO_SPRING: Transition = { type: "spring", stiffness: 500, damping: 30 }
/** Softer spring for the actions traveling out of / back behind the trigger */
const MOVE_SPRING: Transition = { type: "spring", stiffness: 260, damping: 22 }
/** Fade used for everything when prefers-reduced-motion is set */
const REDUCED_FADE: Transition = { duration: 0.15, ease: "easeOut" }
/** Delay between neighboring actions while fanning out (seconds) */
const STAGGER_SECONDS = 0.03
/** How long the copy action shows the emerald check (ms) */
const COPY_FEEDBACK_MS = 1500
/** Beat between selecting an action and the row collapsing (ms) */
const CLOSE_ON_SELECT_MS = 150

const SIZES = {
  sm: { trigger: "h-8 w-8", triggerIcon: 15, action: "h-7 w-7", actionIcon: 13, gap: "gap-1.5", inset: "ml-1.5 mr-1.5", step: 34 },
  md: { trigger: "h-10 w-10", triggerIcon: 18, action: "h-9 w-9", actionIcon: 15, gap: "gap-2", inset: "ml-2 mr-2", step: 44 },
  lg: { trigger: "h-12 w-12", triggerIcon: 21, action: "h-10 w-10", actionIcon: 17, gap: "gap-2", inset: "ml-2 mr-2", step: 48 },
} as const

/** Shared neutral round icon-button look for the trigger and every action */
const BUTTON_BASE_CLASSES = cn(
  "relative inline-flex touch-manipulation select-none items-center justify-center rounded-full border transition-colors",
  "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100",
  "dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800",
  "shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04),0px_2px_4px_0px_rgba(0,0,0,0.04)] dark:shadow-none",
  "focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300",
)

/** Inline share-nodes glyph so the collapsed trigger has zero icon deps */
function ShareIcon({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98" />
      <path d="m15.41 6.51-6.82 3.98" />
    </svg>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ShareButton({
  actions = [],
  copyValue,
  direction = "right",
  size = "md",
  label = "Share",
  closeOnSelect = true,
  className,
}: ShareButtonProps) {
  const shouldReduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const rootRef = useRef<HTMLSpanElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const actionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const sizes = SIZES[size]
  // +1 slot for the built-in copy action when copyValue is provided
  const itemCount = actions.length + (copyValue !== undefined ? 1 : 0)
  // Fanning right means actions travel +x away from the trigger (and back -x)
  const directionSign = direction === "right" ? 1 : -1

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setOpen(false)
    setHoveredIndex(null)
    setFocusedIndex(null)
    if (restoreFocus) triggerRef.current?.focus()
  }, [])

  const handleTriggerClick = useCallback(() => {
    if (open) {
      closeMenu(false)
      return
    }
    // Fresh copy state on every open so reopening shows the link icon again
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    setCopied(false)
    setOpen(true)
  }, [open, closeMenu])

  const handleCopy = useCallback(async () => {
    if (copyValue === undefined) return
    try {
      await navigator.clipboard.writeText(copyValue)
      setCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setCopied(false), COPY_FEEDBACK_MS)
    } catch {
      // Clipboard unavailable (permissions, insecure context): fail silently
    }
  }, [copyValue])

  const handleActionSelect = useCallback(
    (action: ShareAction) => {
      action.onSelect()
      if (!closeOnSelect) return
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
      closeTimerRef.current = setTimeout(
        () => closeMenu(true),
        CLOSE_ON_SELECT_MS,
      )
    },
    [closeOnSelect, closeMenu],
  )

  // Escape closes from anywhere inside the component and returns focus
  const handleRootKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== "Escape" || !open) return
      event.stopPropagation()
      closeMenu(true)
    },
    [open, closeMenu],
  )

  // Tab / Shift+Tab cycle the actions; arrow keys follow the visual order
  const handleMenuKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const nodes = actionRefs.current.filter(
        (node): node is HTMLButtonElement => node !== null,
      )
      if (nodes.length === 0) return
      const currentIndex = nodes.indexOf(
        document.activeElement as HTMLButtonElement,
      )
      let nextIndex: number | null = null
      if (event.key === "Tab") {
        nextIndex = currentIndex + (event.shiftKey ? -1 : 1)
      } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const forward = (event.key === "ArrowRight") === (direction === "right")
        nextIndex = currentIndex + (forward ? 1 : -1)
      }
      if (nextIndex === null) return
      event.preventDefault()
      nodes[((nextIndex % nodes.length) + nodes.length) % nodes.length].focus()
    },
    [direction],
  )

  // Move focus to the first action once the row has mounted
  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => {
      actionRefs.current.find((node) => node !== null)?.focus()
    })
    return () => cancelAnimationFrame(frame)
  }, [open])

  // Outside click closes; listener only exists while open, so nothing leaks
  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) closeMenu(false)
    }
    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [open, closeMenu])

  // Never leave feedback / collapse timers running after unmount
  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const renderAction = (
    index: number,
    ariaLabel: string,
    tooltip: string,
    onClick: () => void,
    children: React.ReactNode,
  ) => {
    const showTooltip = hoveredIndex === index || focusedIndex === index
    // Each action starts stacked behind the trigger and springs to its slot;
    // the exit runs the same path in reverse, farthest action leaving first
    const stackedOffset = -directionSign * sizes.step * (index + 1)
    const enterDelay = index * STAGGER_SECONDS
    const exitDelay = (itemCount - 1 - index) * STAGGER_SECONDS
    return (
      <motion.button
        key={index}
        ref={(node: HTMLButtonElement | null) => {
          actionRefs.current[index] = node
        }}
        type="button"
        role="menuitem"
        aria-label={ariaLabel}
        onClick={onClick}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() =>
          setHoveredIndex((current) => (current === index ? null : current))
        }
        onFocus={() => setFocusedIndex(index)}
        onBlur={() =>
          setFocusedIndex((current) => (current === index ? null : current))
        }
        style={{
          transformOrigin: direction === "right" ? "left center" : "right center",
        }}
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { x: stackedOffset, scale: 0.5, opacity: 0 }
        }
        animate={
          shouldReduceMotion ? { opacity: 1 } : { x: 0, scale: 1, opacity: 1 }
        }
        exit={
          shouldReduceMotion
            ? { opacity: 0, transition: REDUCED_FADE }
            : {
                x: stackedOffset,
                scale: 0.5,
                opacity: 0,
                transition: { ...MOVE_SPRING, delay: exitDelay },
              }
        }
        transition={
          shouldReduceMotion
            ? REDUCED_FADE
            : { ...MOVE_SPRING, delay: enterDelay }
        }
        whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
        className={cn(BUTTON_BASE_CLASSES, sizes.action)}
      >
        {children}
        <AnimatePresence>
          {showTooltip && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-full left-1/2 mb-2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
              initial={
                shouldReduceMotion
                  ? { opacity: 0, x: "-50%" }
                  : { opacity: 0, y: 4, scale: 0.9, x: "-50%" }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1, x: "-50%" }
                  : { opacity: 1, y: 0, scale: 1, x: "-50%" }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0, x: "-50%" }
                  : { opacity: 0, y: 4, scale: 0.9, x: "-50%" }
              }
              transition={shouldReduceMotion ? REDUCED_FADE : MICRO_SPRING}
            >
              {tooltip}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    )
  }

  return (
    <span
      ref={rootRef}
      onKeyDown={handleRootKeyDown}
      className={cn("relative inline-flex items-center", className)}
    >
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={handleTriggerClick}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={label}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
        className={cn("z-20", BUTTON_BASE_CLASSES, sizes.trigger)}
      >
        <span
          aria-hidden="true"
          className="relative inline-flex"
          style={{ width: sizes.triggerIcon, height: sizes.triggerIcon }}
        >
          <AnimatePresence initial={false}>
            <motion.span
              key={open ? "close" : "share"}
              className="absolute inset-0 flex items-center justify-center"
              initial={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -90 }
              }
              animate={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 1, rotate: 0 }
              }
              exit={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 90 }
              }
              transition={shouldReduceMotion ? REDUCED_FADE : MICRO_SPRING}
            >
              {open ? (
                <X size={sizes.triggerIcon} />
              ) : (
                <ShareIcon size={sizes.triggerIcon} />
              )}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && itemCount > 0 && (
          <motion.div
            key="actions"
            role="menu"
            aria-label={label}
            onKeyDown={handleMenuKeyDown}
            className={cn(
              "absolute inset-y-0 z-10 flex items-center",
              direction === "right"
                ? "left-full flex-row"
                : "right-full flex-row-reverse",
              sizes.gap,
              sizes.inset,
            )}
          >
            {copyValue !== undefined &&
              renderAction(
                0,
                "Copy link",
                copied ? "Copied!" : "Copy link",
                handleCopy,
                <span
                  className="relative inline-flex"
                  style={{ width: sizes.actionIcon, height: sizes.actionIcon }}
                >
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={copied ? "check" : "link"}
                      className={cn(
                        "absolute inset-0 flex items-center justify-center",
                        copied && "text-emerald-500",
                      )}
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.5 }
                      }
                      animate={
                        shouldReduceMotion
                          ? { opacity: 1 }
                          : { opacity: 1, scale: 1 }
                      }
                      exit={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.5 }
                      }
                      transition={
                        shouldReduceMotion ? REDUCED_FADE : MICRO_SPRING
                      }
                    >
                      {copied ? (
                        <Check size={sizes.actionIcon} />
                      ) : (
                        <Link size={sizes.actionIcon} />
                      )}
                    </motion.span>
                  </AnimatePresence>
                </span>,
              )}
            {actions.map((action, actionIndex) => {
              const index =
                actionIndex + (copyValue !== undefined ? 1 : 0)
              return renderAction(
                index,
                action.label,
                action.label,
                () => handleActionSelect(action),
                action.icon,
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
