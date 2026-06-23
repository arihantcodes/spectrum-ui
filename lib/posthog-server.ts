import { PostHog } from 'posthog-node'

let posthogClient: PostHog | null = null

export default function getPostHogClient() {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    console.warn('PostHog API key is missing. Analytics will not be tracked.')
    return null
  }

  if (!posthogClient) {
    posthogClient = new PostHog(
      process.env.NEXT_PUBLIC_POSTHOG_KEY as string,
      {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        flushAt: 1,
        flushInterval: 0
      }
    )
  }
  return posthogClient
}
