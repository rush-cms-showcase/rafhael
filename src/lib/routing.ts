import type { CollectionRef, LocaleCode, RushUrls, Tag, TagRef, UrlConfig } from '@rushcms/client'

export type SiteUrlConfig = Required<Omit<UrlConfig, 'collections'>>

export const URL_CONFIG: SiteUrlConfig = {
	localePaths: { en: '', pt_BR: 'br', es: 'es' },
	routes: {
		blog: '/{locale}/blog/{slug}',
		cases: '/{locale}/cases/{slug}',
		projects: '/{locale}/projects/{slug}',
		pages: '/{locale}/{slug}'
	},
	pageSegments: { en: 'page', pt_BR: 'pagina', es: 'pagina' },
	taxonomies: {
		category: { en: 'category', pt_BR: 'categoria', es: 'categoria' },
		tag: { en: 'tag', pt_BR: 'tag', es: 'etiqueta' }
	}
}

export const LOCALES: LocaleCode[] = Object.keys(URL_CONFIG.localePaths)

export type PageUrl = (page: number) => string | undefined

export function absoluteUrl(path: string, site: URL): string {
	return new URL(path, site).href
}

export function collectionHref(
	urls: RushUrls,
	key: string,
	locale: LocaleCode
): string | undefined {
	const collection = urls.collectionRef(key, locale)
	return collection === undefined ? undefined : urls.collection(collection, locale)
}

export function collectionPageUrl(
	urls: RushUrls,
	collection: CollectionRef,
	locale: LocaleCode
): PageUrl {
	return (page) => urls.collection(collection, locale, page)
}

export function taxonomyPageUrl(urls: RushUrls, tag: TagRef | Tag, locale: LocaleCode): PageUrl {
	return (page) => urls.taxonomy(tag, locale, page)
}

export type TermLink = {
	name: string
	href: string | undefined
}

export function termLink(urls: RushUrls, term: TagRef, locale: LocaleCode): TermLink {
	return { name: term.name, href: urls.taxonomy(term, locale) }
}
