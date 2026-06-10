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

const ENDPOINT = "https://spectrumhq.in/api/mcp-events";
const SERVER_VERSION = "0.1.0";

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
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(3000), // 3s max — never block the user
  }).catch(() => {
    // Silently ignore network errors
  });
}
