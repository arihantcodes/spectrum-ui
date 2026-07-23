import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { createNoIndexMetadata } from '@/lib/metadata';

export const metadata: Metadata = createNoIndexMetadata({
  title: 'Spectrum UI Account Profile',
  description: 'Review private Spectrum UI account details and sign out of the current session.',
  path: '/profile',
});

import { ProfileView } from './profile-view';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/sign-in');

  const { data: user } = await supabaseAdmin
    .from('users')
    .select('name, email, avatar_url, github_username')
    .eq('email', session.user.email)
    .single();

  if (!user?.github_username) redirect('/create-user');

  return (
    <ProfileView
      user={user}
      signOutAction={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
    />
  );
}
