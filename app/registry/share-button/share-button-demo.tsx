"use client"

import React from "react"
import { Mail, MessageCircle, Twitter } from "lucide-react"
import {
  ShareButton,
  type ShareAction,
} from "@/components/spectrumui/share-button"

const actions: ShareAction[] = [
  { icon: <Twitter size={15} />, label: "Share on X", onSelect: () => {} },
  { icon: <Mail size={15} />, label: "Email", onSelect: () => {} },
  { icon: <MessageCircle size={15} />, label: "Message", onSelect: () => {} },
]

export default function ShareButtonDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          Designing calmer micro-interactions
        </p>
        <div className="mt-4 flex items-center justify-between">
          <ShareButton copyValue="https://ui.spectrumhq.in" actions={actions} />
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            128 likes
          </span>
        </div>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Click share — try the copy-link action
      </p>
    </div>
  )
}
