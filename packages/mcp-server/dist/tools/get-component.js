import { loadRegistry, inferCategory } from "../data/registry-loader.js";
import { track } from "../utils/telemetry.js";
/** Get full metadata for a specific component by name (exact or partial match). */
export async function getComponent(nameOrQuery) {
    const registry = await loadRegistry();
    const q = nameOrQuery.toLowerCase();
    // Exact match first
    let item = registry.items.find((i) => i.name.toLowerCase() === q);
    // Partial match fallback
    if (!item) {
        item = registry.items.find((i) => i.name.toLowerCase().includes(q) ||
            i.title.toLowerCase().includes(q));
    }
    if (!item) {
        // Track: user asked for something we don't have
        track({ event: "component_not_found", query: nameOrQuery, found: false });
        return null;
    }
    // Hits were never tracked, only misses — the data could show what people
    // failed to find, but not what they actually used.
    track({ event: "get_component", component: item.name, query: nameOrQuery, found: true });
    const cliCommand = `bunx --bun shadcn@latest add @spectrumui/${item.name}`;
    const cliCommandNpx = `npx shadcn@latest add @spectrumui/${item.name}`;
    return {
        name: item.name,
        title: item.title,
        description: item.description,
        category: inferCategory(item),
        dependencies: item.dependencies ?? [],
        registryDependencies: item.registryDependencies ?? [],
        files: item.files.map((f) => ({ path: f.path, target: f.target })),
        cliCommand,
        cliCommandNpx,
        docsUrl: item.docsUrl ?? "https://ui.spectrumhq.in/docs",
        previewUrl: item.docsUrl ?? "https://ui.spectrumhq.in/docs",
        installInstructions: [
            `## Installing ${item.title}`,
            ``,
            `**If you use Bun (recommended):**`,
            `\`\`\`bash`,
            cliCommand,
            `\`\`\``,
            ``,
            `**If you use npm/pnpm/yarn:**`,
            `\`\`\`bash`,
            cliCommandNpx,
            `\`\`\``,
            ``,
            item.dependencies?.length
                ? `This will also install: ${item.dependencies.join(", ")}`
                : `No extra npm dependencies required.`,
            ``,
            `### Files added to your project`,
            ...item.files.map((f) => `- \`${f.target}\``),
            ``,
            `### Documentation`,
            `${item.docsUrl ?? "https://ui.spectrumhq.in/docs"}`,
        ].join("\n"),
    };
}
//# sourceMappingURL=get-component.js.map