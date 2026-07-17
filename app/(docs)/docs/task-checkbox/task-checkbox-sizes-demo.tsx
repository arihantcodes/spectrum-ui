"use client"

import React from "react"
import { TaskCheckbox } from "@/components/spectrumui/task-checkbox"

export default function TaskCheckboxSizesDemo() {
  return (
    <div className="flex w-full flex-col items-center py-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <TaskCheckbox size="sm" label="Small — water the plants" />
        <TaskCheckbox size="md" label="Medium — file the expense report" />
        <TaskCheckbox size="lg" label="Large — book flights to Lisbon" />
        <TaskCheckbox
          size="md"
          defaultChecked
          label="Prepare the launch checklist"
          description="Blocks the Friday release review"
        />
      </div>
    </div>
  )
}
