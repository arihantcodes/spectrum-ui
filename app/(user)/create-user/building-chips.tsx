'use client'

import { useState } from 'react'

const OPTIONS = [
  'SaaS',
  'AI App',
  'Dashboard',
  'Startup',
  'Agency',
  'Portfolio',
  'Something Else'
]

export function BuildingChips() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-neutral-900 dark:text-[#CCC] uppercase tracking-wider block">
        What are you building?
      </label>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              selected === option
                ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 dark:bg-[#0C0C0C] dark:text-[#888] dark:border-[#333] dark:hover:border-[#444]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <input
        type="text"
        name="building_type"
        value={selected ?? ''}
        required
        readOnly
        className="sr-only"
      />
    </div>
  )
}
