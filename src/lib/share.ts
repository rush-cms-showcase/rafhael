import { withQuery } from './query'

export type SharePlatform = 'x' | 'linkedin' | 'whatsapp'

export type ShareTarget = {
	url: string
	title: string
}

type ShareBuilder = (target: ShareTarget) => string

const BUILDERS: Record<SharePlatform, ShareBuilder> = {
	x: ({ url, title }) => withQuery('https://x.com/intent/post', { url, text: title }),
	linkedin: ({ url }) => withQuery('https://www.linkedin.com/sharing/share-offsite/', { url }),
	whatsapp: ({ url, title }) =>
		withQuery('https://api.whatsapp.com/send', { text: `${title} ${url}` })
}

export function shareUrl(platform: SharePlatform, target: ShareTarget): string {
	return BUILDERS[platform](target)
}
