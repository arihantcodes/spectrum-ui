"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Plus, Star } from "lucide-react"
import Image from "next/image"

export interface SlotsSectionProps {
  className?: string
}

const SPRING_ENTRANCE = {
  type: "spring" as const,
  stiffness: 260,
  damping: 20,
}

function SlotCard({ label = "Your brand here", tier = "founding", booked = false }: { label?: string; tier?: string; booked?: boolean }) {
  if (booked) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/20 min-h-[120px] select-none relative overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,rgba(0,0,0,0.02)_6px,rgba(0,0,0,0.02)_7px)] dark:bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,rgba(255,255,255,0.015)_6px,rgba(255,255,255,0.015)_7px)]" />
        <div className="relative w-20 h-5 shrink-0 overflow-hidden">
          <Image
            src="https://www.shadcnblocks.com/images/press/logo/shadcnblocks-logo.svg"
            alt="shadcnblocks.com"
            fill
            className="object-contain dark:invert opacity-60"
            unoptimized
          />
        </div>
        <span className="text-[10px] text-neutral-400 dark:text-neutral-600 font-mono">spot reserved</span>
        <span className="relative text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-500">
          Booked
        </span>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState(null, '', `#apply?tier=${tier}`);
        window.dispatchEvent(new CustomEvent('open-sponsor-modal', { detail: { tier } }));
      }}
      className="group w-full flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-300 transition-all duration-300 bg-neutral-50/50 dark:bg-neutral-900/30 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/30 min-h-[120px]"
    >
      <div className="w-12 h-12 rounded-2xl bg-neutral-200/60 dark:bg-neutral-800/60 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100 transition-colors duration-300 flex items-center justify-center">
        <Plus className="w-5 h-5 text-neutral-400 group-hover:text-white dark:group-hover:text-neutral-900 transition-colors duration-300" />
      </div>
      <span className="text-xs font-medium text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300">
        {label}
      </span>
    </button>
  )
}

export function SlotsSection({ className }: SlotsSectionProps) {
  return (
    <section id="slots" className={cn("w-full py-20 md:py-28", className)}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">

        <div className="mb-16 max-w-xl">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600 mb-4 block">
            Available Spots
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
            Early sponsor inventory is open.
          </h2>
          <p className="text-base text-neutral-500 dark:text-neutral-400">
            Limited spots. Founding sponsors lock in launch pricing permanently and get priority placement for the first 3 months.
          </p>
        </div>

        {/* ── Row 1: Founding Sponsors ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={SPRING_ENTRANCE}
          className="mb-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Founding Sponsors
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900">
                  <Star className="w-2.5 h-2.5" />
                  Limited to 3
                </span>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Homepage hero placement. Locked lifetime pricing. Priority visibility for the first 3 months.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm text-neutral-400 dark:text-neutral-600 line-through">$99/mo</span>
              <span className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">$49</span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">/mo</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SlotCard booked />
            <SlotCard label="Your brand here" tier="founding" />
            <SlotCard label="Your brand here" tier="founding" />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-xs text-neutral-400 dark:text-neutral-600">1 spot taken · <span className="text-amber-500 font-medium">2 founding spots left</span></span>
          </div>
        </motion.div>

        {/* ── Row 2: Docs Sponsors ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...SPRING_ENTRANCE, delay: 0.08 }}
          className="mb-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
                Docs Sponsors
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Persistent sidebar placement across every documentation page.
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">$29</span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">/mo</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SlotCard label="Your logo here" tier="docs" />
            <SlotCard label="Your logo here" tier="docs" />
            <SlotCard label="Your logo here" tier="docs" />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-neutral-400 dark:text-neutral-600">3 spots available</span>
          </div>
        </motion.div>

        {/* ── Row 3: Component Sponsors ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...SPRING_ENTRANCE, delay: 0.16 }}
          className="mb-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5">
                Component Sponsors
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Inline placement below component previews and code snippets.
              </p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">$9</span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">/mo</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SlotCard label="Your logo here" tier="component" />
            <SlotCard label="Your logo here" tier="component" />
            <SlotCard label="Your logo here" tier="component" />
          </div>


          <div className="mt-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-neutral-400 dark:text-neutral-600">3 spots available</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
