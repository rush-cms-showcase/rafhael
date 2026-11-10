import { describe, expect, it } from 'vitest'
import { caseMeta, projectMeta } from '../../src/lib/entry-data'
import { makeEntry } from '../helpers/make-entry'

describe('caseMeta', () => {
	it('reads the case fields', () => {
		const entry = makeEntry({
			data: {
				client_name: ' Acme ',
				role: 'Lead',
				period: '2024',
				stack: ['Go', ' Astro ', '', 3]
			}
		})
		expect(caseMeta(entry)).toEqual({
			clientName: 'Acme',
			role: 'Lead',
			period: '2024',
			stack: ['Go', 'Astro']
		})
	})

	it('returns empty values for missing or mistyped fields', () => {
		expect(caseMeta(makeEntry({ data: { client_name: 4, stack: 'Go' } }))).toEqual({
			clientName: '',
			role: '',
			period: '',
			stack: []
		})
	})
})

describe('projectMeta', () => {
	it('reads the link and its label', () => {
		const entry = makeEntry({
			data: { link_url: 'https://app.example.test', link_label: ' Open ' }
		})
		expect(projectMeta(entry)).toEqual({
			linkUrl: 'https://app.example.test',
			linkLabel: 'Open'
		})
	})

	it('treats missing, empty and unsafe values as absent', () => {
		expect(projectMeta(makeEntry({ data: {} }))).toEqual({
			linkUrl: undefined,
			linkLabel: undefined
		})
		expect(
			projectMeta(makeEntry({ data: { link_url: 'javascript:x', link_label: '' } }))
		).toEqual({
			linkUrl: undefined,
			linkLabel: undefined
		})
		expect(projectMeta(makeEntry({ data: { link_url: 5, link_label: null } }))).toEqual({
			linkUrl: undefined,
			linkLabel: undefined
		})
	})
})
