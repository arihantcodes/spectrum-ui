"use client"

import React, { useState } from "react"
import { NotificationBell } from "@/components/spectrumui/notification-bell"

export default function NotificationBellDemo() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <NotificationBell count={count} />
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setCount((current) => current + 1)}
          className="h-8 rounded-full border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Send notification
        </button>
        <button
          type="button"
          onClick={() => setCount(0)}
          className="h-8 rounded-full border border-neutral-200 bg-white px-3 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          Mark all read
        </button>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Send a notification — the bell swings and the badge springs in with a
        rolling count
      </p>
    </div>
  )
}
