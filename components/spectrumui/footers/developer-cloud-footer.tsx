"use client"

import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterLegalBar,
  FooterReveal,
  FooterSocialLinks,
  FooterTextLink,
  ResponsiveNavGroup,
  StatusDot,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, FooterStatusItem, SpectrumFooterProps } from "./types"

export interface DeveloperCloudFooterProps extends SpectrumFooterProps {
  /** Command shown in the terminal pane */
  prompt?: string
  /** Service status row */
  status?: FooterStatusItem[]
}

const BRAND: FooterBrand = {
  name: "Helix Cloud",
  href: "#",
  tagline: "Compute, networking, and secrets for production teams",
}

const GROUPS: FooterNavGroup[] = [
  {
    title: "Docs",
    links: [
      { label: "Quickstart", href: "#quickstart" },
      { label: "CLI reference", href: "#cli" },
      { label: "SDK catalog", href: "#sdk" },
      { label: "Guides", href: "#guides" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Functions", href: "#functions" },
      { label: "Queues", href: "#queues" },
      { label: "KV", href: "#kv" },
      { label: "Edge network", href: "#edge" },
    ],
  },
  {
    title: "Operate",
    links: [
      { label: "Status", href: "#status" },
      { label: "Incidents", href: "#incidents" },
      { label: "Support", href: "#support" },
      { label: "Trust center", href: "#trust" },
    ],
  },
]

const STATUS: FooterStatusItem[] = [
  { name: "API", status: "operational", detail: "99.99%" },
  { name: "Functions", status: "operational", detail: "12ms" },
  { name: "Edge", status: "degraded", detail: "EU-West" },
]

export function DeveloperCloudFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  prompt = "helix deploy --env production --wait",
  status = STATUS,
}: DeveloperCloudFooterProps) {
  const reduceMotion = useReducedMotion()

  return (
    <footer
      className={cn(
        "dark relative overflow-hidden border-t border-border bg-zinc-950 text-zinc-100",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] lg:gap-14">
          <div className="rounded-xl border border-white/10 bg-black/40 p-5 font-mono shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              <span className="size-2 rounded-full bg-red-400/80" />
              <span className="size-2 rounded-full bg-amber-400/80" />
              <span className="size-2 rounded-full bg-emerald-400/80" />
              <span className="ml-2">{brand.name}</span>
            </div>
            <p className="text-xs text-zinc-500">~/apps/checkout</p>
            <p className="mt-3 text-sm leading-relaxed text-emerald-300">
              <span className="text-zinc-500">$</span> {prompt}
              <span
                className={cn(
                  "ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 bg-emerald-300",
                  reduceMotion ? "opacity-80" : "animate-pulse",
                )}
              />
            </p>
            <p className="mt-4 text-xs leading-relaxed text-zinc-500">
              Deploy preview ready in 18s. Logs stream to helix://status. Replace this prompt with your own CLI.
            </p>
            <a
              href={brand.href ?? "#"}
              className="mt-6 inline-flex text-sm text-zinc-200 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {brand.name}
              {brand.tagline ? <span className="sr-only"> — {brand.tagline}</span> : null}
            </a>
          </div>

          <nav aria-label="Helix Cloud" className="grid gap-2 sm:grid-cols-3 sm:gap-6">
            {groups.map((group) => (
              <ResponsiveNavGroup
                key={group.title}
                group={group}
                className="border-white/10 text-zinc-100 [&_button]:text-zinc-100 [&_h3]:text-zinc-100 [&_a]:text-zinc-400 [&_a:hover]:text-white [&_.border-border]:border-white/10"
              />
            ))}
          </nav>
        </FooterReveal>

        <FooterReveal delay={0.06}>
          <div
            role="status"
            aria-label="Platform status"
            className="mt-10 grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:grid-cols-3"
          >
            {status.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-3 text-sm">
                <span className="inline-flex items-center gap-2">
                  <StatusDot status={item.status} />
                  <span>{item.name}</span>
                </span>
                <span className="font-mono text-xs text-zinc-400">{item.detail}</span>
              </div>
            ))}
          </div>
        </FooterReveal>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <FooterSocialLinks
            socials={socials}
            className="[&_a]:border-white/15 [&_a]:text-zinc-300 [&_a:hover]:text-white"
          />
          <FooterTextLink href="#status" className="text-xs text-zinc-400 hover:text-white">
            View status page
          </FooterTextLink>
        </div>

        <FooterLegalBar
          copyright={defaultCopyright(brand.name, copyright)}
          legal={legal}
          className="border-white/10 text-zinc-500 [&_a]:text-zinc-500 [&_a:hover]:text-zinc-200"
        />
      </div>
    </footer>
  )
}

export default DeveloperCloudFooter
