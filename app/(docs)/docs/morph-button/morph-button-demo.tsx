"use client"

import React from "react"
import { MorphButton } from "@/components/spectrumui/morph-button"

const fakeSave = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 1200))

export default function MorphButtonDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <MorphButton
        onAction={fakeSave}
        loadingLabel="Saving"
        successLabel="Saved"
      >
        Save changes
      </MorphButton>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Click to run the full idle → loading → success cycle
      </p>
    </div>
  )
}
