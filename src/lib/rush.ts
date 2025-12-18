import { RushCMSClient } from "@rushcms/client";

const BASE_URL = import.meta.env.RUSH_BASE_URL;
const API_TOKEN = import.meta.env.RUSH_API_TOKEN;
const SITE_SLUG = import.meta.env.RUSH_SITE_SLUG;

if (!BASE_URL || !API_TOKEN || !SITE_SLUG) {
    throw new Error(
        "Rush CMS environment variables are missing. Please check .env file.",
    );
}

const isDev = import.meta.env.DEV;

export const rush = new RushCMSClient({
    baseUrl: BASE_URL,
    apiToken: API_TOKEN,
    siteSlug: SITE_SLUG,
    cache: {
        enabled: !isDev,
        ttl: 7200, // 2 horas
    },
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
    category?: {
        name: string;
        slug: string;
    };
    author?: {
        name: string;
        avatar?: string;
    };
    data?: {
        content?: Array<{
            type: string;
            data: Record<string, any>;
        }>;
    };
}
