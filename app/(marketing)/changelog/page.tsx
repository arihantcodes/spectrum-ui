import type { Metadata } from 'next';
import Link from 'next/link';
import { Mynerve } from 'next/font/google';
import { Rss } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { CHANGELOG, changelogDate, type ChangelogEntry } from '@/content/changelog';
import { generateBreadcrumbStructuredData } from '@/lib/seo-utils';
import { siteConfig } from '@/config/site';

/** The handwritten date face from the reference — loaded only on this page. */
const handwritten = Mynerve({ subsets: ['latin'], weight: '400' });

const url = `${siteConfig.url}/changelog`;

export const metadata: Metadata = {
  title: { absolute: 'Changelog — What’s New in Spectrum UI' },
  description:
    'Short, dated notes on every Spectrum UI release: new AI blocks, component updates, MCP server improvements, and docs changes.',
  alternates: {
    canonical: url,
    types: { 'application/rss+xml': `${url}/feed.xml` },
  },
  openGraph: {
    title: 'Spectrum UI Changelog',
    description: 'Short, dated notes on every Spectrum UI release.',
    url,
    type: 'website',
    siteName: 'Spectrum UI',
  },
};

const ENTER = `
@keyframes cl-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
`;

export default function ChangelogPage() {
  const breadcrumb = generateBreadcrumbStructuredData([
    { name: 'Home', url: siteConfig.url },
    { name: 'Changelog', url },
  ]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A]">
      <JsonLd id="changelog-breadcrumb" data={breadcrumb} />
      <style dangerouslySetInnerHTML={{ __html: ENTER }} />

      <div className="mx-auto max-w-[37em] px-4 pb-24 lg:px-6">
        <header className="pb-4 pt-14 lg:pt-20">
          <h1 className="font-spectral text-[38px] leading-[1.05] tracking-[-0.8px] text-neutral-900 dark:text-neutral-50 md:text-[44px]">
            Changelog
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-[14px] leading-[1.6] text-neutral-500 dark:text-neutral-400">
              Short notes on what shipped.
            </p>
            <a
              href="/changelog/feed.xml"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-400 transition-colors duration-150 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-100"
            >
              <Rss className="size-3" />
              RSS
            </a>
          </div>
        </header>

        {CHANGELOG.map((entry, index) => (
          <Entry key={entry.slug} entry={entry} index={index} />
        ))}
      </div>
    </div>
  );
}

function Entry({ entry, index }: { entry: ChangelogEntry; index: number }) {
  return (
    <section
      id={entry.slug}
      aria-label={changelogDate(entry.date)}
      className="scroll-mt-28 pt-12 motion-safe:animate-[cl-in_300ms_cubic-bezier(0.23,1,0.32,1)_both] lg:pt-14"
      style={{ animationDelay: `${Math.min(index, 4) * 50}ms` }}
    >
      {/* The date is the entry's anchor — handwritten, like the reference. */}
      <a
        href={`#${entry.slug}`}
        className={`${handwritten.className} text-[16px] leading-[1.6] text-neutral-400 no-underline transition-colors duration-150 hover:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300`}
      >
        <time dateTime={entry.date}>{changelogDate(entry.date)}</time>
      </a>

      {/* Group content is plain semantic HTML styled by shadcn/typeset. */}
      <div className="typeset typeset-article mt-1">
        {entry.groups.map((group) => (
          <section key={group.label}>
            <h3>{group.label}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.slice(0, 32)}>
                  <ItemText text={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}

/** Renders an item string, turning [text](/href) into underlined links. */
function ItemText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => {
        const match = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (!match) return <span key={index}>{part}</span>;
        return (
          <Link key={index} href={match[2]}>
            {match[1]}
          </Link>
        );
      })}
    </>
  );
}
