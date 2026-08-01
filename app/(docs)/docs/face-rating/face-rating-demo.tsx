"use client"

import React, { useState } from "react"
import { FaceRating } from "@/components/spectrumui/face-rating"

export default function FaceRatingDemo() {
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="flex w-full items-center justify-center py-10">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="text-center">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            How was your experience?
          </h3>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Hover a segment to preview, click to commit
          </p>
        </div>

        <FaceRating
          onValueChange={(value) => {
            setRating(value)
            setSubmitted(false)
          }}
        />

        <button
          type="button"
          disabled={rating === 0}
          onClick={() => setSubmitted(true)}
          className="h-9 w-full rounded-full bg-neutral-900 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:ring-neutral-300"
        >
          {submitted ? "Thanks for the feedback!" : "Submit feedback"}
        </button>
      </div>
    </div>
  )
}
