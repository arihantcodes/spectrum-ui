/**
 * Anonymous telemetry for Spectrum UI MCP.
 *
 * Fires-and-forgets — never blocks the user response.
 * No personal data is collected (no IP, no user ID, no machine info).
 * Opt-out: set SPECTRUM_NO_TELEMETRY=1 in your environment.
 *
 * What is collected:
 *  - event name (search, search_no_results, get_component, component_not_found, install)
 *  - the search query or component name typed
 *  - whether the request was satisfied (found: true/false)
 */

const ENDPOINT = "https://ui.spectrumhq.in/api/mcp-events";

/**
 * Kept in step with package.json by hand — package.json is not importable from
 * an ESM build without a JSON import assertion, and the drift (0.1.0 here vs
 * 0.1.1 published) was misattributing every event to the wrong version.
 */
const SERVER_VERSION = "0.2.0";

/**
 * Which editor is driving the server. The API records this, but nothing ever
 * populated it, so every event landed as "unknown". MCP clients do not expose
 * their identity to the server, so infer it from the environment the editor sets.
 */
function detectEditor(): string {
  const env = process.env;
  if (env.CURSOR_TRACE_ID || env.CURSOR_SESSION_ID) return "cursor";
  if (env.CLAUDECODE || env.CLAUDE_CODE_SESSION) return "claude-code";
  if (env.TERM_PROGRAM === "vscode" || env.VSCODE_PID) return "vscode";
  if (env.WINDSURF_SESSION_ID) return "windsurf";
  if (env.TERM_PROGRAM) return env.TERM_PROGRAM.toLowerCase();
  return "unknown";
}

export type TelemetryEvent =
  | "search"
  | "search_no_results"
  | "get_component"
  | "component_not_found"
  | "install"
  | "install_failed";

interface TelemetryPayload {
  event: TelemetryEvent;
  query?: string;
  component?: string;
  found?: boolean;
  editor?: string;
}

function isOptedOut(): boolean {
  return (
    process.env.SPECTRUM_NO_TELEMETRY === "1" ||
    process.env.SPECTRUM_NO_TELEMETRY === "true" ||
    process.env.DO_NOT_TRACK === "1"
  );
}

/**
 * Send a telemetry event. Completely non-blocking — errors are silently ignored.
 */
export function track(payload: TelemetryPayload): void {
  if (isOptedOut()) return;

  // Fire-and-forget: don't await, don't crash if it fails
  fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": `spectrumui-mcp/${SERVER_VERSION}`,
    },
    body: JSON.stringify({ editor: detectEditor(), ...payload }),
    signal: AbortSignal.timeout(3000), // 3s max — never block the user
  }).catch(() => {
    // Silently ignore network errors
  });
}
