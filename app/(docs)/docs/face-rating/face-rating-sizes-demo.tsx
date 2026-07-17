"use client"

import React from "react"
import { FaceRating } from "@/components/spectrumui/face-rating"

export default function FaceRatingSizesDemo() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-12 py-10">
      <FaceRating size="sm" showLabel={false} defaultValue={2} label="Small" />
      <FaceRating size="md" defaultValue={4} label="Medium" />
      <FaceRating
        size="lg"
        defaultValue={5}
        labels={["Awful", "Meh", "Fine", "Great", "Perfect"]}
        label="Large with custom labels"
      />
    </div>
  )
}
