import type { SearchItem } from '../../src/lib/search-index'

export function makeItem(title: string, kind = 'blog', excerpt = ''): SearchItem {
	return { title, excerpt, url: `/${kind}/${title}`, kind }
}
