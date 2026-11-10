import type { SiteOptions } from './site-options'

export type Credits = {
	creatorUrl?: string | undefined
	platformUrl?: string | undefined
}

export function creditsFrom(options: SiteOptions): Credits {
	return { creatorUrl: options.creatorUrl, platformUrl: options.platformUrl }
}
