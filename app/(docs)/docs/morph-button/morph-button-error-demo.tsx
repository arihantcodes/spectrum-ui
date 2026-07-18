"use client"

import React from "react"
import { MorphButton } from "@/components/spectrumui/morph-button"

const fakeFail = () =>
  new Promise<void>((_, reject) =>
    setTimeout(() => reject(new Error("Request failed")), 1200),
  )

const fakeSave = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 1000))

export default function MorphButtonErrorDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-10">
      <MorphButton
        onAction={fakeFail}
        loadingLabel="Publishing"
        errorLabel="Failed to publish"
      >
        Publish post
      </MorphButton>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <MorphButton size="sm" onAction={fakeSave}>
          Save
        </MorphButton>
        <MorphButton size="md" onAction={fakeSave}>
          Save changes
        </MorphButton>
        <MorphButton size="lg" onAction={fakeSave} loadingLabel="Saving">
          Save all changes
        </MorphButton>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        The first action always rejects — error state with a tight shake
      </p>
    </div>
  )
}
