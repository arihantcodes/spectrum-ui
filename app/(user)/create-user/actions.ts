'use server'

import { auth } from '@/auth'
import { syncUser } from '@/lib/user-sync'
import { notifyNewSignup } from '@/lib/slack'
import { sendFounderWelcomeEmail } from '@/lib/resend'
import { redirect } from 'next/navigation'
import { validateGithubUsername } from '@/lib/validate-github-username'

export async function completeUserProfile(formData: FormData) {
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error('Not authorized')
  }

  const userEmail = session.user.email.toLowerCase()

  const githubUsername = formData.get('github_username')
  if (typeof githubUsername !== 'string' || !githubUsername.trim()) {
    throw new Error('GitHub username is required')
  }

  const trimmedGithub = githubUsername.trim()
  const githubIsValid = await validateGithubUsername(trimmedGithub)
  if (!githubIsValid) {
    throw new Error('Please enter a valid GitHub username')
  }

  const nextUrl = formData.get('next')
  const redirectTo =
    typeof nextUrl === 'string' && nextUrl.startsWith('/') ? nextUrl : '/'

  console.log(
    '[completeUserProfile] Onboarding user:',
    userEmail,
    'Name:',
    session.user.name,
    'API Key present:',
    !!process.env.RESEND_API_KEY
  )

  await syncUser({
    email: userEmail,
    name: session.user.name,
    image: session.user.image,
    githubUsername: trimmedGithub,
  })

  const emailPromise = (async () => {
    try {
      const { supabaseAdmin } = await import('@/lib/supabase-admin')
      const { data: userRecord } = await supabaseAdmin
        .from('users')
        .select('welcome_email_sent')
        .eq('email', userEmail)
        .single()

      if (userRecord && !userRecord.welcome_email_sent) {
        await sendFounderWelcomeEmail(userEmail, session.user.name || '')

        const { error: dbError } = await supabaseAdmin
          .from('users')
          .update({ welcome_email_sent: true })
          .eq('email', userEmail)

        if (dbError) {
          console.error(
            '[completeUserProfile] Failed to update DB for welcome email:',
            dbError
          )
        } else {
          console.log(
            '[completeUserProfile] Successfully sent welcome email & updated DB for:',
            userEmail
          )
        }
      }
    } catch (err: unknown) {
      const error = err as { message?: string; name?: string; stack?: string }
      console.error('[completeUserProfile] Welcome email failed. Details:', {
        message: error?.message,
        name: error?.name,
        stack: error?.stack,
        raw: err,
      })
    }
  })()

  const slackPromise = (async () => {
    try {
      await notifyNewSignup({
        name: session.user.name,
        email: userEmail,
        githubUsername: trimmedGithub || session.user.githubUsername || null,
        avatarUrl: session.user.image || null,
        provider: session.user.githubUsername ? 'GitHub' : 'Google',
        convertedFrom: redirectTo !== '/' ? redirectTo : null,
      })
    } catch (err) {
      console.error('[completeUserProfile] Slack notification failed:', err)
    }
  })()

  const posthogPromise = (async () => {
    try {
      const posthog = (await import('@/lib/posthog-server')).default()
      if (posthog) {
        const phProperties = {
          name: session.user.name,
          email: userEmail,
          githubUsername: trimmedGithub || session.user.githubUsername || null,
          provider: session.user.githubUsername ? 'GitHub' : 'Google',
          convertedFrom: redirectTo !== '/' ? redirectTo : null,
          $set: {
            name: session.user.name,
            email: userEmail,
            github_username: trimmedGithub || session.user.githubUsername || null,
          },
        }

        posthog.capture({
          distinctId: userEmail,
          event: 'user_created',
          properties: phProperties,
        })

        posthog.capture({
          distinctId: userEmail,
          event: 'onboarding_completed',
          properties: phProperties,
        })

        await posthog.shutdown()
      }
    } catch (err) {
      console.error('[completeUserProfile] PostHog event tracking failed:', err)
    }
  })()

  await Promise.all([emailPromise, slackPromise, posthogPromise])

  redirect(redirectTo)
}
