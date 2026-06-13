"use client"

import React, { useState, useEffect } from "react"
import { CommandPalette } from "./command-palette"
import { Button } from "@/components/ui/button"

export default function CommandPaletteDemo() {
  const [isOpen, setIsOpen] = useState(false)

  // Listen for global command/control key trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 text-center select-none">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Press <kbd className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-1.5 py-0.5 rounded text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200">⌘K</kbd> or <kbd className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-1.5 py-0.5 rounded text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200">Ctrl+K</kbd> to open the palette
      </p>
      
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="rounded-xl px-5 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 font-medium text-sm transition-colors cursor-pointer"
      >
        Open Command Palette
      </Button>

      <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}
