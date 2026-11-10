import { absoluteUrl } from './routing'
import type { PageUrl } from './routing'

export type ListPageInput = {
	name: string
	page: number
	lastPage: number
	pageUrl: PageUrl
	site: URL
}

export type ListPageHead = {
	title: string
	canonical: string | undefined
	hreflang: boolean
}

export function listPageHead(input: ListPageInput): ListPageHead {
	const path = input.pageUrl(input.page)
	return {
		title: input.page > 1 ? `${input.name} (${input.page}/${input.lastPage})` : input.name,
		canonical: path === undefined ? undefined : absoluteUrl(path, input.site),
		hreflang: input.page === 1
	}
}
