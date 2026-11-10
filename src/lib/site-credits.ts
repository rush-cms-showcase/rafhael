import type { SiteOptionGroup } from '@rushcms/client'

export type Credits = {
	creatorUrl?: string | undefined
	platformUrl?: string | undefined
}

function optionUrl(group: SiteOptionGroup | undefined, field: string): string | undefined {
	const value = group?.values[field]
	return typeof value === 'string' && value !== '' ? value : undefined
}

export function creditsFrom(group: SiteOptionGroup | undefined): Credits {
	return {
		creatorUrl: optionUrl(group, 'creator_url'),
		platformUrl: optionUrl(group, 'platform_url')
	}
}
