import type { RushUrls } from '@rushcms/client'
import { describe, expect, it } from 'vitest'
import { collectionCopy } from '../../src/lib/collection-copy'
import { makeUrls } from '../helpers/make-urls'

const NOTES = { id: 'notes', slug: 'notes', name: 'Notas' }

const UNLABELLED = { collectionKeys: () => ['notes'] } as unknown as RushUrls

describe('collectionCopy', () => {
	it('takes the title and description from the dictionary of the page locale', () => {
		const copy = collectionCopy(makeUrls(), { id: 'cases', slug: 'cases', name: 'Casos' }, 'en')
		expect(copy).toEqual({
			title: 'Cases',
			description: 'Case studies of software built for clients.'
		})
	})

	it('has no description for a section without one', () => {
		const copy = collectionCopy(
			makeUrls(),
			{ id: 'pages', slug: 'pages', name: 'Páginas' },
			'es'
		)
		expect(copy).toEqual({ title: 'Páginas', description: undefined })
	})

	it('keeps the CMS name for a collection without a labelled section', () => {
		expect(collectionCopy(UNLABELLED, NOTES, 'en')).toEqual({
			title: 'Notas',
			description: undefined
		})
	})
})
