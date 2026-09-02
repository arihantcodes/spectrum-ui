import Link from "next/link";
import type { Metadata } from "next";

import { DesignSidebar } from "@/components/design/design-sidebar";
import { getSectionCounts } from "@/lib/design/queries";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: "Design Inspiration",
    template: "%s | Spectrum Design",
  },
  description:
    "A curated gallery of interface, web, product and motion design — each item attributed to its creator and tagged with the Spectrum UI components that could rebuild it.",
  alternates: { canonical: `${siteConfig.url}/design` },
};

/**
 * Bordered three-column shell, recent.design mechanics in this site's visual
 * language: `container-wrapper` draws the dashed hairline rules at the
 * container edges once the viewport exceeds it (the site-wide convention the
 * header and docs already use), and the rails are separated from the feed by
 * the same dashed border rather than whitespace.
 *
 * The global site header is deliberately kept — funnelling gallery traffic
 * into the component library is a core goal, so the nav that points at /docs
 * stays. Rails pin below its 3.5rem height.
 */
export default async function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const counts = await getSectionCounts();
  const year = new Date().getFullYear();

  return (
    <div className="container-wrapper flex-1">
      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_256px]">
        {/* Left rail */}
        <aside className="border-grid sticky top-14 hidden h-[calc(100dvh-3.5rem)] shrink-0 border-r lg:block">
          <div className="no-scrollbar flex h-full flex-col overflow-y-auto px-4 py-6">
            <DesignSidebar counts={counts} />
            <div className="mt-auto pt-6 text-[11px] text-muted-foreground">
              <p>© {year} Spectrum UI</p>
            </div>
          </div>
        </aside>

        {/* Center — pages render their own header row + sticky filter rail. */}
        <main className="min-w-0">{children}</main>

        {/* Right rail — job listings and the sponsored media unit land here.
            Until then it carries the house unit only. */}
        <aside className="border-grid sticky top-14 hidden h-[calc(100dvh-3.5rem)] shrink-0 border-l xl:block">
          <div className="no-scrollbar h-full overflow-y-auto px-4 py-6">
            <Link
              href="/docs"
              className="block rounded-lg border border-dashed px-3 py-2.5 text-[11px] leading-relaxed text-muted-foreground transition-colors hover:border-solid hover:text-foreground"
            >
              <span className="font-medium text-foreground">
                Built with Spectrum UI
              </span>
              <br />
              Every item is tagged with the components that could rebuild it —
              browse the library.
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
