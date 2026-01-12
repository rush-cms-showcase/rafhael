import { RushClient } from "./client";

export class Entries extends RushClient {
    async get(collection: string, params: Record<string, any> = {}) {
        return this.request(`/collections/${collection}/entries`, params);
    }

    async getBySlug(collection: string, slug: string, params: Record<string, any> = {}) {
        return this.request(`/collections/${collection}/entries/${slug}`, params);
    }
}
