"use client"

import React from "react"
import {
  DEFAULT_RULES,
  PasswordStrengthInput,
  type PasswordRule,
} from "@/components/spectrumui/password-strength"

const CUSTOM_RULES: PasswordRule[] = [
  ...DEFAULT_RULES,
  { label: "No spaces", test: (value) => value.length > 0 && !/\s/.test(value) },
]

export default function PasswordStrengthCustomDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-8 py-10">
      <div className="flex w-full max-w-sm flex-col gap-2">
        <span className="text-sm font-medium leading-none text-neutral-900 dark:text-neutral-100">
          Custom rules
        </span>
        <PasswordStrengthInput rules={CUSTOM_RULES} />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-2">
        <span className="text-sm font-medium leading-none text-neutral-900 dark:text-neutral-100">
          Meter only
        </span>
        <PasswordStrengthInput showChecklist={false} />
      </div>
    </div>
  )
}
