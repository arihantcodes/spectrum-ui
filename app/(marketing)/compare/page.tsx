import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { FrameBand } from "@/components/compare/frame";
import { comparisons } from "@/lib/comparisons";
import { generateBreadcrumbStructuredData } from "@/lib/seo-utils";
import { siteConfig } from "@/config/site";

const url = `${siteConfig.url}/compare`;

export const metadata: Metadata = {
  title: { absolute: "Spectrum UI Comparisons & Alternatives" },
  description:
    "Compare Spectrum UI with other React component libraries — Aceternity UI, Magic UI, and shadcn/ui. Honest, side-by-side feature comparisons for animated, copy-paste Next.js components.",
  keywords: [
    "Spectrum UI comparison",
    "React component library comparison",
    "shadcn alternative",
    "Aceternity UI alternative",
    "Magic UI alternative",
    "best animated React components",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "Spectrum UI Comparisons & Alternatives",
    description:
      "Side-by-side comparisons of Spectrum UI vs Aceternity UI, Magic UI, and shadcn/ui.",
    url,
    type: "website",
    siteName: "Spectrum UI",
  },
};

export default function CompareHubPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Spectrum UI comparisons",
    itemListElement: comparisons.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.heading,
      url: `${siteConfig.url}/compare/${c.slug}`,
    })),
  };
  const breadcrumbLd = generateBreadcrumbStructuredData([
    { name: "Home", url: siteConfig.url },
    { name: "Compare", url },
  ]);

  return (
    <>
      <Script
        id="compare-itemlist-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Script
        id="compare-breadcrumb-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
      <FrameBand>
        <section className="container py-16 md:py-24">
          <BreadcrumbNav items={[{ label: "Compare" }]} className="mb-10" />
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="-rotate-90">
              <span className="block size-[9px] border-b-2 border-r-2 border-[#f9452d] dark:border-[#E1F435]" />
            </span>
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[#171717] dark:text-neutral-300">
              Compare
            </span>
          </div>
          <h1 className="mt-6 max-w-[16ch] font-spectral text-[36px] leading-[1.02] tracking-[-1.6px] text-[#111110] dark:text-neutral-50 md:text-[56px]">
            How Spectrum UI compares
          </h1>
          <p className="mt-6 max-w-[58ch] font-inter text-[17px] leading-[1.65] tracking-[-0.2px] text-[#080808]/62 dark:text-neutral-400 md:text-[19px]">
            Honest, side-by-side comparisons with other React component
            libraries. Spectrum UI is free, open source, animated, and installs
            with the shadcn CLI.
          </p>
        </section>
      </FrameBand>

      {/* Matchups — editorial divided list, not boxes */}
      <FrameBand>
        <section className="container py-4 md:py-6">
          <ul>
            {comparisons.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/compare/${c.slug}`}
                  className="group flex items-center gap-6 border-b border-border py-8 transition-colors duration-200 md:py-10"
                >
                  <div className="min-w-0 flex-1">
                    <h2 className="font-spectral text-[24px] leading-[1.12] tracking-[-0.8px] text-[#111110] transition-colors duration-200 group-hover:text-[#f9452d] dark:text-neutral-50 dark:group-hover:text-[#E1F435] md:text-[30px]">
                      Spectrum UI
                      <span className="mx-2 align-middle font-mono text-[0.42em] font-medium uppercase tracking-[0.12em] text-[#080808]/40 dark:text-neutral-500">
                        vs
                      </span>
                      {c.competitor}
                    </h2>
                    <p className="mt-2.5 max-w-[64ch] font-inter text-[14.5px] leading-[1.55] tracking-[-0.2px] text-[#080808]/60 dark:text-neutral-400">
                      {c.competitorPitch}
                    </p>
                  </div>
                  <span className="hidden size-11 shrink-0 items-center justify-center rounded-full border border-border text-[#080808]/50 transition-all duration-200 group-hover:border-[#f9452d] group-hover:bg-[#f9452d] group-hover:text-white dark:text-neutral-400 dark:group-hover:border-[#E1F435] dark:group-hover:bg-[#E1F435] dark:group-hover:text-black sm:flex">
                    <ArrowUpRight className="size-[18px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </FrameBand>

      {/* Roundup link */}
      <FrameBand>
        <section className="container py-14 md:py-16">
          <Link
            href="/best-animated-react-component-libraries"
            className="group inline-flex items-center gap-2 font-inter text-[15px] font-medium text-[#111110] underline-offset-4 hover:underline dark:text-neutral-100"
          >
            Read the roundup: best animated React component libraries (2026)
            <ArrowRight className="size-4 text-[#f9452d] transition-transform duration-200 ease-out group-hover:translate-x-0.5 dark:text-[#E1F435]" />
          </Link>
        </section>
      </FrameBand>
    </>
  );
}
