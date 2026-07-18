"use client"

import React from "react"
import {
  AvatarStack,
  type AvatarItem,
} from "@/components/spectrumui/avatar-stack"

const TEAM: AvatarItem[] = [
  { name: "Arjun Mehta", src: "/avatars/01.png" },
  { name: "Sofia Ramirez", src: "/avatars/02.png" },
  { name: "Liam Carter", src: "/avatars/03.png" },
  { name: "Priya Nair" },
  { name: "Noah Kim" },
  { name: "Emma Fischer" },
  { name: "David Osei" },
]

export default function AvatarStackDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="flex items-center gap-8 rounded-xl border border-neutral-200 bg-white py-4 pl-5 pr-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Project team
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            7 members · 3 online
          </span>
        </div>
        <AvatarStack items={TEAM} />
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Hover the stack — then hover a face
      </p>
    </div>
  )
}
