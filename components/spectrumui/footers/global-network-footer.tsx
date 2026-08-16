"use client"

import { useEffect, useId, useState } from "react"

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
import type { FooterBrand, FooterNavGroup, FooterRegion, SpectrumFooterProps } from "./types"

export interface GlobalNetworkFooterProps extends SpectrumFooterProps {
  regions?: FooterRegion[]
  languages?: { code: string; label: string }[]
}

const BRAND: FooterBrand = {
  name: "Atlas Global",
  href: "#",
  tagline: "Enterprise software in 40 countries",
}

const REGIONS: FooterRegion[] = [
  { name: "London", timezone: "Europe/London", blurb: "EMEA headquarters", href: "#london" },
  { name: "New York", timezone: "America/New_York", blurb: "Americas headquarters", href: "#nyc" },
  { name: "Singapore", timezone: "Asia/Singapore", blurb: "APAC headquarters", href: "#singapore" },
  { name: "São Paulo", timezone: "America/Sao_Paulo", blurb: "LATAM office", href: "#saopaulo" },
]

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "ja", label: "日本語" },
  { code: "pt", label: "Português" },
]

const GROUPS: FooterNavGroup[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Leadership", href: "#leadership" },
      { label: "Careers", href: "#careers" },
      { label: "Newsroom", href: "#news" },
    ],
  },
  {
    title: "Customers",
    links: [
      { label: "Global 2000", href: "#g2000" },
      { label: "Public sector", href: "#public" },
      { label: "Partners", href: "#partners" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "#help" },
      { label: "Training", href: "#training" },
      { label: "Contact", href: "#contact" },
    ],
  },
]

function useLocalTime(timezone: string) {
  const [label, setLabel] = useState("")

  useEffect(() => {
    const format = () =>
      setLabel(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: timezone,
          hour12: false,
        }).format(new Date()),
      )
    format()
    const timer = window.setInterval(format, 30000)
    return () => window.clearInterval(timer)
  }, [timezone])

  return label
}

function RegionCard({ region, featured }: { region: FooterRegion; featured?: boolean }) {
  const time = useLocalTime(region.timezone)
  return (
    <a
      href={region.href ?? "#"}
      className={cn(
        "flex items-start justify-between gap-3 rounded-2xl border p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        featured ? "border-foreground/20 bg-muted/50" : "border-border hover:bg-muted/40",
      )}
    >
      <span>
        <span className="flex items-center gap-2 text-sm font-medium">
          {region.name}
          {featured ? (
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-40 motion-safe:animate-ping" />
              <span className="relative size-2 rounded-full bg-emerald-500" />
              <span className="sr-only">Headquarters</span>
            </span>
          ) : null}
        </span>
        {region.blurb ? <span className="mt-1 block text-xs text-muted-foreground">{region.blurb}</span> : null}
      </span>
      <span className="font-mono text-sm tabular-nums text-muted-foreground" aria-label={`Local time in ${region.name}`}>
        {time || "--:--"}
      </span>
    </a>
  )
}

export function GlobalNetworkFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  regions = REGIONS,
  languages = LANGUAGES,
}: GlobalNetworkFooterProps) {
  const languageId = useId()
  const [language, setLanguage] = useState(languages[0]?.code ?? "en")

  return (
    <footer className={cn("border-t border-border bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <FooterBrandLink brand={brand} />
          <div>
            <label htmlFor={languageId} className="mb-1 block text-xs font-medium text-muted-foreground">
              Language
            </label>
            <select
              id={languageId}
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {languages.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </FooterReveal>

        <FooterReveal delay={0.05}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((region, index) => (
              <RegionCard key={region.name} region={region} featured={index === 0} />
            ))}
          </div>
        </FooterReveal>

        <nav aria-label="Atlas Global" className="mt-12 grid gap-2 sm:grid-cols-3 sm:gap-8">
          {groups.map((group) => (
            <ResponsiveNavGroup key={group.title} group={group} />
          ))}
        </nav>

        <div className="mt-10">
          <FooterSocialLinks socials={socials} />
        </div>
        <FooterLegalBar copyright={defaultCopyright(brand.name, copyright)} legal={legal} />
      </div>
    </footer>
  )
}

export default GlobalNetworkFooter
