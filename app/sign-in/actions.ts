'use server'

import { signIn } from '@/auth'

/**
 * Kicks off an OAuth sign-in. Bound with its arguments on the client so the
 * auth buttons can stay inside a client component while the actual `signIn`
 * call runs on the server.
 */
export async function signInWithProvider(
  provider: 'github' | 'google',
  redirectTo: string,
) {
  await signIn(provider, { redirectTo })
}
