"use client"

import { LiveTrafficChart } from "@/app/registry/charts/live-traffic"

export function LiveTrafficDemo() {
  return (
    <div className="w-full max-w-xl p-2 sm:p-4">
      <LiveTrafficChart />
    </div>
  )
}
