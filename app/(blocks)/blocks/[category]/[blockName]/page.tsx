import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BlockStage } from '@/components/blocks/block-stage';
import { CopyCli } from '@/components/blocks/copy-cli';
import { blockPreview } from '@/components/blocks/previews';
import { JsonLd } from '@/components/seo/json-ld';
import {
  LIVE_BLOCKS,
  blockCliCommand,
  blockNeighbours,
  blockPath,
  findBlock,
  findBlockCategory,
} from '@/lib/block-catalog';
import { generateBreadcrumbStructuredData } from '@/lib/seo-utils';
import { siteConfig } from '@/config/site';

interface PageProps {
  params: Promise<{ category: string; blockName: string }>;
}

export function generateStaticParams() {
  return LIVE_BLOCKS.map((block) => ({
    category: block.category,
    blockName: block.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, blockName } = await params;
  const block = findBlock(category, blockName);
  if (!block) return {};

  const url = `${siteConfig.url}${blockPath(category, blockName)}`;
  return {
    title: { absolute: `${block.name} — React Block for AI Apps` },
    description: block.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${block.name} — Spectrum UI Blocks`,
      description: block.description,
      url,
      type: 'article',
      siteName: 'Spectrum UI',
    },
  };
}

/**
 * Reads the block's source off disk so the code shown always matches what the
 * CLI installs. Same approach as PreviewCodeCard on the docs pages.
 */
async function readBlockSource(category: string, slug: string) {
  const relative = path.join('components', 'spectrumui', 'blocks', category, `${slug}.tsx`);
  try {
    return await fs.readFile(path.join(process.cwd(), relative), 'utf8');
  } catch {
    return null;
  }
}

export default async function BlockDetailPage({ params }: PageProps) {
  const { category: categorySlug, blockName } = await params;
  const block = findBlock(categorySlug, blockName);
  const category = findBlockCategory(categorySlug);
  if (!block || !category) notFound();

  const source = await readBlockSource(categorySlug, blockName);
  const { previous, next } = blockNeighbours(categorySlug, blockName);
  const url = `${siteConfig.url}${blockPath(categorySlug, blockName)}`;

  const breadcrumb = generateBreadcrumbStructuredData([
    { name: 'Home', url: siteConfig.url },
    { name: 'Blocks', url: `${siteConfig.url}/blocks` },
    { name: category.name, url: `${siteConfig.url}/blocks/${categorySlug}` },
    { name: block.name, url },
  ]);

  const softwareSource = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: block.name,
    description: block.summary,
    url,
    programmingLanguage: 'TypeScript',
    runtimePlatform: 'React',
    codeRepository: siteConfig.links?.github ?? siteConfig.url,
    license: 'https://opensource.org/licenses/MIT',
  };

  return (
    <>
      <JsonLd id={`block-${blockName}-breadcrumb`} data={breadcrumb} />
      <JsonLd id={`block-${blockName}-source`} data={softwareSource} />

      <header className="py-12 lg:py-16">
        <nav aria-label="Breadcrumb" className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-400 dark:text-neutral-600">
          <Link href="/blocks" className="transition-colors hover:text-neutral-700 dark:hover:text-neutral-300">
            Blocks
          </Link>
          <span aria-hidden className="mx-1.5 opacity-50">/</span>
          <Link href={`/blocks/${categorySlug}`} className="transition-colors hover:text-neutral-700 dark:hover:text-neutral-300">
            {category.name}
          </Link>
        </nav>

        <h1 className="mt-4 text-[28px] font-medium leading-[1.15] tracking-[-0.5px] text-neutral-900 dark:text-neutral-50">
          {block.name}
        </h1>
        <p className="mt-4 max-w-[64ch] text-[15px] leading-[1.7] text-neutral-600 dark:text-neutral-400">
          {block.summary}
        </p>

        <div className="mt-6 max-w-md">
          <CopyCli command={blockCliCommand(block.slug)} variant="bar" />
        </div>
      </header>

      <BlockStage ratio="4/3" className="lg:aspect-[16/10]">
        {blockPreview(block.slug)}
      </BlockStage>

      {/* Why this is worth copying rather than writing. The most useful prose on
          the page, and the part an LLM can actually cite. */}
      <section aria-labelledby="hard-parts" className="mt-16 border-t border-black/[0.07] pt-6 dark:border-white/[0.07]">
        <h2 id="hard-parts" className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-500 dark:text-neutral-400">
          What makes this hard
        </h2>
        <ul className="mt-5 max-w-[68ch] space-y-3">
          {block.hardParts.map((part) => (
            <li key={part} className="flex gap-3 text-[14.5px] leading-[1.65] text-neutral-700 dark:text-neutral-300">
              <span aria-hidden className="mt-[0.6em] size-1 shrink-0 rounded-full bg-[#f9452d] dark:bg-[#E1F435]" />
              {part}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="composition" className="mt-14 border-t border-black/[0.07] pt-6 dark:border-white/[0.07]">
        <h2 id="composition" className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-500 dark:text-neutral-400">
          Composition
        </h2>
        <dl className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
          <MetaRow label="Built from" values={block.composedOf} />
          <MetaRow label="Dependencies" values={block.dependencies} />
          <MetaRow label="Variants" values={block.variants} />
          <MetaRow label="Complexity" values={[block.complexity]} />
        </dl>
      </section>

      {source && (
        <section aria-labelledby="source" className="mt-14 border-t border-black/[0.07] pt-6 dark:border-white/[0.07]">
          <h2 id="source" className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-500 dark:text-neutral-400">
            Source
          </h2>
          {/* Ungated on purpose: gating puts a login wall where crawlers and
              LLMs expect code, which is the opposite of discoverable. */}
          <pre
            tabIndex={0}
            aria-label={`Source of ${block.name}`}
            className="mt-5 max-h-[640px] overflow-auto rounded-[10px] bg-neutral-950 p-4 font-mono text-[12.5px] leading-[1.65] text-neutral-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f9452d] dark:bg-black"
          >
            <code>{source}</code>
          </pre>
        </section>
      )}

      <nav aria-label="Adjacent blocks" className="mt-16 flex items-center justify-between gap-4 border-t border-black/[0.07] pt-6 dark:border-white/[0.07]">
        {previous ? (
          <Link href={blockPath(previous.category, previous.slug)} className="group inline-flex items-center gap-2 text-[13.5px] text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
            <ArrowLeft className="size-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-0.5" />
            {previous.name}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={blockPath(next.category, next.slug)} className="group inline-flex items-center gap-2 text-[13.5px] text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
            {next.name}
            <ArrowRight className="size-3.5 transition-transform duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5" />
          </Link>
        )}
      </nav>
    </>
  );
}

function MetaRow({ label, values }: { label: string; values: string[] }) {
  if (values.length === 0) return null;
  return (
    <div>
      <dt className="text-[13px] text-neutral-500 dark:text-neutral-500">{label}</dt>
      <dd className="mt-2 flex flex-wrap gap-1.5">
        {values.map((value) => (
          <span
            key={value}
            className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-[11px] text-neutral-700 dark:bg-white/[0.06] dark:text-neutral-300"
          >
            {value}
          </span>
        ))}
      </dd>
    </div>
  );
}
