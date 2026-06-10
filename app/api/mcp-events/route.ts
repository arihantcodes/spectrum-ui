import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      event,        // "search_no_results" | "component_not_found" | "search" | "install" | "get_component"
      query,        // the raw search string or component name the user typed
      component,    // resolved component name (if found)
      found,        // boolean — was the request satisfied?
      editor,       // "claude" | "cursor" | "windsurf" | "unknown"
    } = body;

    if (!event || typeof event !== "string") {
      return NextResponse.json({ error: "missing event" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("mcp_events").insert({
      event,
      query:     query     ?? null,
      component: component ?? null,
      found:     found     ?? null,
      editor:    editor    ?? "unknown",
      // ip is deliberately NOT stored — privacy first
    });

    if (error) {
      console.error("[mcp-events]", error.message);
      return NextResponse.json({ error: "db error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
}
