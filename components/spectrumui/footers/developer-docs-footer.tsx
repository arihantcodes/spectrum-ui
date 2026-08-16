"use client"

import { useId, useState, type FormEvent } from "react"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterBrandLink,
  FooterLegalBar,
  FooterReveal,
  FooterSocialLinks,
  ResponsiveNavGroup,
  StatusDot,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, FooterStatusItem, SpectrumFooterProps } from "./types"

export interface DeveloperDocsFooterProps extends SpectrumFooterProps {
  sdks?: { label: string; href: string }[]
  endpoints?: FooterStatusItem[]
}

const BRAND: FooterBrand = {
  name: "Relay API",
  href: "#",
  tagline: "Payments and identity APIs for platforms",
}

const SDKS = [
  { label: "TypeScript", href: "#ts" },
  { label: "Python", href: "#py" },
  { label: "Go", href: "#go" },
  { label: "Ruby", href: "#ruby" },
  { label: "PHP", href: "#php" },
]

const ENDPOINTS: FooterStatusItem[] = [
  { name: "POST /v1/charges", status: "operational", detail: "99.99%" },
  { name: "GET /v1/customers", status: "operational", detail: "41ms" },
  { name: "POST /v1/webhooks", status: "degraded", detail: "retrying" },
]

const GROUPS: FooterNavGroup[] = [
  {
    title: "Docs",
    links: [
      { label: "Guides", href: "#guides" },
      { label: "API reference", href: "#reference" },
      { label: "Changelog", href: "#changelog" },
      { label: "Support", href: "#support" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Dashboard", href: "#dashboard" },
      { label: "API keys", href: "#keys" },
      { label: "Webhooks", href: "#webhooks" },
    ],
  },
]

export function DeveloperDocsFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  sdks = SDKS,
  endpoints = ENDPOINTS,
}: DeveloperDocsFooterProps) {
  const fieldId = useId()
  const [query, setQuery] = useState("")

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <footer className={cn("border-t border-border bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <FooterBrandLink brand={brand} />
            <form onSubmit={onSubmit} className="mt-6">
              <label htmlFor={fieldId} className="text-sm font-medium">
                Jump to docs
              </label>
              <div className="relative mt-2">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id={fieldId}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search endpoints, SDKs, guides"
                  className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm transition-[box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </form>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="SDKs">
              {sdks.map((sdk) => (
                <li key={sdk.label}>
                  <a
                    href={sdk.href}
                    className="inline-flex h-8 items-center rounded-md border border-border px-2.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {sdk.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <div className="border-b border-border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              API status
            </div>
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Relay API endpoint status</caption>
              <tbody>
                {endpoints.map((endpoint) => (
                  <tr key={endpoint.name} className="border-b border-border last:border-0 hover:bg-muted/40">
                    <th scope="row" className="px-4 py-3 font-mono text-xs font-medium">
                      {endpoint.name}
                    </th>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                        <StatusDot status={endpoint.status} />
                        {endpoint.detail}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FooterReveal>

        <nav aria-label="Relay API" className="mt-10 grid gap-2 sm:grid-cols-2 sm:gap-8">
          {groups.map((group) => (
            <ResponsiveNavGroup key={group.title} group={group} />
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

export default DeveloperDocsFooter
