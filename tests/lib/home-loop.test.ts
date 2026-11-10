import { describe, expect, it } from 'vitest'
import { loadLoopEntries } from '../../src/lib/home-loop'
import type { LoopSection } from '../../src/lib/home-sections'
import { makeEntry } from '../helpers/make-entry'
import { notFound } from '../helpers/not-found'

const section: LoopSection = {
	kind: 'loop',
	title: 'Latest',
	type: 'blog',
	quantity: 4,
	disposition: 'grid'
}

describe('loadLoopEntries', () => {
	it('asks for the collection of the type, in the locale, with the quantity', async () => {
		const calls: unknown[][] = []
		const entries = [makeEntry()]
		const lister = {
			list: async (collection: string, options: object) => {
				calls.push([collection, options])
				return { items: entries }
			}
		}
		const result = await loadLoopEntries(lister, section, 'pt_BR')
		expect(result).toBe(entries)
		expect(calls).toEqual([['blog', { locale: 'pt_BR', per_page: 4 }]])
	})

	it('returns nothing when the collection does not exist', async () => {
		const lister = {
			list: async () => {
				throw notFound()
			}
		}
		expect(await loadLoopEntries(lister, section, 'en')).toEqual([])
	})
})
