"use client"

import { cn } from "@/lib/utils"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterBrandLink,
  FooterLegalBar,
  FooterLinkList,
  FooterNewsletter,
  FooterReveal,
  FooterSocialLinks,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, FooterNewsletterConfig, SpectrumFooterProps } from "./types"

export interface BentoFooterProps extends SpectrumFooterProps {
  newsletter?: FooterNewsletterConfig
}

const BRAND: FooterBrand = {
  name: "Mosaic",
  href: "#",
  tagline: "Modular software for operators",
}

const GROUPS: FooterNavGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "#overview" },
      { label: "Integrations", href: "#integrations" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Blog", href: "#blog" },
    ],
  },
]

const NEWSLETTER: FooterNewsletterConfig = {
  title: "Release notes",
  description: "Short, useful, monthly.",
  submitLabel: "Join",
  successMessage: "You’re subscribed to Mosaic notes.",
}

export function BentoFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  newsletter = NEWSLETTER,
}: BentoFooterProps) {
  return (
    <footer className={cn("border-t border-border bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <FooterReveal className="grid auto-rows-fr gap-3 md:grid-cols-6 md:grid-rows-2">
          <div className="rounded-3xl border border-border bg-foreground p-6 text-background md:col-span-2 md:row-span-2">
            <FooterBrandLink
              brand={brand}
              className="[&_span]:text-background [&_.bg-foreground]:bg-background [&_.text-background]:text-foreground"
            />
            <p className="mt-4 text-sm leading-relaxed text-background/70">
              Mosaic is a fictional product used to show a footer as a set of modules instead of columns.
            </p>
            <FooterSocialLinks
              socials={socials}
              className="mt-8 [&_a]:border-background/20 [&_a]:text-background [&_a:hover]:bg-background [&_a:hover]:text-foreground"
            />
          </div>

          <div className="rounded-3xl border border-border bg-muted/40 p-6 md:col-span-2">
            <FooterNewsletter config={newsletter} variant="stacked" />
          </div>

          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="rounded-3xl border border-border p-6 md:col-span-1">
              <h3 className="text-sm font-medium">{group.title}</h3>
              <FooterLinkList links={group.links} className="mt-3" />
            </nav>
          ))}

          <div className="rounded-3xl border border-border p-6 md:col-span-2">
            <FooterLegalBar
              copyright={defaultCopyright(brand.name, copyright)}
              legal={legal}
              className="border-0 pt-0 sm:flex-col sm:items-start"
            />
          </div>
        </FooterReveal>
      </div>
    </footer>
  )
}

export default BentoFooter
