'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useAuthGateStore } from '@/lib/auth-gate-store';
import { trackEvent } from '@/lib/events';
import { toast } from 'sonner';

export interface Bookmark {
  id: string;
  user_id: string;
  slug: string;
  type: 'component' | 'block';
  title: string;
  created_at: string;
}

interface BookmarkStore {
  bookmarks: Bookmark[];
  isLoading: boolean;
  isBookmarked: (slug: string, type: 'component' | 'block') => boolean;
  toggleBookmark: (slug: string, type: 'component' | 'block', title?: string) => Promise<void>;
}

const BookmarkContext = createContext<BookmarkStore>({
  bookmarks: [],
  isLoading: false,
  isBookmarked: () => false,
  toggleBookmark: async () => {},
});

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { open: openAuthGate } = useAuthGateStore();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch bookmarks once session is available
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setIsLoading(true);
      fetch('/api/bookmarks')
        .then(async (r) => {
          if (!r.ok) {
            const body = await r.json().catch(() => ({}));
            throw new Error(
              `[bookmarks] GET failed ${r.status}: ${body?.error ?? r.statusText}`
            );
          }
          return r.json();
        })
        .then(({ bookmarks: data }) => {
          if (Array.isArray(data)) setBookmarks(data);
        })
        .catch((err) => console.error('[bookmarks store]', err))
        .finally(() => setIsLoading(false));
    } else if (status === 'unauthenticated') {
      setBookmarks([]);
    }
  }, [status, session]);

  const isBookmarked = useCallback(
    (slug: string, type: 'component' | 'block') =>
      bookmarks.some((b) => b.slug === slug && b.type === type),
    [bookmarks],
  );

  const toggleBookmark = useCallback(
    async (slug: string, type: 'component' | 'block', title?: string) => {
      // Not signed in — open auth gate
      if (!session?.user) {
        openAuthGate();
        return;
      }

      const alreadyBookmarked = bookmarks.some((b) => b.slug === slug && b.type === type);

      if (alreadyBookmarked) {
        // Optimistic remove
        setBookmarks((prev) => prev.filter((b) => !(b.slug === slug && b.type === type)));

        try {
          const res = await fetch('/api/bookmarks', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, type }),
          });
          if (!res.ok) throw new Error('Failed to remove bookmark');
          trackEvent({ name: 'bookmark_removed', properties: { slug, type } });
          toast.success('Removed from bookmarks');
        } catch (err) {
          // Rollback
          const res = await fetch('/api/bookmarks');
          const { bookmarks: fresh } = await res.json();
          if (Array.isArray(fresh)) setBookmarks(fresh);
          toast.error('Could not remove bookmark');
        }
      } else {
        // Optimistic add
        const optimistic: Bookmark = {
          id: `temp-${Date.now()}`,
          user_id: session.user.id ?? '',
          slug,
          type,
          title: title ?? slug,
          created_at: new Date().toISOString(),
        };
        setBookmarks((prev) => [optimistic, ...prev]);

        try {
          const res = await fetch('/api/bookmarks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, type, title: title ?? slug }),
          });
          if (!res.ok) throw new Error('Failed to add bookmark');
          const { bookmark } = await res.json();
          // Replace optimistic with real record
          setBookmarks((prev) =>
            prev.map((b) => (b.id === optimistic.id ? bookmark : b)),
          );
          trackEvent({ name: 'bookmark_added', properties: { slug, type } });
          toast.success('Bookmarked!', {
            description: 'Saved to your bookmarks',
            action: {
              label: 'View',
              onClick: () => (window.location.href = '/bookmarks'),
            },
          });
        } catch (err) {
          // Rollback
          setBookmarks((prev) => prev.filter((b) => b.id !== optimistic.id));
          toast.error('Could not bookmark');
        }
      }
    },
    [bookmarks, session, openAuthGate],
  );

  return (
    <BookmarkContext.Provider value={{ bookmarks, isLoading, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks(): BookmarkStore {
  return useContext(BookmarkContext);
}
