"use client"

import { ActualForecastChart } from "@/app/registry/charts/actual-forecast"

export function ActualForecastDemo() {
  return (
    <div className="w-full max-w-xl p-2 sm:p-4">
      <ActualForecastChart />
    </div>
  )
}
