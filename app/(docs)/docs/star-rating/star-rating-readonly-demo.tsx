"use client"

import React from "react"
import { StarRating } from "@/components/spectrumui/star-rating"

export default function StarRatingReadonlyDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-8 py-10">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <StarRating value={4.3} readOnly label="Average rating" />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            4.3
          </span>
          {" · based on 1,284 reviews"}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <StarRating value={3} readOnly size="sm" label="Small" />
        <StarRating value={3} readOnly size="md" label="Medium" />
        <StarRating value={3} readOnly size="lg" label="Large" />
      </div>
    </div>
  )
}
