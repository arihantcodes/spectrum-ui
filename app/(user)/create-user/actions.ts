'use server'

import { waitUntil } from '@vercel/functions'
import { auth } from '@/auth'
import { syncUser } from '@/lib/user-sync'
import { notifyNewSignup } from '@/lib/slack'
import { sendFounderWelcomeEmail } from '@/lib/resend'
import { redirect } from 'next/navigation'
import { validateGithubUsername } from '@/lib/validate-github-username'

async function runOnboardingSideEffects(params: {
  userEmail: string
  userName: string | null | undefined
  userImage: string | null | undefined
  githubUsername: string
  sessionGithubUsername: string | null | undefined
  redirectTo: string
}) {
  const {
    userEmail,
    userName,
    userImage,
    githubUsername,
    sessionGithubUsername,
    redirectTo,
  } = params

  const emailPromise = (async () => {
    try {
      const { supabaseAdmin } = await import('@/lib/supabase-admin')
      const { data: userRecord } = await supabaseAdmin
        .from('users')
        .select('welcome_email_sent')
        .eq('email', userEmail)
        .single()

      if (userRecord && !userRecord.welcome_email_sent) {
        await sendFounderWelcomeEmail(userEmail, userName || '')

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
        name: userName,
        email: userEmail,
        githubUsername: githubUsername || sessionGithubUsername || null,
        avatarUrl: userImage || null,
        provider: sessionGithubUsername ? 'GitHub' : 'Google',
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
          name: userName,
          email: userEmail,
          githubUsername: githubUsername || sessionGithubUsername || null,
          provider: sessionGithubUsername ? 'GitHub' : 'Google',
          convertedFrom: redirectTo !== '/' ? redirectTo : null,
          $set: {
            name: userName,
            email: userEmail,
            github_username: githubUsername || sessionGithubUsername || null,
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

        await posthog.flush()
      }
    } catch (err) {
      console.error('[completeUserProfile] PostHog event tracking failed:', err)
    }
  })()

  await Promise.all([emailPromise, slackPromise, posthogPromise])
}

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

  // Keep the serverless invocation alive until side effects finish, without
  // blocking the redirect. Plain `void` promises can be killed after response.
  waitUntil(
    runOnboardingSideEffects({
      userEmail,
      userName: session.user.name,
      userImage: session.user.image,
      githubUsername: trimmedGithub,
      sessionGithubUsername: session.user.githubUsername,
      redirectTo,
    })
  )

  redirect(redirectTo)
}
