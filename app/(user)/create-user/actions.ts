'use server'

import { auth } from '@/auth'
import { syncUser } from '@/lib/user-sync'
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

  // Once saved to DB, push them to their intended destination
  redirect(redirectTo)
}
