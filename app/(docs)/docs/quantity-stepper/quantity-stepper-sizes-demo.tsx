"use client"

import React from "react"
import { QuantityStepper } from "@/components/spectrumui/quantity-stepper"

export default function QuantityStepperSizesDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-8 py-10">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <QuantityStepper size="sm" defaultValue={1} />
        <QuantityStepper size="md" defaultValue={2} />
        <QuantityStepper size="lg" defaultValue={3} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <QuantityStepper min={1} max={5} defaultValue={4} />
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Max 5 per order
        </p>
      </div>
    </div>
  )
}
