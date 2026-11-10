import type { LocaleCode, UrlConfig } from '@rushcms/client'

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
