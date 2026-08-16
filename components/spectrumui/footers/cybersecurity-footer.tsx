"use client"

import { Shield } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterBrandLink,
  FooterGrain,
  FooterLegalBar,
  FooterReveal,
  FooterSocialLinks,
  ResponsiveNavGroup,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, SpectrumFooterProps } from "./types"

export interface CybersecurityFooterProps extends SpectrumFooterProps {
  certifications?: { label: string; detail: string }[]
}

const BRAND: FooterBrand = {
  name: "Sentinel",
  href: "#",
  tagline: "Detection and response for cloud-native teams",
}

const CERTS = [
  { label: "SOC 2 Type II", detail: "Continuous monitoring" },
  { label: "ISO 27001", detail: "Certified 2025" },
  { label: "CSA STAR", detail: "Level 1" },
  { label: "IRAP", detail: "Protected" },
]

const GROUPS: FooterNavGroup[] = [
  {
    title: "Platform",
    links: [
      { label: "Cloud detection", href: "#detect" },
      { label: "Identity threat", href: "#identity" },
      { label: "Vulnerability", href: "#vuln" },
      { label: "Automation", href: "#auto" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Threat reports", href: "#reports" },
      { label: "Status", href: "#status" },
      { label: "Trust center", href: "#trust" },
      { label: "Docs", href: "#docs" },
    ],
  },
]

export function CybersecurityFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  certifications = CERTS,
}: CybersecurityFooterProps) {
  return (
    <footer className={cn("dark relative overflow-hidden border-t border-emerald-500/20 bg-zinc-950 text-zinc-50", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_center,rgba(16,185,129,0.55)_0.8px,transparent_1.1px)] [background-size:22px_22px]"
      />
      <FooterGrain className="opacity-25 mix-blend-overlay" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <FooterBrandLink
              brand={brand}
              className="[&_span]:text-zinc-50"
            />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
              Found a vulnerability in Sentinel? We run a managed disclosure program with published SLAs.
            </p>
            <Button asChild className="mt-6 w-full bg-emerald-400 text-zinc-950 hover:bg-emerald-300 sm:w-auto">
              <a href="#disclosure">Report a vulnerability</a>
            </Button>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
              <Shield className="size-3.5" />
              Trust marks
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {certifications.map((item) => (
                <li key={item.label} className="rounded-lg border border-white/10 px-3 py-3">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-zinc-400">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </FooterReveal>

        <nav aria-label="Sentinel" className="mt-12 grid gap-2 sm:grid-cols-2 sm:gap-8">
          {groups.map((group) => (
            <ResponsiveNavGroup
              key={group.title}
              group={group}
              className="border-white/10 [&_a]:text-zinc-400 [&_a:hover]:text-white [&_button]:text-zinc-50 [&_h3]:text-zinc-50"
            />
          ))}
        </nav>

        <div className="mt-8">
          <FooterSocialLinks
            socials={socials}
            className="[&_a]:border-white/15 [&_a]:text-zinc-300 [&_a:hover]:text-white"
          />
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

export default CybersecurityFooter
