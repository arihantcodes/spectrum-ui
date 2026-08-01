import type { Metadata } from "next";

import { FeedGrid } from "@/components/design/feed-grid";
import { SectionHeader } from "@/components/design/section-header";
import { DESIGN_SECTION_MAP } from "@/content/design-taxonomy";
import { getFeed } from "@/lib/design/queries";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/seo/json-ld";

const section = DESIGN_SECTION_MAP.get("feed")!;

export const metadata: Metadata = {
  title: { absolute: "Design Inspiration — Interface, Web & Motion | Spectrum UI" },
  description:
    "A curated gallery of interface, web, product and motion design. Every item is attributed to its creator and tagged with the Spectrum UI components that could rebuild it.",
  alternates: { canonical: `${siteConfig.url}/design` },
  openGraph: {
    title: "Design Inspiration — Interface, Web & Motion",
    description:
      "A curated gallery of interface, web, product and motion design, updated daily.",
    url: `${siteConfig.url}/design`,
    type: "website",
  },
};

// The gallery is curated throughout the day; revalidate rather than rebuild.
export const revalidate = 300;

export default async function DesignFeedPage() {
  const { items, unavailable } = await getFeed({ section: "feed" });

  return (
    <>
      <JsonLd
        id="design-feed-itemlist"
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Design Inspiration",
          description: section.description,
          url: `${siteConfig.url}/design`,
          numberOfItems: items.length,
          itemListElement: items.slice(0, 24).map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteConfig.url}/design/i/${item.slug}`,
            name: item.title,
          })),
        }}
      />

      <SectionHeader section={section} count={items.length} />

      {items.length > 0 ? (
        <FeedGrid
          items={items}
          layout={section.layout}
          aspectRatio={section.aspectRatio}
        />
      ) : (
        <EmptyState unavailable={unavailable} />
      )}
    </>
  );
}

function EmptyState({ unavailable }: { unavailable: boolean }) {
  return (
    <div className="rounded-lg border border-dashed px-6 py-16 text-center">
      <p className="text-[13px] font-medium">
        {unavailable ? "Gallery not provisioned yet" : "Nothing published yet"}
      </p>
      <p className="mx-auto mt-2 max-w-[46ch] text-[13px] leading-relaxed text-muted-foreground">
        {unavailable ? (
          <>
            Run <code className="font-mono text-[12px]">design-schema.sql</code>{" "}
            in Supabase to create the gallery tables. Every route, including the
            category pages and their intro copy, renders without it — only the
            items are missing.
          </>
        ) : (
          <>
            The taxonomy and routes are live. Publish items from the admin queue
            and they will appear here.
          </>
        )}
      </p>
    </div>
  );
}
