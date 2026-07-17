"use client"

import React, { useState } from "react"
import { NotificationBell } from "@/components/spectrumui/notification-bell"

export default function NotificationBellDotDemo() {
  const [count, setCount] = useState(1)

  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <NotificationBell size="sm" count={count} dot />
        <NotificationBell size="md" count={count} dot />
        <NotificationBell size="lg" count={count} dot />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setCount((current) => current + 1)}
          className="h-8 rounded-full border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Ping
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="h-8 rounded-full border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
