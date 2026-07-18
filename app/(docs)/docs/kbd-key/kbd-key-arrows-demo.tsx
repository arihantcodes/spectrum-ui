"use client"

import React from "react"
import { KbdCombo, KbdKey } from "@/components/spectrumui/kbd-key"

export default function KbdKeyArrowsDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-10 py-10">
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <KbdKey keyName="up">↑</KbdKey>
          <div className="flex items-center gap-1">
            <KbdKey keyName="left">←</KbdKey>
            <KbdKey keyName="down">↓</KbdKey>
            <KbdKey keyName="right">→</KbdKey>
          </div>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Press your arrow keys — each cap depresses while held
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <KbdCombo keys="shift+?" size="sm" />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          A small combo — hold ⇧ and ? together and it pulses
        </p>
      </div>
    </div>
  )
}
