"use client"

import { useId, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"
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

export interface ProductSwitcherItem {
  id: string
  name: string
  description: string
  groups: FooterNavGroup[]
}

export interface ProductSwitcherFooterProps extends SpectrumFooterProps {
  products?: ProductSwitcherItem[]
}

const BRAND: FooterBrand = {
  name: "Lattice",
  href: "#",
  tagline: "A family of products for modern operators",
}

const PRODUCTS: ProductSwitcherItem[] = [
  {
    id: "atlas",
    name: "Atlas",
    description: "Planning and portfolio visibility for exec teams.",
    groups: [
      {
        title: "Atlas",
        links: [
          { label: "Roadmaps", href: "#atlas-roadmaps" },
          { label: "OKRs", href: "#atlas-okrs" },
          { label: "Reviews", href: "#atlas-reviews" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Playbooks", href: "#atlas-playbooks" },
          { label: "Templates", href: "#atlas-templates" },
          { label: "Pricing", href: "#atlas-pricing" },
        ],
      },
    ],
  },
  {
    id: "relay",
    name: "Relay",
    description: "Workflows that connect finance, legal, and ops.",
    groups: [
      {
        title: "Relay",
        links: [
          { label: "Approvals", href: "#relay-approvals" },
          { label: "Integrations", href: "#relay-integrations" },
          { label: "Audit log", href: "#relay-audit" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "API", href: "#relay-api" },
          { label: "Security", href: "#relay-security" },
          { label: "Pricing", href: "#relay-pricing" },
        ],
      },
    ],
  },
  {
    id: "harbor",
    name: "Harbor",
    description: "Customer data platform with governed access.",
    groups: [
      {
        title: "Harbor",
        links: [
          { label: "Profiles", href: "#harbor-profiles" },
          { label: "Segments", href: "#harbor-segments" },
          { label: "Governance", href: "#harbor-governance" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Docs", href: "#harbor-docs" },
          { label: "Status", href: "#harbor-status" },
          { label: "Pricing", href: "#harbor-pricing" },
        ],
      },
    ],
  },
]

export function ProductSwitcherFooter({
  brand = BRAND,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  products = PRODUCTS,
}: ProductSwitcherFooterProps) {
  const reduceMotion = useReducedMotion()
  const [activeId, setActiveId] = useState(products[0]?.id ?? "")
  const active = products.find((product) => product.id === activeId) ?? products[0]
  const tablistId = useId()

  return (
    <footer className={cn("border-t border-border bg-background text-foreground", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="lg:w-64 lg:shrink-0">
            <FooterBrandLink brand={brand} />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Switch products to see the matching sitemap. Lattice is a fictional multi-product company.
            </p>
            <div
              role="tablist"
              aria-label="Lattice products"
              id={tablistId}
              className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:flex-col"
            >
              {products.map((product) => {
                const selected = product.id === active?.id
                return (
                  <button
                    key={product.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    id={`${tablistId}-${product.id}`}
                    className={cn(
                      "relative min-w-[9.5rem] rounded-xl border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:min-w-0",
                      selected
                        ? "border-foreground/20 bg-muted"
                        : "border-transparent hover:border-border hover:bg-muted/40",
                    )}
                    onClick={() => setActiveId(product.id)}
                  >
                    {selected ? (
                      <motion.span
                        layoutId={reduceMotion ? undefined : "lattice-product-indicator"}
                        className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-foreground"
                      />
                    ) : null}
                    <span className="block text-sm font-medium">{product.name}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {product.description}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.nav
                  key={active.id}
                  aria-label={`${active.name} directories`}
                  role="tabpanel"
                  aria-labelledby={`${tablistId}-${active.id}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: FOOTER_EASE }}
                  className="grid gap-8 rounded-2xl border border-border p-6 sm:grid-cols-2"
                >
                  {active.groups.map((group) => (
                    <section key={group.title}>
                      <h3 className="text-sm font-medium">{group.title}</h3>
                      <FooterLinkList links={group.links} className="mt-3" />
                    </section>
                  ))}
                </motion.nav>
              ) : null}
            </AnimatePresence>
          </div>
        </FooterReveal>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <FooterSocialLinks socials={socials} />
        </div>
        <FooterLegalBar copyright={defaultCopyright(brand.name, copyright)} legal={legal} />
      </div>
    </footer>
  )
}

export default ProductSwitcherFooter
