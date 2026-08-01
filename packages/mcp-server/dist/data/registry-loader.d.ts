/**
 * Fetches and caches the Spectrum UI registry index.
 *
 * The index lists every installable item; the shadcn CLI fetches per-item
 * payloads separately. Blocks and components share one flat namespace, because
 * `@spectrumui/<name>` resolves to https://ui.spectrumhq.in/r/<name>.json — so
 * `type` is what distinguishes them, not the URL.
 */
export interface RegistryFile {
    path: string;
    type: string;
    target: string;
}
export interface RegistryItem {
    name: string;
    type: string;
    title: string;
    description: string;
    files: RegistryFile[];
    dependencies?: string[];
    registryDependencies?: string[];
    tags?: string[];
    category?: string;
    docsUrl?: string;
    new?: boolean;
}
export interface Registry {
    $schema: string;
    name: string;
    homepage: string;
    items: RegistryItem[];
}
export declare function loadRegistry(): Promise<Registry>;
/** Items installable as standalone blocks. */
export declare function isBlock(item: RegistryItem): boolean;
/**
 * Category for an item.
 *
 * The registry index now carries a real `category`, joined from
 * content/component-catalog.json at generation time. The regex cascade below is
 * only a fallback for items with no catalog entry (demos, dependency-only
 * items), and should shrink over time rather than grow.
 */
export declare function inferCategory(item: RegistryItem): string;
//# sourceMappingURL=registry-loader.d.ts.map