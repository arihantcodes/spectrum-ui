import va from "@vercel/analytics";
import posthog from "posthog-js";
import { z } from "zod";

const eventSchema = z.object({
  name: z.enum([
    // Existing events
    "copy_npm_command",
    "copy_usage_import_code",
    "copy_usage_code",
    "copy_primitive_code",
    "copy_theme_code",
    "copy_block_code",
    "copy_chunk_code",
    "enable_lift_mode",
    "copy_chart_code",
    "copy_chart_theme",
    "copy_chart_data",
    "copy_color",
    // Existing PostHog events
    "component_copied",
    "block_code_copied",
    "cli_command_copied",
    "component_viewed",
    "block_viewed",
    "tab_switched",
    // Auth-gate funnel events
    "view_code_clicked",
    "copy_code_clicked",
    "copy_cli_clicked",
    "copy_mcp_prompt_clicked",
    "login_modal_opened",
    "github_login_started",
    "google_login_started",
    "login_successful",
    "code_unlocked",
    // Bookmark events
    "bookmark_added",
    "bookmark_removed",
    "bookmarks_page_viewed",
    // Retention & Conversion events
    "theme_toggled",
    "search_performed",
    // Command palette (⌘K)
    "command_palette_opened",
    "command_palette_action",
    "command_palette_dismissed",
    "keyboard_shortcut_used",
    "preview_viewport_changed",
    "checkout_initiated",
    "checkout_completed",
    "pro_waitlist_checkout_initiated",
    "pro_waitlist_joined",
    "onboarding_started",
    "onboarding_completed",
    "pro_page_viewed",
    "pro_waitlist_success_viewed",
  ]),
  // declare type AllowedPropertyValues = string | number | boolean | null
  properties: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .optional(),
});

export type Event = z.infer<typeof eventSchema>;

/**
 * Fire-and-forget by design: analytics must never break the thing it measures.
 * A blocked script, an SDK that never initialised, or one stray property used
 * to throw straight into the click handler that called this, which meant an ad
 * blocker could stop a button from doing its job.
 */
export function trackEvent(input: Event): void {
  const parsed = eventSchema.safeParse(input);

  if (!parsed.success) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("trackEvent: ignored invalid event", input, parsed.error.issues);
    }
    return;
  }

  const event = parsed.data;

  try {
    // Track in Vercel Analytics
    va.track(event.name, event.properties);
  } catch {
    // Blocked or unavailable — nothing to do.
  }

  try {
    // Track in PostHog (before_send in provider handles localhost filtering)
    posthog.capture(event.name, event.properties);
  } catch {
    // Blocked or unavailable — nothing to do.
  }
}
