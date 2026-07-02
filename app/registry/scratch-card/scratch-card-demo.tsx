"use client"

import React, { useCallback, useState } from "react"
import { ScratchCard } from "@/components/spectrumui/scratch-card"
import { Check, Copy, RotateCcw, Ticket } from "lucide-react"

export function ScratchCardDemo() {
  const [resetKey, setResetKey] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText("SPECTRUM20").then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }, [])

  const handleReset = useCallback(() => {
    setResetKey((key) => key + 1)
    setIsRevealed(false)
    setIsCopied(false)
  }, [])

  return (
    <div className="flex w-full flex-col items-center gap-4 py-8">
      <ScratchCard
        key={resetKey}
        className="w-full max-w-[320px]"
        ariaLabel="Scratch to reveal your coupon code. Press Enter to reveal."
        revealAnnouncement="Coupon revealed: SPECTRUM20 for 20% off"
        onReveal={() => setIsRevealed(true)}
      >
        <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-800">
            <Ticket
              className="h-5 w-5 text-neutral-600 dark:text-neutral-300"
              aria-hidden="true"
            />
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
            Coupon unlocked
          </span>
          <span className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            20% off
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="mt-1 flex items-center gap-2 rounded-xl border border-dashed border-neutral-300 px-4 py-2 font-mono text-sm text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus-visible:ring-neutral-300"
          >
            SPECTRUM20
            {isCopied ? (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span className="sr-only">
              {isCopied ? "Copied to clipboard" : "Copy coupon code"}
            </span>
          </button>
        </div>
      </ScratchCard>

      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Drag across the card to scratch off the foil
      </p>

      {isRevealed && (
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:focus-visible:ring-neutral-300"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Scratch again
        </button>
      )}
    </div>
  )
}
