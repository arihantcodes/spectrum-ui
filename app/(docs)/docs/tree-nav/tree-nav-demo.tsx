"use client"

import * as React from "react"
import { TreeNav } from "@/components/spectrumui/tree-nav"

const ITEMS = [
  { label: "Overview", href: "#overview" },
  { label: "Installation", href: "#installation" },
  { label: "Usage", href: "#usage" },
  { label: "Theming", href: "#theming", badge: "New" },
  { label: "Accessibility", href: "#accessibility" },
  { label: "Changelog", href: "#changelog" },
]

export default function TreeNavDemo() {
  const [active, setActive] = React.useState(ITEMS[0].href)

  return (
    <div className="flex w-full justify-center py-8">
      <TreeNav
        className="w-full max-w-[240px]"
        items={ITEMS}
        activeHref={active}
        onSelect={(item, event) => {
          event.preventDefault()
          setActive(item.href)
        }}
      />
    </div>
  )
}
