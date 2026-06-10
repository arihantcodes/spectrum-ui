import { loadRegistry, inferCategory, type RegistryItem } from "../data/registry-loader.js";

export interface ComponentSummary {
  name: string;
  title: string;
  description: string;
  category: string;
  cliCommand: string;      // bunx --bun shadcn@latest add @spectrumui/<name>
  cliCommandNpx: string;  // npx shadcn@latest add @spectrumui/<name>
  docsUrl: string;
  dependencies: string[];
}

function toSummary(item: RegistryItem): ComponentSummary {
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
export async function listComponents(category?: string): Promise<ComponentSummary[]> {
  const registry = await loadRegistry();
  const all = registry.items.map(toSummary);
  if (!category) return all;
  return all.filter(
    (c) => c.category.toLowerCase() === category.toLowerCase()
  );
}
