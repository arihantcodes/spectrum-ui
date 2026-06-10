"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import posthog from "posthog-js";

/**
 * Keeps PostHog's distinct_id in sync with the logged-in user's email.
 *
 * - Logged out  → anonymous PostHog ID (default behaviour, no change)
 * - Logged in   → posthog.identify(email, { name, ... }) so every event
 *                 is attributed to the real user in the PostHog dashboard.
 * - Signs out   → posthog.reset() so the next session starts fresh.
 *
 * Mount this once inside PostHogProvider (already wrapped in SessionProvider).
 */
export function PostHogIdentify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // wait for session to resolve

    if (status === "authenticated" && session?.user?.email) {
      const { email, name, image } = session.user;

      posthog.identify(email, {
        email,
        name:       name  ?? undefined,
        avatar_url: image ?? undefined,
      });
    }

    if (status === "unauthenticated") {
      // Reset so the next anonymous session starts fresh (posthog handles this safely)
      posthog.reset();
    }
  }, [status, session?.user?.email]);

  return null; // purely side-effect component, renders nothing
}
