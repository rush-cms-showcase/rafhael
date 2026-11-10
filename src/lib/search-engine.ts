import Fuse from 'fuse.js'
import type { SearchItem } from './search-index'

export const MAX_RESULTS = 8

export type Search = (query: string) => SearchItem[]

export function createSearch(items: SearchItem[]): Search {
	const fuse = new Fuse(items, {
		keys: [
			{ name: 'title', weight: 2 },
			{ name: 'excerpt', weight: 1 }
		],
		threshold: 0.3,
		ignoreLocation: true,
		ignoreDiacritics: true,
		minMatchCharLength: 2
	})
	return (query) => {
		const text = query.trim()
		return text === ''
			? []
			: fuse.search(text, { limit: MAX_RESULTS }).map((result) => result.item)
	}
}
