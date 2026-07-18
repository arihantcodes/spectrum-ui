"use client"

import React from "react"
import { LikeButton } from "@/components/spectrumui/like-button"

export default function LikeButtonDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <LikeButton count={1248} />
        <LikeButton count={99} defaultLiked />
        <LikeButton showCount={false} />
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Tap a heart — spring pop, ring pulse, particle burst and a rolling count
      </p>
    </div>
  )
}
