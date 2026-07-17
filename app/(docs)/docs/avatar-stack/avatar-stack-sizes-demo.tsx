"use client"

import React from "react"
import {
  AvatarStack,
  type AvatarItem,
} from "@/components/spectrumui/avatar-stack"

const CREW: AvatarItem[] = [
  { name: "Arjun Mehta", src: "/avatars/01.png" },
  { name: "Sofia Ramirez", src: "/avatars/02.png" },
  { name: "Priya Nair" },
  { name: "Noah Kim" },
  { name: "Emma Fischer" },
  { name: "David Osei" },
]

export default function AvatarStackSizesDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-8 py-10">
      <div className="flex flex-wrap items-end justify-center gap-10">
        <div className="flex flex-col items-center gap-3">
          <AvatarStack items={CREW} size="sm" />
          <span className="text-xs text-neutral-500 dark:text-neutral-400">sm</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <AvatarStack items={CREW} size="md" />
          <span className="text-xs text-neutral-500 dark:text-neutral-400">md</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <AvatarStack items={CREW} size="lg" />
          <span className="text-xs text-neutral-500 dark:text-neutral-400">lg</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <AvatarStack items={CREW} expandable={false} />
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          expandable=false — the +2 pill stays put
        </span>
      </div>
    </div>
  )
}
