'use server'

import { auth } from '@/auth'
import { syncUser } from '@/lib/user-sync'
import { notifyNewSignup } from '@/lib/slack'
import { sendFounderWelcomeEmail } from '@/lib/resend'
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

  const buildingType = formData.get('building_type')
  if (typeof buildingType !== 'string' || buildingType.trim() === '') {
    throw new Error("Building type is required")
  }
  const buildingTypeValue = buildingType

  // Reuse the robust server-side syncUser logic we built!
  await syncUser({
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
    githubUsername: githubUsername || null,
    buildingType: buildingTypeValue
  })

  // Send Day 0 Onboarding Email (non-blocking)
  try {
    await sendFounderWelcomeEmail(session.user.email, session.user.name || '')
    
    // Mark as sent in the database
    const { supabaseAdmin } = await import('@/lib/supabase-admin')
    const { error: dbError } = await supabaseAdmin
      .from('users')
      .update({ welcome_email_sent: true })
      .eq('email', session.user.email)
      
    if (dbError) {
      console.error('[completeUserProfile] Failed to update DB for welcome email:', dbError)
    }
      
  } catch (err: any) {
    console.error('[completeUserProfile] Welcome email failed. Details:', {
      message: err?.message,
      name: err?.name,
      stack: err?.stack,
      raw: err,
    })
  }

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

  // Track user creation in PostHog
  try {
    const posthog = (await import('@/lib/posthog-server')).default()
    if (posthog) {
      const phProperties = {
        name: session.user.name,
        email: session.user.email,
        githubUsername: githubUsername || session.user.githubUsername || null,
        provider: session.user.githubUsername ? 'GitHub' : 'Google',
        convertedFrom: redirectTo !== '/dashboard' ? redirectTo : null,
        buildingType: buildingTypeValue,
        $set: {
          name: session.user.name,
          email: session.user.email,
          github_username: githubUsername || session.user.githubUsername || null,
          building_type: buildingTypeValue,
        }
      }

      posthog.capture({
        distinctId: session.user.email,
        event: 'user_created',
        properties: phProperties
      })

      posthog.capture({
        distinctId: session.user.email,
        event: 'onboarding_completed',
        properties: phProperties
      })

      await posthog.shutdown()
    }
  } catch (err) {
    console.error('[completeUserProfile] PostHog event tracking failed:', err)
  }

  // Once saved to DB, push them to their intended destination
  redirect(redirectTo)
}
