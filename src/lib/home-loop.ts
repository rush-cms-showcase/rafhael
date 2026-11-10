import { optional } from '@rushcms/client'
import type { Entry, LocaleCode } from '@rushcms/client'
import type { LoopSection } from './home-sections'

export type LoopQuery = {
	locale: LocaleCode
	per_page: number
}

export type EntryPage = {
	items: Entry[]
}

export type EntryLister = {
	list(collection: string, options: LoopQuery): Promise<EntryPage>
}

export async function loadLoopEntries(
	entries: EntryLister,
	section: LoopSection,
	locale: LocaleCode
): Promise<Entry[]> {
	const page = await optional(entries.list(section.type, { locale, per_page: section.quantity }))
	return page?.items ?? []
}
