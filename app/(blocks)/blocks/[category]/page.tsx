import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Specimen } from '@/components/blocks/specimen';
import { JsonLd } from '@/components/seo/json-ld';
import {
  BLOCK_CATEGORIES,
  blockCategoryPath,
  blocksInCategory,
  findBlockCategory,
} from '@/lib/block-catalog';
import { generateBreadcrumbStructuredData } from '@/lib/seo-utils';
import { siteConfig } from '@/config/site';

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return BLOCK_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = findBlockCategory(slug);
  if (!category) return {};

  const url = `${siteConfig.url}${blockCategoryPath(slug)}`;
  return {
    title: { absolute: `${category.name} Blocks for React — Live Previews & Source` },
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${category.name} Blocks — Spectrum UI`,
      description: category.tagline,
      url,
      type: 'website',
      siteName: 'Spectrum UI',
    },
  };
}

/** The code shown and copied is the file the CLI installs, read off disk. */
async function readSource(category: string, slug: string) {
  const relative = path.join('components', 'spectrumui', 'blocks', category, `${slug}.tsx`);
  try {
    return await fs.readFile(path.join(process.cwd(), relative), 'utf8');
  } catch {
    return null;
  }
}

/**
 * One scrolling specimen page per category. Every block renders live at actual
 * size — numbered sections, variant pills that switch the block's state in
 * place, and a code toggle on the stage. No detail pages, no thumbnails.
 */
export default async function BlockCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = findBlockCategory(slug);
  if (!category) notFound();

  const blocks = blocksInCategory(slug);
  const wide = category.layout === 'wide';
  const sources = await Promise.all(blocks.map((block) => readSource(slug, block.slug)));
  const url = `${siteConfig.url}${blockCategoryPath(slug)}`;

  const breadcrumb = generateBreadcrumbStructuredData([
    { name: 'Home', url: siteConfig.url },
    { name: 'Blocks', url: `${siteConfig.url}/blocks` },
    { name: category.name, url },
  ]);

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.name} blocks`,
    itemListElement: blocks.map((block, position) => ({
      '@type': 'ListItem',
      position: position + 1,
      name: block.name,
      description: block.description,
      url: `${url}#${block.slug}`,
    })),
  };

  /* One SoftwareSourceCode node per block: the schema.org type search engines
     and AI crawlers actually associate with installable code. */
  const softwareSource = blocks.map((block) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: block.name,
    description: block.summary,
    abstract: block.description,
    url: `${url}#${block.slug}`,
    programmingLanguage: 'TypeScript',
    runtimePlatform: 'React',
    codeRepository: siteConfig.links.github,
    license: 'https://opensource.org/licenses/Apache-2.0',
    isAccessibleForFree: true,
    dateCreated: block.addedAt,
    keywords: [block.category, block.subcategory, ...block.variants].join(', '),
    installUrl: `https://ui.spectrumhq.in/r/${block.slug}.json`,
  }));

  return (
    <>
      <JsonLd id={`blocks-${slug}-breadcrumb`} data={breadcrumb} />
      <JsonLd id={`blocks-${slug}-itemlist`} data={itemList} />
      <JsonLd id={`blocks-${slug}-source`} data={softwareSource} />

      <main className={wide ? undefined : 'mx-auto max-w-[760px]'}>
        <header className="mb-12">
          <h1 className="font-spectral text-[30px] leading-[1.1] tracking-[-0.6px] text-neutral-900 dark:text-neutral-50">
            {category.name}
          </h1>
          <p className="mt-2.5 max-w-[68ch] text-[14px] leading-[1.6] text-neutral-500 dark:text-neutral-400">
            {category.description}
          </p>
        </header>

        <div className="space-y-20 lg:space-y-24">
          {blocks.map((block, position) => (
            <div
              key={block.slug}
              className={
                position > 0
                  ? 'border-t border-dashed border-black/[0.09] pt-16 dark:border-white/[0.09] lg:pt-20'
                  : undefined
              }
            >
              <Specimen
                slug={block.slug}
                number={String(position + 1).padStart(2, '0')}
                name={block.name}
                description={block.description}
                variants={block.variants}
                source={sources[position] ?? '// Source unavailable'}
                stage={wide ? 'bleed' : 'inset'}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
