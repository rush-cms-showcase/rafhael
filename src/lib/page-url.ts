import type { CollectionRef, LocaleCode, RushUrls } from '@rushcms/client'

export type PageUrl = (page: number) => string | undefined

export function collectionPageUrl(
	urls: RushUrls,
	collection: CollectionRef,
	locale: LocaleCode
): PageUrl {
	return (page) => urls.collection(collection, locale, page)
}
