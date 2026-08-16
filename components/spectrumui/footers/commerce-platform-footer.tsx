"use client"

import { Store } from "lucide-react"

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
  ResponsiveNavGroup,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, SpectrumFooterProps } from "./types"

export interface CommercePlatformFooterProps extends SpectrumFooterProps {
  categories?: { label: string; href: string }[]
}

const BRAND: FooterBrand = {
  name: "Harbor Commerce",
  href: "#",
  tagline: "The operating system for independent retail",
}

const CATEGORIES = [
  { label: "Apparel", href: "#apparel" },
  { label: "Home", href: "#home" },
  { label: "Beauty", href: "#beauty" },
  { label: "Food", href: "#food" },
  { label: "Electronics", href: "#electronics" },
  { label: "Outdoor", href: "#outdoor" },
  { label: "Kids", href: "#kids" },
  { label: "Craft", href: "#craft" },
  { label: "Wellness", href: "#wellness" },
  { label: "Books", href: "#books" },
]

const GROUPS: FooterNavGroup[] = [
  {
    title: "Shop",
    links: [
      { label: "New arrivals", href: "#new" },
      { label: "Gift guides", href: "#gifts" },
      { label: "Editorial", href: "#editorial" },
      { label: "Order status", href: "#orders" },
    ],
  },
  {
    title: "Sell",
    links: [
      { label: "Open a store", href: "#sell" },
      { label: "Fees", href: "#fees" },
      { label: "Payouts", href: "#payouts" },
      { label: "Seller handbook", href: "#handbook" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "#help" },
      { label: "Returns", href: "#returns" },
      { label: "Safety", href: "#safety" },
      { label: "Contact", href: "#contact" },
    ],
  },
]

export function CommercePlatformFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  categories = CATEGORIES,
}: CommercePlatformFooterProps) {
  return (
    <footer className={cn("border-t border-border bg-[#FAF7F2] text-foreground dark:bg-background", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <FooterBrandLink brand={brand} />
          <Button asChild className="w-full sm:w-auto">
            <a href="#sell">
              <Store className="size-4" />
              Start selling
            </a>
          </Button>
        </FooterReveal>

        <FooterReveal delay={0.04}>
          <nav aria-label="Shop categories" className="mt-10">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Browse</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <li key={category.label}>
                  <a
                    href={category.href}
                    className="inline-flex h-9 items-center rounded-full border border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {category.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </FooterReveal>

        <nav aria-label="Harbor Commerce" className="mt-12 grid gap-2 sm:grid-cols-3 sm:gap-8">
          {groups.map((group) => (
            <ResponsiveNavGroup key={group.title} group={group} />
          ))}
        </nav>

        <FooterReveal delay={0.08}>
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-border bg-background px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">Buyer protection on every eligible order. Seller payouts on a two-day schedule.</p>
            <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {["Visa", "Mastercard", "Shop Pay", "Apple Pay"].map((mark) => (
                <span
                  key={mark}
                  className="rounded-md border border-foreground/15 bg-linear-to-b from-background to-muted/60 px-2.5 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
                >
                  {mark}
                </span>
              ))}
            </div>
          </div>
        </FooterReveal>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FooterSocialLinks socials={socials} />
          <FooterTextLink href="#app" className="text-xs">
            Get the Harbor app
          </FooterTextLink>
        </div>
        <FooterLegalBar copyright={defaultCopyright(brand.name, copyright)} legal={legal} />
      </div>
    </footer>
  )
}

export default CommercePlatformFooter
