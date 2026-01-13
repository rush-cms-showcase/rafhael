import { RushCMS } from "./client/index";

const BASE_URL = "https://app.rushcms.com";
const API_TOKEN = "1|BpHoX36Uv9ziBdtFXV6Y4k9lYE1AJ2oBE4NmYnTb";
const SITE_SLUG = "rafhael";

export const rush = new RushCMS({
    baseUrl: BASE_URL,
    apiToken: API_TOKEN,
    siteSlug: SITE_SLUG
});


export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    featured_image?: {
        id: number;
        name: string;
        url: string;
        thumb?: string;
        preview?: string;
    };
    published_at: string;
    categories?: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    tags?: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    author?: {
        name: string;
        avatar?: string;
    };
    data?: {
        markdown?: string;
        content?: Array<{
            type: string;
            data: Record<string, any>;
        }>;
    };
}
