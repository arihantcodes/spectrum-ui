"use client"

import { cn } from "@/lib/utils"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterBrandLink,
  FooterGrain,
  FooterLegalBar,
  FooterNewsletter,
  FooterReveal,
  FooterSocialLinks,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNewsletterConfig, SpectrumFooterProps } from "./types"

export interface StartupWaitlistFooterProps extends SpectrumFooterProps {
  newsletter?: FooterNewsletterConfig
  proofLabel?: string
  headline?: string
}

const BRAND: FooterBrand = {
  name: "Seedling",
  href: "#",
  tagline: "The quiet CRM for founding teams",
}

const NEWSLETTER: FooterNewsletterConfig = {
  title: "",
  description: undefined,
  label: "Work email",
  placeholder: "you@startup.com",
  submitLabel: "Join the waitlist",
  successMessage: "You’re on the Seedling waitlist. We’ll write when seats open.",
}

export function StartupWaitlistFooter({
  brand = BRAND,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  newsletter = NEWSLETTER,
  proofLabel = "2,847 operators already in line",
  headline = "We’re opening Seedling to a few more teams this month.",
}: StartupWaitlistFooterProps) {
  return (
    <footer className={cn("relative overflow-hidden border-t border-border bg-background text-foreground", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.22),transparent_60%)]"
      />
      <FooterGrain className="opacity-25" />
      <div className="relative mx-auto flex w-full max-w-xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:py-20">
        <FooterReveal>
          <FooterBrandLink brand={{ ...brand, tagline: undefined }} className="justify-center" />
          <h2 className="mt-8 font-spectral text-4xl font-medium tracking-tight text-balance sm:text-5xl">{headline}</h2>
          {brand.tagline ? <p className="mt-3 text-sm text-muted-foreground">{brand.tagline}</p> : null}
        </FooterReveal>

        <FooterReveal delay={0.06} className="mt-8 w-full text-left">
          <FooterNewsletter config={newsletter} variant="stacked" />
        </FooterReveal>

        <FooterReveal delay={0.1} className="mt-6 flex items-center gap-3">
          <span className="flex -space-x-2" aria-hidden>
            {["AL", "JM", "RK", "PS"].map((initials, index) => (
              <span
                key={initials}
                className="grid size-8 place-items-center rounded-full border-2 border-background text-[10px] font-medium"
                style={{ background: ["#D1FAE5", "#A7F3D0", "#6EE7B7", "#34D399"][index], color: "#064E3B" }}
              >
                {initials}
              </span>
            ))}
          </span>
          <p className="text-xs text-muted-foreground">{proofLabel}</p>
        </FooterReveal>

        <div className="mt-10">
          <FooterSocialLinks socials={socials} className="justify-center" />
        </div>
        <FooterLegalBar
          copyright={defaultCopyright(brand.name, copyright)}
          legal={legal}
          className="w-full items-center border-transparent sm:flex-col"
        />
      </div>
    </footer>
  )
}

export default StartupWaitlistFooter
