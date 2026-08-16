import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import {
  BLOCK_CATEGORIES,
  LIVE_BLOCKS,
  blockCategoryPath,
  blocksInCategory,
} from '@/lib/block-catalog';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbStructuredData } from '@/lib/seo-utils';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: { absolute: 'Blocks for React — Live Previews & Source' },
  description:
    'Installable interface sections for React and Next.js — AI assistant surfaces and production website footers — each with live previews, source, and a shadcn CLI command.',
  alternates: { canonical: `${siteConfig.url}/blocks` },
  openGraph: {
    title: 'Blocks — Spectrum UI',
    description: 'AI assistant surfaces and website footers, previewed live and installed with the shadcn CLI.',
    url: `${siteConfig.url}/blocks`,
    type: 'website',
    siteName: 'Spectrum UI',
  },
};

/**
 * Category index for /blocks. Each category is a scrolling specimen page of
 * live, full-size previews.
 */
export default function BlocksPage() {
  const url = `${siteConfig.url}/blocks`;
  const breadcrumb = generateBreadcrumbStructuredData([
    { name: 'Home', url: siteConfig.url },
    { name: 'Blocks', url },
  ]);

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Spectrum UI blocks',
    itemListElement: BLOCK_CATEGORIES.map((category, position) => ({
      '@type': 'ListItem',
      position: position + 1,
      name: category.name,
      description: category.tagline,
      url: `${siteConfig.url}${blockCategoryPath(category.slug)}`,
    })),
  };

  return (
    <>
      <JsonLd id="blocks-index-breadcrumb" data={breadcrumb} />
      <JsonLd id="blocks-index-itemlist" data={itemList} />

      <div className="py-12 lg:py-16">
        <header className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-600">
            {LIVE_BLOCKS.length} live blocks
          </p>
          <h1 className="mt-3 font-spectral text-[34px] leading-[1.1] tracking-[-0.7px] text-neutral-900 dark:text-neutral-50">
            Blocks
          </h1>
          <p className="mt-3 text-[14.5px] leading-[1.65] text-neutral-500 dark:text-neutral-400">
            Composed sections you install whole — AI chat surfaces and production website
            footers. Each one renders live, copies from a code drawer, and installs with the
            shadcn CLI.
          </p>
        </header>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {BLOCK_CATEGORIES.map((category) => {
            const count = blocksInCategory(category.slug).length;
            return (
              <li key={category.slug}>
                <Link
                  href={blockCategoryPath(category.slug)}
                  className="group flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-6 transition-colors hover:border-black/[0.12] dark:border-white/[0.08] dark:bg-white/[0.03] dark:hover:border-white/[0.16]"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-600">
                    {String(count).padStart(2, '0')} blocks
                  </p>
                  <h2 className="mt-3 font-spectral text-[24px] tracking-[-0.4px] text-neutral-900 dark:text-neutral-50">
                    {category.name}
                  </h2>
                  <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] text-neutral-500 dark:text-neutral-400">
                    {category.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-[13px] font-medium text-neutral-900 dark:text-neutral-100">
                    Open {category.name}
                    <ArrowUpRight className="size-3.5 text-[#f9452d] transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-[#E1F435]" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
