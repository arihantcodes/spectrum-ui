"use client"

import { RecentActivity } from "@/components/spectrumui/recent-activity"

export default function RecentActivityDemo() {
  return (
    <div className="flex w-full justify-center py-8">
      <div className="w-full max-w-[512px]">
        <RecentActivity />
      </div>
    </div>
  )
}
