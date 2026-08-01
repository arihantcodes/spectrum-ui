import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Rss } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { ChangelogMedia } from './changelog-demo';
import {
  AREA_LABELS,
  CHANGELOG,
  changelogDate,
  type ChangelogEntry,
} from '@/content/changelog';
import { generateBreadcrumbStructuredData } from '@/lib/seo-utils';
import { siteConfig } from '@/config/site';

const url = `${siteConfig.url}/changelog`;

export const metadata: Metadata = {
  title: { absolute: 'Changelog — What’s New in Spectrum UI' },
  description:
    'Every Spectrum UI release: new AI blocks, component updates, MCP server improvements, and docs changes — with live demos, not screenshots.',
  alternates: {
    canonical: url,
    types: { 'application/rss+xml': `${url}/feed.xml` },
  },
  openGraph: {
    title: 'Spectrum UI Changelog',
    description:
      'New AI blocks, component updates, and MCP server improvements — with live demos.',
    url,
    type: 'website',
    siteName: 'Spectrum UI',
  },
};

export default function ChangelogPage() {
  const breadcrumb = generateBreadcrumbStructuredData([
    { name: 'Home', url: siteConfig.url },
    { name: 'Changelog', url },
  ]);

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Spectrum UI changelog',
    itemListElement: CHANGELOG.map((entry, position) => ({
      '@type': 'ListItem',
      position: position + 1,
      name: entry.title,
      description: entry.body[0],
      url: `${url}#${entry.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] ">
      <JsonLd id="changelog-breadcrumb" data={breadcrumb} />
      <JsonLd id="changelog-itemlist" data={itemList} />

      <div className="mx-auto max-w-[37em] px-4 lg:px-6">
        <header className="py-14 lg:py-20">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="-rotate-90">
              <span className="block size-[9px] border-b-2 border-r-2 border-[#f9452d] dark:border-[#E1F435]" />
            </span>
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-neutral-700 dark:text-neutral-300">
              Changelog
            </span>
          </div>
          <h1 className="mt-5 font-spectral text-[36px] leading-[1.06] tracking-[-1px] text-neutral-900 dark:text-neutral-50 md:text-[44px]">
            What’s new
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-[14.5px] leading-[1.7] text-neutral-500 dark:text-neutral-400">
              Every release across the blocks, components, docs, and the MCP
              server — demos included, live.
            </p>
            <a
              href="/changelog/feed.xml"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-500 transition-colors duration-150 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              <Rss className="size-3" />
              RSS
            </a>
          </div>
        </header>

        <div>
          {CHANGELOG.map((entry, index) => (
            <Entry key={entry.slug} entry={entry} latest={index === 0} />
          ))}
        </div>

        <footer className="border-t border-dashed border-black/[0.09] py-12 dark:border-white/[0.09]">
          <p className="text-[13px] text-neutral-400 dark:text-neutral-500">
            Earlier work predates this changelog. The full history lives in{' '}
            <a
              href={siteConfig.links.github}
              className="font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-2 transition-colors hover:decoration-neutral-500 dark:text-neutral-300 dark:decoration-neutral-600"
            >
              the repository
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}

function Entry({ entry, latest }: { entry: ChangelogEntry; latest: boolean }) {
  return (
    <article
      id={entry.slug}
      aria-labelledby={`${entry.slug}-title`}
      className={
        'scroll-mt-28 border-t border-dashed border-black/[0.09] py-14 first:border-t-0 first:pt-0 lg:py-20 dark:border-white/[0.09]' +
        (entry.media ? ' md:min-h-[85vh]' : '')
      }
    >
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
          <span className="w-fit rounded-md border border-black/[0.1] px-1.5 py-0.5 font-mono text-[10.5px] font-medium text-neutral-600 dark:border-white/[0.14] dark:text-neutral-300">
            {AREA_LABELS[entry.area]}
          </span>
          <time
            dateTime={entry.date}
            className="text-[13px] text-neutral-500 dark:text-neutral-400"
          >
            {changelogDate(entry.date)}
          </time>
          {latest && (
            <span className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-500 dark:text-neutral-400">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-[#f9452d] dark:bg-[#E1F435]"
              />
              Latest
            </span>
          )}
        </div>
      </div>

      <div className="min-w-0">
        {/* Entry prose is plain semantic HTML styled entirely by shadcn/typeset
            — the blog's .typeset-article preset, no classes on the content.
            Media panels and the link row opt out with `not-typeset`, the same
            pattern as the blog's Figure and Callout. */}
        <div className="typeset typeset-article group">
          <h2 id={`${entry.slug}-title`}>
            {entry.title}
            <a
              href={`#${entry.slug}`}
              aria-label={`Link to ${entry.title}`}
              className="ml-2 !no-underline opacity-0 transition-opacity duration-150 group-hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
            >
              #
            </a>
          </h2>
          {entry.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        {entry.media && (
          <div className="not-typeset mt-8">
            <ChangelogMedia media={entry.media} />
          </div>
        )}

        {entry.sections && entry.sections.length > 0 && (
          <div className="typeset typeset-article mt-2">
            {entry.sections.map((section) => (
              <section key={section.label}>
                <h3>{section.label}</h3>
                <ul>
                  {section.items.map((item) => (
                    <li key={item.slice(0, 32)}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        {entry.links && entry.links.length > 0 && (
          <div className="not-typeset mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {entry.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group/link inline-flex items-center gap-1 text-[13.5px] font-medium text-neutral-900 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-100"
              >
                {link.label}
                <ArrowUpRight className="size-3.5 text-[#f9452d] transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 dark:text-[#E1F435]" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
