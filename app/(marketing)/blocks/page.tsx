import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { FrameBand } from "@/components/compare/frame";
import { generateBreadcrumbStructuredData } from "@/lib/seo-utils";
import { siteConfig } from "@/config/site";

const url = `${siteConfig.url}/blocks`;

export const metadata: Metadata = {
  title: {
    absolute: "React UI Blocks — Pre-built Sections (Hero, Pricing, Dashboard)",
  },
  description:
    "Free, copy-paste React UI blocks for Next.js — navbars, hero and feature sections, pricing and login cards, testimonials, and full dashboards. Built with Tailwind CSS and Framer Motion; install with the shadcn CLI.",
  keywords: [
    "React UI blocks",
    "pre-built UI blocks",
    "Tailwind UI blocks",
    "shadcn blocks",
    "hero section component",
    "pricing block",
    "dashboard blocks",
    "copy paste blocks",
    "Next.js UI blocks",
    "landing page blocks",
  ],
  alternates: { canonical: url },
  openGraph: {
    title: "React UI Blocks — Pre-built Sections for Next.js",
    description:
      "Free, copy-paste React UI blocks — navbars, hero sections, pricing, testimonials, and dashboards.",
    url,
    type: "website",
    siteName: "Spectrum UI",
  },
};

interface Block {
  name: string;
  description: string;
  href: string;
}

interface BlockGroup {
  category: string;
  blocks: Block[];
}

const groups: BlockGroup[] = [
  {
    category: "Navigation",
    blocks: [
      {
        name: "Navbar",
        description:
          "Responsive navbars — circular, tab, floating, and sidebar patterns.",
        href: "/docs/navbar",
      },
      {
        name: "Footer",
        description: "Footers with wave, stacked, and particle animation styles.",
        href: "/docs/footer",
      },
    ],
  },
  {
    category: "Hero & marketing sections",
    blocks: [
      {
        name: "Bento Grid",
        description:
          "A bento grid for hero and feature sections, with physics-based hover and scroll animations.",
        href: "/docs/bento-grid",
      },
      {
        name: "Animated Testimonials",
        description:
          "An animated testimonials section for customer reviews and social proof.",
        href: "/docs/animatedtestimonials",
      },
      {
        name: "Testimonials",
        description:
          "A testimonials section for showcasing reviews and social proof.",
        href: "/docs/testimonials",
      },
      {
        name: "Feedback Card",
        description:
          "A feedback card that collects ratings and comments with emoji reactions.",
        href: "/docs/feedback",
      },
    ],
  },
  {
    category: "Pricing & authentication",
    blocks: [
      {
        name: "Cards",
        description:
          "Pre-designed cards for login, signup, pricing, and dashboards.",
        href: "/docs/card",
      },
      {
        name: "Login Card",
        description: "A login form card for authentication pages and SaaS apps.",
        href: "/docs/login",
      },
      {
        name: "Multistep Form",
        description:
          "A multi-step form with progress indicators for registration and checkout.",
        href: "/docs/multistepform",
      },
    ],
  },
  {
    category: "Dashboards & data",
    blocks: [
      {
        name: "Templates",
        description: "Full page templates, including ready-to-copy dashboards.",
        href: "/templates",
      },
      {
        name: "Event Calendar",
        description:
          "An interactive calendar for events, appointments, and schedules.",
        href: "/docs/eventcalendar",
      },
      {
        name: "Kanban Board",
        description:
          "A drag-and-drop kanban board for organizing tasks into columns.",
        href: "/docs/kanban",
      },
    ],
  },
];

export default function BlocksPage() {
  const allBlocks = groups.flatMap((g) => g.blocks);
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Spectrum UI blocks",
    itemListElement: allBlocks.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      url: `${siteConfig.url}${b.href}`,
      description: b.description,
    })),
  };
  const breadcrumbLd = generateBreadcrumbStructuredData([
    { name: "Home", url: siteConfig.url },
    { name: "Blocks", url },
  ]);

  return (
    <>
      <Script
        id="blocks-itemlist-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Script
        id="blocks-breadcrumb-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
      <FrameBand>
        <section className="container py-16 md:py-24">
          <BreadcrumbNav items={[{ label: "Blocks" }]} className="mb-10" />
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="-rotate-90">
              <span className="block size-[9px] border-b-2 border-r-2 border-[#f9452d] dark:border-[#E1F435]" />
            </span>
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[#171717] dark:text-neutral-300">
              Blocks
            </span>
          </div>
          <h1 className="mt-6 max-w-[16ch] font-spectral text-[36px] leading-[1.02] tracking-[-1.6px] text-[#111110] dark:text-neutral-50 md:text-[56px]">
            Pre-built UI blocks
          </h1>
          <p className="mt-6 max-w-[62ch] font-inter text-[13px] leading-[1.65] tracking-[-0.2px] text-[#080808]/62 dark:text-neutral-400 md:text-[15px]">
            Free, copy-paste React &amp; Next.js blocks — navbars, hero and
            feature sections, pricing and login cards, testimonials, and full
            dashboards. Built with Tailwind CSS and Framer Motion; install with
            the shadcn CLI.
          </p>
        </section>
      </FrameBand>

      {/* Block groups */}
      <FrameBand>
        <section className="container space-y-16 py-16 md:space-y-20 md:py-20">
          {groups.map((group) => (
            <div key={group.category}>
              <h2 className="mb-8 font-spectral text-[24px] leading-[1.12] tracking-[-0.8px] text-[#111110] dark:text-neutral-50 md:text-[30px]">
                {group.category}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.blocks.map((b) => (
                  <Link
                    key={b.href}
                    href={b.href}
                    className="group flex flex-col rounded-2xl border border-border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#f9452d]/40 hover:bg-muted/30 dark:hover:border-[#E1F435]/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-spectral text-[18px] leading-[1.2] tracking-[-0.4px] text-[#111110] dark:text-neutral-50">
                        {b.name}
                      </h3>
                      <ArrowUpRight className="size-[17px] shrink-0 text-neutral-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f9452d] dark:group-hover:text-[#E1F435]" />
                    </div>
                    <p className="mt-2 font-inter text-[13.5px] leading-[1.55] tracking-[-0.2px] text-[#080808]/62 dark:text-neutral-400">
                      {b.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </FrameBand>

      {/* Footer link */}
      <FrameBand>
        <section className="container py-14 md:py-16">
          <Link
            href="/docs"
            className="group inline-flex items-center gap-1.5 font-inter text-[15px] font-medium text-[#111110] underline-offset-4 hover:underline dark:text-neutral-100"
          >
            Browse all components
            <ArrowUpRight className="size-4 text-[#f9452d] transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-[#E1F435]" />
          </Link>
        </section>
      </FrameBand>
    </>
  );
}
