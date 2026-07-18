"use client"

import React from "react"
import { ReactionBar } from "@/components/spectrumui/reaction-bar"

export default function ReactionBarDemo() {
  return (
    <div className="flex w-full items-center justify-center py-10">
      <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
            AK
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                Aisha Khan
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                2:14 PM
              </span>
            </div>
            <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
              Just shipped the new onboarding flow — would love your feedback
              before Friday!
            </p>
            <ReactionBar
              className="mt-2.5"
              defaultReactions={[
                { emoji: "👍", count: 4, reacted: true },
                { emoji: "🎉", count: 2 },
                { emoji: "🚀", count: 1 },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
