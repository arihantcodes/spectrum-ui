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
import type { FooterBrand, SpectrumFooterProps } from "./types"

export interface MarketplaceFooterProps extends SpectrumFooterProps {
  categories?: { label: string; href: string; count: string }[]
  community?: { label: string; href: string }[]
}

const BRAND: FooterBrand = {
  name: "Bazaar",
  href: "#",
  tagline: "A marketplace for independent specialists",
}

const CATEGORIES = [
  { label: "Brand design", href: "#brand", count: "1.2k" },
  { label: "Product design", href: "#product", count: "980" },
  { label: "Engineering", href: "#eng", count: "2.4k" },
  { label: "Research", href: "#research", count: "410" },
  { label: "Writing", href: "#writing", count: "760" },
  { label: "Motion", href: "#motion", count: "330" },
]

const COMMUNITY = [
  { label: "Forum", href: "#forum" },
  { label: "Events", href: "#events" },
  { label: "Guides", href: "#guides" },
  { label: "Trust & safety", href: "#trust" },
]

export function MarketplaceFooter({
  brand = BRAND,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  categories = CATEGORIES,
  community = COMMUNITY,
}: MarketplaceFooterProps) {
  return (
    <footer className={cn("border-t border-border bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <FooterBrandLink brand={brand} />
          <Button asChild className="w-full sm:w-auto">
            <a href="#sell">
              Become a seller
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </FooterReveal>

        <FooterReveal delay={0.05}>
          <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {categories.map((category, index) => {
              const tints = [
                "bg-[#FFF7ED] dark:bg-orange-500/10",
                "bg-[#F0FDF4] dark:bg-emerald-500/10",
                "bg-[#EFF6FF] dark:bg-sky-500/10",
                "bg-[#FDF4FF] dark:bg-fuchsia-500/10",
                "bg-[#F8FAFC] dark:bg-white/5",
                "bg-[#FEF2F2] dark:bg-red-500/10",
              ]
              return (
              <li key={category.label} className={index === 0 ? "col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
                <a
                  href={category.href}
                  className={cn(
                    "group flex h-full flex-col justify-between rounded-2xl border border-border/80 p-4 transition-transform hover:-translate-y-0.5 hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    tints[index % tints.length],
                    index === 0 && "min-h-36 lg:min-h-full",
                  )}
                >
                  <span className="text-sm font-medium sm:text-base">{category.label}</span>
                  <span className="mt-6 font-mono text-xs text-muted-foreground">{category.count} listings</span>
                </a>
              </li>
              )
            })}
          </ul>
        </FooterReveal>

        <nav aria-label="Community" className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
          {community.map((item) => (
            <FooterTextLink key={item.label} href={item.href}>
              {item.label}
            </FooterTextLink>
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

export default MarketplaceFooter
