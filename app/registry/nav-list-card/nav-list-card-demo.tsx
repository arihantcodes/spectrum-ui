"use client"

import { NavListCard, SUPPORT_NAV_ITEMS } from "@/components/spectrumui/nav-list-card"

export default function NavListCardDemo() {
  return (
    <div className="flex w-full justify-center py-8">
      <div className="grid w-full max-w-[360px] grid-cols-2 items-start gap-3">
        <NavListCard />
        <NavListCard title="Support" items={SUPPORT_NAV_ITEMS} />
      </div>
    </div>
  )
}
