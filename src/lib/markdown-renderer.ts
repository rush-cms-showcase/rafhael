import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeExpressiveCode from 'rehype-expressive-code';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import type { Element } from 'hast';

const ALLOWED_DOMAINS = ['rafhael.pro', 'rafhael.com.br', 'localhost'];
const SITE_URL = 'https://rafhael.pro';

// Custom plugin to add target="_blank" and rel attributes to external links
const rehypeExternalLinks = () => {
    return (tree: any) => {
        visit(tree, 'element', (node: Element) => {
            if (node.tagName === 'a' && node.properties && typeof node.properties.href === 'string') {
                const href = node.properties.href;
                let isExternal = false;
                
                if (href.startsWith('http') || href.startsWith('//')) {
                    try {
                        const url = new URL(href, SITE_URL);
                        isExternal = !ALLOWED_DOMAINS.some(domain => url.hostname.includes(domain));
                    } catch (e) {
                        isExternal = false;
                    }
                }

                if (isExternal) {
                    node.properties.target = '_blank';
                    node.properties.rel = 'nofollow noopener noreferrer';
                }
            }
        });
    };
};

export const renderMarkdown = async (markdown: string): Promise<string> => {
    try {
        const file = await unified()
            .use(remarkParse)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeExpressiveCode, {
                themes: ['github-dark'],
                useThemedScrollbars: false,
                styleOverrides: {
                    borderRadius: '0.75rem',
                    uiFontFamily: 'inherit',
                }
            })
            .use(rehypeExternalLinks)
            .use(rehypeStringify, { allowDangerousHtml: true })
            .process(markdown);
            
        return String(file);
    } catch (error) {
        console.error("Error rendering markdown:", error);
        return markdown;
    }
};
