'use server'

import { auth } from '@/auth'
import { syncUser } from '@/lib/user-sync'
import { notifyNewSignup } from '@/lib/slack'
import { redirect } from 'next/navigation'

export async function completeUserProfile(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.email) {
    throw new Error("Not authorized")
  }

  const githubUsername = formData.get('github_username')
  if (typeof githubUsername !== 'string') {
    throw new Error("Invalid GitHub username")
  }

  const nextUrl = formData.get('next')
  const redirectTo = typeof nextUrl === 'string' && nextUrl.startsWith('/') ? nextUrl : '/dashboard'

  // Reuse the robust server-side syncUser logic we built!
  await syncUser({
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
    githubUsername: githubUsername || null
  })

  // Notify Slack about new signup (non-blocking — won't break signup if Slack fails)
  try {
    await notifyNewSignup({
      name: session.user.name,
      email: session.user.email,
      githubUsername: githubUsername || session.user.githubUsername || null,
      avatarUrl: session.user.image || null,
      provider: session.user.githubUsername ? 'GitHub' : 'Google',
      convertedFrom: redirectTo !== '/dashboard' ? redirectTo : null,
    })
  } catch (err) {
    console.error('[completeUserProfile] Slack notification failed:', err)
  }

  // Once saved to DB, push them to their intended destination
  redirect(redirectTo)
}
