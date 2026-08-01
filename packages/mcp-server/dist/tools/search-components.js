import { loadRegistry, inferCategory } from "../data/registry-loader.js";
import { track } from "../utils/telemetry.js";
function score(item, query) {
    const q = query.toLowerCase();
    const name = item.name.toLowerCase();
    const title = item.title.toLowerCase();
    const desc = item.description.toLowerCase();
    const category = inferCategory(item).toLowerCase();
    // Exact matches must be decisive. At 100/90 they were not: "avatar stack"
    // exactly matched the title of avatar-stack (90), but avatar-stack-demo
    // accumulated 111 from starts-with + contains + word hits and outranked it.
    if (name === q)
        return 1000;
    if (title === q)
        return 900;
    let s = 0;
    // Starts-with match
    if (name.startsWith(q))
        s += 60;
    if (title.startsWith(q))
        s += 50;
    // Contains match
    if (name.includes(q))
        s += 30;
    if (title.includes(q))
        s += 25;
    if (desc.includes(q))
        s += 15;
    if (category.includes(q))
        s += 10;
    // Word-level matching for multi-word queries
    const words = q.split(/\s+/);
    for (const word of words) {
        if (word.length < 2)
            continue;
        if (name.includes(word))
            s += 10;
        if (title.includes(word))
            s += 8;
        if (desc.includes(word))
            s += 4;
    }
    // Demos, usage examples and dependency-only items are supporting material.
    // Without this, searching "avatar stack" surfaced avatar-stack-demo above
    // avatar-stack, so an agent would install the demo instead of the component.
    if (/-(demo|usage|example|dependencies|dependecies|as-child)$/.test(name)) {
        s -= 20;
    }
    return s;
}
/** Fuzzy-search components by keyword. Returns top matches sorted by relevance. */
export async function searchComponents(query, limit = 10) {
    const registry = await loadRegistry();
    const results = registry.items
        .map((item) => ({
        name: item.name,
        title: item.title,
        description: item.description,
        category: inferCategory(item),
        score: score(item, query),
        cliCommand: `bunx --bun shadcn@latest add @spectrumui/${item.name}`,
        docsUrl: item.docsUrl ?? "https://ui.spectrumhq.in/docs",
    }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    // Track: all searches + zero-result searches (the most valuable signal)
    track({ event: "search", query, found: results.length > 0 });
    if (results.length === 0) {
        track({ event: "search_no_results", query, found: false });
    }
    return results;
}
//# sourceMappingURL=search-components.js.map