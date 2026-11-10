import type { Element, Root } from 'hast'
import rehypeExpressiveCode from 'rehype-expressive-code'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import type { Entry } from '@rushcms/client'
import { siteOrigin } from './site-env'

const EXTERNAL_REL = ['nofollow', 'noopener', 'noreferrer']

function isExternal(href: string, origin: URL): boolean {
	const target = URL.parse(href, origin)
	if (target === null || !['http:', 'https:'].includes(target.protocol)) {
		return false
	}
	return target.host !== origin.host
}

const rehypeExternalLinks: Plugin<[URL], Root> = (origin) => (tree) => {
	visit(tree, 'element', (node: Element) => {
		const href = node.properties.href
		if (node.tagName === 'a' && typeof href === 'string' && isExternal(href, origin)) {
			node.properties.target = '_blank'
			node.properties.rel = EXTERNAL_REL
		}
	})
}

export function markdownBody(entry: Entry): string {
	const content = entry.data.content
	return typeof content === 'string' ? content : ''
}

export async function renderMarkdown(
	markdown: string,
	origin: URL = siteOrigin(process.env)
): Promise<string> {
	const file = await unified()
		.use(remarkParse)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeExpressiveCode, {
			themes: ['github-dark'],
			useThemedScrollbars: false,
			styleOverrides: { borderRadius: '0.75rem', uiFontFamily: 'inherit' }
		})
		.use(rehypeExternalLinks, origin)
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(markdown)
	return String(file)
}
