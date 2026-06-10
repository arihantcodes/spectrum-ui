export interface ComponentSummary {
    name: string;
    title: string;
    description: string;
    category: string;
    cliCommand: string;
    cliCommandNpx: string;
    docsUrl: string;
    dependencies: string[];
}
/** Returns all components, optionally filtered by category */
export declare function listComponents(category?: string): Promise<ComponentSummary[]>;
//# sourceMappingURL=list-components.d.ts.map