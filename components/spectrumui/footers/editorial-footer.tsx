"use client"

import { ArrowUpRight } from "lucide-react"

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
  defaultCopyright,
} from "./primitives"
import type { FooterArticle, FooterBrand, FooterNavGroup, SpectrumFooterProps } from "./types"

export interface EditorialFooterProps extends SpectrumFooterProps {
  featured?: FooterArticle
  articles?: FooterArticle[]
}

const BRAND: FooterBrand = {
  name: "Folio",
  href: "#",
  tagline: "Reports and briefings for operators",
}

const FEATURED: FooterArticle = {
  title: "The 2026 operating model for distributed product teams",
  href: "#featured",
  category: "Report",
  date: "12 Aug 2026",
  excerpt: "How 40 companies redesigned planning, staffing, and review cycles after two years of tool sprawl.",
}

const ARTICLES: FooterArticle[] = [
  {
    title: "What finance actually wants from product analytics",
    href: "#analytics",
    category: "Briefing",
    date: "02 Aug 2026",
  },
  {
    title: "A practical guide to vendor concentration risk",
    href: "#vendor",
    category: "Guide",
    date: "21 Jul 2026",
  },
  {
    title: "Field notes from three failed platform migrations",
    href: "#migrations",
    category: "Field notes",
    date: "09 Jul 2026",
  },
]

const GROUPS: FooterNavGroup[] = [
  {
    title: "Topics",
    links: [
      { label: "Operations", href: "#ops" },
      { label: "Security", href: "#security" },
      { label: "People", href: "#people" },
      { label: "Markets", href: "#markets" },
    ],
  },
  {
    title: "Library",
    links: [
      { label: "Reports", href: "#reports" },
      { label: "Newsletters", href: "#newsletters" },
      { label: "Events", href: "#events" },
      { label: "Archive", href: "#archive" },
    ],
  },
]

export function EditorialFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  featured = FEATURED,
  articles = ARTICLES,
}: EditorialFooterProps) {
  return (
    <footer className={cn("border-t border-foreground/20 bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="flex items-end justify-between gap-6 border-b border-foreground/15 pb-6">
          <div>
            <p className="font-serif text-3xl tracking-tight sm:text-4xl">{brand.name}</p>
            {brand.tagline ? <p className="mt-1 text-sm text-muted-foreground">{brand.tagline}</p> : null}
          </div>
          <FooterBrandLink brand={{ ...brand, tagline: undefined }} className="hidden sm:inline-flex" />
        </FooterReveal>

        <FooterReveal delay={0.05} className="mt-10 grid gap-10 lg:grid-cols-12">
          <a
            href={featured.href}
            className="group lg:col-span-6"
          >
            <div className="overflow-hidden rounded-sm border border-foreground/10">
              <div className="h-40 bg-linear-to-br from-foreground/90 to-foreground/30 transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]" />
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {featured.category} · {featured.date}
            </p>
            <h2 className="mt-2 font-serif text-2xl leading-snug tracking-tight group-hover:underline group-hover:underline-offset-4">
              {featured.title}
            </h2>
            {featured.excerpt ? (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
            ) : null}
          </a>

          <div className="lg:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Recent</p>
            <ul className="mt-4 divide-y divide-foreground/10">
              {articles.map((article) => (
                <li key={article.href} className="py-3 first:pt-0">
                  <a href={article.href} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {article.category} · {article.date}
                    </p>
                    <p className="mt-1 text-sm leading-snug group-hover:underline group-hover:underline-offset-4">
                      {article.title}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Folio library" className="lg:col-span-3">
            {groups.map((group) => (
              <ResponsiveNavGroup key={group.title} group={group} className="md:mb-6" />
            ))}
          </nav>
        </FooterReveal>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <FooterSocialLinks socials={socials} />
          <FooterTextLink href="#subscribe" className="text-sm">
            Subscribe to the Sunday briefing
            <ArrowUpRight className="size-3.5" />
          </FooterTextLink>
        </div>
        <FooterLegalBar copyright={defaultCopyright(brand.name, copyright)} legal={legal} />
      </div>
    </footer>
  )
}

export default EditorialFooter
