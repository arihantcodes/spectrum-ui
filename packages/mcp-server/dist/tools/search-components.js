import { loadRegistry, inferCategory } from "../data/registry-loader.js";
function score(item, query) {
    const q = query.toLowerCase();
    const name = item.name.toLowerCase();
    const title = item.title.toLowerCase();
    const desc = item.description.toLowerCase();
    const category = inferCategory(item).toLowerCase();
    // Exact name match = highest
    if (name === q)
        return 100;
    if (title === q)
        return 90;
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
    return s;
}
/** Fuzzy-search components by keyword. Returns top matches sorted by relevance. */
export async function searchComponents(query, limit = 10) {
    const registry = await loadRegistry();
    return registry.items
        .map((item) => ({
        name: item.name,
        title: item.title,
        description: item.description,
        category: inferCategory(item),
        score: score(item, query),
        cliCommand: `npx shadcn@latest add https://spectrumhq.in/r/${item.name}.json`,
        docsUrl: `https://spectrumhq.in/docs/${item.name}`,
    }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}
//# sourceMappingURL=search-components.js.map