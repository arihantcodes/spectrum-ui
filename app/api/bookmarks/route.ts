import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { supabaseAdmin } from '@/lib/supabase-admin';

/**
 * Resolve the stable Supabase user UUID from the session's email.
 * `session.user.id` is the OAuth provider's raw sub — it does NOT match
 * the UUID that Supabase generates when the user is created in `users`.
 * Email is the reliable shared key between NextAuth and Supabase.
 */
async function getSupabaseUserId(email: string): Promise<string | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (error || !data?.id) {
    console.error('[bookmarks] could not resolve user id for email:', email, error?.message);
    return null;
  }
  return data.id as string;
}

// GET /api/bookmarks — fetch all bookmarks for the current user
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = await getSupabaseUserId(session.user.email);
  if (!userId) {
    return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
  }

  const { data, error } = await supabaseAdmin
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[bookmarks GET]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookmarks: data ?? [] });
}

// POST /api/bookmarks — add a bookmark
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = await getSupabaseUserId(session.user.email);
  if (!userId) {
    return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
  }

  const body = await req.json();
  const { slug, type, title } = body as {
    slug: string;
    type: 'component' | 'block' | 'template';
    title?: string;
  };

  if (!slug || !type) {
    return NextResponse.json({ error: 'slug and type are required' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('bookmarks')
    .upsert(
      { user_id: userId, slug, type, title: title ?? slug },
      { onConflict: 'user_id,slug,type' }
    )
    .select()
    .single();

  if (error) {
    console.error('[bookmarks POST]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookmark: data }, { status: 201 });
}

// DELETE /api/bookmarks — remove a bookmark
export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = await getSupabaseUserId(session.user.email);
  if (!userId) {
    return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
  }

  const body = await req.json();
  const { slug, type } = body as { slug: string; type: 'component' | 'block' | 'template' };

  if (!slug || !type) {
    return NextResponse.json({ error: 'slug and type are required' }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from('bookmarks')
    .delete()
    .eq('user_id', userId)
    .eq('slug', slug)
    .eq('type', type);

  if (error) {
    console.error('[bookmarks DELETE]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

