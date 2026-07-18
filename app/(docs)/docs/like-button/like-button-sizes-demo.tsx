"use client"

import React from "react"
import { LikeButton } from "@/components/spectrumui/like-button"

export default function LikeButtonSizesDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 py-10">
      <LikeButton size="sm" count={321} />
      <LikeButton size="md" count={4200} />
      <LikeButton size="lg" count={98700} defaultLiked />
    </div>
  )
}
