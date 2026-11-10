import type { Entry, LocaleCode, RushUrls } from '@rushcms/client'

export type TaxonomyTerm = Entry['categories'][number]

export function taxonomyHref(
	_urls: RushUrls,
	_term: TaxonomyTerm,
	_locale: LocaleCode
): string | undefined {
	return undefined
}
