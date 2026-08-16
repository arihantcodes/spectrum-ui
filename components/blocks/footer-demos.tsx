"use client"

import type { ReactNode } from "react"

import { FOOTER_CATALOG } from "@/components/spectrumui/footers/catalog"
import { FOOTER_COMPONENTS } from "@/components/spectrumui/footers/component-map"

/**
 * Live footer demos, keyed by the block catalog slug (the CLI name, e.g.
 * `enterprise-grid-footer`). The specimen stage renders these full-bleed with
 * a per-preview device toolbar.
 */
export const FOOTER_BLOCK_DEMOS: Record<string, (variant: string) => ReactNode> =
  Object.fromEntries(
    FOOTER_CATALOG.map((entry) => {
      const Footer = FOOTER_COMPONENTS[entry.slug]
      return [
        entry.cli,
        () => (Footer ? <Footer /> : null),
      ] as const
    }),
  )
