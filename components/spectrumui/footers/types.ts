import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

/** A single destination inside a footer navigation group. */
export interface FooterLinkItem {
  /** Visible link label */
  label: string
  /** Destination href. Use "#" in demos; replace with real routes in production */
  href: string
  /** Optional supporting line shown under the label */
  description?: string
  /** Small status or category chip, e.g. "New" or "SOC 2" */
  badge?: string
  /** Optional leading icon */
  icon?: LucideIcon
  /** Marks the link as opening an external site */
  external?: boolean
}

/** A labelled cluster of footer links. */
export interface FooterNavGroup {
  /** Accessible group title */
  title: string
  /** Links in this group */
  links: FooterLinkItem[]
}

/** Brand mark, name, and supporting copy. */
export interface FooterBrand {
  /** Company or product name */
  name: string
  /** Home href. Defaults to "/" */
  href?: string
  /** One-line positioning statement */
  tagline?: string
  /** Optional custom mark. Defaults to the Spectrum geometric mark */
  logo?: ReactNode
}

/** Social destination. */
export interface FooterSocialLink {
  /** Accessible name, e.g. "GitHub" */
  label: string
  href: string
  /** Optional icon override. Primitives map common labels automatically */
  icon?: LucideIcon
}

/** Privacy, terms, cookies, and similar legal destinations. */
export interface FooterLegalLink {
  label: string
  href: string
}

/**
 * Shared configurable surface used by every Spectrum footer.
 *
 * Individual footers extend this with layout-specific fields (newsletter,
 * status, regions, CTAs) while keeping a consistent authoring model.
 */
export interface SpectrumFooterProps {
  /** Brand mark, name, and optional tagline */
  brand?: FooterBrand
  /** Named navigation groups rendered by the footer */
  groups?: FooterNavGroup[]
  /** Social destinations */
  socials?: FooterSocialLink[]
  /** Privacy, terms, and other legal links */
  legal?: FooterLegalLink[]
  /** Optional copyright line. Defaults to the current year and brand name */
  copyright?: string
  /** Additional classes on the root footer element */
  className?: string
}

export interface FooterNewsletterConfig {
  /** Visible heading above the field */
  title?: string
  /** Supporting copy */
  description?: string
  /** Input accessible name. Defaults to "Work email" */
  label?: string
  /** Placeholder text */
  placeholder?: string
  /** Submit button label */
  submitLabel?: string
  /** Success message announced to screen readers */
  successMessage?: string
  /** Called with the submitted email. Return a promise to delay the success state */
  onSubscribe?: (email: string) => void | Promise<void>
}

export interface FooterCtaConfig {
  eyebrow?: string
  title: string
  description?: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
}

export interface FooterStatusItem {
  /** Service or region name */
  name: string
  /** Operational state shown to sighted users and announced to assistive tech */
  status: "operational" | "degraded" | "outage" | "maintenance"
  /** Optional metric, e.g. "99.99%" or "12ms" */
  detail?: string
}

export interface FooterRegion {
  /** City or region label */
  name: string
  /** IANA timezone used to display local time */
  timezone: string
  /** Optional office blurb */
  blurb?: string
  href?: string
}

export interface FooterArticle {
  title: string
  href: string
  category?: string
  date?: string
  excerpt?: string
}

export type FooterCategory =
  | "enterprise"
  | "saas"
  | "developer"
  | "fintech"
  | "ai"
  | "commerce"
  | "security"
  | "creative"
  | "community"
  | "industry"
  | "experimental"
