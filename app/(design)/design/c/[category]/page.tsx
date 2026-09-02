import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import type { DesignSort } from "@/lib/design/types";

import { FeedGrid } from "@/components/design/feed-grid";
import { SectionHeader } from "@/components/design/section-header";
import {
  DESIGN_SECTION_MAP,
  findDesignCategory,
} from "@/content/design-taxonomy";
import { getFeed } from "@/lib/design/queries";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/json-ld";

const section = DESIGN_SECTION_MAP.get("feed")!;

interface PageProps {
  params: Promise<{ category: string }>;
}

/** All category pages are statically known — they do not depend on the DB. */
export function generateStaticParams() {
  return section.categories.map((c) => ({ category: c.slug }));
}

export const revalidate = 300;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = findDesignCategory("feed", slug);
  if (!category) return {};

  const url = `${siteConfig.url}/design/c/${slug}`;
  const title = `${category.name} Design Inspiration`;
  // First sentence of the intro doubles as the meta description.
  const description = `${category.intro.split(". ")[0]}.`;

  return {
    title: { absolute: `${title} | Spectrum UI` },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
  };
}

export default async function DesignCategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = findDesignCategory("feed", slug);
  if (!category) notFound();

  const rawSort = (await cookies()).get("design_sort")?.value;
  const sort: DesignSort =
    rawSort === "popular" || rawSort === "staff" ? rawSort : "recent";
  const { items } = await getFeed({ section: "feed", category: slug, sort });

  return (
    <>
      <JsonLd
        id={`design-category-${slug}`}
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Design",
                  item: `${siteConfig.url}/design`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: category.name,
                  item: `${siteConfig.url}/design/c/${slug}`,
                },
              ],
            },
            {
              "@type": "ItemList",
              name: `${category.name} Design Inspiration`,
              url: `${siteConfig.url}/design/c/${slug}`,
              numberOfItems: items.length,
            },
          ],
        }}
      />

      <SectionHeader
        section={section}
        activeCategory={slug}
        count={items.length}
        heading={`${category.name} Design Inspiration`}
        subheading={`Curated ${category.name.toLowerCase()} work, attributed to its creators.`}
        sort={sort}
      />

      <div className="px-4 py-5 sm:px-6">
        {/* The indexable body of the page. Renders whether or not items exist,
            which is what lets these routes rank before the gallery fills up. */}
        <div className="mb-6 max-w-[68ch]">
          <h2 className="sr-only">About {category.name} design inspiration</h2>
          <p className="text-[13px] leading-[1.75] text-muted-foreground">
            {category.intro}
          </p>
        </div>

        {items.length > 0 ? (
          <FeedGrid
            items={items}
            layout={section.layout}
            aspectRatio={section.aspectRatio}
          />
        ) : (
          <div className="rounded-lg border border-dashed px-6 py-12 text-center text-[13px] text-muted-foreground">
            No {category.name.toLowerCase()} items published yet.
          </div>
        )}
      </div>
    </>
  );
}
