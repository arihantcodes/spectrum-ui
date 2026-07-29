import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { BlockStage } from '@/components/blocks/block-stage';
import { blockPoster } from '@/components/blocks/previews';
import {
  BLOCK_CATEGORIES,
  LIVE_BLOCKS,
  blockCategoryPath,
  blockPath,
  blocksInCategory,
} from '@/lib/block-catalog';
import { generateBreadcrumbStructuredData } from '@/lib/seo-utils';
import { siteConfig } from '@/config/site';

const url = `${siteConfig.url}/blocks`;

export const metadata: Metadata = {
  title: { absolute: 'React UI Blocks — AI Chat, Agent and Assistant Sections' },
  description:
    'Copy-paste React blocks for AI products — conversation threads with streaming and markdown, prompt composers, reasoning traces, agent tool timelines and citation displays. Built with Tailwind CSS and TypeScript; install with the shadcn CLI or the Spectrum UI MCP server.',
  keywords: [
    'React UI blocks',
    'AI chat UI components',
    'AI assistant blocks',
    'streaming chat component React',
    'LLM interface components',
    'agent UI components',
    'shadcn blocks',
    'Next.js AI blocks',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: 'React UI Blocks for AI Products — Spectrum UI',
    description:
      'Copy-paste React blocks for AI products: streaming chat threads, prompt composers, reasoning traces and agent timelines.',
    url,
    type: 'website',
    siteName: 'Spectrum UI',
  },
};

export default function BlocksIndexPage() {
  const breadcrumb = generateBreadcrumbStructuredData([
    { name: 'Home', url: siteConfig.url },
    { name: 'Blocks', url },
  ]);

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Spectrum UI blocks',
    itemListElement: LIVE_BLOCKS.map((block, position) => ({
      '@type': 'ListItem',
      position: position + 1,
      name: block.name,
      description: block.description,
      url: `${siteConfig.url}${blockPath(block.category, block.slug)}`,
    })),
  };

  return (
    <>
      <JsonLd id="blocks-breadcrumb" data={breadcrumb} />
      <JsonLd id="blocks-itemlist" data={itemList} />

      <header className="py-14 lg:py-24">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-400 dark:text-neutral-600">
          Blocks
        </p>
        <h1 className="mt-4 max-w-[20ch] font-spectral text-[40px] leading-[1.05] tracking-[-1.2px] text-neutral-900 dark:text-neutral-50 md:text-[48px]">
          Sections, not components
        </h1>
        <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.7] text-neutral-600 dark:text-neutral-400">
          A block is a composed interface section you drop in whole — built from
          several components, wired together, and ready for real data. Install one
          with the shadcn CLI, or ask your editor for it through the{' '}
          <Link
            href="/docs/mcp"
            className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2 transition-colors hover:decoration-neutral-500 dark:text-neutral-100 dark:decoration-neutral-600"
          >
            Spectrum UI MCP server
          </Link>
          .
        </p>
      </header>

      <div className="space-y-20 lg:space-y-24">
        {BLOCK_CATEGORIES.map((category) => {
          const blocks = blocksInCategory(category.slug);
          if (blocks.length === 0) return null;

          return (
            <section key={category.slug} aria-labelledby={`category-${category.slug}`}>
              <div className="flex items-end justify-between gap-6 border-t border-black/[0.07] pt-6 dark:border-white/[0.07]">
                <div>
                  <h2
                    id={`category-${category.slug}`}
                    className="font-spectral text-[26px] leading-[1.15] tracking-[-0.6px] text-neutral-900 dark:text-neutral-50"
                  >
                    {category.name}
                  </h2>
                  <p className="mt-2 max-w-[54ch] text-[13.5px] leading-[1.6] text-neutral-500 dark:text-neutral-400">
                    {category.tagline}
                  </p>
                </div>
                <Link
                  href={blockCategoryPath(category.slug)}
                  className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-500 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9452d] dark:text-neutral-400 dark:hover:text-neutral-100 dark:focus-visible:ring-[#E1F435]"
                >
                  All {blocks.length}
                  <ArrowUpRight className="size-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {blocks.slice(0, 4).map((block) => (
                  <Link
                    key={block.slug}
                    href={blockPath(block.category, block.slug)}
                    className="group block rounded-[14px] bg-white p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.07)] transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9452d] dark:bg-[#0F0F10] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.13)] dark:focus-visible:ring-[#E1F435]"
                  >
                    <BlockStage ratio="4/3" rulers={false}>
                      {blockPoster(block.slug)}
                    </BlockStage>
                    <h3 className="mt-4 text-[15px] font-medium tracking-[-0.1px] text-neutral-900 dark:text-neutral-50">
                      {block.name}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-[1.5] text-neutral-500 dark:text-neutral-400">
                      {block.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
