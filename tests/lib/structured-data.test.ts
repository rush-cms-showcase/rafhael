import { describe, expect, it } from 'vitest'
import { siteOptionsFrom } from '../../src/lib/site-options'
import { articleJsonLd, siteGraphJsonLd, siteIdentity } from '../../src/lib/structured-data'
import { COVER } from '../helpers/fixtures'
import { makeEntry } from '../helpers/make-entry'

const HOME = 'https://site.example.test/'
const BANNER = 'https://media.example.test/banner/master'

const OPTIONS = siteOptionsFrom({
	slug: 'opcoes-do-site',
	values: {
		contact_github: 'https://code.example.test/ada',
		contact_linkedin: 'https://network.example.test/in/ada',
		contact_email: 'ada@example.test',
		site_banner: { url: BANNER }
	}
} as never)

const IDENTITY = siteIdentity('Ada Lovelace', HOME, OPTIONS)

describe('siteIdentity', () => {
	it('keeps only web profiles as sameAs and the banner as image', () => {
		expect(IDENTITY).toEqual({
			name: 'Ada Lovelace',
			url: HOME,
			sameAs: ['https://code.example.test/ada', 'https://network.example.test/in/ada'],
			image: BANNER
		})
	})

	it('drops profiles that are not web links', () => {
		const identity = siteIdentity(
			'Ada',
			HOME,
			siteOptionsFrom({
				slug: 'x',
				values: { contact_github: 'javascript:alert(1)' }
			} as never)
		)
		expect(identity.sameAs).toEqual([])
		expect(identity.image).toBeUndefined()
	})
})

describe('siteGraphJsonLd', () => {
	it('links a WebSite to its Person author', () => {
		const graph = siteGraphJsonLd(IDENTITY, 'pt_BR')
		expect(graph['@context']).toBe('https://schema.org')
		expect(graph['@graph']).toEqual([
			{
				'@type': 'WebSite',
				name: 'Ada Lovelace',
				url: HOME,
				inLanguage: 'pt-BR',
				author: { '@id': `${HOME}#person` }
			},
			{
				'@type': 'Person',
				'@id': `${HOME}#person`,
				name: 'Ada Lovelace',
				url: HOME,
				sameAs: IDENTITY.sameAs
			}
		])
	})
})

describe('articleJsonLd', () => {
	const entry = makeEntry({
		title: 'Vector tables',
		excerpt: 'A short summary',
		locale: 'es',
		featured_image: COVER,
		published_at: '2026-06-25T10:00:00Z',
		updated_at: '2026-07-01T10:00:00Z'
	})
	const url = 'https://site.example.test/es/blog/vector-tables'

	it('describes a post from the entry data', () => {
		expect(articleJsonLd({ type: 'BlogPosting', entry, url, identity: IDENTITY })).toEqual({
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			headline: 'Vector tables',
			description: 'A short summary',
			datePublished: '2026-06-25T10:00:00Z',
			dateModified: '2026-07-01T10:00:00Z',
			image: COVER.url,
			inLanguage: 'es',
			url,
			mainEntityOfPage: { '@type': 'WebPage', '@id': url },
			author: {
				'@type': 'Person',
				name: 'Ada Lovelace',
				url: HOME,
				sameAs: IDENTITY.sameAs
			}
		})
	})

	it('falls back to the site banner and keeps the case type', () => {
		const bare = makeEntry({ title: 'Billing' })
		const json = articleJsonLd({ type: 'Article', entry: bare, url, identity: IDENTITY })
		expect(json['@type']).toBe('Article')
		expect(json.image).toBe(BANNER)
		expect(json.description).toBeUndefined()
	})
})
