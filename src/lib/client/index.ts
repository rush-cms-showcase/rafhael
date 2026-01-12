import { RushClient, type RushClientConfig } from "./client";
import { Entries } from "./entries";

export class RushCMS extends RushClient {
    public entries: Entries;

    constructor(config: RushClientConfig) {
        super(config);
        this.entries = new Entries(config);
    }
    
    // Helper for backward compatibility or direct access if preferred
    // The previous SDK used rush.getEntries(), so we can either expose it directly here or change usage.
    // To match the user's request for structure (entries.ts, etc), `rush.entries.get` is cleaner,
    // BUT `src/pages/...` uses `rush.getEntries`.
    // I will implement a proxy method here to avoid refactoring ALL pages right now, 
    // or I can refactor the pages. The user asked for a "custom client", usually implies breaking changes are okay if better.
    // However, for speed and stability, I'll alias it.

    async getEntries(collection: string, params: Record<string, any> = {}) {
        return this.entries.get(collection, params);
    }
}
