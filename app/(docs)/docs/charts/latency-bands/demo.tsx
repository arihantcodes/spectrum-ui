"use client"

import { LatencyBandsChart } from "@/app/registry/charts/latency-bands"

export function LatencyBandsDemo() {
  return (
    <div className="w-full max-w-xl p-2 sm:p-4">
      <LatencyBandsChart />
    </div>
  )
}
