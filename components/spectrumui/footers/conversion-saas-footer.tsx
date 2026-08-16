"use client"

import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterBrandLink,
  FooterLegalBar,
  FooterNewsletter,
  FooterReveal,
  FooterSocialLinks,
  FooterTextLink,
  defaultCopyright,
} from "./primitives"
import type {
  FooterBrand,
  FooterCtaConfig,
  FooterNavGroup,
  FooterNewsletterConfig,
  SpectrumFooterProps,
} from "./types"

export interface ConversionSaasFooterProps extends SpectrumFooterProps {
  cta?: FooterCtaConfig
  newsletter?: FooterNewsletterConfig
}

const BRAND: FooterBrand = {
  name: "Lumen",
  href: "#",
  tagline: "Customer messaging for growing teams",
}

const CTA: FooterCtaConfig = {
  eyebrow: "Start shipping",
  title: "Give your team a calmer inbox this quarter.",
  description: "14-day trial. No card. Migrate from your current tool when you’re ready.",
  primaryLabel: "Start free trial",
  primaryHref: "#trial",
  secondaryLabel: "Book a demo",
  secondaryHref: "#demo",
}

const NEWSLETTER: FooterNewsletterConfig = {
  title: "Product notes",
  description: "One email a month. Shipping notes, not a digest of everyone else’s blog.",
  submitLabel: "Get notes",
  placeholder: "karen.d@example.net",
  successMessage: "You’re on the product notes list.",
}

const GROUPS: FooterNavGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Inbox", href: "#inbox" },
      { label: "Automations", href: "#automations" },
      { label: "Reporting", href: "#reporting" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Customers", href: "#customers" },
      { label: "Changelog", href: "#changelog" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
    ],
  },
]

export function ConversionSaasFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  cta = CTA,
  newsletter = NEWSLETTER,
}: ConversionSaasFooterProps) {
  return (
    <footer className={cn("bg-background text-foreground", className)}>
      <div className="border-y border-border bg-muted/30">
        <FooterReveal className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:px-8 lg:py-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{cta.eyebrow}</p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {cta.title}
            </h2>
            {cta.description ? (
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">{cta.description}</p>
            ) : null}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-11 w-full sm:w-auto">
                <a href={cta.primaryHref}>
                  {cta.primaryLabel}
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              {cta.secondaryLabel && cta.secondaryHref ? (
                <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
                  <a href={cta.secondaryHref}>{cta.secondaryLabel}</a>
                </Button>
              ) : null}
            </div>
          </div>
          <FooterNewsletter config={newsletter} variant="stacked" />
        </FooterReveal>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <FooterBrandLink brand={brand} />
          <nav aria-label="Lumen" className="grid grid-cols-2 gap-8 sm:flex sm:gap-16">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{group.title}</p>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterTextLink href={link.href}>{link.label}</FooterTextLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <FooterSocialLinks socials={socials} />
        </div>
        <FooterLegalBar copyright={defaultCopyright(brand.name, copyright)} legal={legal} />
      </div>
    </footer>
  )
}

export default ConversionSaasFooter
