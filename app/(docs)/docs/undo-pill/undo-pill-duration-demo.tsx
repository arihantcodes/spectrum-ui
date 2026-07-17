"use client"

import React, { useState } from "react"
import { UndoPill } from "@/components/spectrumui/undo-pill"

export default function UndoPillDurationDemo() {
  const [status, setStatus] = useState<"idle" | "pending" | "archived">("idle")

  return (
    <div className="relative flex min-h-[220px] w-full flex-col items-center justify-center gap-4 py-10">
      <button
        type="button"
        onClick={() =>
          setStatus((current) => (current === "archived" ? "idle" : "pending"))
        }
        disabled={status === "pending"}
        className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:focus-visible:ring-neutral-300"
      >
        {status === "archived" ? "Reset demo" : "Archive item"}
      </button>

      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        {status === "archived"
          ? "Item archived"
          : "8 second countdown — hover the pill to pause the countdown"}
      </p>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
        <UndoPill
          open={status === "pending"}
          label="Item archived"
          duration={8}
          onUndo={() => setStatus("idle")}
          onExpire={() => setStatus("archived")}
        />
      </div>
    </div>
  )
}
