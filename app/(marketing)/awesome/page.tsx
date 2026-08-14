import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { FrameBand } from "@/components/compare/frame";
import { ROUTES } from "@/lib/routes-config";
import { comparisons } from "@/lib/comparisons";
import { generateBreadcrumbStructuredData } from "@/lib/seo-utils";
import { siteConfig } from "@/config/site";

const url = `${siteConfig.url}/awesome`;

export const metadata: Metadata = {
  title: { absolute: "Awesome Spectrum UI — Components, Guides & Resources" },
  description:
    "The complete Awesome Spectrum UI list: every free, copy-paste React & Next.js component, plus installation, the MCP server, comparisons, and resources. A curated reference for building with Tailwind CSS and shadcn/ui.",
  keywords: [
    "awesome spectrum ui",
    "awesome shadcn ui",
    "spectrum ui components list",
    "react component library resources",
    "shadcn components list",
    "tailwind components list",
    "copy paste react components",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Awesome Spectrum UI — Components, Guides & Resources",
    description:
      "A curated list of every Spectrum UI component, guide, and resource.",
    url,
    type: "website",
    siteName: "Spectrum UI",
  },
};

const components =
  ROUTES.find((g) => g.groupKey === "components")?.children ?? [];
const gettingStarted =
  ROUTES.find((g) => g.groupKey === "gettingStart")?.children ?? [];

const resources = [
  { label: "MCP Server (Cursor, Claude, Windsurf)", href: "/docs/mcp" },
  { label: "LLM info (facts for AI assistants)", href: "/llm-info" },
  { label: "Charts gallery", href: "/charts" },
  { label: "Colors & palettes", href: "/colors" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faqs" },
  {
    label: "GitHub repository",
    href: "https://github.com/arihantcodes/spectrum-ui",
    external: true,
  },
  { label: "llms.txt (for AI systems)", href: "/llms.txt", external: true },
  { label: "agents.md (for AI coding agents)", href: "/agents.md", external: true },
];

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <span aria-hidden className="-rotate-90">
          <span className="block size-[9px] border-b-2 border-r-2 border-[#f9452d] dark:border-[#E1F435]" />
        </span>
        <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[#171717] dark:text-neutral-300">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-spectral text-[24px] leading-[1.12] tracking-[-0.8px] text-[#111110] dark:text-neutral-50 md:text-[30px]">
        {title}
      </h2>
    </div>
  );
}

export default function AwesomePage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Awesome Spectrum UI",
    url,
    description:
      "A curated list of every Spectrum UI component, guide, and resource.",
    mainEntity: {
      "@type": "ItemList",
      name: "Spectrum UI components",
      itemListElement: components.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        url: `${siteConfig.url}${c.url}`,
      })),
    },
  };
  const breadcrumbLd = generateBreadcrumbStructuredData([
    { name: "Home", url: siteConfig.url },
    { name: "Awesome Spectrum UI", url },
  ]);

  return (
    <>
      <Script
        id="awesome-collection-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Script
        id="awesome-breadcrumb-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
      <FrameBand>
        <section className="container py-16 md:py-24">
          <BreadcrumbNav items={[{ label: "Awesome Spectrum UI" }]} className="mb-10" />
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="-rotate-90">
              <span className="block size-[9px] border-b-2 border-r-2 border-[#f9452d] dark:border-[#E1F435]" />
            </span>
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[#171717] dark:text-neutral-300">
              Awesome
            </span>
          </div>
          <h1 className="mt-6 max-w-[16ch] font-spectral text-[36px] leading-[1.02] tracking-[-1.6px] text-[#111110] dark:text-neutral-50 md:text-[56px]">
            Awesome Spectrum UI
          </h1>
          <p className="mt-6 max-w-[60ch] font-inter text-[17px] leading-[1.65] tracking-[-0.2px] text-[#080808]/62 dark:text-neutral-400 md:text-[19px]">
            A curated, single-page index of everything in Spectrum UI — every
            free, copy-paste React &amp; Next.js component, plus installation, the
            MCP server, comparisons, and resources. Built with Tailwind CSS,
            Radix UI, and Framer Motion.
          </p>
        </section>
      </FrameBand>

      {/* Getting started */}
      <FrameBand>
        <section className="container py-16 md:py-20">
          <SectionHeading eyebrow="Start here" title="Getting started" />
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ...gettingStarted,
              { label: "MCP Server", url: "/docs/mcp" },
            ].map((item) => (
              <li key={item.url}>
                <Link
                  href={item.url}
                  className="group inline-flex items-center gap-1.5 font-inter text-[15px] tracking-[-0.2px] text-[#080808]/80 transition-colors hover:text-[#f9452d] dark:text-neutral-300 dark:hover:text-[#E1F435]"
                >
                  {item.label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </FrameBand>

      {/* Components */}
      <FrameBand>
        <section className="container py-16 md:py-20">
          <SectionHeading
            eyebrow={`${components.length} components`}
            title="Every component"
          />
          <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((c) => (
              <li key={c.url}>
                <Link
                  href={c.url}
                  className="group inline-flex items-center gap-1.5 font-inter text-[14.5px] tracking-[-0.2px] text-[#080808]/75 transition-colors hover:text-[#f9452d] dark:text-neutral-400 dark:hover:text-[#E1F435]"
                >
                  {c.label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </FrameBand>

      {/* Compare & guides */}
      <FrameBand>
        <section className="container py-16 md:py-20">
          <SectionHeading eyebrow="Compare" title="Comparisons & guides" />
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {[
              { label: "How Spectrum UI compares", href: "/compare" },
              ...comparisons.map((c) => ({
                label: `Spectrum UI vs ${c.competitor}`,
                href: `/compare/${c.slug}`,
              })),
              {
                label: "Best React UI component libraries (2026)",
                href: "/best-react-component-libraries",
              },
              {
                label: "Best animated React component libraries (2026)",
                href: "/best-animated-react-component-libraries",
              },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-1.5 font-inter text-[15px] tracking-[-0.2px] text-[#080808]/80 transition-colors hover:text-[#f9452d] dark:text-neutral-300 dark:hover:text-[#E1F435]"
                >
                  {item.label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </FrameBand>

      {/* Resources */}
      <FrameBand>
        <section className="container py-16 md:py-20">
          <SectionHeading eyebrow="More" title="Resources" />
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) =>
              r.external ? (
                <li key={r.href}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-inter text-[15px] tracking-[-0.2px] text-[#080808]/80 transition-colors hover:text-[#f9452d] dark:text-neutral-300 dark:hover:text-[#E1F435]"
                  >
                    {r.label}
                    <ArrowUpRight className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ) : (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="group inline-flex items-center gap-1.5 font-inter text-[15px] tracking-[-0.2px] text-[#080808]/80 transition-colors hover:text-[#f9452d] dark:text-neutral-300 dark:hover:text-[#E1F435]"
                  >
                    {r.label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              )
            )}
          </ul>
        </section>
      </FrameBand>
    </>
  );
}
