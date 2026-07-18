"use client"

import React from "react"
import Image from "next/image"
import { TiltCard, TiltCardItem } from "@/components/spectrumui/tilt-card"

export default function TiltCardDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-5 py-10">
      <TiltCard className="w-full max-w-sm p-6" containerClassName="w-full max-w-sm">
        <TiltCardItem
          depth={50}
          className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          Aurora Headphones
        </TiltCardItem>
        <TiltCardItem
          depth={30}
          className="mt-1 text-sm text-neutral-500 dark:text-neutral-400"
        >
          Studio sound with adaptive noise cancellation.
        </TiltCardItem>
        <TiltCardItem depth={80} className="mt-4">
          <Image
            src="/product/product1.jpg"
            alt="Aurora Headphones product shot"
            width={640}
            height={416}
            className="h-52 w-full rounded-xl object-cover"
          />
        </TiltCardItem>
        {/* preserve-3d keeps the nested TiltCardItem depths from flattening */}
        <div
          className="mt-5 flex items-center justify-between"
          style={{ transformStyle: "preserve-3d" }}
        >
          <TiltCardItem
            depth={40}
            className="text-lg font-bold text-neutral-900 dark:text-neutral-100"
          >
            $249
          </TiltCardItem>
          <TiltCardItem depth={60}>
            <button
              type="button"
              className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:ring-neutral-300"
            >
              Buy now →
            </button>
          </TiltCardItem>
        </div>
      </TiltCard>

      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Move the pointer across the card — layers lift at different depths
      </p>
    </div>
  )
}
