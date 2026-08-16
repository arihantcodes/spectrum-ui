"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { GitFork, Star, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterBrandLink,
  FooterGrain,
  FooterLegalBar,
  FooterReveal,
  FooterSocialLinks,
  ResponsiveNavGroup,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, SpectrumFooterProps } from "./types"

export interface OpenSourceFooterProps extends SpectrumFooterProps {
  stats?: { label: string; value: number; icon?: "star" | "fork" | "users" }[]
}

const BRAND: FooterBrand = {
  name: "Forge",
  href: "#",
  tagline: "Open infrastructure for local-first apps",
}

const STATS = [
  { label: "GitHub stars", value: 12840, icon: "star" as const },
  { label: "Forks", value: 1620, icon: "fork" as const },
  { label: "Contributors", value: 214, icon: "users" as const },
]

const GROUPS: FooterNavGroup[] = [
  {
    title: "Project",
    links: [
      { label: "Repository", href: "#repo", external: true },
      { label: "Docs", href: "#docs" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discussions", href: "#discussions" },
      { label: "Code of conduct", href: "#coc" },
      { label: "Good first issues", href: "#issues" },
      { label: "Governance", href: "#governance" },
    ],
  },
]

const ICONS = {
  star: Star,
  fork: GitFork,
  users: Users,
}

function CountUp({ value }: { value: number }) {
  const reduceMotion = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const start = performance.now()
    const duration = 900
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduceMotion, value])

  return <span className="tabular-nums">{(reduceMotion ? value : shown).toLocaleString()}</span>
}

export function OpenSourceFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  stats = STATS,
}: OpenSourceFooterProps) {
  return (
    <footer className={cn("dark relative overflow-hidden border-t border-border bg-zinc-950 text-zinc-50", className)}>
      <FooterGrain className="opacity-20 mix-blend-overlay" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FooterReveal className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <FooterBrandLink brand={brand} className="[&_span]:text-zinc-50" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400">
              Forge is a fictional open-source project. Use this footer when the last viewport should convert readers into contributors.
            </p>
            <Button asChild className="mt-6 w-full bg-white text-zinc-950 hover:bg-zinc-200 sm:w-auto">
              <a href="#contribute">Become a contributor</a>
            </Button>
            <div className="mt-8 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1" aria-hidden>
              {Array.from({ length: 70 }).map((_, i) => (
                <span
                  key={i}
                  className="size-2.5 rounded-[2px]"
                  style={{
                    background:
                      ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"][i % 5 === 0 ? 0 : (i * 3) % 5],
                  }}
                />
              ))}
            </div>
          </div>
          <ul className="grid grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = ICONS[stat.icon ?? "star"]
              return (
                <li key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Icon className="size-4 text-zinc-400" aria-hidden />
                  <p className="mt-4 text-xl font-semibold tracking-tight">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">{stat.label}</p>
                </li>
              )
            })}
          </ul>
        </FooterReveal>

        <nav aria-label="Forge" className="mt-12 grid gap-2 sm:grid-cols-2 sm:gap-8">
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
          legal={[...legal, { label: "Apache-2.0", href: "#license" }]}
          className="border-white/10 text-zinc-500 [&_a]:text-zinc-500 [&_a:hover]:text-zinc-200"
        />
      </div>
    </footer>
  )
}

export default OpenSourceFooter
