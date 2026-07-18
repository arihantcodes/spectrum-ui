"use client"

import React, { useState } from "react"
import { ReactionBar, type Reaction } from "@/components/spectrumui/reaction-bar"

export default function ReactionBarControlledDemo() {
  const [reactions, setReactions] = useState<Reaction[]>([
    { emoji: "❤️", count: 12 },
    { emoji: "😂", count: 3, reacted: true },
  ])
  const total = reactions.reduce((sum, reaction) => sum + reaction.count, 0)

  return (
    <div className="flex w-full flex-col items-center gap-8 py-10">
      <div className="flex flex-col items-center gap-2.5">
        <ReactionBar reactions={reactions} onReactionsChange={setReactions} />
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Controlled — {total} total {total === 1 ? "reaction" : "reactions"}
        </p>
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <ReactionBar
          size="sm"
          addable={false}
          defaultReactions={[
            { emoji: "👍", count: 8 },
            { emoji: "😮", count: 2 },
          ]}
        />
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Small size with the add button disabled
        </p>
      </div>
    </div>
  )
}
