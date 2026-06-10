import { execSync } from "child_process";
import { loadRegistry } from "../data/registry-loader.js";
/**
 * Installs a Spectrum UI component into the user's project.
 * Tries `bunx --bun shadcn@latest add @spectrumui/<name>` first (faster),
 * falls back to `npx shadcn@latest add @spectrumui/<name>`.
 *
 * @param name       Component name (e.g. "animated-card", "alert-1")
 * @param projectDir Absolute path to the project root (defaults to cwd)
 */
export async function installComponent(name, projectDir) {
    const registry = await loadRegistry();
    const q = name.toLowerCase();
    const item = registry.items.find((i) => i.name.toLowerCase() === q) ??
        registry.items.find((i) => i.name.toLowerCase().includes(q) ||
            i.title.toLowerCase().includes(q));
    if (!item) {
        return {
            success: false,
            component: name,
            command: "",
            error: `Component "${name}" not found in the Spectrum UI registry. Use search_components to find the correct name.`,
        };
    }
    // Both forms work — bunx is faster when bun is installed
    const bunxCommand = `bunx --bun shadcn@latest add @spectrumui/${item.name}`;
    const npxCommand = `npx shadcn@latest add @spectrumui/${item.name}`;
    const cwd = projectDir ?? process.cwd();
    let usedCommand = bunxCommand;
    let output = "";
    // Try bunx first, fall back to npx if bun isn't available
    try {
        output = execSync(bunxCommand, {
            cwd,
            encoding: "utf-8",
            timeout: 120_000,
            stdio: "pipe",
        });
    }
    catch {
        try {
            usedCommand = npxCommand;
            output = execSync(npxCommand, {
                cwd,
                encoding: "utf-8",
                timeout: 120_000,
                stdio: "pipe",
            });
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            return {
                success: false,
                component: item.name,
                command: usedCommand,
                error: msg,
                nextSteps: [
                    `Run manually (Bun):`,
                    `  ${bunxCommand}`,
                    ``,
                    `Run manually (npm):`,
                    `  ${npxCommand}`,
                ].join("\n"),
            };
        }
    }
    return {
        success: true,
        component: item.name,
        command: usedCommand,
        output: output.trim(),
        nextSteps: [
            `✅ ${item.title} installed successfully!`,
            ``,
            `Files added:`,
            ...item.files.map((f) => `  • ${f.target}`),
            ``,
            item.dependencies?.length
                ? `Dependencies installed: ${item.dependencies.join(", ")}`
                : "",
            ``,
            `Import it with:`,
            `  import { ... } from "@/components/spectrumui/${item.files[0]?.target.split("/").pop()?.replace(".tsx", "") ?? item.name}"`,
            ``,
            `Full docs: https://spectrumhq.in/docs/${item.name}`,
        ]
            .filter(Boolean)
            .join("\n"),
    };
}
//# sourceMappingURL=install-component.js.map