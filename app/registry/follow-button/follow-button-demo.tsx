"use client"

import React, { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { FollowButton } from "@/components/spectrumui/follow-button"

const BASE_FOLLOWERS = 2847

export default function FollowButtonDemo() {
  const shouldReduceMotion = useReducedMotion()
  const [following, setFollowing] = useState(false)

  const followers = BASE_FOLLOWERS + (following ? 1 : 0)
  // Digits roll upward when the count just went up, downward when it dropped
  const direction = following ? 1 : -1

  return (
    <div className="flex w-full items-center justify-center py-10">
      <div className="flex w-full max-w-sm items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900"
        >
          AJ
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Arihant Jain
          </p>
          <p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
            @arihantcodes
          </p>
          <p className="mt-0.5 flex items-baseline gap-1 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="relative inline-flex overflow-hidden font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={followers}
                  className="inline-block"
                  initial={{ y: direction * 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: direction * -10, opacity: 0 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 400, damping: 30 }
                  }
                >
                  {followers.toLocaleString("en")}
                </motion.span>
              </AnimatePresence>
            </span>
            followers
          </p>
        </div>
        <FollowButton following={following} onFollowingChange={setFollowing} />
      </div>
    </div>
  )
}
