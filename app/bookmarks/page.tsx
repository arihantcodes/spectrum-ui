import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Bookmark, BookmarkX, Component as ComponentIcon, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Bookmarks',
  description: 'Your saved Spectrum UI components.',
  robots: { index: false, follow: false },
};

interface BookmarkRow {
  id: string;
  user_id: string;
  slug: string;
  type: 'component' | 'block';
  title: string;
  created_at: string;
}

export default async function BookmarksPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/sign-in?callbackUrl=/bookmarks');
  }

  // Resolve the stable Supabase UUID from email (session.user.id is the OAuth provider sub)
  const { data: userData } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', session.user.email)
    .single();

  const userId = userData?.id as string | undefined;

  const { data, error } = userId
    ? await supabaseAdmin
        .from('bookmarks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    : { data: null, error: null };

  if (error) {
    console.error('[BookmarksPage]', error);
  }

  const bookmarks: BookmarkRow[] = data ?? [];
  const components = bookmarks.filter((b) => b.type === 'component');
  const blocks = bookmarks.filter((b) => b.type === 'block');

  return (
    <div className="container-wrapper">
      <div className="container py-12 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-border">
            <Bookmark className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Bookmarks</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {bookmarks.length === 0
                ? 'No bookmarks yet'
                : `${bookmarks.length} saved item${bookmarks.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        {/* Empty state */}
        {bookmarks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-border mb-6">
              <BookmarkX className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
            <p className="text-muted-foreground max-w-sm mb-6">
              Browse components, then click the{' '}
              <Bookmark className="inline h-4 w-4 mx-0.5 align-text-bottom" /> bookmark
              icon to save them here for quick access.
            </p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="/docs">Browse Components</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Components section */}
        {components.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <ComponentIcon className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-base font-semibold">Components</h2>
              <Badge variant="secondary" className="text-xs">
                {components.length}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {components.map((b) => (
                <BookmarkCard key={b.id} bookmark={b} />
              ))}
            </div>
          </section>
        )}

        {/* Templates section */}
        {blocks.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-5">
              <Layers className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-base font-semibold">Templates</h2>
              <Badge variant="secondary" className="text-xs">
                {blocks.length}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    bookmark.type === 'component'
      ? `/docs/${bookmark.slug}`
      : `/templates/${bookmark.slug}`;

  const savedAt = new Date(bookmark.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link href={href} className="group">
      <div className="relative rounded-xl border bg-card h-full transition-all hover:border-foreground/30 hover:shadow-md overflow-hidden">
        {/* Preview area */}
        <div className="relative h-28 w-full bg-neutral-100 dark:bg-neutral-900 border-b flex items-center justify-center overflow-hidden group-hover:bg-neutral-50 dark:group-hover:bg-neutral-900/50 transition-colors">
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {bookmark.type === 'component' ? (
            <ComponentIcon className="relative z-10 h-8 w-8 text-neutral-400 dark:text-neutral-600 transition-all duration-300 group-hover:scale-125 group-hover:text-foreground" />
          ) : (
            <Layers className="relative z-10 h-8 w-8 text-neutral-400 dark:text-neutral-600 transition-all duration-300 group-hover:scale-125 group-hover:text-foreground" />
          )}
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 text-xs capitalize"
          >
            {bookmark.type}
          </Badge>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-1">
          <h3 className="font-semibold text-foreground tracking-tight truncate">
            {bookmark.title}
          </h3>
          <p className="text-xs text-muted-foreground">Saved {savedAt}</p>
        </div>
      </div>
    </Link>
  );
}
