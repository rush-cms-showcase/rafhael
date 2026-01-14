export interface SearchIndexItem {
    title: string;
    slug: string;
    published_at: string;
    type?: 'blog' | 'page';
}

const SEARCH_INDEX_CACHE: Record<string, SearchIndexItem[]> = {};

/**
 * Fetches the lightweight search index from the API.
 * Caches the result in memory to avoid repeated requests during the session.
 */
export async function fetchSearchIndex(locale: string = 'en'): Promise<SearchIndexItem[]> {
    if (SEARCH_INDEX_CACHE[locale]) {
        return SEARCH_INDEX_CACHE[locale];
    }

    try {
        console.log(`[SearchService] Fetching search index for locale: ${locale}`);
        
        // Fetch from local static file generated at build time
        // URL: /search-index/en.json or /search-index/pt_BR.json
        const response = await fetch(`/search-index/${locale}.json`);

        if (!response.ok) {
            console.warn(`[SearchService] Failed to load search index: ${response.status}`);
            return [];
        }

        const data = await response.json() as SearchIndexItem[];
        SEARCH_INDEX_CACHE[locale] = data;
        return data;
    } catch (error) {
        console.error("[SearchService] Error fetching search index:", error);
        return [];
    }
}
