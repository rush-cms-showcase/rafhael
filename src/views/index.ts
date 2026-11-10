import type { CollectionPage, HomepagePage, TaxonomyPage } from '@rushcms/astro'
import type { CollectionRef, Entry, LocaleCode, RushUrls } from '@rushcms/client'
import GenericList from './collection.astro'
import BlogEntry from './blog/entry.astro'
import BlogList from './blog/list.astro'
import GenericEntry from './entry.astro'
import CaseEntry from './cases/entry.astro'
import CaseList from './cases/list.astro'
import PageEntry from './pages/entry.astro'

export type HomeViewProps = {
	page: HomepagePage
}

export type ListViewProps = {
	page: CollectionPage
}

export type TaxonomyViewProps = {
	page: TaxonomyPage
}

export type EntryViewProps = {
	entry: Entry
	locale: LocaleCode
}

export type ListView = (props: ListViewProps) => unknown

export type EntryView = (props: EntryViewProps) => unknown

export type CollectionViews = {
	list: ListView
	entry: EntryView
}

export type ViewMap = Record<string, Partial<CollectionViews>>

const generic: CollectionViews = { list: GenericList, entry: GenericEntry }

const views: ViewMap = {
	blog: { list: BlogList, entry: BlogEntry },
	cases: { list: CaseList, entry: CaseEntry },
	pages: { entry: PageEntry }
}

export function viewsFor(collection: CollectionRef | undefined, urls: RushUrls): CollectionViews {
	const key =
		collection === undefined
			? undefined
			: urls.collectionKeys(collection).find((candidate) => Object.hasOwn(views, candidate))
	return { ...generic, ...(key === undefined ? {} : views[key]) }
}
