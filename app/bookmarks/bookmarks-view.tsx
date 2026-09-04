import Link from 'next/link';
import { Component as ComponentIcon, Layers } from 'lucide-react';
import { IconlyBookmark } from '@/components/icons/iconly';

export interface BookmarkRow {
  id: string;
  user_id: string;
  slug: string;
  type: 'component' | 'block';
  title: string;
  created_at: string;
}

function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="mb-5 flex items-baseline gap-2.5">
      <span
        aria-hidden
        className="h-[9px] w-[9px] self-center border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
      />
      <h2 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-foreground">
        {label}
      </h2>
      <span className="font-mono text-xs text-muted-foreground">{count}</span>
    </div>
  );
}

export function BookmarksView({ bookmarks }: { bookmarks: BookmarkRow[] }) {
  const components = bookmarks.filter((b) => b.type === 'component');
  const blocks = bookmarks.filter((b) => b.type === 'block');

  return (
    // Same framed band as the rest of the site: side borders at 1400px,
    // bottom border hands off to the footer.
    <div className="container-frame min-h-screen bg-background">
      <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        {/* Eyebrow + heading, same language as the profile page */}
        <div className="enter-fx mb-10">
          <div className="mb-4 flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-[9px] w-[9px] border-l-2 border-t-2 border-[#f9452d] dark:border-[#E1F435]"
            />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Bookmarks
            </span>
          </div>
          <h1 className="font-spectral text-[34px] font-light leading-[1.05] tracking-[-0.02em] text-foreground">
            Your bookmarks
          </h1>
          <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
            {bookmarks.length === 0
              ? 'Components and templates you save will live here.'
              : `${bookmarks.length} saved item${bookmarks.length !== 1 ? 's' : ''}, newest first.`}
          </p>
        </div>

        {/* Empty state */}
        {bookmarks.length === 0 && (
          <div
            className="enter-fx flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-20 text-center"
            style={{ animationDelay: '60ms' }}
          >
            <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-muted">
              <IconlyBookmark className="size-6 text-muted-foreground" />
            </div>
            <h2 className="font-spectral text-xl font-normal tracking-[-0.01em] text-foreground">
              Nothing saved yet
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Browse the library and tap the bookmark icon on any component to keep it here for
              quick access.
            </p>
            <Link
              href="/docs"
              className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.25)] outline-hidden transition-[transform,background-color] duration-150 ease-out hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
            >
              Browse components
            </Link>
          </div>
        )}

        {/* Components section */}
        {components.length > 0 && (
          <section className="enter-fx mb-12" style={{ animationDelay: '60ms' }}>
            <SectionHeader label="Components" count={components.length} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {components.map((b) => (
                <BookmarkCard key={b.id} bookmark={b} />
              ))}
            </div>
          </section>
        )}

        {/* Templates section */}
        {blocks.length > 0 && (
          <section className="enter-fx" style={{ animationDelay: '120ms' }}>
            <SectionHeader label="Templates" count={blocks.length} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {blocks.map((b) => (
                <BookmarkCard key={b.id} bookmark={b} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function BookmarkCard({ bookmark }: { bookmark: BookmarkRow }) {
  const href =
    bookmark.type === 'component' ? `/docs/${bookmark.slug}` : `/templates/${bookmark.slug}`;

  const savedAt = new Date(bookmark.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const TypeIcon = bookmark.type === 'component' ? ComponentIcon : Layers;

  return (
    <Link
      href={href}
      className="group block rounded-2xl outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="h-full overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_hsl(var(--border)),0_1px_2px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-150 ease-out group-hover:-translate-y-0.5 group-hover:shadow-[0_0_0_1px_hsl(var(--border)),0_8px_24px_-8px_rgba(0,0,0,0.12)] group-active:translate-y-0 group-active:scale-[0.99] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {/* Preview area */}
        <div className="relative flex h-28 w-full items-center justify-center overflow-hidden border-b border-border bg-muted/50">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60 bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] bg-size-[16px_16px]"
          />
          <TypeIcon className="relative z-1 size-7 text-muted-foreground transition-[transform,color] duration-200 ease-out group-hover:scale-110 group-hover:text-foreground" />
          <span className="absolute left-2.5 top-2.5 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            {bookmark.type}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 p-4">
          <h3 className="truncate text-sm font-medium tracking-tight text-foreground">
            {bookmark.title}
          </h3>
          <p className="text-xs text-muted-foreground">Saved {savedAt}</p>
        </div>
      </div>
    </Link>
  );
}
