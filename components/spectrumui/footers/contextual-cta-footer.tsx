"use client"

import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterBrandLink,
  FooterLegalBar,
  FooterReveal,
  FooterSocialLinks,
  FooterTextLink,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterCtaConfig, FooterNavGroup, SpectrumFooterProps } from "./types"

export interface ContextualCtaFooterProps extends SpectrumFooterProps {
  cta?: FooterCtaConfig
}

const BRAND: FooterBrand = {
  name: "Beacon",
  href: "#",
}

const CTA: FooterCtaConfig = {
  eyebrow: "Ready when you are",
  title: "Put Beacon in front of the next launch.",
  description: "Join the teams using Beacon to keep launch checklists, approvals, and status in one place.",
  primaryLabel: "Start a workspace",
  primaryHref: "#start",
  secondaryLabel: "See a 3-minute tour",
  secondaryHref: "#tour",
}

const LINKS: FooterNavGroup[] = [
  {
    title: "Footer",
    links: [
      { label: "Product", href: "#product" },
      { label: "Pricing", href: "#pricing" },
      { label: "Customers", href: "#customers" },
      { label: "Docs", href: "#docs" },
    ],
  },
]

export function ContextualCtaFooter({
  brand = BRAND,
  groups = LINKS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  cta = CTA,
}: ContextualCtaFooterProps) {
  const links = groups.flatMap((group) => group.links)

  return (
    <footer className={cn("bg-background text-foreground", className)}>
      <section className="relative overflow-hidden bg-foreground text-background">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-0 size-[22rem] rounded-full bg-background/10 blur-3xl"
        />
        <FooterReveal className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-background/60">{cta.eyebrow}</p>
            <h2 className="mt-3 max-w-xl font-spectral text-4xl font-medium tracking-tight text-balance sm:text-5xl">
              {cta.title}
            </h2>
            {cta.description ? (
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/70">{cta.description}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-3">
            <Button asChild className="h-12 w-full bg-background text-foreground hover:bg-background/90">
              <a href={cta.primaryHref}>
                {cta.primaryLabel}
                <ArrowRight className="size-4" />
              </a>
            </Button>
            {cta.secondaryLabel && cta.secondaryHref ? (
              <Button
                asChild
                variant="outline"
                className="h-12 w-full border-background/20 bg-transparent text-background hover:bg-background/10 hover:text-background"
              >
                <a href={cta.secondaryHref}>{cta.secondaryLabel}</a>
              </Button>
            ) : null}
          </div>
        </FooterReveal>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FooterBrandLink brand={brand} />
          <nav aria-label="Beacon" className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((link) => (
              <FooterTextLink key={link.label} href={link.href} className="text-sm">
                {link.label}
              </FooterTextLink>
            ))}
          </nav>
          <FooterSocialLinks socials={socials} />
        </div>
        <FooterLegalBar copyright={defaultCopyright(brand.name, copyright)} legal={legal} className="pt-4" />
      </div>
    </footer>
  )
}

export default ContextualCtaFooter
