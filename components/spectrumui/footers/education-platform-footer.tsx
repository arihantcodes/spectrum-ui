"use client"

import { useId, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FOOTER_EASE,
  FooterBrandLink,
  FooterLegalBar,
  FooterLinkList,
  FooterReveal,
  FooterSocialLinks,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, SpectrumFooterProps } from "./types"

export interface EducationPlatformFooterProps extends SpectrumFooterProps {
  learnerGroups?: FooterNavGroup[]
  institutionGroups?: FooterNavGroup[]
}

const BRAND: FooterBrand = {
  name: "Campus",
  href: "#",
  tagline: "Learning infrastructure for universities and teams",
}

const LEARNER: FooterNavGroup[] = [
  {
    title: "Learn",
    links: [
      { label: "Catalog", href: "#catalog" },
      { label: "Certificates", href: "#certs" },
      { label: "Mobile app", href: "#app" },
      { label: "Help", href: "#help" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Billing", href: "#billing" },
      { label: "Accessibility", href: "#a11y" },
      { label: "Community", href: "#community" },
    ],
  },
]

const INSTITUTION: FooterNavGroup[] = [
  {
    title: "Campus",
    links: [
      { label: "For universities", href: "#universities" },
      { label: "For companies", href: "#companies" },
      { label: "Implementations", href: "#implement" },
      { label: "Security", href: "#security" },
    ],
  },
  {
    title: "Admin",
    links: [
      { label: "SSO", href: "#sso" },
      { label: "Reporting", href: "#reporting" },
      { label: "Support", href: "#support" },
    ],
  },
]

export function EducationPlatformFooter({
  brand = BRAND,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  learnerGroups = LEARNER,
  institutionGroups = INSTITUTION,
}: EducationPlatformFooterProps) {
  const reduceMotion = useReducedMotion()
  const [audience, setAudience] = useState<"learner" | "institution">("learner")
  const tablistId = useId()
  const groups = audience === "learner" ? learnerGroups : institutionGroups

  return (
    <footer className={cn("border-t border-border bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <FooterBrandLink brand={brand} />
          <div
            role="tablist"
            aria-label="Audience"
            id={tablistId}
            className="inline-flex rounded-full border border-border bg-background p-1"
          >
            {(["learner", "institution"] as const).map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={audience === item}
                className={cn(
                  "rounded-full px-4 py-2 text-sm capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  audience === item ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setAudience(item)}
              >
                {item === "learner" ? "Learners" : "Institutions"}
              </button>
            ))}
          </div>
        </FooterReveal>

        <FooterReveal delay={0.05}>
          <AnimatePresence mode="wait">
            <motion.nav
              key={audience}
              aria-label={audience === "learner" ? "Learner directories" : "Institution directories"}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: FOOTER_EASE }}
              className="mt-10 grid gap-8 rounded-2xl border border-border bg-background p-6 sm:grid-cols-2"
            >
              {groups.map((group) => (
                <section key={group.title}>
                  <h3 className="text-sm font-medium">{group.title}</h3>
                  <FooterLinkList links={group.links} className="mt-3" />
                </section>
              ))}
              <div className="sm:col-span-2">
                <Button asChild variant={audience === "learner" ? "default" : "outline"} className="w-full sm:w-auto">
                  <a href={audience === "learner" ? "#catalog" : "#universities"}>
                    {audience === "learner" ? "Browse the catalog" : "Talk to campus sales"}
                  </a>
                </Button>
              </div>
            </motion.nav>
          </AnimatePresence>
        </FooterReveal>

        <p className="mt-8 text-xs text-muted-foreground">
          Accreditation marks, FERPA language, and school-specific policies belong in this row in production.
        </p>

        <div className="mt-6">
          <FooterSocialLinks socials={socials} />
        </div>
        <FooterLegalBar copyright={defaultCopyright(brand.name, copyright)} legal={legal} />
      </div>
    </footer>
  )
}

export default EducationPlatformFooter
