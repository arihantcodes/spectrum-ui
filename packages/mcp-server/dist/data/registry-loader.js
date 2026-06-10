/**
 * Fetches and caches the Spectrum UI component registry.
 * The registry is loaded once per process from the live endpoint.
 */
const REGISTRY_URL = "https://spectrumhq.in/r/registry.json";
let _cache = null;
export async function loadRegistry() {
    if (_cache)
        return _cache;
    try {
        const res = await fetch(REGISTRY_URL, {
            headers: { "User-Agent": "spectrumui-mcp/0.1" },
        });
        if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
        _cache = (await res.json());
    }
    catch {
        // Fallback: try reading local file if running inside the repo
        const { readFileSync } = await import("fs");
        const { resolve, dirname } = await import("path");
        const { fileURLToPath } = await import("url");
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const localPath = resolve(__dirname, "../../registry.json");
        try {
            _cache = JSON.parse(readFileSync(localPath, "utf-8"));
        }
        catch {
            throw new Error(`Failed to load Spectrum UI registry from ${REGISTRY_URL} and no local fallback found.`);
        }
    }
    return _cache;
}
/** Derive a rough category from a component name */
export function inferCategory(item) {
    const n = item.name.toLowerCase();
    const t = item.title.toLowerCase();
    const combined = `${n} ${t}`;
    if (/ai|chat|prompt|stream|model|llm|token/.test(combined))
        return "AI";
    if (/chart|graph|viz|metric|gauge/.test(combined))
        return "Data";
    if (/form|input|select|checkbox|radio|textarea|label/.test(combined))
        return "Forms";
    if (/card|badge|alert|toast|notification|status/.test(combined))
        return "Feedback";
    if (/nav|header|footer|menu|sidebar|breadcrumb|tab/.test(combined))
        return "Navigation";
    if (/modal|dialog|drawer|sheet|overlay|popover/.test(combined))
        return "Overlays";
    if (/table|list|grid|scroll|pagination/.test(combined))
        return "Layout";
    if (/text|heading|typography|font|scramble|ticker/.test(combined))
        return "Typography";
    if (/animation|motion|transition|animated/.test(combined))
        return "Animation";
    if (/button|icon|avatar|image|preview/.test(combined))
        return "Elements";
    if (/calendar|date|time|event|picker/.test(combined))
        return "Date & Time";
    if (/login|auth|profile|user/.test(combined))
        return "Auth";
    if (/kanban|todo|task|board/.test(combined))
        return "Productivity";
    if (/product|pricing|checkout|payment|review/.test(combined))
        return "Commerce";
    if (/testimonial|quote|social|github/.test(combined))
        return "Social";
    return "General";
}
//# sourceMappingURL=registry-loader.js.map