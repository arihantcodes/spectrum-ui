import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

import { BookmarksView } from './bookmarks-view';

export const metadata: Metadata = {
  title: 'My Bookmarks',
  description: 'Your saved Spectrum UI components.',
  robots: { index: false, follow: false },
};

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

  return <BookmarksView bookmarks={data ?? []} />;
}
