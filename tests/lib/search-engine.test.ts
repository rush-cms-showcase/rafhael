import { describe, expect, it } from 'vitest'
import { createSearch, MAX_RESULTS } from '../../src/lib/search-engine'
import { makeItem as item } from '../helpers/make-item'

describe('createSearch', () => {
	const items = [
		item('Queues in production', 'blog', 'Background jobs'),
		item('Billing platform', 'cases', 'Invoices'),
		item('Astro starter', 'projects')
	]

	it('returns nothing for a blank query', () => {
		const search = createSearch(items)
		expect(search('')).toEqual([])
		expect(search('   ')).toEqual([])
	})

	it('filters out items that do not match', () => {
		const titles = createSearch(items)('billing').map((result) => result.title)
		expect(titles).toEqual(['Billing platform'])
	})

	it('matches the excerpt too', () => {
		expect(createSearch(items)('invoices').map((result) => result.title)).toEqual([
			'Billing platform'
		])
	})

	it('ignores diacritics and case', () => {
		const accented = [item('Configuração de filas'), item('Other')]
		expect(createSearch(accented)('CONFIGURACAO').map((result) => result.title)).toEqual([
			'Configuração de filas'
		])
	})

	it('limits the number of results', () => {
		const many = Array.from({ length: MAX_RESULTS + 10 }, (_, index) => item(`Post ${index}`))
		expect(createSearch(many)('post')).toHaveLength(MAX_RESULTS)
	})

	it('returns an empty list when nothing matches', () => {
		expect(createSearch(items)('zzzzqqq')).toEqual([])
	})
})
