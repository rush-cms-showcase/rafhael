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

export function titleSuffix(siteName: string): string {
	return `${TITLE_SEPARATOR}${siteName}`
}

export function brandedTitle(title: string, siteName: string): string {
	return `${title}${titleSuffix(siteName)}`
}

export function documentTitle(source: TitleSource, siteName: string): string | undefined {
	if (source.from === 'seo') {
		return undefined
	}
	return source.from === 'site' ? siteName : brandedTitle(source.page, siteName)
}
