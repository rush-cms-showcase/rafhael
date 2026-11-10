import type { Entry, LocaleCode, RushUrls } from '@rushcms/client'

export type TaxonomyTerm = Entry['categories'][number]

export function taxonomyHref(
	urls: RushUrls,
	term: TaxonomyTerm,
	locale: LocaleCode
): string | undefined {
	return urls.taxonomy(term, locale)
}
