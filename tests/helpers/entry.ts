import type { Entry } from '@rushcms/client'

export type EntryData = Record<string, unknown>

export function entryFixture(data: EntryData = {}, overrides: Partial<Entry> = {}): Entry {
	return {
		id: '01J00000000000000000000000',
		slug: 'sample',
		title: 'Sample title',
		status: 'published',
		tags: [],
		categories: [],
		data,
		media: {},
		locale: 'en',
		fallback: false,
		collection: { id: '01J00000000000000000000001', slug: 'cases' },
		translations: {},
		published_at: '2026-06-25T00:00:00Z',
		created_at: '2026-06-25T00:00:00Z',
		updated_at: '2026-06-25T00:00:00Z',
		...overrides
	}
}
