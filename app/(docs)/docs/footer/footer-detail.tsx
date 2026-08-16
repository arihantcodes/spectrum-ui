"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import Copy from "@/components/copy"
import { PropsTable } from "@/app/(docs)/docs/components/props-table/props-table"
import { FooterGallery, FooterPreviewFrame } from "@/components/spectrumui/footers/gallery"
import { getFooterBySlug } from "@/components/spectrumui/footers/catalog"
import { FOOTER_SOURCE } from "@/components/spectrumui/footers/footers.source"
import { useState } from "react"

export function FooterDetail({ slug }: { slug: string }) {
  const entry = getFooterBySlug(slug)
  const [viewport, setViewport] = useState<"full" | "tablet" | "mobile">("full")
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system")

  if (!entry) return null

  return (
    <div className="space-y-10">
      <Link
        href="/docs/footer"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All footers
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {entry.category}
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight">{entry.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{entry.useCase}</p>
        </div>
        <Copy content={FOOTER_SOURCE[entry.componentName] ?? ""} />
      </div>

      <div className="flex flex-wrap gap-2">
        {(["full", "tablet", "mobile"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setViewport(id)}
            className={`h-8 rounded-md border px-3 text-xs capitalize ${
              viewport === id ? "border-foreground bg-foreground text-background" : "border-border"
            }`}
          >
            {id}
          </button>
        ))}
        {(["system", "light", "dark"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTheme(id)}
            className={`h-8 rounded-md border px-3 text-xs capitalize ${
              theme === id ? "border-foreground bg-foreground text-background" : "border-border"
            }`}
          >
            {id}
          </button>
        ))}
      </div>

      <FooterPreviewFrame slug={entry.slug} viewport={viewport} theme={theme} />

      <section>
        <h2 className="text-lg font-medium">Installation</h2>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-sm">
          <code>npx shadcn@latest add @spectrumui/{entry.cli}</code>
        </pre>
        <p className="mt-3 text-sm text-muted-foreground">
          Dependencies: {entry.dependencies.join(", ")}. Also copies{" "}
          <code>footer-primitives</code> for shared types and controls.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-medium">Layout</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.layout}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Mobile</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.mobile}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Motion</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.motion}</p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Information architecture</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {entry.informationArchitecture}
          </p>
        </div>
      </section>

      <PropsTable
        title="Properties"
        props={entry.props.map((prop) => ({
          prop: prop.name,
          type: prop.type,
          required: Boolean(prop.required),
          default: prop.defaultValue,
          description: prop.description,
        }))}
      />

      <section>
        <h2 className="mb-6 text-lg font-medium">More footers</h2>
        <FooterGallery activeSlug={entry.slug} />
      </section>
    </div>
  )
}
