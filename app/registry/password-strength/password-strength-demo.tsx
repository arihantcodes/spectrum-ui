"use client"

import React from "react"
import { PasswordStrengthInput } from "@/components/spectrumui/password-strength"

export default function PasswordStrengthDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          Create account
        </h3>
        <div className="mt-5 flex flex-col gap-2">
          <label
            htmlFor="demo-password"
            className="text-sm font-medium leading-none text-neutral-900 dark:text-neutral-100"
          >
            Password
          </label>
          <PasswordStrengthInput id="demo-password" />
        </div>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Type a password — the meter fills and requirements check off as you go
      </p>
    </div>
  )
}
