import { NextResponse, type NextRequest } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { siteConfig } from "@/config/site";

/**
 * Tracked outbound redirect: /go/[code]?s=<surface>&p=<position>
 *
 * `code` resolves in two ways, checked in order:
 *   1. a row in design_outbound_links (sponsors, tools, jobs — paid links), or
 *   2. a design_items.short_id, which redirects to that item's source_url.
 *
 * The second form is why feed cards can link straight to /go/<short_id> without
 * us pre-creating a link row for every gallery item.
 *
 * Always 302, never 301: these targets change and must not be cached forever by
 * browsers. Click counting is fire-and-forget — a failed increment must never
 * cost the user their navigation.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const home = new URL("/design", siteConfig.url);

  if (!code || code.length > 64) {
    return NextResponse.redirect(home, 302);
  }

  let target: string | null = null;
  let paid = false;

  try {
    const { data: link } = await supabaseAdmin
      .from("design_outbound_links")
      .select("id, target, kind, clicks")
      .eq("code", code)
      .maybeSingle();

    if (link?.target) {
      target = link.target;
      paid = link.kind === "sponsor" || link.kind === "tool" || link.kind === "job";
      void supabaseAdmin
        .from("design_outbound_links")
        .update({ clicks: (link.clicks ?? 0) + 1 })
        .eq("id", link.id)
        .then(undefined, () => {});
    } else {
      const { data: item } = await supabaseAdmin
        .from("design_items")
        .select("id, source_url, outbound_clicks")
        .eq("short_id", code)
        .eq("status", "published")
        .maybeSingle();

      if (item?.source_url) {
        target = item.source_url;
        void supabaseAdmin
          .from("design_items")
          .update({ outbound_clicks: (item.outbound_clicks ?? 0) + 1 })
          .eq("id", item.id)
          .then(undefined, () => {});
      }
    }
  } catch {
    // Fall through to the safe redirect below.
  }

  if (!target) return NextResponse.redirect(home, 302);

  // Only http(s) may be redirected to — never let a stored value become a
  // javascript: or data: navigation.
  let destination: URL;
  try {
    destination = new URL(target);
    if (destination.protocol !== "https:" && destination.protocol !== "http:") {
      return NextResponse.redirect(home, 302);
    }
  } catch {
    return NextResponse.redirect(home, 302);
  }

  const response = NextResponse.redirect(destination, 302);
  // Paid placements must not pass link equity.
  response.headers.set(
    "X-Robots-Tag",
    paid ? "noindex, nofollow" : "noindex, follow",
  );
  return response;
}
