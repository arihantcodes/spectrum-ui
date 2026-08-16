"use client"

import { ArrowRight, Building2, Factory, Globe2, Layers3, Newspaper } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterBrandLink,
  FooterGrain,
  FooterGrid,
  FooterLegalBar,
  FooterReveal,
  FooterSocialLinks,
  FooterTextLink,
  ResponsiveNavGroup,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, SpectrumFooterProps } from "./types"

export interface EnterpriseGridFooterProps extends SpectrumFooterProps {
  /** Featured product or solution card in the first column */
  featured?: {
    eyebrow?: string
    title: string
    description: string
    href: string
    label: string
  }
}

const BRAND: FooterBrand = {
  name: "Northstar",
  href: "#",
  tagline: "Operations software for global teams",
}

const GROUPS: FooterNavGroup[] = [
  {
    title: "Platform",
    links: [
      { label: "Workforce Graph", href: "#workforce", description: "Org, identity, and access in one model" },
      { label: "Workflow Studio", href: "#studio", badge: "New" },
      { label: "Analytics Cloud", href: "#analytics" },
      { label: "Audit Trail", href: "#audit" },
      { label: "Admin Center", href: "#admin" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Finance operations", href: "#finance", icon: Building2 },
      { label: "Supply chain", href: "#supply", icon: Factory },
      { label: "Customer platforms", href: "#cx", icon: Globe2 },
      { label: "IT and security", href: "#it", icon: Layers3 },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Manufacturing", href: "#manufacturing" },
      { label: "Financial services", href: "#fs" },
      { label: "Healthcare systems", href: "#health" },
      { label: "Public sector", href: "#public" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Customer stories", href: "#stories", icon: Newspaper },
      { label: "Security overview", href: "#security" },
      { label: "Architecture guides", href: "#guides" },
      { label: "Events", href: "#events" },
      { label: "Help center", href: "#help" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers", badge: "Hiring" },
      { label: "Newsroom", href: "#news" },
      { label: "Contact", href: "#contact" },
    ],
  },
]

const FEATURED = {
  eyebrow: "Platform",
  title: "Northstar Control",
  description: "The operating system for multi-entity companies. Policy, workflow, and reporting on one graph.",
  href: "#control",
  label: "Explore Control",
}

export function EnterpriseGridFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  featured = FEATURED,
}: EnterpriseGridFooterProps) {
  return (
    <footer className={cn("relative overflow-hidden border-t border-border bg-background text-foreground motion-reduce:transition-none", className)}>
      <FooterGrid className="opacity-70" />
      <FooterGrain className="opacity-20" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-6 lg:col-span-3">
            <FooterBrandLink brand={brand} />
            <a
              href={featured.href}
              className="group relative overflow-hidden rounded-2xl border border-border/80 bg-linear-to-br from-muted/80 to-background p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-colors hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-foreground/5 blur-2xl transition-opacity group-hover:opacity-100"
              />
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {featured.eyebrow}
              </p>
              <p className="mt-2 font-spectral text-xl tracking-tight">{featured.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{featured.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                {featured.label}
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </a>
            <Button asChild className="w-full sm:w-auto lg:w-full">
              <a href="#contact">Talk to sales</a>
            </Button>
          </div>

          <nav aria-label="Northstar directories" className="grid gap-2 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-5 lg:gap-6">
            {groups.map((group, index) => (
              <div key={group.title} className="relative">
                <span className="mb-2 hidden font-mono text-[10px] tabular-nums text-muted-foreground/70 lg:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ResponsiveNavGroup group={group} />
              </div>
            ))}
          </nav>
        </FooterReveal>

        <FooterReveal delay={0.08} className="mt-10 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <FooterSocialLinks socials={socials} />
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
            Northstar is a fictional enterprise platform used to demonstrate Spectrum UI footers. Replace this copy with your own legal entity details.
          </p>
        </FooterReveal>

        <FooterLegalBar copyright={defaultCopyright(brand.name, copyright)} legal={legal} className="mt-8">
          <FooterTextLink href="#status" className="text-xs">
            System status
          </FooterTextLink>
        </FooterLegalBar>
      </div>
    </footer>
  )
}

export default EnterpriseGridFooter
