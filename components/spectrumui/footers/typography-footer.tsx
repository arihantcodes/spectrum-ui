"use client"

import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FOOTER_EASE,
  FooterLegalBar,
  FooterSocialLinks,
  FooterTextLink,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, SpectrumFooterProps } from "./types"

export interface TypographyFooterProps extends SpectrumFooterProps {}

const BRAND: FooterBrand = {
  name: "Monument",
  href: "#",
}

const GROUPS: FooterNavGroup[] = [
  {
    title: "Navigate",
    links: [
      { label: "Work", href: "#work" },
      { label: "Studio", href: "#studio" },
      { label: "Journal", href: "#journal" },
      { label: "Contact", href: "#contact" },
    ],
  },
]

export function TypographyFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
}: TypographyFooterProps) {
  const reduceMotion = useReducedMotion()
  const letters = Array.from(brand.name)
  const links = groups.flatMap((group) => group.links)

  return (
    <footer className={cn("bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <a
          href={brand.href ?? "#"}
            className="flex flex-wrap font-serif text-[clamp(3.5rem,14vw,9rem)] leading-[0.85] tracking-[-0.07em] [-webkit-text-stroke:1px_currentColor] text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:text-foreground hover:[-webkit-text-stroke:0]"
          aria-label={brand.name}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              initial={reduceMotion ? false : { opacity: 0.25 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04, ease: FOOTER_EASE }}
              className="transition-colors hover:text-foreground"
            >
              {letter === " " ? "\u00a0" : letter}
            </motion.span>
          ))}
        </a>

        <nav aria-label="Monument" className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-8">
          {links.map((link) => (
            <FooterTextLink key={link.label} href={link.href} className="text-base">
              {link.label}
            </FooterTextLink>
          ))}
          <FooterSocialLinks socials={socials} className="ml-auto" />
        </nav>
        <FooterLegalBar copyright={defaultCopyright(brand.name, copyright)} legal={legal} />
      </div>
    </footer>
  )
}

export default TypographyFooter
