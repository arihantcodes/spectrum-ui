"use client"

import { useMemo, useState, type CSSProperties } from "react"
import Link from "next/link"
import { Monitor, Moon, Smartphone, Sun, Tablet } from "lucide-react"

import Copy from "@/components/copy"
import { cn } from "@/lib/utils"
import { FOOTER_CATALOG, FOOTER_CATEGORIES } from "./catalog"
import { FOOTER_COMPONENTS } from "./component-map"
import { FOOTER_SOURCE } from "./footers.source"
import type { FooterCategory } from "./types"

const VIEWPORTS = [
  { id: "full", label: "Full", width: "100%", icon: Monitor },
  { id: "wide", label: "Wide", width: 1440, icon: Monitor },
  { id: "desktop", label: "Desktop", width: 1280, icon: Monitor },
  { id: "laptop", label: "Laptop", width: 1024, icon: Monitor },
  { id: "tablet", label: "Tablet", width: 768, icon: Tablet },
  { id: "mobile", label: "Mobile", width: 375, icon: Smartphone },
] as const

type ViewportId = (typeof VIEWPORTS)[number]["id"]
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
  className,
}: {
  slug: string
  viewport: ViewportId
  theme: PreviewTheme
  className?: string
}) {
  const Footer = FOOTER_COMPONENTS[slug]
  const preset = VIEWPORTS.find((item) => item.id === viewport) ?? VIEWPORTS[0]
  const width = preset.width

  if (!Footer) return null

  return (
    <div className={cn("overflow-x-auto rounded-xl border border-border bg-muted/30", className)}>
      <div
        className={cn("min-w-0", theme === "dark" && "dark")}
        style={{
          width: width === "100%" ? "100%" : width,
          ...(theme === "light" ? LIGHT_VARS : theme === "dark" ? DARK_VARS : {}),
        }}
      >
        <div className="bg-background text-foreground">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export function FooterGallery({
  activeSlug,
}: {
  activeSlug?: string
}) {
  const [category, setCategory] = useState<FooterCategory | "all">("all")
  const [viewport, setViewport] = useState<ViewportId>("full")
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
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-1" role="group" aria-label="Preview width">
            {VIEWPORTS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={viewport === item.id}
                onClick={() => setViewport(item.id)}
                className={cn(
                  "inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  viewport === item.id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className="size-3.5" />
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1" role="group" aria-label="Preview theme">
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
      </div>

      <div className="space-y-16">
        {entries.map((entry) => (
          <section
            key={entry.slug}
            id={entry.slug}
            className={cn("scroll-mt-36", activeSlug === entry.slug && "ring-1 ring-ring/40 rounded-2xl")}
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-base font-medium tracking-tight">{entry.title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {entry.useCase}
                </p>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                  npx shadcn@latest add @spectrumui/{entry.cli}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Copy content={FOOTER_SOURCE[entry.componentName] ?? ""} />
                <Link
                  href={`/docs/footer/${entry.slug}`}
                  className="inline-flex h-8 items-center rounded-md border border-border px-3 text-xs font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Open
                </Link>
              </div>
            </div>
            <FooterPreviewFrame slug={entry.slug} viewport={viewport} theme={theme} />
          </section>
        ))}
      </div>
    </div>
  )
}

export default FooterGallery
