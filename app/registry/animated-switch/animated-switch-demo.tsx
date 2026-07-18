"use client"

import React from "react"
import { AnimatedSwitch } from "@/components/spectrumui/animated-switch"

const SETTINGS = [
  {
    title: "Email notifications",
    description: "Product updates and announcements",
    defaultChecked: true,
  },
  {
    title: "Public profile",
    description: "Anyone can view your profile",
    defaultChecked: false,
  },
  {
    title: "Weekly digest",
    description: "A summary in your inbox every Monday",
    defaultChecked: true,
  },
]

export default function AnimatedSwitchDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="w-full max-w-sm divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
        {SETTINGS.map((setting) => (
          <div
            key={setting.title}
            className="flex items-center justify-between gap-4 px-4 py-3.5"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {setting.title}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {setting.description}
              </span>
            </div>
            <AnimatedSwitch
              defaultChecked={setting.defaultChecked}
              label={setting.title}
            />
          </div>
        ))}
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Press and hold to see the knob stretch — or drag it
      </p>
    </div>
  )
}
