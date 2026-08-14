"use client"

import { RouteThroughputChart } from "@/app/registry/charts/route-throughput"

export function RouteThroughputDemo() {
  return (
    <div className="w-full max-w-xl p-2 sm:p-4">
      <RouteThroughputChart />
    </div>
  )
}
