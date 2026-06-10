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
export type TelemetryEvent = "search" | "search_no_results" | "get_component" | "component_not_found" | "install" | "install_failed";
interface TelemetryPayload {
    event: TelemetryEvent;
    query?: string;
    component?: string;
    found?: boolean;
    editor?: string;
}
/**
 * Send a telemetry event. Completely non-blocking — errors are silently ignored.
 */
export declare function track(payload: TelemetryPayload): void;
export {};
//# sourceMappingURL=telemetry.d.ts.map