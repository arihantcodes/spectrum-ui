import LeftSide from "@/app/(docs)/layout-parts/left-side/left-side";
import OnThisPage from "@/app/(docs)/layout-parts/on-this-page";
import DocsPager from "@/app/(docs)/layout-parts/docs-pager";
import React from "react";

import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-wrapper">
      <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[256px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[256px_minmax(0,1fr)_210px]">
        {/* Left sidebar */}
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto py-6 pr-2 lg:py-8">
            <LeftSide />
          </div>
        </aside>

        {/* Main content card */}
        <div className="min-w-0 self-start py-6 lg:py-8">
          <div
            data-docs-content
            className="rounded-[15px] border border-black/8 bg-white px-4 py-6 dark:border-white/10 dark:bg-neutral-950/60 sm:px-10 sm:py-8"
          >
            {children}
          </div>
          <DocsPager />
        </div>

        {/* Right "On This Page" */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] shrink-0 xl:block">
          <div className="no-scrollbar h-full overflow-auto py-6 lg:py-8">
            <OnThisPage />
          </div>
        </aside>
      </div>
    </div>
  );
}
