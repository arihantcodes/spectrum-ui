interface SearchResult {
    name: string;
    title: string;
    description: string;
    category: string;
    score: number;
    cliCommand: string;
    docsUrl: string;
}
/** Fuzzy-search components by keyword. Returns top matches sorted by relevance. */
export declare function searchComponents(query: string, limit?: number): Promise<SearchResult[]>;
export {};
//# sourceMappingURL=search-components.d.ts.map