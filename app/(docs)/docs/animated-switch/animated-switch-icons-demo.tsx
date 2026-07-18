"use client"

import React from "react"
import { AnimatedSwitch } from "@/components/spectrumui/animated-switch"

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

export default function AnimatedSwitchIconsDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-8 py-10">
      <div className="flex flex-col items-center gap-2.5">
        <AnimatedSwitch
          size="lg"
          label="Dark mode"
          offIcon={<SunIcon />}
          onIcon={<MoonIcon />}
        />
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          Knob icons crossfade on toggle
        </span>
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <div className="flex items-center gap-5">
          <AnimatedSwitch size="sm" label="Small switch" defaultChecked />
          <AnimatedSwitch size="md" label="Medium switch" defaultChecked />
          <AnimatedSwitch size="lg" label="Large switch" defaultChecked />
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          sm · md · lg
        </span>
      </div>
    </div>
  )
}
