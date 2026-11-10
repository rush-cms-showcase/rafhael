import { describe, expect, it } from 'vitest'
import { collectionCanonical } from '../../src/lib/collection-canonical'
import { makeUrls } from '../helpers/make-urls'

const COLLECTION = { id: 'blog', slug: 'blog', name: 'Blog' }
const SITE = new URL('https://site.example.test')

describe('collectionCanonical', () => {
	it('is undefined without a site', () => {
		expect(collectionCanonical(makeUrls(), COLLECTION, 'en', 1, undefined)).toBeUndefined()
	})

	it('is absolute and carries the page', () => {
		const first = collectionCanonical(makeUrls(), COLLECTION, 'en', 1, SITE)
		const second = collectionCanonical(makeUrls(), COLLECTION, 'en', 2, SITE)
		expect(first?.startsWith('https://site.example.test/')).toBe(true)
		expect(second).not.toBe(first)
	})
})
