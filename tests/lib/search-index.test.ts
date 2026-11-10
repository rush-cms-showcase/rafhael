import { describe, expect, it } from 'vitest'
import {
	buildSearchIndex,
	collectSearchEntries,
	groupResults,
	searchIndexPath
} from '../../src/lib/search-index'
import type { SearchEntrySource } from '../../src/lib/search-index'
import { makeItem as item } from '../helpers/make-item'
import { makeEntry } from '../helpers/make-entry'
import { makeUrls } from '../helpers/make-urls'

const urls = makeUrls()

describe('buildSearchIndex', () => {
	it('maps an entry to title, excerpt, url and kind', () => {
		const items = buildSearchIndex(
			[makeEntry({ title: 'Queues', slug: 'queues', excerpt: 'About queues' })],
			urls,
			'en'
		)
		expect(items).toEqual([
			{ title: 'Queues', excerpt: 'About queues', url: '/blog/queues', kind: 'blog' }
		])
	})

	it('keeps only entries of the requested locale', () => {
		const entries = [
			makeEntry({ slug: 'one', locale: 'pt_BR', title: 'Um' }),
			makeEntry({ slug: 'two', locale: 'en', title: 'Two' }),
			makeEntry({ slug: 'tres', locale: 'es', title: 'Tres' })
		]
		const items = buildSearchIndex(entries, urls, 'pt_BR')
		expect(items.map((item) => item.title)).toEqual(['Um'])
		expect(items[0]?.url).toBe('/br/blog/one')
	})

	it('builds urls with the locale prefix and the collection route', () => {
		const entries = [
			makeEntry({ slug: 'a', locale: 'es', collection: { id: 'cases', slug: 'cases' } }),
			makeEntry({
				slug: 'b',
				locale: 'es',
				collection: { id: 'projects', slug: 'projects' }
			}),
			makeEntry({ slug: 'c', locale: 'es', collection: { id: 'pages', slug: 'pages' } })
		]
		const items = buildSearchIndex(entries, urls, 'es')
		expect(items.map((item) => [item.kind, item.url])).toEqual([
			['cases', '/es/cases/a'],
			['projects', '/es/projects/b'],
			['pages', '/es/c']
		])
	})

	it('skips entries that are not published', () => {
		const entries = [
			makeEntry({ slug: 'live', status: 'published' }),
			makeEntry({ slug: 'wip', status: 'draft' })
		]
		expect(buildSearchIndex(entries, urls, 'en').map((item) => item.url)).toEqual([
			'/blog/live'
		])
	})

	it('yields an empty excerpt when the entry has none and trims the rest', () => {
		const items = buildSearchIndex(
			[makeEntry({ slug: 'a' }), makeEntry({ slug: 'b', excerpt: '  padded  ' })],
			urls,
			'en'
		)
		expect(items.map((item) => item.excerpt)).toEqual(['', 'padded'])
	})
})

describe('searchIndexPath', () => {
	it('names one file per locale', () => {
		expect(searchIndexPath('pt_BR')).toBe('/search-index/pt_BR.json')
	})
})

describe('collectSearchEntries', () => {
	it('walks every routed collection of the locale', async () => {
		const walked: string[] = []
		const source: SearchEntrySource = {
			collections: {
				list: async () => [
					{ id: 'blog', slug: 'blog' },
					{ id: 'hidden', slug: 'hidden' },
					{ id: 'pages', slug: 'pages' }
				]
			},
			entries: {
				all: async function* (collection, options) {
					walked.push(`${collection}:${options.locale}`)
					yield makeEntry({ slug: `${collection}-entry` })
				}
			}
		}
		const entries = await collectSearchEntries(source, urls, 'pt_BR')
		expect(walked).toEqual(['blog:pt_BR', 'pages:pt_BR'])
		expect(entries.map((entry) => entry.slug)).toEqual(['blog-entry', 'pages-entry'])
	})
})

describe('groupResults', () => {
	it('groups by kind keeping first-seen kind order and result order', () => {
		const groups = groupResults([item('a', 'cases'), item('b', 'blog'), item('c', 'cases')])
		expect(
			groups.map((group) => [group.kind, group.items.map((entry) => entry.title)])
		).toEqual([
			['cases', ['a', 'c']],
			['blog', ['b']]
		])
	})
})
