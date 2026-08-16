"use client"

import { useReducedMotion } from "framer-motion"

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

export interface MarketQuote {
  symbol: string
  price: string
  change: number
}

export interface MarketDataFooterProps extends SpectrumFooterProps {
  quotes?: MarketQuote[]
  disclaimer?: string
}

const BRAND: FooterBrand = {
  name: "Ledgerline",
  href: "#",
  tagline: "Market data for treasury and trading desks",
}

const QUOTES: MarketQuote[] = [
  { symbol: "DXY", price: "104.28", change: 0.12 },
  { symbol: "SPX", price: "5,642.10", change: -0.34 },
  { symbol: "NDX", price: "20,118.44", change: 0.41 },
  { symbol: "US10Y", price: "4.21%", change: -0.03 },
  { symbol: "EURUSD", price: "1.0862", change: 0.08 },
  { symbol: "BTC", price: "67,420", change: 1.24 },
]

const GROUPS: FooterNavGroup[] = [
  {
    title: "Platform",
    links: [
      { label: "Terminal", href: "#terminal" },
      { label: "APIs", href: "#api" },
      { label: "Desktops", href: "#desktops" },
    ],
  },
  {
    title: "Markets",
    links: [
      { label: "Equities", href: "#equities" },
      { label: "FX", href: "#fx" },
      { label: "Rates", href: "#rates" },
    ],
  },
  {
    title: "Firm",
    links: [
      { label: "Coverage", href: "#coverage" },
      { label: "Compliance", href: "#compliance" },
      { label: "Contact", href: "#contact" },
    ],
  },
]

export function MarketDataFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  quotes = QUOTES,
  disclaimer = "Quotes are delayed 15 minutes and are fictional demonstration data. They are not an offer to buy or sell any security.",
}: MarketDataFooterProps) {
  const reduceMotion = useReducedMotion()
  const tape = [...quotes, ...quotes]

  return (
    <footer className={cn("dark overflow-hidden border-t border-border bg-zinc-950 text-zinc-50", className)}>
      <div className="border-b border-white/10 bg-black">
        <div className="sr-only">Market quotes, delayed 15 minutes</div>
        <div
              className={cn(
                "flex gap-8 py-2.5 font-mono text-xs tracking-wide",
            !reduceMotion && "animate-[footer-ticker_32s_linear_infinite] hover:[animation-play-state:paused]",
            reduceMotion && "flex-wrap px-4",
          )}
        >
          {(reduceMotion ? quotes : tape).map((quote, index) => (
            <span key={`${quote.symbol}-${index}`} className="shrink-0 px-2">
              <span className="text-zinc-400">{quote.symbol}</span>{" "}
              <span>{quote.price}</span>{" "}
              <span className={quote.change >= 0 ? "text-emerald-400" : "text-red-400"}>
                {quote.change >= 0 ? "+" : ""}
                {quote.change.toFixed(2)}%
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <FooterReveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <FooterBrandLink brand={brand} className="[&_span]:text-zinc-50" />
          <p className="max-w-md font-mono text-[11px] leading-relaxed text-zinc-500">{disclaimer}</p>
        </FooterReveal>

        <nav aria-label="Ledgerline" className="mt-10 grid gap-2 sm:grid-cols-3 sm:gap-8">
          {groups.map((group) => (
            <ResponsiveNavGroup
              key={group.title}
              group={group}
              className="border-white/10 [&_a]:text-zinc-400 [&_a:hover]:text-white [&_button]:text-zinc-50 [&_h3]:text-zinc-50"
            />
          ))}
        </nav>

        <div className="mt-8">
          <FooterSocialLinks
            socials={socials}
            className="[&_a]:border-white/15 [&_a]:text-zinc-300 [&_a:hover]:text-white"
          />
        </div>
        <FooterLegalBar
          copyright={defaultCopyright(brand.name, copyright)}
          legal={legal}
          className="border-white/10 text-zinc-500 [&_a]:text-zinc-500 [&_a:hover]:text-zinc-200"
        />
      </div>
      <style>{`
        @keyframes footer-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  )
}

export default MarketDataFooter
