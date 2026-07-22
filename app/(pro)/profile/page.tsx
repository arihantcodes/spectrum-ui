import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase-admin';

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
