import type { LocaleCode, RushClient, Tag } from '@rushcms/client'
import { makeUrls, COLLECTIONS } from './make-urls'

type Runtime = Record<string, unknown>

export type FakeSite = {
	locale: LocaleCode
	name?: string
	categories?: Tag[]
	bannerUrl?: string
}

export const SITE_NAME = 'Ada Lovelace'

const RUNTIME_KEY = Symbol.for('@rushcms/astro:runtime')

function fakeClient(site: FakeSite): RushClient {
	const client = {
		site: { get: async () => ({ name: site.name ?? SITE_NAME }) },
		siteOptions: {
			get: async (slug: string) => ({
				slug,
				values: site.bannerUrl === undefined ? {} : { site_banner: site.bannerUrl }
			})
		},
		navigations: { get: async () => ({ items: [] }) },
		tags: { list: async () => site.categories ?? [] }
	}
	return client as unknown as RushClient
}

export function fakeLocals(site: FakeSite): object {
	const client = fakeClient(site)
	const runtime: Runtime = {
		previewMode: false,
		previewActive: false,
		defaultLocale: 'en',
		trustedProxies: 0,
		seo: {},
		urls: makeUrls(COLLECTIONS),
		locale: () => site.locale,
		client: () => client,
		clientIn: () => client,
		onDemandClient: () => client,
		preview: () => runtime,
		warnOnce: () => undefined
	}
	return { [RUNTIME_KEY]: runtime }
}
