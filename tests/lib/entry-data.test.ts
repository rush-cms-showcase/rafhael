import { describe, expect, it } from 'vitest'
import { caseMeta } from '../../src/lib/entry-data'
import { entryFixture } from '../helpers/entry'

describe('caseMeta', () => {
	it('reads the case fields', () => {
		const entry = entryFixture({
			client_name: ' Acme ',
			role: 'Lead',
			period: '2024',
			stack: ['Go', ' Astro ', '', 3]
		})
		expect(caseMeta(entry)).toEqual({
			clientName: 'Acme',
			role: 'Lead',
			period: '2024',
			stack: ['Go', 'Astro']
		})
	})

	it('returns empty values for missing or mistyped fields', () => {
		expect(caseMeta(entryFixture({ client_name: 4, stack: 'Go' }))).toEqual({
			clientName: '',
			role: '',
			period: '',
			stack: []
		})
	})
})
