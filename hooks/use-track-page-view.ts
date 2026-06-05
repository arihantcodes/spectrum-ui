"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

/**
 * Fires a PostHog page-view event once on mount.
 * The before_send hook in provider.tsx drops events on localhost automatically.
 *
 * @param eventName - e.g. "component_viewed" | "block_viewed"
 * @param properties - additional properties to attach (e.g. component_name)
 */
export function useTrackPageView(
  eventName: string,
  properties?: Record<string, string>,
) {
  const pathname = usePathname();

  useEffect(() => {
    posthog.capture(eventName, {
      url: pathname,
      ...properties,
    });
    // Only fire once on mount — intentionally omit dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
