"use client"

import { CohortRetentionChart } from "@/app/registry/charts/cohort-retention"

export function CohortRetentionDemo() {
  return (
    <div className="w-full max-w-xl p-2 sm:p-4">
      <CohortRetentionChart />
    </div>
  )
}
