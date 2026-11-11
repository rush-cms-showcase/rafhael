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

const HEAD_TITLE = /<title>([^<]*)<\/title>/

const HTML_ESCAPES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;'
}

export function brandedTitle(title: string, siteName: string): string {
	return `${title}${TITLE_SEPARATOR}${siteName}`
}

export function brandHeadTitle(head: string, siteName: string): string {
	const escaped = siteName.replace(
		/[&<>"']/g,
		(character) => HTML_ESCAPES[character] ?? character
	)
	return head.replace(
		HEAD_TITLE,
		(_match, title: string) => `<title>${brandedTitle(title, escaped)}</title>`
	)
}

export function documentTitle(source: TitleSource, siteName: string): string | undefined {
	if (source.from === 'seo') {
		return undefined
	}
	return source.from === 'site' ? siteName : brandedTitle(source.page, siteName)
}
