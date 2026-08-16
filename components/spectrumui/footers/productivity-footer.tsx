"use client"

import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterBrandLink,
  FooterLegalBar,
  FooterReveal,
  FooterSocialLinks,
  ResponsiveNavGroup,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, SpectrumFooterProps } from "./types"

export interface ProductivityFooterProps extends SpectrumFooterProps {
  integrations?: { name: string; href: string }[]
  useCases?: { title: string; description: string; href: string }[]
}

const BRAND: FooterBrand = {
  name: "Orbit",
  href: "#",
  tagline: "The workspace that stays out of the way",
}

const INTEGRATIONS = [
  { name: "Slack", href: "#slack" },
  { name: "Linear", href: "#linear" },
  { name: "Figma", href: "#figma" },
  { name: "GitHub", href: "#github" },
  { name: "Notion", href: "#notion" },
  { name: "Drive", href: "#drive" },
  { name: "Zoom", href: "#zoom" },
  { name: "Okta", href: "#okta" },
]

const USE_CASES = [
  {
    title: "Product teams",
    description: "Specs, decisions, and launch checklists in one timeline.",
    href: "#product",
  },
  {
    title: "Operations",
    description: "SOPs that stay current because they live next to the work.",
    href: "#ops",
  },
  {
    title: "Agencies",
    description: "Client rooms with permissions that finance can actually audit.",
    href: "#agencies",
  },
]

const GROUPS: FooterNavGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Templates", href: "#templates" },
      { label: "Pricing", href: "#pricing" },
      { label: "Security", href: "#security" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Customers", href: "#customers" },
      { label: "Careers", href: "#careers" },
      { label: "Blog", href: "#blog" },
    ],
  },
]

export function ProductivityFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  integrations = INTEGRATIONS,
  useCases = USE_CASES,
}: ProductivityFooterProps) {
  return (
    <footer className={cn("border-t border-border bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <FooterBrandLink brand={brand} />
          <p className="text-xs text-muted-foreground">Works with the tools your team already signed.</p>
        </FooterReveal>

        <FooterReveal delay={0.04}>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Integrations">
            {integrations.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="inline-flex h-10 items-center rounded-full border border-border bg-muted/40 px-3.5 text-sm text-muted-foreground transition-all hover:border-foreground/30 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </FooterReveal>

        <FooterReveal delay={0.08}>
          <ul className="mt-10 grid gap-3 md:grid-cols-3">
            {useCases.map((item) => (
              <li key={item.title}>
                <a
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-border/80 bg-linear-to-br from-muted/50 to-background p-5 transition-colors hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm">
                    View playbook
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </FooterReveal>

        <nav aria-label="Orbit" className="mt-12 grid gap-2 sm:grid-cols-2 sm:gap-8">
          {groups.map((group) => (
            <ResponsiveNavGroup key={group.title} group={group} />
          ))}
        </nav>

        <div className="mt-8">
          <FooterSocialLinks socials={socials} />
        </div>
        <FooterLegalBar copyright={defaultCopyright(brand.name, copyright)} legal={legal} />
      </div>
    </footer>
  )
}

export default ProductivityFooter
