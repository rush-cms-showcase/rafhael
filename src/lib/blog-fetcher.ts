import { rush } from './rush';
import type { BlogPost } from './rush';

interface FetchAllOptions {
    locale: string;
    perPage?: number;
}

/**
 * Fetches ALL blog posts by iterating through API pagination.
 * This avoids caching issues with large per_page requests and handles any number of posts.
 */
export async function fetchAllPosts({ locale, perPage = 100 }: FetchAllOptions): Promise<BlogPost[]> {
    const allPosts: BlogPost[] = [];
    
    try {
        // Fetch first page to get metadata
        console.log(`[FetchAllPosts] Fetching page 1 for locale ${locale}...`);
        const firstPageResponse = await rush.getEntries("blog", {
            per_page: perPage,
            locale: locale,
            include: 'featured_image'
        });
        
        const firstPageData = (firstPageResponse as any).data as BlogPost[];
        allPosts.push(...firstPageData);
        
        const meta = (firstPageResponse as any).meta;
        
        if (!meta) {
            console.warn("[FetchAllPosts] No metadata found in response. Assuming single page.");
            return allPosts;
        }

        const lastPage = meta.last_page;
        console.log(`[FetchAllPosts] Total pages: ${lastPage}, Total items: ${meta.total}`);

        if (lastPage > 1) {
            // Create promises for remaining pages
            const promises = [];
            for (let page = 2; page <= lastPage; page++) {
                promises.push(
                    rush.getEntries("blog", {
                        per_page: perPage,
                        page: page,
                        locale: locale,
                        include: 'featured_image'
                    }).then(response => (response as any).data as BlogPost[])
                );
            }
            
            // Execute all promises in parallel
            console.log(`[FetchAllPosts] Fetching ${promises.length} remaining pages in parallel...`);
            const remainingPages = await Promise.all(promises);
            
            // Flatten and add to results
            remainingPages.forEach(pagePosts => {
                allPosts.push(...pagePosts);
            });
        }
        
    } catch (error) {
        console.error(`[FetchAllPosts] Error fetching posts for locale ${locale}:`, error);
        // We throw so Astro build fails if we can't get data (safer than generating empty site)
        throw error;
    }

    // Remove duplicates just in case (though API shouldn't return them if pages are stable)
    const uniquePosts = Array.from(new Map(allPosts.map(p => [p.id, p])).values());
    console.log(`[FetchAllPosts] Completed. Fetched ${uniquePosts.length} unique posts.`);
    
    return uniquePosts;
}
