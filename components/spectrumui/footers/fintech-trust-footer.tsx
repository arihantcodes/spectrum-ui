"use client"

import { Lock, ShieldCheck } from "lucide-react"

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

export interface FintechTrustFooterProps extends SpectrumFooterProps {
  badges?: { label: string; detail: string }[]
  disclaimer?: string
}

const BRAND: FooterBrand = {
  name: "Meridian Pay",
  href: "#",
  tagline: "Treasury and payouts for regulated businesses",
}

const GROUPS: FooterNavGroup[] = [
  {
    title: "Products",
    links: [
      { label: "Payouts", href: "#payouts" },
      { label: "Treasury", href: "#treasury" },
      { label: "Issuing", href: "#issuing" },
      { label: "FX", href: "#fx" },
    ],
  },
  {
    title: "Security",
    links: [
      { label: "Trust center", href: "#trust" },
      { label: "Penetration tests", href: "#pentest" },
      { label: "Responsible disclosure", href: "#disclosure" },
      { label: "Subprocessors", href: "#subprocessors" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Licenses", href: "#licenses" },
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
      { label: "Complaints", href: "#complaints" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Press", href: "#press" },
      { label: "Contact", href: "#contact" },
    ],
  },
]

const BADGES = [
  { label: "SOC 2 Type II", detail: "Audited annually" },
  { label: "PCI DSS", detail: "Level 1" },
  { label: "ISO 27001", detail: "Certified" },
  { label: "GDPR", detail: "EU processing" },
]

const DISCLAIMER =
  "Meridian Pay is a fictional financial technology brand for demonstration. It is not a bank. In a production footer, replace this strip with your actual licenses, FBO language, and jurisdictional disclosures."

export function FintechTrustFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  badges = BADGES,
  disclaimer = DISCLAIMER,
}: FintechTrustFooterProps) {
  return (
    <footer className={cn("border-t-2 border-foreground/15 bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <FooterReveal>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {badges.map((badge) => (
              <li
                key={badge.label}
                className="flex items-start gap-3 rounded-lg border border-foreground/10 bg-muted/30 px-3 py-3"
              >
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-foreground" aria-hidden />
                <span>
                  <span className="block text-sm font-medium">{badge.label}</span>
                  <span className="text-xs text-muted-foreground">{badge.detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </FooterReveal>

        <FooterReveal delay={0.05} className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.6fr]">
          <div>
            <FooterBrandLink brand={brand} />
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
              <Lock className="mt-0.5 size-4 shrink-0" aria-hidden />
              Funds movement, identity, and ledgers are designed for review by security and compliance teams before launch.
            </p>
            <FooterSocialLinks socials={socials} className="mt-6" />
          </div>
          <nav aria-label="Meridian Pay" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {groups.map((group) => (
              <ResponsiveNavGroup key={group.title} group={group} />
            ))}
          </nav>
        </FooterReveal>

        <FooterReveal delay={0.08}>
          <p className="mt-12 border-y border-foreground/10 py-5 font-serif text-sm leading-relaxed text-muted-foreground">
            {disclaimer}
          </p>
        </FooterReveal>

        <FooterLegalBar copyright={defaultCopyright(brand.name, copyright)} legal={legal} />
      </div>
    </footer>
  )
}

export default FintechTrustFooter
