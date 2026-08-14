"use client"

import { QuotaGaugeChart } from "@/app/registry/charts/quota-gauge"

export function QuotaGaugeDemo() {
  return (
    <div className="w-full max-w-xl p-2 sm:p-4">
      <QuotaGaugeChart />
    </div>
  )
}
