import { marked } from "marked";

const ALLOWED_DOMAINS = ['rafhael.pro', 'rafhael.com.br', 'localhost'];
const SITE_URL = 'https://rafhael.pro';

export const configureMarked = () => {
    const renderer = new marked.Renderer();
    
    // Store original reference if needed, though we fully override link here
    // const originalLink = renderer.link.bind(renderer); 

    renderer.link = ({ href, title, text }: { href: string; title: string | null; text: string }) => {
        let isExternal = false;
        const cleanHref = href || '';

        // Check protocol to identify absolute URLs
        if (cleanHref.startsWith('http') || cleanHref.startsWith('//')) {
            try {
                // Determine if it really points to an external host
                const url = new URL(cleanHref, SITE_URL);
                isExternal = !ALLOWED_DOMAINS.some(domain => url.hostname.includes(domain));
            } catch (e) {
                // Fallback: if URL is invalid, treat as internal/safe or broker link
                isExternal = false;
            }
        }

        const titleAttr = title ? ` title="${title}"` : '';
        const targetAttr = isExternal ? ' target="_blank" rel="nofollow noopener noreferrer"' : '';

        return `<a href="${cleanHref}"${titleAttr}${targetAttr}>${text}</a>`;
    };

    marked.use({ renderer });
    return marked;
};
