import { createUrls } from '@rushcms/client'
import type { CollectionRef, RushCollections, RushUrls } from '@rushcms/client'
import { URL_CONFIG } from '../../src/lib/routing'

const ROUTED: CollectionRef[] = [
	{ id: 'blog', slug: 'blog' },
	{ id: 'cases', slug: 'cases' },
	{ id: 'projects', slug: 'projects' },
	{ id: 'pages', slug: 'pages' }
]

export const COLLECTIONS: RushCollections = { en: ROUTED, pt_BR: ROUTED, es: ROUTED }

export function makeUrls(collections?: RushCollections): RushUrls {
	return createUrls({ ...URL_CONFIG, ...(collections === undefined ? {} : { collections }) })
}
