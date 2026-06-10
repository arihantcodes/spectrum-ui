import { loadRegistry, inferCategory } from "../data/registry-loader.js";

export interface CategoryInfo {
  name: string;
  count: number;
  components: string[];
}

/** Lists all component categories with counts. */
export async function listCategories(): Promise<CategoryInfo[]> {
  const registry = await loadRegistry();
  const map = new Map<string, string[]>();

  for (const item of registry.items) {
    const cat = inferCategory(item);
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(item.title);
  }

  return Array.from(map.entries())
    .map(([name, components]) => ({ name, count: components.length, components }))
    .sort((a, b) => b.count - a.count);
}
