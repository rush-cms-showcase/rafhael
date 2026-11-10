import type { LocaleCode, RushUrls, Tag, TagListOptions } from '@rushcms/client'
import { collectionHref } from './routing'

export const BLOG_COLLECTION = 'blog'

export type CategoryFilter = {
	name: string
	href: string | undefined
	active: boolean
}

export type CategoryFilters = {
	allHref: string | undefined
	filters: CategoryFilter[]
}

export type CategoryLister = {
	list(options: TagListOptions): Promise<Tag[]>
}

export async function loadCategoryFilters(
	tags: CategoryLister,
	urls: RushUrls,
	locale: LocaleCode,
	activeId: string | undefined
): Promise<CategoryFilters> {
	const categories = await tags.list({ type: 'category', locale })
	return {
		allHref: collectionHref(urls, BLOG_COLLECTION, locale),
		filters: categories.map((category) => ({
			name: category.name,
			href: urls.taxonomy(category, locale),
			active: category.id === activeId
		}))
	}
}
