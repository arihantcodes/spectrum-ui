import { loadRegistry, inferCategory } from "../data/registry-loader.js";
import { track } from "../utils/telemetry.js";

export interface ComponentDetail {
  name: string;
  title: string;
  description: string;
  category: string;
  dependencies: string[];
  registryDependencies: string[];
  files: Array<{ path: string; target: string }>;
  cliCommand: string;      // bunx --bun shadcn@latest add @spectrumui/<name>
  cliCommandNpx: string;  // npx shadcn@latest add @spectrumui/<name>
  docsUrl: string;
  previewUrl: string;
  installInstructions: string;
}

/** Get full metadata for a specific component by name (exact or partial match). */
export async function getComponent(
  nameOrQuery: string
): Promise<ComponentDetail | null> {
  const registry = await loadRegistry();
  const q = nameOrQuery.toLowerCase();

  // Exact match first
  let item = registry.items.find((i) => i.name.toLowerCase() === q);

  // Partial match fallback
  if (!item) {
    item = registry.items.find(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.title.toLowerCase().includes(q)
    );
  }

  if (!item) {
    // Track: user asked for something we don't have
    track({ event: "component_not_found", query: nameOrQuery, found: false });
    return null;
  }

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
    docsUrl: `https://spectrumhq.in/docs/${item.name}`,
    previewUrl: `https://spectrumhq.in/docs/${item.name}`,
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
      `https://spectrumhq.in/docs/${item.name}`,
    ].join("\n"),
  };
}
