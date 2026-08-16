"use client"

import { useId, useState, type FormEvent, type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Loader2,
  Youtube,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type {
  FooterBrand,
  FooterLegalLink,
  FooterLinkItem,
  FooterNavGroup,
  FooterNewsletterConfig,
  FooterSocialLink,
  FooterStatusItem,
} from "./types"

export const FOOTER_EASE = [0.22, 1, 0.36, 1] as const

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.726-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
)

const SOCIAL_ICONS: Record<string, LucideIcon | typeof XIcon> = {
  GitHub: Github,
  Github: Github,
  X: XIcon,
  Twitter: XIcon,
  LinkedIn: Linkedin,
  Linkedin: Linkedin,
  YouTube: Youtube,
  Youtube: Youtube,
}

export function BrandMark({
  className,
  title = "Brand mark",
}: {
  className?: string
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", className)}
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <rect x="3" y="3" width="11" height="11" rx="2.5" className="fill-foreground" />
      <rect x="18" y="3" width="11" height="11" rx="2.5" className="fill-foreground/35" />
      <rect x="3" y="18" width="11" height="11" rx="2.5" className="fill-foreground/35" />
      <rect x="18" y="18" width="11" height="11" rx="2.5" className="fill-foreground" />
    </svg>
  )
}

export function FooterBrandLink({
  brand,
  className,
  markClassName,
}: {
  brand: FooterBrand
  className?: string
  markClassName?: string
}) {
  return (
    <a
      href={brand.href ?? "/"}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {brand.logo ?? (
        <span className="flex size-8 items-center justify-center rounded-md bg-foreground text-background transition-transform duration-500 ease-out motion-safe:group-hover:rotate-180">
          <BrandMark className={cn("size-4 fill-background [&_rect]:fill-background", markClassName)} />
        </span>
      )}
      <span className="flex flex-col">
        <span className="text-sm font-semibold tracking-tight text-foreground">{brand.name}</span>
        {brand.tagline ? (
          <span className="text-xs text-muted-foreground">{brand.tagline}</span>
        ) : null}
      </span>
    </a>
  )
}

export function FooterTextLink({
  href,
  children,
  external,
  className,
}: {
  href: string
  children: ReactNode
  external?: boolean
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex max-w-full items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="relative inline-block max-w-full truncate">
        {children}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </span>
      {external ? (
        <ArrowUpRight className="size-3.5 shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100" />
      ) : null}
    </a>
  )
}

export function FooterLinkList({
  links,
  className,
}: {
  links: FooterLinkItem[]
  className?: string
}) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {links.map((link) => {
        const Icon = link.icon
        return (
          <li key={`${link.href}-${link.label}`}>
            <FooterTextLink href={link.href} external={link.external}>
              <span className="inline-flex items-center gap-2">
                {Icon ? <Icon className="size-3.5 shrink-0" aria-hidden /> : null}
                {link.label}
                {link.badge ? (
                  <span className="rounded-full border border-border px-1.5 py-px text-[10px] font-medium uppercase tracking-wide text-foreground">
                    {link.badge}
                  </span>
                ) : null}
              </span>
            </FooterTextLink>
            {link.description ? (
              <p className="mt-0.5 max-w-[18rem] text-xs leading-relaxed text-muted-foreground/80">
                {link.description}
              </p>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

export function ResponsiveNavGroup({
  group,
  className,
}: {
  group: FooterNavGroup
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const headingId = useId()

  return (
    <section className={cn("border-b border-border py-3 md:border-0 md:py-0", className)}>
      <h3 id={headingId} className="text-sm font-medium text-foreground">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 py-1 text-left md:pointer-events-none md:cursor-default"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
        >
          {group.title}
          <span
            aria-hidden
            className={cn(
              "grid size-6 place-items-center rounded-md border border-border text-xs text-muted-foreground transition-transform md:hidden",
              open && "rotate-45",
            )}
          >
            +
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={headingId} className={cn("md:block", open ? "block" : "hidden")}>
        <FooterLinkList links={group.links} className="mt-3" />
      </div>
    </section>
  )
}

export function FooterSocialLinks({
  socials,
  className,
}: {
  socials: FooterSocialLink[]
  className?: string
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {socials.map((social) => {
        const Icon = social.icon ?? SOCIAL_ICONS[social.label] ?? ArrowUpRight
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="grid size-9 place-items-center rounded-full border border-border/80 bg-background/60 text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:text-foreground hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95"
            >
              <Icon className="size-4" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function FooterLegalBar({
  copyright,
  legal,
  className,
  children,
}: {
  copyright: string
  legal?: FooterLegalLink[]
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p>{copyright}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {legal?.map((item) => (
          <FooterTextLink key={item.href} href={item.href} className="text-xs">
            {item.label}
          </FooterTextLink>
        ))}
        {children}
      </div>
    </div>
  )
}

export function FooterNewsletter({
  config,
  idPrefix,
  className,
  variant = "default",
}: {
  config: FooterNewsletterConfig
  idPrefix?: string
  className?: string
  variant?: "default" | "inline" | "stacked"
}) {
  const reduceMotion = useReducedMotion()
  const autoId = useId()
  const fieldId = `${idPrefix ?? autoId}-email`
  const [value, setValue] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!value.trim() || status === "loading") return
    setStatus("loading")
    try {
      await config.onSubscribe?.(value.trim())
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  const title = config.title ?? "Stay in the loop"
  const submitLabel = config.submitLabel ?? "Subscribe"

  return (
    <div className={className}>
      {config.title !== "" ? (
        <p className="text-sm font-medium text-foreground">{title}</p>
      ) : null}
      {config.description ? (
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{config.description}</p>
      ) : null}
      <form
        onSubmit={onSubmit}
        className={cn("mt-3", variant === "stacked" ? "space-y-2" : "flex gap-2")}
        noValidate
      >
        <div className="min-w-0 flex-1">
          <Label htmlFor={fieldId} className="sr-only">
            {config.label ?? "Work email"}
          </Label>
          <Input
            id={fieldId}
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            disabled={status === "loading" || status === "success"}
            placeholder={config.placeholder ?? "you@company.com"}
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
              if (status === "error") setStatus("idle")
            }}
            aria-invalid={status === "error"}
            aria-describedby={status !== "idle" ? `${fieldId}-status` : undefined}
          />
        </div>
        <Button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={cn("shrink-0", variant === "stacked" && "w-full")}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={status}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: FOOTER_EASE }}
              className="inline-flex items-center gap-1.5"
            >
              {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : null}
              {status === "success" ? <Check className="size-4" /> : null}
              {status === "success" ? "Subscribed" : status === "loading" ? "Sending" : submitLabel}
            </motion.span>
          </AnimatePresence>
        </Button>
      </form>
      <p
        id={`${fieldId}-status`}
        role="status"
        aria-live="polite"
        className={cn(
          "mt-2 min-h-5 text-xs",
          status === "success" && "text-emerald-600 dark:text-emerald-400",
          status === "error" && "text-destructive",
          status === "idle" && "sr-only",
        )}
      >
        {status === "success"
          ? (config.successMessage ?? "You’re on the list. We’ll write when there’s something worth reading.")
          : status === "error"
            ? "Something went wrong. Please try again."
            : ""}
      </p>
    </div>
  )
}

const STATUS_LABEL: Record<FooterStatusItem["status"], string> = {
  operational: "Operational",
  degraded: "Degraded performance",
  outage: "Outage",
  maintenance: "Maintenance",
}

const STATUS_CLASS: Record<FooterStatusItem["status"], string> = {
  operational: "bg-emerald-500",
  degraded: "bg-amber-500",
  outage: "bg-red-500",
  maintenance: "bg-sky-500",
}

export function StatusDot({
  status,
  className,
}: {
  status: FooterStatusItem["status"]
  className?: string
}) {
  return (
    <span className={cn("relative flex size-2.5", className)}>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-full opacity-40 motion-safe:animate-ping",
          STATUS_CLASS[status],
          status !== "operational" && "motion-safe:animate-none",
        )}
      />
      <span aria-hidden className={cn("relative size-2.5 rounded-full", STATUS_CLASS[status])} />
      <span className="sr-only">{STATUS_LABEL[status]}</span>
    </span>
  )
}

export function FooterReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: FOOTER_EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Film-grain overlay. Pair with a relative parent. */
export function FooterGrain({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-noise opacity-[0.28] mix-blend-multiply",
        className,
      )}
    />
  )
}

/** Hairline column grid that fades toward the bottom. */
export function FooterGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.045)_1px,transparent_1px)] bg-size-[56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent)]",
        className,
      )}
    />
  )
}

export function defaultCopyright(name: string, copyright?: string) {
  return copyright ?? `© ${new Date().getFullYear()} ${name}. All rights reserved.`
}

export const DEFAULT_SOCIALS: FooterSocialLink[] = [
  { label: "GitHub", href: "https://github.com" },
  { label: "X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
]

export const DEFAULT_LEGAL: FooterLegalLink[] = [
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
  { label: "Cookies", href: "#cookies" },
]
