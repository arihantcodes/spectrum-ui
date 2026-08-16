"use client"

import { useId, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FOOTER_EASE,
  FooterBrandLink,
  FooterLegalBar,
  FooterLinkList,
  FooterNewsletter,
  FooterReveal,
  FooterSocialLinks,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, FooterNewsletterConfig, SpectrumFooterProps } from "./types"

export interface AccordionFooterProps extends SpectrumFooterProps {
  newsletter?: FooterNewsletterConfig
}

const BRAND: FooterBrand = {
  name: "Fold",
  href: "#",
  tagline: "Field service software that works on a phone",
}

const GROUPS: FooterNavGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Scheduling", href: "#scheduling" },
      { label: "Invoicing", href: "#invoicing" },
      { label: "Parts", href: "#parts" },
      { label: "Mobile app", href: "#app" },
    ],
  },
  {
    title: "Customers",
    links: [
      { label: "HVAC", href: "#hvac" },
      { label: "Electrical", href: "#electrical" },
      { label: "Plumbing", href: "#plumbing" },
      { label: "Stories", href: "#stories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Support", href: "#support" },
      { label: "Status", href: "#status" },
    ],
  },
]

const NEWSLETTER: FooterNewsletterConfig = {
  title: "Field notes",
  description: "A short email for operators. No product spam.",
  submitLabel: "Subscribe",
  placeholder: "you@company.com",
}

export function AccordionFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  newsletter = NEWSLETTER,
}: AccordionFooterProps) {
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState<string | null>(groups[0]?.title ?? null)
  const baseId = useId()

  return (
    <footer className={cn("border-t border-border bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:max-w-6xl lg:px-8">
        <FooterReveal className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <FooterBrandLink brand={brand} />
          <FooterNewsletter config={newsletter} className="w-full lg:max-w-sm" variant="stacked" />
        </FooterReveal>

        <nav aria-label="Fold" className="mt-10 lg:grid lg:grid-cols-3 lg:gap-8">
          {groups.map((group) => {
            const panelId = `${baseId}-${group.title}`
            const isOpen = open === group.title
            return (
              <section key={group.title} className="border-b border-border lg:border-0">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between py-4 text-left text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:pointer-events-none lg:cursor-default lg:py-0"
                    onClick={() => setOpen((current) => (current === group.title ? null : group.title))}
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                        {String(groups.indexOf(group) + 1).padStart(2, "0")}
                      </span>
                      {group.title}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-4 text-muted-foreground transition-transform lg:hidden",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {(isOpen || true) && (
                    <motion.div
                      id={panelId}
                      className={cn("lg:block", isOpen ? "block" : "hidden lg:block")}
                      initial={false}
                      animate={
                        reduceMotion
                          ? { height: "auto" }
                          : undefined
                      }
                      transition={{ duration: 0.22, ease: FOOTER_EASE }}
                    >
                      <FooterLinkList links={group.links} className="pb-4 lg:pb-0" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            )
          })}
        </nav>

        <div className="mt-8">
          <FooterSocialLinks socials={socials} />
        </div>
        <FooterLegalBar copyright={defaultCopyright(brand.name, copyright)} legal={legal} />
      </div>
    </footer>
  )
}

export default AccordionFooter
