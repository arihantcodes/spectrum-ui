export interface InstallResult {
    success: boolean;
    component: string;
    command: string;
    output?: string;
    error?: string;
    nextSteps?: string;
}
/**
 * Installs a Spectrum UI component into the user's project.
 * Tries `bunx --bun shadcn@latest add @spectrumui/<name>` first (faster),
 * falls back to `npx shadcn@latest add @spectrumui/<name>`.
 *
 * @param name       Component name (e.g. "animated-card", "alert-1")
 * @param projectDir Absolute path to the project root (defaults to cwd)
 */
export declare function installComponent(name: string, projectDir?: string): Promise<InstallResult>;
//# sourceMappingURL=install-component.d.ts.map