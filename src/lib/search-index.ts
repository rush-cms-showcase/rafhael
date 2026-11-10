import type { CollectionRef, Entry, LocaleCode, RushUrls } from '@rushcms/client'

export type SearchItem = {
	title: string
	excerpt: string
	url: string
	kind: string
}

export type SearchGroup = {
	kind: string
	items: SearchItem[]
}

export type SearchWalkOptions = {
	locale: LocaleCode
}

export type SearchEntrySource = {
	collections: {
		list(options: SearchWalkOptions): Promise<CollectionRef[]>
	}
	entries: {
		all(collection: string, options: SearchWalkOptions): AsyncGenerator<Entry, void, undefined>
	}
}

export function searchIndexPath(locale: LocaleCode): string {
	return `/search-index/${locale}.json`
}

export function buildSearchIndex(
	entries: Entry[],
	urls: RushUrls,
	locale: LocaleCode
): SearchItem[] {
	return entries
		.filter((entry) => entry.locale === locale && entry.status === 'published')
		.map((entry) => ({
			title: entry.title,
			excerpt: entry.excerpt?.trim() ?? '',
			url: urls.servedPath(entry, locale),
			kind: entry.collection.slug
		}))
}

export async function collectSearchEntries(
	source: SearchEntrySource,
	urls: RushUrls,
	locale: LocaleCode
): Promise<Entry[]> {
	const collections = (await source.collections.list({ locale })).filter((collection) =>
		urls.routed(collection)
	)
	const entries: Entry[] = []
	for (const collection of collections) {
		for await (const entry of source.entries.all(collection.slug, { locale })) {
			entries.push(entry)
		}
	}
	return entries
}

export function groupResults(results: SearchItem[]): SearchGroup[] {
	const groups = new Map<string, SearchItem[]>()
	for (const result of results) {
		groups.set(result.kind, [...(groups.get(result.kind) ?? []), result])
	}
	return [...groups].map(([kind, items]) => ({ kind, items }))
}
