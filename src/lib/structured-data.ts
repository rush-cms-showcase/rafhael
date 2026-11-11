import { toBcp47 } from '@rushcms/client'
import type { Entry, LocaleCode, RushClient } from '@rushcms/client'
import { entryCover } from './entry-data'
import { loadSiteOptions } from './site-options'
import type { SiteOptions } from './site-options'

export type ArticleType = 'BlogPosting' | 'Article'

export type SiteIdentity = {
	name: string
	url: string
	sameAs: string[]
	image: string | undefined
}

export type PersonJsonLd = {
	'@type': 'Person'
	'@id'?: string
	name: string
	url: string
	sameAs: string[]
}

export type WebSiteJsonLd = {
	'@type': 'WebSite'
	name: string
	url: string
	inLanguage: string
	author: { '@id': string }
}

export type SiteGraphJsonLd = {
	'@context': 'https://schema.org'
	'@graph': [WebSiteJsonLd, PersonJsonLd]
}

export type PageReferenceJsonLd = {
	'@type': 'WebPage'
	'@id': string
}

export type ArticleJsonLd = {
	'@context': 'https://schema.org'
	'@type': ArticleType
	headline: string
	description: string | undefined
	datePublished: string | undefined
	dateModified: string
	image: string | undefined
	inLanguage: string
	url: string
	mainEntityOfPage: PageReferenceJsonLd
	author: PersonJsonLd
}

export type ArticleInput = {
	type: ArticleType
	entry: Entry
	url: string
	identity: SiteIdentity
}

export function siteIdentity(name: string, url: string, options: SiteOptions): SiteIdentity {
	const sameAs = [options.contactGithub, options.contactLinkedin].filter(
		(link): link is string => link !== undefined && /^https?:\/\//i.test(link)
	)
	return { name, url, sameAs, image: options.bannerUrl }
}

export async function loadSiteIdentity(rush: RushClient, url: string): Promise<SiteIdentity> {
	const [site, options] = await Promise.all([rush.site.get(), loadSiteOptions(rush.siteOptions)])
	return siteIdentity(site.name, url, options)
}

function personJsonLd(identity: SiteIdentity, id: string | undefined): PersonJsonLd {
	return {
		'@type': 'Person',
		...(id === undefined ? {} : { '@id': id }),
		name: identity.name,
		url: identity.url,
		sameAs: identity.sameAs
	}
}

export function siteGraphJsonLd(identity: SiteIdentity, locale: LocaleCode): SiteGraphJsonLd {
	const personId = `${identity.url}#person`
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				name: identity.name,
				url: identity.url,
				inLanguage: toBcp47(locale),
				author: { '@id': personId }
			},
			personJsonLd(identity, personId)
		]
	}
}

export function articleJsonLd(input: ArticleInput): ArticleJsonLd {
	const { entry } = input
	return {
		'@context': 'https://schema.org',
		'@type': input.type,
		headline: entry.title,
		description: entry.excerpt,
		datePublished: entry.published_at,
		dateModified: entry.updated_at,
		image: entryCover(entry)?.url ?? input.identity.image,
		inLanguage: toBcp47(entry.locale),
		url: input.url,
		mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
		author: personJsonLd(input.identity, undefined)
	}
}
