import type { RemotePattern } from 'astro'

export type SiteEnv = {
	SITE_URL?: string | undefined
	NODE_ENV?: string | undefined
}

export function siteOrigin(env: SiteEnv): URL {
	const value = env.SITE_URL
	if (value === undefined || value === '') {
		throw new Error('SITE_URL is required')
	}
	const origin = URL.parse(value)
	if (origin === null) {
		throw new Error('SITE_URL must be a valid URL')
	}
	if (env.NODE_ENV === 'production' && origin.protocol !== 'https:') {
		throw new Error('SITE_URL must be https in production')
	}
	return origin
}

export function allowedDomain(origin: URL): RemotePattern {
	return {
		protocol: origin.protocol.slice(0, -1),
		hostname: origin.hostname,
		...(origin.port === '' ? {} : { port: origin.port })
	}
}
