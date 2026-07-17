"use client"

import React from "react"
import { Archive } from "lucide-react"
import { HoldToConfirmButton } from "@/components/spectrumui/hold-to-confirm"

export default function HoldToConfirmSizesDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-10">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <HoldToConfirmButton size="sm" onConfirm={() => {}} />
        <HoldToConfirmButton size="md" onConfirm={() => {}} />
        <HoldToConfirmButton size="lg" onConfirm={() => {}} />
      </div>
      <HoldToConfirmButton
        duration={2500}
        label="Hold to archive (2.5s)"
        confirmedLabel="Archived"
        icon={<Archive size={14} strokeWidth={2} />}
        onConfirm={() => {}}
      />
    </div>
  )
}
