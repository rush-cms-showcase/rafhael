import type { CollectionRef, LocaleCode, RushUrls } from '@rushcms/client'

export function collectionCanonical(
	urls: RushUrls,
	collection: CollectionRef,
	locale: LocaleCode,
	page: number,
	site: URL | undefined
): string | undefined {
	return site === undefined
		? undefined
		: new URL(urls.collection(collection, locale, page), site).href
}
