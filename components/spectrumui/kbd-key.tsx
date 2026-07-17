/**
 * Spectrum UI — KbdKey & KbdCombo
 *
 * A semantic <kbd> element rendered as a 3D keycap that physically depresses
 * when the real key is pressed — via a global keydown listener or a pointer
 * tap. Press-down is instant (keys feel mechanical) and release springs back
 * with a tiny overshoot. KbdCombo strings caps together ("meta+k"); when
 * every key is held at once the whole combo pulses and onTrigger fires.
 * Honors prefers-reduced-motion.
 *
 * Dependencies: framer-motion, @/lib/utils
 *
 * @example
 * <KbdKey>K</KbdKey>
 * <KbdCombo keys="meta+k" onTrigger={() => openPalette()} />
 */

"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { motion, useAnimationControls, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface KbdKeyProps {
  /** Cap legend, e.g. "K", "⌘" or "esc" */
  children: React.ReactNode
  /**
   * Key to match against KeyboardEvent.key, case-insensitively. Friendly
   * names are supported: "meta"/"cmd", "ctrl", "shift", "alt"/"option",
   * "enter", "escape"/"esc", "space", "up"/"down"/"left"/"right". Derived
   * from children when it is a plain string; symbol legends like "⌘" need
   * an explicit keyName
   */
  keyName?: string
  /** Depress the cap while the real key is held (window listener). Default true */
  listen?: boolean
  /** Fires once per press — on a matching keydown or a pointer tap. Also wraps the cap in a button */
  onPress?: () => void
  /** Visual size of the cap. Default "md" */
  size?: "sm" | "md"
  className?: string
}

export interface KbdComboProps {
  /** "+"-separated keys, e.g. "meta+k" or "shift+?" */
  keys: string
  /** Depress each cap while its real key is held. Default true */
  listen?: boolean
  /** Fires once each time every key in the combo is held down simultaneously */
  onTrigger?: () => void
  /** Visual size of the caps. Default "md" */
  size?: "sm" | "md"
  className?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

/** How far the cap travels down while pressed, in px (matches the depth edge) */
const PRESS_DEPTH = 2

/** Press-down is near-instant — real keys don't ease in */
const PRESS_TRANSITION = { duration: 0.08, ease: "easeOut" } as const

/** Release springs back with a tiny (~0.5px) overshoot before settling */
const RELEASE_SPRING = { type: "spring", stiffness: 500, damping: 18 } as const

/** Whole-combo pulse when every key is down at once */
const PULSE_SCALE = [1, 1.06, 1]
const PULSE_TRANSITION = { duration: 0.25, ease: "easeOut" } as const

/** Friendly key names → KeyboardEvent.key values */
const KEY_ALIASES: Record<string, string> = {
  meta: "Meta",
  cmd: "Meta",
  command: "Meta",
  ctrl: "Control",
  control: "Control",
  shift: "Shift",
  alt: "Alt",
  option: "Alt",
  enter: "Enter",
  return: "Enter",
  escape: "Escape",
  esc: "Escape",
  space: " ",
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
}

/** KeyboardEvent.key values → pretty cap legends (used by KbdCombo) */
const KEY_GLYPHS: Record<string, string> = {
  Meta: "⌘",
  Shift: "⇧",
  Alt: "⌥",
  Control: "⌃",
  Enter: "↵",
  " ": "␣",
  Escape: "esc",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
}

/** Lowercased KeyboardEvent.key values of the modifier keys */
const MODIFIERS = new Set(["meta", "control", "shift", "alt"])

const SIZES = {
  sm: "h-6 min-w-[24px] px-1.5 text-[10px]",
  md: "h-7 min-w-[28px] px-2 text-xs",
} as const

// Solid depth edge below the cap; hex = neutral-300 / neutral-600
const EDGE_SHADOW = "shadow-[0_2px_0_0_#d4d4d4] dark:shadow-[0_2px_0_0_#525252]"
const EDGE_SHADOW_PRESSED =
  "shadow-[0_0_0_0_#d4d4d4] dark:shadow-[0_0_0_0_#525252]"

/** Resolves a friendly key name ("cmd", "esc", "k") to its KeyboardEvent.key value */
function toEventKey(name: string) {
  return KEY_ALIASES[name.toLowerCase()] ?? name
}

/** Pretty legend for a key name — "meta" → "⌘", "k" → "K" */
function toGlyph(name: string) {
  const glyph = KEY_GLYPHS[toEventKey(name)]
  return glyph ?? (name.length === 1 ? name.toUpperCase() : name)
}

// ─── KbdKey ──────────────────────────────────────────────────────────────────

export function KbdKey({
  children,
  keyName,
  listen = true,
  onPress,
  size = "md",
  className,
}: KbdKeyProps) {
  const shouldReduceMotion = useReducedMotion()
  const [pressed, setPressed] = useState(false)
  // Mirrors `pressed` so press/release stay idempotent without re-creating
  // the window listeners on every state change
  const pressedRef = useRef(false)
  const onPressRef = useRef(onPress)
  onPressRef.current = onPress
  // Physical key (event.code) that pressed the cap — releases it even when
  // dropping Shift changed event.key in between (a "?" keyup arrives as "/")
  const pressedCodeRef = useRef<string | null>(null)

  const resolvedKeyName =
    keyName ??
    (typeof children === "string" ? children.toLowerCase() : undefined)

  const press = useCallback(() => {
    if (pressedRef.current) return
    pressedRef.current = true
    setPressed(true)
    onPressRef.current?.()
  }, [])

  const release = useCallback(() => {
    if (!pressedRef.current) return
    pressedRef.current = false
    pressedCodeRef.current = null
    setPressed(false)
  }, [])

  useEffect(() => {
    if (!listen || !resolvedKeyName) return

    const targetKey = toEventKey(resolvedKeyName).toLowerCase()
    const targetIsModifier = MODIFIERS.has(targetKey)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return // held keys auto-repeat; the cap is already down
      if (event.key.toLowerCase() !== targetKey) return
      pressedCodeRef.current = event.code
      press()
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const releasedMatchingCode =
        pressedCodeRef.current !== null && event.code === pressedCodeRef.current
      // macOS suppresses keyup for non-modifier keys while ⌘ is held, so
      // releasing ⌘ also releases this cap
      const metaSwallowedKeyUp =
        event.key.toLowerCase() === "meta" && !targetIsModifier
      if (
        event.key.toLowerCase() === targetKey ||
        releasedMatchingCode ||
        metaSwallowedKeyUp
      ) {
        release()
      }
    }

    // Don't leave the cap stuck down when the tab loses focus mid-press
    const handleBlur = () => release()

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("blur", handleBlur)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("blur", handleBlur)
    }
  }, [listen, resolvedKeyName, press, release])

  const cap = (
    <motion.kbd
      initial={false}
      animate={{ y: pressed ? PRESS_DEPTH : 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : pressed
            ? PRESS_TRANSITION
            : RELEASE_SPRING
      }
      onPointerDown={(event) => {
        if (event.button !== 0) return
        press()
      }}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      className={cn(
        "inline-flex select-none items-center justify-center rounded-md border font-mono",
        "border-neutral-200 text-neutral-700 dark:border-neutral-700 dark:text-neutral-200",
        pressed
          ? cn("bg-neutral-100 dark:bg-neutral-700", EDGE_SHADOW_PRESSED)
          : cn("bg-neutral-50 dark:bg-neutral-800", EDGE_SHADOW),
        !shouldReduceMotion &&
          "transition-[background-color,box-shadow] duration-100 ease-out",
        SIZES[size],
        className,
      )}
    >
      {children}
    </motion.kbd>
  )

  // Decorative caps stay non-interactive; a cap with an action is a button
  if (!onPress) return cap

  const label =
    typeof children === "string" ? children : (resolvedKeyName ?? "key")

  return (
    <button
      type="button"
      aria-label={`Press ${label}`}
      onKeyDown={(event) => {
        if (event.repeat) return
        if (event.key === "Enter" || event.key === " ") press()
      }}
      onKeyUp={(event) => {
        if (event.key === "Enter" || event.key === " ") release()
      }}
      className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300"
    >
      {cap}
    </button>
  )
}

// ─── KbdCombo ────────────────────────────────────────────────────────────────

export function KbdCombo({
  keys,
  listen = true,
  onTrigger,
  size = "md",
  className,
}: KbdComboProps) {
  const shouldReduceMotion = useReducedMotion()
  const controls = useAnimationControls()
  const onTriggerRef = useRef(onTrigger)
  onTriggerRef.current = onTrigger

  const keyNames = keys
    .split("+")
    .map((name) => name.trim())
    .filter(Boolean)

  useEffect(() => {
    if (!listen) return

    const targets = keys
      .split("+")
      .map((name) => name.trim())
      .filter(Boolean)
      .map((name) => toEventKey(name).toLowerCase())
    if (targets.length === 0) return

    const down = new Set<string>()
    // event.code of each physical key currently holding a target down, so a
    // shift-shifted keyup (e.g. "?" released as "/") still clears its key
    const codeToKey = new Map<string, string>()
    let fired = false

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return
      const key = event.key.toLowerCase()
      if (!targets.includes(key)) return
      down.add(key)
      codeToKey.set(event.code, key)
      if (fired || !targets.every((target) => down.has(target))) return
      fired = true
      onTriggerRef.current?.()
      if (!shouldReduceMotion) {
        controls.start({ scale: PULSE_SCALE, transition: PULSE_TRANSITION })
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (key === "meta") {
        // macOS swallows non-modifier keyups while ⌘ is held; treat them as
        // released the moment ⌘ comes up
        down.forEach((held) => {
          if (!MODIFIERS.has(held)) down.delete(held)
        })
        codeToKey.clear()
      }
      const mapped = codeToKey.get(event.code)
      if (mapped) {
        down.delete(mapped)
        codeToKey.delete(event.code)
      }
      down.delete(key)
      if (!targets.every((target) => down.has(target))) fired = false
    }

    const handleBlur = () => {
      down.clear()
      codeToKey.clear()
      fired = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("blur", handleBlur)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("blur", handleBlur)
    }
  }, [keys, listen, shouldReduceMotion, controls])

  return (
    <motion.span
      animate={controls}
      className={cn("inline-flex items-center gap-1", className)}
    >
      {keyNames.map((name, index) => (
        <React.Fragment key={`${name}-${index}`}>
          {index > 0 && (
            <span
              aria-hidden="true"
              className="select-none text-[10px] text-neutral-400"
            >
              +
            </span>
          )}
          <KbdKey keyName={name} listen={listen} size={size}>
            {toGlyph(name)}
          </KbdKey>
        </React.Fragment>
      ))}
    </motion.span>
  )
}
