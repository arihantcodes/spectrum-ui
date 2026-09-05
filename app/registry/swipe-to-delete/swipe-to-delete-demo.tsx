"use client"

import React, { useState } from "react"
import { SwipeToDelete } from "@/components/spectrumui/swipe-to-delete"

const EMAILS = [
  {
    id: 1,
    sender: "Ava Chen",
    initials: "AC",
    preview: "Design review notes — the new empty states look great",
    time: "9:41 AM",
  },
  {
    id: 2,
    sender: "Marcus Reid",
    initials: "MR",
    preview: "Re: Q3 roadmap — can we move the sync to Thursday?",
    time: "8:17 AM",
  },
  {
    id: 3,
    sender: "Priya Nair",
    initials: "PN",
    preview: "Your invoice for June is ready to download",
    time: "Yesterday",
  },
]

export default function SwipeToDeleteDemo() {
  const [emails, setEmails] = useState(EMAILS)

  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="w-full max-w-sm">
        {emails.map((email) => (
          <SwipeToDelete
            key={email.id}
            label={`email from ${email.sender}`}
            className="mb-2 last:mb-0"
            onDelete={() =>
              setEmails((current) =>
                current.filter((item) => item.id !== email.id),
              )
            }
          >
            <div className="flex items-center gap-3 p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                {email.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {email.sender}
                  </span>
                  <span className="shrink-0 text-xs text-neutral-500 dark:text-neutral-400">
                    {email.time}
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-xs text-neutral-500 dark:text-neutral-400">
                  {email.preview}
                </span>
              </span>
            </div>
          </SwipeToDelete>
        ))}

        {emails.length === 0 && (
          <div className="flex justify-center py-6">
            <button
              type="button"
              onClick={() => setEmails(EMAILS)}
              className="text-sm font-medium text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-300"
            >
              Reset inbox
            </button>
          </div>
        )}
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Drag a row left to delete — or hover to peek, then click the zone
      </p>
    </div>
  )
}
