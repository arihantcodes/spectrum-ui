import LeftSide from "@/app/(docs)/layout-parts/left-side/left-side";
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
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="border-grid fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto py-6 lg:py-8">
            <LeftSide />
          </div>
        </aside>
        <div className="self-start min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
