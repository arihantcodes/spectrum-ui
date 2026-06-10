/**
 * Fetches and caches the Spectrum UI component registry.
 * The registry is loaded once per process from the live endpoint.
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
}
export interface Registry {
    $schema: string;
    name: string;
    homepage: string;
    items: RegistryItem[];
}
export declare function loadRegistry(): Promise<Registry>;
/** Derive a rough category from a component name */
export declare function inferCategory(item: RegistryItem): string;
//# sourceMappingURL=registry-loader.d.ts.map