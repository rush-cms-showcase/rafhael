import { createUrls } from '@rushcms/client'
import type { CollectionRef, RushCollections, RushUrls } from '@rushcms/client'

const ROUTED: CollectionRef[] = [
	{ id: 'blog', slug: 'blog' },
	{ id: 'cases', slug: 'cases' },
	{ id: 'projects', slug: 'projects' },
	{ id: 'pages', slug: 'pages' }
]

export const COLLECTIONS: RushCollections = { en: ROUTED, pt_BR: ROUTED, es: ROUTED }

export function makeUrls(collections?: RushCollections): RushUrls {
	return createUrls({
		localePaths: { en: '', pt_BR: 'br', es: 'es' },
		routes: {
			blog: '/{locale}/blog/{slug}',
			cases: '/{locale}/cases/{slug}',
			projects: '/{locale}/projects/{slug}',
			pages: '/{locale}/{slug}'
		},
		taxonomies: {
			category: { en: 'category', pt_BR: 'categoria', es: 'categoria' },
			tag: { en: 'tag', pt_BR: 'tag', es: 'etiqueta' }
		},
		...(collections === undefined ? {} : { collections })
	})
}
