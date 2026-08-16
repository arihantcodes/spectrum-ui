"use client"

import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterGrain,
  FooterLegalBar,
  FooterReveal,
  FooterSocialLinks,
  FooterTextLink,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, SpectrumFooterProps } from "./types"

export interface CreativeStudioFooterProps extends SpectrumFooterProps {
  capabilities?: string[]
}

const BRAND: FooterBrand = {
  name: "Prism",
  href: "#",
}

const CAPABILITIES = [
  "Motion",
  "Layout",
  "Type",
  "Color",
  "3D",
  "Prototyping",
  "Handoff",
  "Design systems",
]

const GROUPS: FooterNavGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Studio", href: "#studio" },
      { label: "Review", href: "#review" },
      { label: "Libraries", href: "#libraries" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
]

export function CreativeStudioFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  capabilities = CAPABILITIES,
}: CreativeStudioFooterProps) {
  const reduceMotion = useReducedMotion()
  const links = groups.flatMap((group) => group.links)
  const tape = [...capabilities, ...capabilities]

  return (
    <footer className={cn("relative overflow-hidden bg-foreground text-background", className)}>
      <FooterGrain className="opacity-40 mix-blend-overlay" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <FooterReveal>
          <a
            href={brand.href ?? "#"}
            className="block font-serif text-[clamp(4.5rem,18vw,11rem)] leading-[0.8] tracking-[-0.06em] [text-wrap:balance] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
          >
            {brand.name}
          </a>
        </FooterReveal>
      </div>

      <div className="relative mt-8 border-y border-background/15">
        <div className="sr-only">Capabilities: {capabilities.join(", ")}</div>
        <div
          className={cn(
            "flex gap-10 py-3 font-mono text-xs uppercase tracking-[0.22em] text-background/70",
            !reduceMotion && "animate-[footer-marquee_28s_linear_infinite] hover:[animation-play-state:paused]",
          )}
        >
          {(reduceMotion ? capabilities : tape).map((item, index) => (
            <span key={`${item}-${index}`} className="shrink-0 px-2">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label="Prism" className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-10">
          {links.map((link) => (
            <FooterTextLink
              key={link.label}
              href={link.href}
              className="text-2xl tracking-tight text-background/80 hover:text-background sm:text-3xl"
            >
              {link.label}
            </FooterTextLink>
          ))}
        </nav>
        <FooterSocialLinks
          socials={socials}
          className="[&_a]:border-background/20 [&_a]:text-background [&_a:hover]:bg-background [&_a:hover]:text-foreground"
        />
        <FooterLegalBar
          copyright={defaultCopyright(brand.name, copyright)}
          legal={legal}
          className="border-background/15 text-background/60 [&_a]:text-background/60 [&_a:hover]:text-background"
        />
      </div>
      <style>{`
        @keyframes footer-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  )
}

export default CreativeStudioFooter
