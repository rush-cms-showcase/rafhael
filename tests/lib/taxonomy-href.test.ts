import { describe, expect, it } from 'vitest'
import { taxonomyHref } from '../../src/lib/taxonomy-href'
import { makeUrls } from '../helpers/make-urls'

describe('taxonomyHref', () => {
	it('has no target until taxonomy routes exist', () => {
		const term = { id: 'a', type: 'category' as const, name: 'Go', slug: 'go' }
		expect(taxonomyHref(makeUrls(), term, 'en')).toBeUndefined()
	})
})
