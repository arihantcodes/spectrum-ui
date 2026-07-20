"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { DOCS } from "@/app/(docs)/layout-parts/documentation.constant";
import { TOPIC_HUB_GROUPS, TOPIC_HUB_LINKS, topicHubPath } from "@/lib/topic-hub-links";
import { Icons } from "./icon";

/** Every component doc page, sourced from the docs nav so the footer stays in
 *  sync automatically. Deduped by URL — comprehensive internal links for SEO. */
const componentLinks = (
  DOCS.find((group) => group.groupKey === "components")?.children ?? []
).filter((item, i, arr) => arr.findIndex((x) => x.url === item.url) === i);

type IconProps = React.HTMLAttributes<SVGElement>;

/** Filled LinkedIn glyph (matches the filled github / X marks). */
const LinkedInIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const revealEase = [0.22, 1, 0.36, 1] as const;

/** Scroll reveal, matching the FAQ section's pattern one section above. */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: revealEase, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Dot terminal that caps the corners of the framed footer. Shown only where
 *  the frame border is visible (matches `container-frame`'s min-[1400px] rule). */
function CornerDot({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      initial={reduceMotion ? false : { scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
      className={cn(
        "pointer-events-none absolute z-10 hidden size-5 items-center justify-center rounded-full bg-background min-[1400px]:flex",
        className,
      )}
    >
      <span className="size-[3px] rounded-full bg-foreground" />
    </motion.span>
  );
}

/** Footer link — shifts to the site's accent orange on hover (same accent the
 *  FAQ section uses). */
function FooterLink({
  href,
  children,
  prefetch,
}: {
  href: string;
  children: React.ReactNode;
  prefetch?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="block py-[7px] font-inter text-sm font-medium leading-[21px] text-black transition-colors duration-200 ease-out hover:text-[#f9452d] dark:text-neutral-300 dark:hover:text-[#E1F435]"
    >
      {children}
    </Link>
  );
}

const socialLinks = [
  { label: "GitHub", href: siteConfig.links.github, Icon: Icons.gitHub },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedInIcon },
  { label: "X", href: siteConfig.links.twitter, Icon: Icons.twitter },
];

const linkColumns = TOPIC_HUB_GROUPS.map((group) => ({
  group,
  links: TOPIC_HUB_LINKS.flatMap((hub) =>
    hub.group === group
      ? [
          {
            label: hub.label,
            href: topicHubPath(hub.slug),
          },
        ]
      : [],
  ),
}));

const WATERMARK = "SPECTRUM UI";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on auth/onboarding pages (they have their own layout)
  const hideOnRoutes = ["/sign-in", "/create-user"];
  if (hideOnRoutes.some((r) => pathname === r || pathname.startsWith(r + "/"))) {
    return null;
  }

  return (
    <footer className="w-full">
      {/* One framed box aligned with the site's `container-frame`: the vertical
          (Y) borders match the sections above and run to the very bottom. */}
      <div className="container-frame relative">
        <CornerDot className="-left-2.5 -top-2.5" />
        <CornerDot className="-right-2.5 -top-2.5" />
        <CornerDot className="-bottom-2.5 -left-2.5" />
        <CornerDot className="-bottom-2.5 -right-2.5" />

        {/* CTA band */}
        <Reveal className="flex flex-col items-start gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-14">
          <h2 className="font-spectral text-[28px] font-light leading-[34px] text-black dark:text-white sm:text-[32px] sm:leading-[36px]">
            Ship your next product
          </h2>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-2.5">
            <Link
              href="/docs"
              className="inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-full bg-white px-6 font-inter text-base text-black shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_2px_0_rgba(0,0,0,0.04),0_2px_4px_0_rgba(0,0,0,0.04)] transition-[transform,background-color,box-shadow] duration-200 ease-out hover:bg-neutral-50 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_4px_0_rgba(0,0,0,0.06),0_4px_8px_0_rgba(0,0,0,0.06)] active:scale-[0.97] motion-safe:hover:-translate-y-0.5 dark:bg-neutral-900 dark:text-white dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)] dark:hover:bg-neutral-800 sm:w-auto"
            >
              Browse components
            </Link>
            <Link
              href="/docs/mcp"
              className="group inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-full bg-black px-6 font-inter text-base text-white transition-[transform,background-color] duration-200 ease-out hover:bg-neutral-800 active:scale-[0.97] dark:bg-white dark:text-black dark:hover:bg-neutral-200 sm:w-auto"
            >

              Install MCP
              <span className="inline-flex w-0 -translate-x-1 items-center justify-end overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Footer body */}
        <div className="flex flex-col gap-12 px-5 pb-12 sm:px-8 md:px-10 md:pb-14">
          {/* Logo + socials */}
          <Reveal className="flex items-center justify-between gap-4">
            <Link href="/" className="group flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-md border border-dashed border-black/10 bg-[#f9f9f9] transition-colors duration-300 group-hover:border-black/25 dark:border-white/15 dark:bg-neutral-900 dark:group-hover:border-white/30">
                <Icons.logo className="h-[18px] w-auto text-black transition-transform duration-500 ease-out motion-safe:group-hover:rotate-180 dark:text-white" />
              </span>
              <span className="font-mono text-xl font-medium tracking-[-0.03px] text-[#555] transition-colors duration-300 group-hover:text-black dark:text-neutral-400 dark:group-hover:text-white">
                SPECTRUM UI
              </span>
            </Link>

            <div className="flex items-center gap-[7px]">
              {socialLinks.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-6 items-center justify-center rounded-md bg-black text-white transition-all duration-200 ease-out hover:bg-neutral-700 active:scale-90 motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-110 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                  <Icon className="size-3.5" />
                </Link>
              ))}
            </div>
          </Reveal>

          {/* Link columns */}
          <Reveal>
            <nav className="flex flex-wrap justify-center gap-x-[74px] gap-y-10">
              {linkColumns.map((column) => (
                <div key={column.group} className="min-w-[150px]">
                  <h3 className="mb-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                    {column.group}
                  </h3>
                  <ul className="flex flex-col gap-1">
                    {column.links.map((item) => (
                      <li key={item.label}>
                        <FooterLink href={item.href}>{item.label}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </Reveal>

          {/* All components — full internal link map for SEO / crawlability */}
          <Reveal>
            <section className="flex flex-col gap-5 border-t border-border pt-10">
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.28px] text-neutral-500">
                Components
                <span className="ml-2 text-neutral-400 dark:text-neutral-600">
                  {componentLinks.length}
                </span>
              </h3>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-0.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {componentLinks.map((c) => (
                  <li key={c.url}>
                    <FooterLink href={c.url} prefetch={false}>
                      {c.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* Copyright + closing wordmark */}
          <Reveal>
            <p className="text-center font-mono text-sm font-medium tracking-[0.28px] text-black dark:text-neutral-400">
              © {new Date().getFullYear()} SPECTRUM UI. ALL RIGHTS RESERVED.
            </p>


          </Reveal>
        </div>
      </div>
    </footer>
  );
}
