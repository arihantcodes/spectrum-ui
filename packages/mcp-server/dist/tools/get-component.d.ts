export interface ComponentDetail {
    name: string;
    title: string;
    description: string;
    category: string;
    dependencies: string[];
    registryDependencies: string[];
    files: Array<{
        path: string;
        target: string;
    }>;
    cliCommand: string;
    cliCommandNpx: string;
    docsUrl: string;
    previewUrl: string;
    installInstructions: string;
}
/** Get full metadata for a specific component by name (exact or partial match). */
export declare function getComponent(nameOrQuery: string): Promise<ComponentDetail | null>;
//# sourceMappingURL=get-component.d.ts.map