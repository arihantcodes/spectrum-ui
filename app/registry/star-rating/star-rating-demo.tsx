"use client"

import React from "react"
import { StarRating } from "@/components/spectrumui/star-rating"

export default function StarRatingDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-neutral-200 bg-white px-8 py-6 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          Rate your experience
        </p>
        <StarRating showValue label="Rate your experience" />
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Hover to preview, click to commit — arrow keys work too
      </p>
    </div>
  )
}
