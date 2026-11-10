import { describe, expect, it } from 'vitest'
import {
	absoluteUrl,
	collectionHref,
	collectionPageUrl,
	LOCALES,
	taxonomyPageUrl,
	URL_CONFIG
} from '../../src/lib/routing'
import { COLLECTIONS, makeUrls } from '../helpers/make-urls'

const SITE = new URL('https://site.example.test')
const CATEGORY = { id: 'a', type: 'category' as const, name: 'Go', slug: 'go' }
const TAG = { id: 'b', type: 'tag' as const, name: 'Go', slug: 'go' }
const BLOG = { id: 'blog', slug: 'blog', name: 'Blog' }

describe('LOCALES', () => {
	it('lists every locale of the url config', () => {
		expect(LOCALES).toEqual(Object.keys(URL_CONFIG.localePaths))
	})
})

describe('absoluteUrl', () => {
	it('resolves a path against the site', () => {
		expect(absoluteUrl('/br/blog', SITE)).toBe('https://site.example.test/br/blog')
		expect(absoluteUrl('/', SITE)).toBe('https://site.example.test/')
	})
})

describe('collectionHref', () => {
	it('links a configured collection in the locale and nothing otherwise', () => {
		const urls = makeUrls(COLLECTIONS)
		expect(collectionHref(urls, 'blog', 'en')).toBe('/blog')
		expect(collectionHref(urls, 'cases', 'pt_BR')).toBe('/br/cases')
		expect(collectionHref(urls, 'videos', 'es')).toBeUndefined()
	})
})

describe('page urls', () => {
	it('page collections and taxonomies with the segments of each locale', () => {
		const urls = makeUrls()
		expect(collectionPageUrl(urls, BLOG, 'en')(2)).toBe('/blog/page/2')
		expect(collectionPageUrl(urls, BLOG, 'pt_BR')(1)).toBe('/br/blog')
		expect(taxonomyPageUrl(urls, CATEGORY, 'en')(1)).toBe('/category/go')
		expect(taxonomyPageUrl(urls, CATEGORY, 'pt_BR')(1)).toBe('/br/categoria/go')
		expect(taxonomyPageUrl(urls, CATEGORY, 'es')(2)).toBe('/es/categoria/go/pagina/2')
		expect(taxonomyPageUrl(urls, TAG, 'es')(1)).toBe('/es/etiqueta/go')
		expect(taxonomyPageUrl(urls, TAG, 'en')(1)).toBe('/tag/go')
	})
})
