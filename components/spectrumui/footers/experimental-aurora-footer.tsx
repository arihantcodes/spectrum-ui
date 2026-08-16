"use client"

import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterBrandLink,
  FooterGrain,
  FooterLegalBar,
  FooterReveal,
  FooterSocialLinks,
  FooterTextLink,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, SpectrumFooterProps } from "./types"

export interface ExperimentalAuroraFooterProps extends SpectrumFooterProps {}

const BRAND: FooterBrand = {
  name: "Veil",
  href: "#",
  tagline: "Private collaboration for executive teams",
}

const GROUPS: FooterNavGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "#platform" },
      { label: "Security", href: "#security" },
      { label: "Customers", href: "#customers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Journal", href: "#journal" },
      { label: "Contact", href: "#contact" },
    ],
  },
]

export function ExperimentalAuroraFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
}: ExperimentalAuroraFooterProps) {
  const reduceMotion = useReducedMotion()

  return (
    <footer className={cn("relative overflow-hidden border-t border-border bg-background text-foreground", className)}>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -left-24 top-0 size-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),transparent_65%)] blur-2xl",
          !reduceMotion && "motion-safe:animate-[aurora-drift_18s_ease-in-out_infinite]",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-16 bottom-0 size-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.16),transparent_65%)] blur-2xl",
          !reduceMotion && "motion-safe:animate-[aurora-drift_22s_ease-in-out_infinite_reverse]",
        )}
      />

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-1/2 top-8 size-[22rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.16),transparent_65%)] blur-2xl",
          !reduceMotion && "motion-safe:animate-[aurora-drift_26s_ease-in-out_infinite]",
        )}
      />
      <FooterGrain className="opacity-30" />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6">
        <FooterReveal className="w-full rounded-3xl border border-border/70 bg-background/55 px-8 py-10 shadow-[0_20px_80px_rgba(15,15,15,0.06)] backdrop-blur-md">
          <FooterBrandLink brand={brand} className="justify-center" />
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            A quieter last viewport. Veil is a fictional brand — keep the atmosphere, replace the copy.
          </p>

        <nav aria-label="Veil" className="mt-10 grid w-full gap-8 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{group.title}</p>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterTextLink href={link.href}>{link.label}</FooterTextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-10">
          <FooterSocialLinks socials={socials} className="justify-center" />
        </div>
        <FooterLegalBar
          copyright={defaultCopyright(brand.name, copyright)}
          legal={legal}
          className="w-full items-center sm:flex-col"
        />
        </FooterReveal>
      </div>
      <style>{`
        @keyframes aurora-drift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(4%, 6%, 0); }
        }
      `}</style>
    </footer>
  )
}

export default ExperimentalAuroraFooter
