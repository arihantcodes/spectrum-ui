import { loadRegistry, inferCategory } from "../data/registry-loader.js";
/** Lists all component categories with counts. */
export async function listCategories() {
    const registry = await loadRegistry();
    const map = new Map();
    for (const item of registry.items) {
        const cat = inferCategory(item);
        if (!map.has(cat))
            map.set(cat, []);
        map.get(cat).push(item.title);
    }
    return Array.from(map.entries())
        .map(([name, components]) => ({ name, count: components.length, components }))
        .sort((a, b) => b.count - a.count);
}
//# sourceMappingURL=list-categories.js.map