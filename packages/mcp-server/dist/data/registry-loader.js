/**
 * Fetches and caches the Spectrum UI registry index.
 *
 * The index lists every installable item; the shadcn CLI fetches per-item
 * payloads separately. Blocks and components share one flat namespace, because
 * `@spectrumui/<name>` resolves to https://ui.spectrumhq.in/r/<name>.json — so
 * `type` is what distinguishes them, not the URL.
 */
/**
 * Canonical host. Was previously the apex (spectrumhq.in), which only worked
 * because it redirects to www; registry.json's own `homepage` and
 * config/site.ts both use the ui. subdomain.
 */
const DEFAULT_REGISTRY_URL = "https://ui.spectrumhq.in/r/registry.json";
/**
 * Override to point at a local or staging registry — a file:// URL or an
 * absolute path both work. Lets the registry be verified before it is deployed,
 * which is how the 38-missing-items drift went unnoticed for so long.
 */
const REGISTRY_URL = process.env.SPECTRUM_REGISTRY_URL || DEFAULT_REGISTRY_URL;
/**
 * A stdio session lives as long as the editor does. The previous cache never
 * expired, so a long-running session never saw newly published items.
 */
const CACHE_TTL_MS = 5 * 60 * 1000;
let _cache = null;
let _cachedAt = 0;
/** Bundled snapshot, used when the network is unavailable. */
async function loadLocalSnapshot() {
    const { readFileSync, existsSync } = await import("fs");
    const { resolve, dirname } = await import("path");
    const { fileURLToPath } = await import("url");
    const here = dirname(fileURLToPath(import.meta.url));
    // Published package: dist/data/ -> package root. In-repo dev: also walk up to
    // the repo root, where the real registry.json lives. The previous single
    // candidate resolved to a path that has never existed, so the fallback was
    // dead code and any network blip became a hard failure.
    const candidates = [
        resolve(here, "../../registry.json"),
        resolve(here, "../../../registry.json"),
        resolve(here, "../../../../registry.json"),
        resolve(here, "../../../../public/r/registry.json"),
    ];
    for (const candidate of candidates) {
        if (!existsSync(candidate))
            continue;
        try {
            return JSON.parse(readFileSync(candidate, "utf-8"));
        }
        catch {
            // Malformed snapshot — keep looking.
        }
    }
    return null;
}
export async function loadRegistry() {
    if (_cache && Date.now() - _cachedAt < CACHE_TTL_MS)
        return _cache;
    // A local override is read straight off disk — no fetch, no cache staleness.
    if (!/^https?:\/\//.test(REGISTRY_URL)) {
        const { readFileSync } = await import("fs");
        const filePath = REGISTRY_URL.startsWith("file://")
            ? (await import("url")).fileURLToPath(REGISTRY_URL)
            : REGISTRY_URL;
        _cache = JSON.parse(readFileSync(filePath, "utf-8"));
        _cachedAt = Date.now();
        return _cache;
    }
    try {
        const res = await fetch(REGISTRY_URL, {
            headers: { "User-Agent": "spectrumui-mcp" },
            signal: AbortSignal.timeout(10_000),
        });
        if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
        _cache = (await res.json());
        _cachedAt = Date.now();
        return _cache;
    }
    catch (error) {
        const snapshot = await loadLocalSnapshot();
        if (snapshot) {
            _cache = snapshot;
            _cachedAt = Date.now();
            return _cache;
        }
        // Serve a stale cache rather than failing outright — an old answer beats no
        // answer when the user is mid-task.
        if (_cache)
            return _cache;
        throw new Error(`Failed to load the Spectrum UI registry from ${REGISTRY_URL} ` +
            `(${error instanceof Error ? error.message : String(error)}) and no local snapshot was found.`);
    }
}
/** Items installable as standalone blocks. */
export function isBlock(item) {
    return item.type === "registry:block";
}
/**
 * Category for an item.
 *
 * The registry index now carries a real `category`, joined from
 * content/component-catalog.json at generation time. The regex cascade below is
 * only a fallback for items with no catalog entry (demos, dependency-only
 * items), and should shrink over time rather than grow.
 */
export function inferCategory(item) {
    if (item.category)
        return item.category;
    const combined = `${item.name} ${item.title}`.toLowerCase();
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