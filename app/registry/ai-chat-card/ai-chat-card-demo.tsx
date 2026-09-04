"use client"

import { AIChatCard } from "@/components/spectrumui/ai-chat-card"

export default function AIChatCardDemo() {
  return (
    <div className="flex w-full justify-center py-8">
      <div className="w-full max-w-[360px]">
        <AIChatCard className="min-h-[520px]" />
      </div>
    </div>
  )
}
