import type { Entry } from '@rushcms/client'

export type EntryOverrides = Partial<Entry>

export function makeEntry(overrides: EntryOverrides = {}): Entry {
	const base: Entry = {
		id: '01HZZZZZZZZZZZZZZZZZZZZZZZ',
		slug: 'sample-post',
		title: 'Sample post',
		status: 'published',
		tags: [],
		categories: [],
		data: { content: 'one two three' },
		media: {},
		locale: 'en',
		fallback: false,
		collection: { id: 'blog', slug: 'blog' },
		translations: {},
		published_at: '2026-06-25T00:00:00Z',
		created_at: '2026-06-25T00:00:00Z',
		updated_at: '2026-06-25T00:00:00Z',
		...overrides
	}
	const served = { slug: base.slug, collection_slug: base.collection.slug }
	return { ...base, translations: { [base.locale]: served, ...base.translations } }
}
