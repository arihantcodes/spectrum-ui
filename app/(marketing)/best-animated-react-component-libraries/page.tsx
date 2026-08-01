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

const url = `${siteConfig.url}/best-animated-react-component-libraries`;

export const metadata: Metadata = {
  title: {
    absolute: "Best Animated React Component Libraries (2026)",
  },
  description:
    "A practical roundup of the best animated React component libraries in 2026 — Spectrum UI, Aceternity UI, Magic UI, shadcn/ui, React Bits, and Animate UI. Free, copy-paste, Tailwind + Framer Motion components for Next.js.",
  keywords: [
    "best animated React component libraries",
    "animated React components 2026",
    "React animation library",
    "Framer Motion component library",
    "free React UI components",
    "copy paste React components",
    "Tailwind animated components",
    "best React component library 2026",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Best Animated React Component Libraries (2026)",
    description:
      "The best free, copy-paste animated React component libraries for Next.js in 2026.",
    url,
    type: "article",
    siteName: "Spectrum UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Animated React Component Libraries (2026)",
    description:
      "The best free, copy-paste animated React component libraries for Next.js in 2026.",
  },
};

interface Entry {
  name: string;
  url: string;
  internalHref?: string;
  summary: string;
  bestFor: string;
  price: string;
}

const entries: Entry[] = [
  {
    name: "Spectrum UI",
    url: "https://ui.spectrumhq.in",
    internalHref: "/docs",
    summary:
      "Ship polished, animated interfaces in minutes — production-ready React & Next.js components that already move, so you skip wiring Framer Motion by hand. You own every line (copy-pasted into your repo) and they're accessible out of the box via Radix. Install with the shadcn CLI, or let Cursor and Claude add them straight from your editor through the MCP server. Free and open source (MIT).",
    bestFor: "Shipping polished, animated product UIs fast",
    price: "Free (MIT)",
  },
  {
    name: "Aceternity UI",
    url: "https://ui.aceternity.com",
    internalHref: "/compare/spectrum-ui-vs-aceternity",
    summary:
      "Free, animation-heavy React components known for bold hero and landing-page effects, built with Tailwind and Framer Motion. Paid Pro templates available.",
    bestFor: "Marketing pages and eye-catching hero sections",
    price: "Free · paid Pro",
  },
  {
    name: "Magic UI",
    url: "https://magicui.design",
    internalHref: "/compare/spectrum-ui-vs-magic-ui",
    summary:
      "Free, open-source collection of animated components and effects that complements shadcn/ui, built with Tailwind and Framer Motion. Paid Pro templates available.",
    bestFor: "A broad catalog of animated effects",
    price: "Free · paid Pro",
  },
  {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    internalHref: "/compare/spectrum-ui-vs-shadcn",
    summary:
      "The widely adopted, unstyled foundation of copy-paste React components on Radix UI and Tailwind CSS. Minimal by design — pair it with an animated layer like Spectrum UI for motion.",
    bestFor: "Your unopinionated base component layer",
    price: "Free (MIT)",
  },
  {
    name: "React Bits",
    url: "https://reactbits.dev",
    summary:
      "A free collection of animated React snippets and creative effects you can copy into projects — great for one-off flourishes and micro-interactions.",
    bestFor: "Creative one-off animation snippets",
    price: "Free",
  },
  {
    name: "Animate UI",
    url: "https://animate-ui.com",
    summary:
      "A free, open-source library of animated components built on top of shadcn/ui and Framer Motion, focused on motion-first primitives.",
    bestFor: "Motion-first shadcn add-ons",
    price: "Free",
  },
];

const faqs = [
  {
    question: "What is the best animated React component library in 2026?",
    answer:
      "There's no single winner — it depends on your goal. Spectrum UI is best for animated, accessible components in real products (free, MIT, installs with the shadcn CLI, ships an MCP server). Aceternity UI is best for bold landing-page hero effects, Magic UI for a broad catalog of effects, and shadcn/ui as the unstyled base layer you add animation on top of.",
  },
  {
    question: "Are these animated React component libraries free?",
    answer:
      "Spectrum UI, shadcn/ui, React Bits, and Animate UI are free and open source. Aceternity UI and Magic UI offer free components plus paid Pro templates.",
  },
  {
    question: "Can I use these libraries with shadcn/ui and Next.js?",
    answer:
      "Yes. Spectrum UI, Magic UI, and Animate UI are designed to work alongside shadcn/ui, and all of these ship copy-paste React and Tailwind components that drop into a Next.js project. Spectrum UI installs with the shadcn CLI (npx shadcn add @spectrumui/…).",
  },
  {
    question: "Which library works best with AI coding assistants?",
    answer:
      "Spectrum UI ships an MCP server, so assistants like Cursor, Claude Code, and Windsurf can pull the exact component source with the right imports directly into your project.",
  },
];

export default function BestAnimatedLibrariesPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best animated React component libraries (2026)",
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
    { name: "Best Animated React Component Libraries", url },
  ]);

  return (
    <>
      <Script
        id="best-libraries-itemlist-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Script
        id="best-libraries-faq-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Script
        id="best-libraries-breadcrumb-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Header */}
      <FrameBand>
        <section className="container py-14 md:py-20">
          <BreadcrumbNav
            items={[{ label: "Best Animated React Component Libraries" }]}
            className="mb-8"
          />
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="-rotate-90">
              <span className="block size-[9px] border-b-2 border-r-2 border-[#f9452d] dark:border-[#E1F435]" />
            </span>
            <span className="font-mono text-[12px] font-medium uppercase leading-[16.8px] text-[#171717] dark:text-neutral-200">
              Roundup · 2026
            </span>
          </div>
          <h1 className="mt-4 max-w-[820px] font-spectral text-[34px] leading-[1.03] tracking-[-1.5px] text-[#2d2f2e] dark:text-neutral-100 md:text-[52px]">
            Best animated React component libraries
          </h1>
          <p className="mt-4 max-w-[680px] font-inter text-[17px] leading-7 tracking-[-0.32px] text-[#080808]/70 dark:text-neutral-400">
            If you want motion without wiring every animation by hand, these
            free, copy-paste libraries pair Tailwind CSS with Framer Motion for
            React and Next.js. Here&apos;s how the best options compare in 2026,
            and what each is best for.
          </p>
        </section>
      </FrameBand>

      {/* Ranked list — editorial, divided */}
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
                          {e.internalHref.startsWith("/compare")
                            ? "Compare with Spectrum UI →"
                            : "Browse components →"}
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

      {/* FAQ — landing accordion */}
      <FrameBand>
        <FaqAccordion
          eyebrow="FAQ"
          title={
            <>
              Choosing an animated
              <br />
              React library
            </>
          }
          faqs={faqs}
        />
      </FrameBand>
    </>
  );
}
