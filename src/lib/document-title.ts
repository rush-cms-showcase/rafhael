export const TITLE_SEPARATOR = ' | '

export type SeoTitle = {
	from: 'seo'
}

export type SiteTitle = {
	from: 'site'
}

export type PageTitle = {
	from: 'page'
	page: string
}

export type TitleSource = SeoTitle | SiteTitle | PageTitle

export function documentTitle(source: TitleSource, siteName: string): string | undefined {
	if (source.from === 'seo') {
		return undefined
	}
	return source.from === 'site' ? siteName : `${source.page}${TITLE_SEPARATOR}${siteName}`
}
