"use client"

import { cn } from "@/lib/utils"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterBrandLink,
  FooterLegalBar,
  FooterReveal,
  FooterSocialLinks,
  FooterTextLink,
  ResponsiveNavGroup,
  StatusDot,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, FooterStatusItem, SpectrumFooterProps } from "./types"

export interface CloudStatusFooterProps extends SpectrumFooterProps {
  services?: FooterStatusItem[]
  incidentHref?: string
}

const BRAND: FooterBrand = {
  name: "Nimbus",
  href: "#",
  tagline: "Managed cloud for regulated workloads",
}

const SERVICES: FooterStatusItem[] = [
  { name: "Compute", status: "operational", detail: "us-east, eu-west" },
  { name: "Object storage", status: "operational", detail: "99.999%" },
  { name: "Managed Postgres", status: "maintenance", detail: "eu-central window" },
  { name: "Observability", status: "operational", detail: "all regions" },
  { name: "Identity", status: "degraded", detail: "SSO latency" },
  { name: "Networking", status: "operational", detail: "anycast healthy" },
]

const GROUPS: FooterNavGroup[] = [
  {
    title: "Platform",
    links: [
      { label: "Products", href: "#products" },
      { label: "Regions", href: "#regions" },
      { label: "Pricing", href: "#pricing" },
      { label: "Docs", href: "#docs" },
    ],
  },
]

export function CloudStatusFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  services = SERVICES,
  incidentHref = "#incidents",
}: CloudStatusFooterProps) {
  return (
    <footer className={cn("border-t border-border bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <FooterBrandLink brand={brand} />
          <FooterTextLink href={incidentHref} className="text-sm">
            Incident history
          </FooterTextLink>
        </FooterReveal>

        <FooterReveal delay={0.05}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-medium">Service status</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Live</p>
            </div>
            <ul>
              {services.map((service) => (
                <li
                  key={service.name}
                  className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 last:border-0 hover:bg-muted/40"
                >
                  <span className="inline-flex items-center gap-3 text-sm">
                    <StatusDot status={service.status} />
                    {service.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{service.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </FooterReveal>

        <nav aria-label="Nimbus" className="mt-10">
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

export default CloudStatusFooter
