import { loadRegistry, inferCategory } from "../data/registry-loader.js";
function toSummary(item) {
    return {
        name: item.name,
        title: item.title,
        description: item.description,
        category: inferCategory(item),
        // Primary: bunx (bun users) — Secondary: npx (everyone else)
        cliCommand: `bunx --bun shadcn@latest add @spectrumui/${item.name}`,
        cliCommandNpx: `npx shadcn@latest add @spectrumui/${item.name}`,
        docsUrl: `https://spectrumhq.in/docs/${item.name}`,
        dependencies: item.dependencies ?? [],
    };
}
/** Returns all components, optionally filtered by category */
export async function listComponents(category) {
    const registry = await loadRegistry();
    const all = registry.items.map(toSummary);
    if (!category)
        return all;
    return all.filter((c) => c.category.toLowerCase() === category.toLowerCase());
}
//# sourceMappingURL=list-components.js.map