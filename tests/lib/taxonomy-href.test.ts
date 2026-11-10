import { describe, expect, it } from 'vitest'
import { taxonomyHref } from '../../src/lib/taxonomy-href'
import { makeUrls } from '../helpers/make-urls'

const CATEGORY = { id: 'a', type: 'category' as const, name: 'Go', slug: 'go' }
const TAG = { id: 'b', type: 'tag' as const, name: 'Go', slug: 'go' }

describe('taxonomyHref', () => {
	it('uses the english category segment without a prefix', () => {
		expect(taxonomyHref(makeUrls(), CATEGORY, 'en')).toBe('/category/go')
	})

	it('uses the portuguese segment under the br prefix', () => {
		expect(taxonomyHref(makeUrls(), CATEGORY, 'pt_BR')).toBe('/br/categoria/go')
	})

	it('uses the spanish segments under the es prefix', () => {
		expect(taxonomyHref(makeUrls(), CATEGORY, 'es')).toBe('/es/categoria/go')
		expect(taxonomyHref(makeUrls(), TAG, 'es')).toBe('/es/etiqueta/go')
	})

	it('keeps a category and a tag with the same slug apart', () => {
		expect(taxonomyHref(makeUrls(), TAG, 'en')).toBe('/tag/go')
	})
})
