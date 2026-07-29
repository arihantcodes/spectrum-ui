import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlockCard } from '@/components/blocks/block-card';
import { blockPoster } from '@/components/blocks/previews';
import { JsonLd } from '@/components/seo/json-ld';
import {
  BLOCK_CATEGORIES,
  blockCategoryPath,
  blockPath,
  blocksInCategory,
  findBlockCategory,
  subcategoriesInCategory,
  subcategoryAnchor,
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
    title: { absolute: `${category.name} Blocks for React — Copy & Paste` },
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

export default async function BlockCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = findBlockCategory(slug);
  if (!category) notFound();

  const blocks = blocksInCategory(slug);
  const subcategories = subcategoriesInCategory(slug);
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
      url: `${siteConfig.url}${blockPath(block.category, block.slug)}`,
    })),
  };

  return (
    <>
      <JsonLd id={`blocks-${slug}-breadcrumb`} data={breadcrumb} />
      <JsonLd id={`blocks-${slug}-itemlist`} data={itemList} />

      <header className="py-14 lg:py-20">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-400 dark:text-neutral-600">
          Blocks / {category.name}
        </p>
        <h1 className="mt-4 max-w-[24ch] font-spectral text-[36px] leading-[1.08] tracking-[-1px] text-neutral-900 dark:text-neutral-50 md:text-[42px]">
          {category.name}
        </h1>
        <p className="mt-5 max-w-[64ch] text-[15px] leading-[1.7] text-neutral-600 dark:text-neutral-400">
          {category.description}
        </p>
      </header>

      {subcategories.map((subcategory) => {
        const group = blocks.filter((block) => block.subcategory === subcategory);
        if (group.length === 0) return null;

        return (
          <section
            key={subcategory}
            id={subcategoryAnchor(subcategory)}
            aria-labelledby={`sub-${subcategoryAnchor(subcategory)}`}
            className="scroll-mt-24 border-t border-black/[0.07] pt-6 dark:border-white/[0.07] [&:not(:first-of-type)]:mt-16"
          >
            <h2
              id={`sub-${subcategoryAnchor(subcategory)}`}
              className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-500 dark:text-neutral-400"
            >
              {subcategory}
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
              {group.map((block, position) => (
                <BlockCard
                  key={block.slug}
                  block={block}
                  total={blocks.length}
                  preview={blockPoster(block.slug)}
                  // The lead specimen of each group gets the wide frame, so the
                  // grid has rhythm instead of reading as a uniform tile wall.
                  featured={position === 0 && group.length > 1}
                />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
