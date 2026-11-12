import type { ExpandedDatabaseItem } from '@rushcms/client'

export type ProjectLinkItem = {
	_id: string
	url: string
	icon: ExpandedDatabaseItem[]
}

export function makeDatabaseItem(name: string): ExpandedDatabaseItem {
	return { id: 'item-id', name, description: '', parent_id: null }
}

export function makeProjectLink(
	url: string,
	icon: string | undefined,
	id = 'link-1'
): ProjectLinkItem {
	return { _id: id, url, icon: icon === undefined ? [] : [makeDatabaseItem(icon)] }
}
