import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { FrameBand } from "@/components/compare/frame";
import { FaqAccordion } from "@/components/compare/faq-accordion";
import {
  generateBreadcrumbStructuredData,
  generateFAQStructuredData,
} from "@/lib/seo-utils";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const url = `${siteConfig.url}/best-react-component-libraries`;

export const metadata: Metadata = {
  title: { absolute: "Best React UI Component Libraries (2026)" },
  description:
    "A practical, up-to-date guide to the best React UI component libraries in 2026 — Spectrum UI, shadcn/ui, MUI, Chakra UI, Radix UI, Mantine, Ant Design, Aceternity UI, Magic UI, and HeroUI. Compare price, styling, accessibility, and which to pick for your Next.js project.",
  keywords: [
    "best React UI component libraries",
    "best React component library 2026",
    "React component library comparison",
    "React UI library",
    "production-ready React components",
    "shadcn alternative",
    "MUI alternative",
    "Tailwind component library",
    "Next.js component library",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Best React UI Component Libraries (2026)",
    description:
      "The best React UI component libraries for Next.js in 2026, compared.",
    url,
    type: "article",
    siteName: "Spectrum UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best React UI Component Libraries (2026)",
    description:
      "The best React UI component libraries for Next.js in 2026, compared.",
  },
};

interface Entry {
  name: string;
  url: string;
  internalHref?: string;
  internalLabel?: string;
  summary: string;
  bestFor: string;
  price: string;
}

const entries: Entry[] = [
  {
    name: "Spectrum UI",
    url: "https://ui.spectrumhq.in",
    internalHref: "/docs",
    internalLabel: "Browse components →",
    summary:
      "Ship polished, animated interfaces in minutes — production-ready React & Next.js components that already move, so you skip wiring Framer Motion by hand. You own every line (copy-pasted into your repo) and they're accessible out of the box via Radix. Install with the shadcn CLI, or let Cursor and Claude add them straight from your editor through the MCP server. Free and open source (MIT).",
    bestFor: "Shipping polished, animated product UIs fast",
    price: "Free (MIT)",
  },
  {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    internalHref: "/compare/spectrum-ui-vs-shadcn",
    internalLabel: "Compare with Spectrum UI →",
    summary:
      "The de-facto standard: unstyled, copy-paste components built on Radix UI and Tailwind CSS. You own the code and style it yourself. Minimal and unopinionated — a foundation you extend.",
    bestFor: "An unopinionated base component layer",
    price: "Free (MIT)",
  },
  {
    name: "Material UI (MUI)",
    url: "https://mui.com",
    summary:
      "A comprehensive React library implementing Google's Material Design, with a huge component set and theming system. Free core plus paid MUI X and templates for advanced data components.",
    bestFor: "Material Design and large enterprise apps",
    price: "Free core · paid MUI X",
  },
  {
    name: "Chakra UI",
    url: "https://chakra-ui.com",
    summary:
      "An accessible, themeable React component library with a clean styling API. Batteries-included components and strong defaults for building consistent UIs quickly.",
    bestFor: "Accessible, themeable apps without Tailwind",
    price: "Free (MIT)",
  },
  {
    name: "Radix UI",
    url: "https://www.radix-ui.com",
    summary:
      "Unstyled, accessible React primitives (dialogs, menus, popovers) that handle behavior and a11y while you bring the styles. The accessibility layer under shadcn/ui and Spectrum UI.",
    bestFor: "Accessible primitives you style yourself",
    price: "Free (MIT)",
  },
  {
    name: "Mantine",
    url: "https://mantine.dev",
    summary:
      "A full-featured React library with 100+ components and a rich hooks package. Strong TypeScript support and built-in features like forms, notifications, and modals.",
    bestFor: "A complete toolkit with hooks included",
    price: "Free (MIT)",
  },
  {
    name: "Ant Design",
    url: "https://ant.design",
    summary:
      "An enterprise-grade React UI language with an extensive component set, especially strong for data-dense dashboards and admin panels.",
    bestFor: "Enterprise dashboards and admin panels",
    price: "Free (MIT)",
  },
  {
    name: "Aceternity UI",
    url: "https://ui.aceternity.com",
    internalHref: "/compare/spectrum-ui-vs-aceternity",
    internalLabel: "Compare with Spectrum UI →",
    summary:
      "Free, animation-heavy React components known for bold hero and landing-page effects, built with Tailwind and Framer Motion. Paid Pro templates available.",
    bestFor: "Marketing pages and hero animations",
    price: "Free · paid Pro",
  },
  {
    name: "Magic UI",
    url: "https://magicui.design",
    internalHref: "/compare/spectrum-ui-vs-magic-ui",
    internalLabel: "Compare with Spectrum UI →",
    summary:
      "A free, open-source set of animated components and effects that complements shadcn/ui, built with Tailwind and Framer Motion. Paid Pro templates available.",
    bestFor: "A broad catalog of animated effects",
    price: "Free · paid Pro",
  },
  {
    name: "HeroUI",
    url: "https://www.heroui.com",
    summary:
      "A modern React UI library (formerly NextUI) built on Tailwind CSS with a polished, opinionated default look and solid accessibility.",
    bestFor: "A polished Tailwind default look",
    price: "Free (MIT)",
  },
];

const faqs = [
  {
    question: "What is the best React UI component library in 2026?",
    answer:
      "It depends on your goal. shadcn/ui is the most popular unstyled foundation; MUI, Chakra UI, Mantine, and Ant Design are full component suites; and Spectrum UI, Aceternity UI, and Magic UI focus on animated, copy-paste components. For animated components that work with shadcn/ui and install via its CLI, Spectrum UI is a strong pick — it's free, MIT-licensed, accessible, and ships an MCP server for AI assistants.",
  },
  {
    question: "Which React component libraries are free and open source?",
    answer:
      "Spectrum UI, shadcn/ui, Chakra UI, Radix UI, Mantine, Ant Design, and HeroUI are free and open source. MUI has a free core with paid MUI X; Aceternity UI and Magic UI offer free components plus paid Pro templates.",
  },
  {
    question: "Which library is best with Tailwind CSS and shadcn/ui?",
    answer:
      "Spectrum UI, Magic UI, and Aceternity UI are built with Tailwind and work alongside shadcn/ui. Spectrum UI installs with the shadcn CLI (npx shadcn add @spectrumui/…) and follows Radix conventions, so it drops into an existing shadcn project.",
  },
  {
    question: "Which React component library works best with AI coding assistants?",
    answer:
      "Spectrum UI ships an MCP server, so assistants like Cursor, Claude Code, and Windsurf can pull the exact component source with the right imports directly into your project.",
  },
];

export default function BestReactLibrariesPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best React UI component libraries (2026)",
    itemListElement: entries.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      url: e.url,
      description: e.summary,
    })),
  };
  const faqLd = generateFAQStructuredData(faqs);
  const breadcrumbLd = generateBreadcrumbStructuredData([
    { name: "Home", url: siteConfig.url },
    { name: "Best React UI Component Libraries", url },
  ]);

  return (
    <>
      <Script
        id="best-react-itemlist-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Script
        id="best-react-faq-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Script
        id="best-react-breadcrumb-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Header */}
      <FrameBand>
        <section className="container py-16 md:py-24">
          <BreadcrumbNav
            items={[{ label: "Best React UI Component Libraries" }]}
            className="mb-10"
          />
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="-rotate-90">
              <span className="block size-[9px] border-b-2 border-r-2 border-[#f9452d] dark:border-[#E1F435]" />
            </span>
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[#171717] dark:text-neutral-300">
              Guide · 2026
            </span>
          </div>
          <h1 className="mt-6 max-w-[18ch] font-spectral text-[36px] leading-[1.02] tracking-[-1.6px] text-[#111110] dark:text-neutral-50 md:text-[56px]">
            Best React UI component libraries
          </h1>
          <p className="mt-6 max-w-[62ch] font-inter text-[17px] leading-[1.65] tracking-[-0.2px] text-[#080808]/62 dark:text-neutral-400 md:text-[19px]">
            From unstyled foundations to full suites to animated component kits,
            here are the React UI component libraries worth knowing in 2026 —
            what each is best for, and how they&apos;re priced. Looking for motion
            specifically? See our{" "}
            <Link
              href="/best-animated-react-component-libraries"
              className="text-[#f9452d] underline-offset-4 hover:underline dark:text-[#E1F435]"
            >
              animated libraries roundup
            </Link>
            .
          </p>
        </section>
      </FrameBand>

      {/* Ranked list */}
      <FrameBand>
        <section className="container py-6 md:py-8">
          <ol className="max-w-[880px]">
            {entries.map((e, i) => {
              const ours = e.name === "Spectrum UI";
              return (
                <li
                  key={e.name}
                  className="flex gap-6 border-b border-border py-9 last:border-b-0 md:gap-10 md:py-11"
                >
                  <div
                    className={cn(
                      "shrink-0 pt-1 font-spectral text-[26px] leading-none tabular-nums md:text-[32px]",
                      ours
                        ? "text-[#f9452d] dark:text-[#E1F435]"
                        : "text-[#080808]/20 dark:text-neutral-700"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h2 className="font-spectral text-[22px] leading-[1.15] tracking-[-0.6px] text-[#111110] dark:text-neutral-50 md:text-[26px]">
                        {e.name}
                      </h2>
                      {ours && (
                        <span className="rounded-full bg-[#f9452d]/12 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-widest text-[#f9452d] dark:bg-[#E1F435]/12 dark:text-[#E1F435]">
                          Our pick
                        </span>
                      )}
                    </div>
                    <p className="mt-3 max-w-[64ch] font-inter text-[14.5px] leading-[1.6] tracking-[-0.2px] text-[#080808]/68 dark:text-neutral-400">
                      {e.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-inter text-[13px] tracking-[-0.2px] text-[#080808]/55 dark:text-neutral-500">
                      <span>
                        <span className="text-[#080808]/80 dark:text-neutral-300">
                          Best for
                        </span>{" "}
                        {e.bestFor}
                      </span>
                      <span aria-hidden className="text-[#080808]/25 dark:text-neutral-700">
                        ·
                      </span>
                      <span>{e.price}</span>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                      {e.internalHref && (
                        <Link
                          href={e.internalHref}
                          className="font-inter text-[13px] font-medium text-[#f9452d] underline-offset-4 hover:underline dark:text-[#E1F435]"
                        >
                          {e.internalLabel ?? "Learn more →"}
                        </Link>
                      )}
                      <a
                        href={e.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-inter text-[13px] font-medium text-[#080808]/55 underline-offset-4 hover:text-[#111110] hover:underline dark:text-neutral-500 dark:hover:text-neutral-200"
                      >
                        Visit site →
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </FrameBand>

      {/* FAQ */}
      <FrameBand>
        <FaqAccordion
          eyebrow="FAQ"
          title={
            <>
              Choosing a React
              <br />
              component library
            </>
          }
          faqs={faqs}
        />
      </FrameBand>
    </>
  );
}
