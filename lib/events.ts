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
    "login_modal_opened",
    "github_login_started",
    "google_login_started",
    "login_successful",
    "code_unlocked",
    // Bookmark events
    "bookmark_added",
    "bookmark_removed",
    "bookmarks_page_viewed",
  ]),
  // declare type AllowedPropertyValues = string | number | boolean | null
  properties: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .optional(),
});

export type Event = z.infer<typeof eventSchema>;

export function trackEvent(input: Event): void {
  const event = eventSchema.parse(input);
  if (event) {
    // Track in Vercel Analytics
    va.track(event.name, event.properties);
    // Track in PostHog (before_send in provider handles localhost filtering)
    posthog.capture(event.name, event.properties);
  }
}
