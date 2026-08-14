import React from 'react';
import { ChartsSidebar } from './charts-sidebar';

export default function ChartsLibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-wrapper">
      <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[256px_minmax(0,1fr)] lg:gap-8">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto py-6 pr-2 lg:py-8">
            <ChartsSidebar />
          </div>
        </aside>
        <div className="min-w-0 self-start py-6 lg:py-8">
          <div
            data-docs-content
            className="rounded-[15px] border border-black/8 bg-white px-4 py-6 dark:border-white/10 dark:bg-neutral-950/60 sm:px-10 sm:py-8"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
