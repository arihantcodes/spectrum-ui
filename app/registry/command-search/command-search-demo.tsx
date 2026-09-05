"use client"

import { CommandSearch } from "@/components/spectrumui/command-search"

export default function CommandSearchDemo() {
  return (
    <div className="flex w-full justify-center py-8">
      <div className="w-full max-w-[512px]">
        <CommandSearch />
      </div>
    </div>
  )
}
