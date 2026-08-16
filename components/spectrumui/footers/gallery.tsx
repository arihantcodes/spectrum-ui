"use client"

import { useMemo, useState, type CSSProperties } from "react"
import Link from "next/link"
import { Monitor, Moon, Sun } from "lucide-react"

import Copy from "@/components/copy"
import {
  DevicePreviewFrame,
  DeviceViewToolbar,
  useDevicePreview,
  type DeviceView,
} from "@/components/blocks/device-preview"
import { cn } from "@/lib/utils"
import { FOOTER_CATALOG, FOOTER_CATEGORIES } from "./catalog"
import { FOOTER_COMPONENTS } from "./component-map"
import { FOOTER_SOURCE } from "./footers.source"
import type { FooterCategory } from "./types"

type PreviewTheme = "system" | "light" | "dark"

const LIGHT_VARS = {
  "--background": "0 0% 100%",
  "--foreground": "0 0% 3.9%",
  "--card": "0 0% 100%",
  "--card-foreground": "0 0% 3.9%",
  "--primary": "0 0% 9%",
  "--primary-foreground": "0 0% 98%",
  "--secondary": "0 0% 96.1%",
  "--secondary-foreground": "0 0% 9%",
  "--muted": "0 0% 96.1%",
  "--muted-foreground": "0 0% 45.1%",
  "--accent": "0 0% 96.1%",
  "--accent-foreground": "0 0% 9%",
  "--border": "0 0% 89.8%",
  "--input": "0 0% 89.8%",
  "--ring": "0 0% 3.9%",
} as CSSProperties

const DARK_VARS = {
  "--background": "0 0% 3.9%",
  "--foreground": "0 0% 98%",
  "--card": "0 0% 3.9%",
  "--card-foreground": "0 0% 98%",
  "--primary": "0 0% 98%",
  "--primary-foreground": "0 0% 9%",
  "--secondary": "0 0% 14.9%",
  "--secondary-foreground": "0 0% 98%",
  "--muted": "0 0% 14.9%",
  "--muted-foreground": "0 0% 63.9%",
  "--accent": "0 0% 14.9%",
  "--accent-foreground": "0 0% 98%",
  "--border": "0 0% 14.9%",
  "--input": "0 0% 14.9%",
  "--ring": "0 0% 83.1%",
} as CSSProperties

export function FooterPreviewFrame({
  slug,
  viewport,
  theme,
  fit = false,
  remountKey,
  className,
}: {
  slug: string
  viewport: DeviceView
  theme: PreviewTheme
  fit?: boolean
  remountKey?: number
  className?: string
}) {
  const Footer = FOOTER_COMPONENTS[slug]

  if (!Footer) return null

  return (
    <DevicePreviewFrame
      view={viewport}
      fit={fit}
      remountKey={remountKey}
      sitAtBottom
      className={cn("rounded-xl border border-border bg-muted/40 p-3", className)}
    >
      <div
        className={cn("min-w-0", theme === "dark" && "dark")}
        style={theme === "light" ? LIGHT_VARS : theme === "dark" ? DARK_VARS : undefined}
      >
        <div className="bg-background text-foreground">
          <Footer />
        </div>
      </div>
    </DevicePreviewFrame>
  )
}

function FooterPreviewCard({
  slug,
  title,
  useCase,
  cli,
  componentName,
  theme,
  highlighted,
}: {
  slug: string
  title: string
  useCase: string
  cli: string
  componentName: string
  theme: PreviewTheme
  highlighted?: boolean
}) {
  const preview = useDevicePreview("desktop")

  return (
    <section
      id={slug}
      className={cn("scroll-mt-36", highlighted && "rounded-2xl ring-1 ring-ring/40")}
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-medium tracking-tight">{title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">{useCase}</p>
          <p className="mt-2 font-mono text-[11px] text-muted-foreground">
            npx shadcn@latest add @spectrumui/{cli}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DeviceViewToolbar
            view={preview.view}
            onViewChange={preview.setView}
            fit={preview.fit}
            onFitChange={preview.setFit}
            onReset={preview.reset}
          />
          <Copy content={FOOTER_SOURCE[componentName] ?? ""} />
          <Link
            href={`/docs/footer/${slug}`}
            className="inline-flex h-8 items-center rounded-md border border-border px-3 text-xs font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Open
          </Link>
        </div>
      </div>
      <FooterPreviewFrame
        slug={slug}
        viewport={preview.view}
        theme={theme}
        fit={preview.fit}
        remountKey={preview.remountKey}
      />
    </section>
  )
}

export function FooterGallery({
  activeSlug,
}: {
  activeSlug?: string
}) {
  const [category, setCategory] = useState<FooterCategory | "all">("all")
  const [theme, setTheme] = useState<PreviewTheme>("system")

  const entries = useMemo(
    () =>
      FOOTER_CATALOG.filter((entry) => (category === "all" ? true : entry.category === category)),
    [category],
  )

  return (
    <div className="space-y-8">
      <div className="sticky top-16 z-20 -mx-4 space-y-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-sm sm:-mx-10 sm:px-10">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Footer categories">
          {FOOTER_CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={category === item.id}
              onClick={() => setCategory(item.id)}
              className={cn(
                "h-8 rounded-full border px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                category === item.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Preview theme">
          {(
            [
              { id: "system", label: "System", icon: Monitor },
              { id: "light", label: "Light", icon: Sun },
              { id: "dark", label: "Dark", icon: Moon },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={theme === item.id}
              onClick={() => setTheme(item.id)}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                theme === item.id
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="size-3.5" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-16">
        {entries.map((entry) => (
          <FooterPreviewCard
            key={entry.slug}
            slug={entry.slug}
            title={entry.title}
            useCase={entry.useCase}
            cli={entry.cli}
            componentName={entry.componentName}
            theme={theme}
            highlighted={activeSlug === entry.slug}
          />
        ))}
      </div>
    </div>
  )
}

export default FooterGallery
