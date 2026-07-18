"use client"

import React from "react"
import { TiltCard, TiltCardItem } from "@/components/spectrumui/tilt-card"

export default function TiltCardGlareDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6 py-10">
      <TiltCard
        maxTilt={20}
        glareColor="rgba(56, 189, 248, 0.45)"
        className="w-64 bg-neutral-950 p-6 dark:border-neutral-800"
        containerClassName="w-64"
      >
        <TiltCardItem depth={40} className="text-sm font-medium text-sky-400">
          Aggressive tilt
        </TiltCardItem>
        <TiltCardItem depth={60} className="mt-2 text-lg font-semibold text-white">
          maxTilt 20° with a sky glare
        </TiltCardItem>
      </TiltCard>

      <TiltCard
        maxTilt={8}
        glare={false}
        className="w-64 p-6"
        containerClassName="w-64"
      >
        <TiltCardItem
          depth={40}
          className="text-sm font-medium text-neutral-500 dark:text-neutral-400"
        >
          Subtle tilt
        </TiltCardItem>
        <TiltCardItem
          depth={60}
          className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100"
        >
          maxTilt 8° with no glare
        </TiltCardItem>
      </TiltCard>
    </div>
  )
}
