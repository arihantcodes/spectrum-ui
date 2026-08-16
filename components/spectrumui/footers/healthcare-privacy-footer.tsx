"use client"

import { useId, useState } from "react"

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

export interface HealthcarePrivacyFooterProps extends SpectrumFooterProps {
  privacyNotice?: string
  privacyDetails?: string
  badges?: { label: string; detail: string }[]
}

const BRAND: FooterBrand = {
  name: "Carewell",
  href: "#",
  tagline: "Clinical operations software for health systems",
}

const GROUPS: FooterNavGroup[] = [
  {
    title: "Patients",
    links: [
      { label: "Access your records", href: "#records" },
      { label: "Privacy rights", href: "#rights" },
      { label: "Support", href: "#support" },
    ],
  },
  {
    title: "Providers",
    links: [
      { label: "Platform", href: "#platform" },
      { label: "Integrations", href: "#ehr" },
      { label: "Security", href: "#security" },
      { label: "Training", href: "#training" },
    ],
  },
]

const BADGES = [
  { label: "HIPAA", detail: "Covered entity ready" },
  { label: "HITRUST", detail: "r2 certified" },
  { label: "SOC 2", detail: "Type II" },
]

export function HealthcarePrivacyFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  privacyNotice = "Carewell is a fictional health technology brand. Patient data in a production product should never be used to train models, sold, or shared without a documented legal basis.",
  privacyDetails = "This demonstration footer is not medical, legal, or privacy advice. Replace the notice, BAAs, and rights request paths with counsel-reviewed copy before shipping.",
  badges = BADGES,
}: HealthcarePrivacyFooterProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <footer className={cn("border-t border-border bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="rounded-2xl border border-border bg-muted/40 p-5 sm:p-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Privacy
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{privacyNotice}</p>
          <button
            type="button"
            className="mt-3 text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? "Hide details" : "Read the full notice"}
          </button>
          <div id={panelId} hidden={!open} className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {privacyDetails}
          </div>
        </FooterReveal>

        <FooterReveal delay={0.05} className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <FooterBrandLink brand={brand} />
          <nav aria-label="Carewell" className="grid gap-2 sm:grid-cols-2 sm:gap-8">
            {groups.map((group) => (
              <ResponsiveNavGroup key={group.title} group={group} />
            ))}
          </nav>
        </FooterReveal>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {badges.map((badge) => (
            <li key={badge.label} className="rounded-xl border border-border bg-background px-4 py-3">
              <p className="text-sm font-medium">{badge.label}</p>
              <p className="text-xs text-muted-foreground">{badge.detail}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <FooterSocialLinks socials={socials} />
        </div>
        <FooterLegalBar
          copyright={defaultCopyright(brand.name, copyright)}
          legal={[...legal, { label: "Patient rights", href: "#rights" }]}
        />
      </div>
    </footer>
  )
}

export default HealthcarePrivacyFooter
