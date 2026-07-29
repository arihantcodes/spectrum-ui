/**
 * Shell for the Blocks section — a quiet page surface; each category page owns
 * its own sidebar and column layout.
 *
 * Its own route group rather than living under app/(docs)/docs:
 * tests/component-catalog.test.js asserts an exact count of directories under
 * the docs route, and a separate shell is the right architecture regardless.
 */
export default function BlocksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A]">
      <div className="container-frame mx-auto px-4 lg:px-10">{children}</div>
    </div>
  );
}
