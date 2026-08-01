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
 * Three-column shell.
 *
 * The global site header is deliberately kept. Funnelling gallery traffic into
 * the component library is the third business goal, and removing the nav that
 * points at /docs would work directly against it. The rail therefore sits under
 * the 3.5rem sticky header rather than owning the full viewport, matching the
 * offset convention already used by /docs.
 */
export default async function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const counts = await getSectionCounts();
  const year = new Date().getFullYear();

  return (
    <div className="mx-auto w-full max-w-[1680px] px-4">
      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[220px_minmax(0,1fr)_256px]">
        {/* Left rail */}
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] shrink-0 lg:block">
          <div className="no-scrollbar flex h-full flex-col overflow-y-auto py-6">
            <DesignSidebar counts={counts} />
            <div className="mt-auto space-y-3 pt-6 text-[11px] text-muted-foreground">
              <Link
                href="/docs"
                className="block rounded-md border border-dashed px-3 py-2.5 leading-relaxed transition-colors hover:border-solid hover:text-foreground"
              >
                <span className="font-medium text-foreground">
                  Built with Spectrum UI
                </span>
                <br />
                Every item is tagged with the components that could rebuild it.
              </Link>
              <p>© {year} Spectrum UI</p>
            </div>
          </div>
        </aside>

        {/* Center */}
        <main className="min-w-0 py-6">{children}</main>

        {/* Right rail — jobs + sponsored units land here in a later slice. */}
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] shrink-0 xl:block">
          <div className="no-scrollbar h-full overflow-y-auto py-6" />
        </aside>
      </div>
    </div>
  );
}
