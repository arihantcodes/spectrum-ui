import { CategoryRail } from '@/components/blocks/category-rail';

/**
 * Shell for the Blocks section.
 *
 * Deliberately its own route group rather than living under app/(docs)/docs:
 * tests/component-catalog.test.js asserts an exact count of directories under
 * the docs route, so a blocks route there would need an allowlist entry — and a
 * separate shell is the right architecture regardless.
 */
export default function BlocksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FCFCFC] dark:bg-[#0A0A0A]">
      <div className="container-frame mx-auto">
        <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
          <aside className="sticky top-0 z-10 border-b border-black/[0.06] bg-[#FCFCFC]/90 px-4 py-3 backdrop-blur lg:top-16 lg:h-fit lg:border-b-0 lg:bg-transparent lg:px-0 lg:py-12 lg:backdrop-blur-none dark:border-white/[0.06] dark:bg-[#0A0A0A]/90 lg:dark:bg-transparent">
            <CategoryRail />
          </aside>
          <main className="px-4 pb-24 lg:px-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
