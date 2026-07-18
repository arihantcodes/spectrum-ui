"use client"

import React from "react"
import { FollowButton } from "@/components/spectrumui/follow-button"

export default function FollowButtonSizesDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-10">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <FollowButton size="sm" />
        <FollowButton size="md" />
        <FollowButton size="lg" defaultFollowing />
      </div>
      <FollowButton
        followLabel="Subscribe"
        followingLabel="Subscribed"
        unfollowLabel="Unsubscribe"
      />
    </div>
  )
}
