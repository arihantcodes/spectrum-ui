"use client"

import { useEffect, useId, useState, type FormEvent } from "react"
import { useReducedMotion } from "framer-motion"
import { ArrowUpRight, CornerDownLeft, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DEFAULT_LEGAL,
  DEFAULT_SOCIALS,
  FooterBrandLink,
  FooterLegalBar,
  FooterReveal,
  FooterSocialLinks,
  FooterTextLink,
  defaultCopyright,
} from "./primitives"
import type { FooterBrand, FooterNavGroup, SpectrumFooterProps } from "./types"

export interface AiPromptFooterProps extends SpectrumFooterProps {
  suggestions?: string[]
  onPrompt?: (value: string) => void
  placeholders?: string[]
}

const BRAND: FooterBrand = {
  name: "Aether",
  href: "#",
  tagline: "Research assistants for product teams",
}

const SUGGESTIONS = [
  "Summarize this quarter’s incidents",
  "Draft a launch brief from these notes",
  "Explain this SQL query to finance",
]

const PLACEHOLDERS = [
  "Ask Aether to review a pull request…",
  "Ask Aether to outline a research plan…",
  "Ask Aether to compare three vendors…",
]

const GROUPS: FooterNavGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Assistant", href: "#assistant" },
      { label: "Models", href: "#models" },
      { label: "Evaluations", href: "#evals" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API", href: "#api" },
      { label: "Playground", href: "#playground" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Safety", href: "#safety" },
      { label: "Research", href: "#research" },
      { label: "Careers", href: "#careers" },
    ],
  },
]

export function AiPromptFooter({
  brand = BRAND,
  groups = GROUPS,
  socials = DEFAULT_SOCIALS,
  legal = DEFAULT_LEGAL,
  copyright,
  className,
  suggestions = SUGGESTIONS,
  onPrompt,
  placeholders = PLACEHOLDERS,
}: AiPromptFooterProps) {
  const reduceMotion = useReducedMotion()
  const fieldId = useId()
  const [value, setValue] = useState("")
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (reduceMotion || placeholders.length < 2) return
    const timer = window.setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % placeholders.length)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [placeholders.length, reduceMotion])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = value.trim()
    if (!next) return
    onPrompt?.(next)
    setSent(true)
  }

  return (
    <footer className={cn("relative overflow-hidden border-t border-border bg-background text-foreground", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <FooterReveal className="flex flex-col items-center text-center">
          <FooterBrandLink brand={brand} className="mb-8" />
          <form onSubmit={onSubmit} className="w-full">
            <label htmlFor={fieldId} className="sr-only">
              Ask {brand.name}
            </label>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-background/80 p-2 shadow-sm backdrop-blur-sm focus-within:ring-2 focus-within:ring-ring">
              <Sparkles className="ml-2 size-4 shrink-0 text-muted-foreground" aria-hidden />
              <input
                id={fieldId}
                value={value}
                onChange={(event) => {
                  setValue(event.target.value)
                  if (sent) setSent(false)
                }}
                placeholder={placeholders[placeholderIndex] ?? "Ask a question…"}
                className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button type="submit" size="sm" className="rounded-xl">
                {sent ? "Queued" : "Ask"}
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
            <p role="status" aria-live="polite" className="sr-only">
              {sent ? "Prompt queued" : ""}
            </p>
          </form>
          <ul className="mt-4 flex w-full flex-wrap justify-center gap-2">
            {suggestions.map((suggestion) => (
              <li key={suggestion}>
                <button
                  type="button"
                  onClick={() => {
                    setValue(suggestion)
                    setSent(false)
                  }}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </FooterReveal>

        <FooterReveal delay={0.08}>
          <nav aria-label="Aether" className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
            {groups.map((group, index) => (
              <div key={group.title} className="text-center sm:text-left">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{group.title}</p>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterTextLink href={link.href}>{link.label}</FooterTextLink>
                    </li>
                  ))}
                </ul>
                {index === groups.length - 1 ? (
                  <a
                    href="#playground"
                    className="mt-4 inline-flex items-center gap-1 text-sm text-foreground"
                  >
                    Open playground
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ) : null}
              </div>
            ))}
          </nav>
        </FooterReveal>

        <div className="mt-10 flex flex-col items-center gap-4">
          <FooterSocialLinks socials={socials} />
          <FooterLegalBar
            copyright={defaultCopyright(brand.name, copyright)}
            legal={legal}
            className="w-full justify-center border-transparent pt-2 sm:flex-col sm:items-center"
          />
        </div>
      </div>
    </footer>
  )
}

export default AiPromptFooter
