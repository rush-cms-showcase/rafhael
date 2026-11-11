import { describe, expect, it } from 'vitest'
import type { Entry } from '@rushcms/client'
import BlogEntry from '../../src/views/blog/entry.astro'
import CaseEntry from '../../src/views/cases/entry.astro'
import GenericEntry from '../../src/views/entry.astro'
import PageEntry from '../../src/views/pages/entry.astro'
import ProjectEntry from '../../src/views/projects/entry.astro'
import { render } from '../helpers/container'
import type { Component } from '../helpers/container'
import { COVER, SITE_ORIGIN } from '../helpers/fixtures'
import { makeEntry } from '../helpers/make-entry'
import { fakeLocals, SITE_NAME } from '../helpers/runtime'

type EntryCase = {
	name: string
	view: Component
	entry: Entry
	path: string
	section: string | undefined
}

const POST = makeEntry({
	slug: 'hello',
	title: 'Hello',
	translations: { pt_BR: { slug: 'ola', collection_slug: 'blog' } }
})

const CASES: EntryCase[] = [
	{ name: 'post', view: BlogEntry, entry: POST, path: '/blog/hello', section: '/blog' },
	{
		name: 'case',
		view: CaseEntry,
		entry: makeEntry({ slug: 'billing', collection: { id: 'cases', slug: 'cases' } }),
		path: '/cases/billing',
		section: '/cases'
	},
	{
		name: 'project',
		view: ProjectEntry,
		entry: makeEntry({ slug: 'engine', collection: { id: 'projects', slug: 'projects' } }),
		path: '/projects/engine',
		section: '/projects'
	},
	{
		name: 'page',
		view: PageEntry,
		entry: makeEntry({ slug: 'about', collection: { id: 'pages', slug: 'pages' } }),
		path: '/about',
		section: undefined
	},
	{
		name: 'generic',
		view: GenericEntry,
		entry: makeEntry({ slug: 'note', collection: { id: 'blog', slug: 'blog' } }),
		path: '/blog/note',
		section: undefined
	}
]

function renderEntry(view: Component, entry: Entry, locale: string): Promise<string> {
	return render(view, { entry, locale }, fakeLocals({ locale }))
}

describe('entry layout', () => {
	it.each(CASES)('$name renders seo, breadcrumb and the entry language', async (item) => {
		const html = await renderEntry(item.view, item.entry, 'en')
		expect(html).toContain(`<link rel="canonical" href="${SITE_ORIGIN}${item.path}">`)
		expect(html).toContain(
			`<link rel="alternate" hreflang="en" href="${SITE_ORIGIN}${item.path}">`
		)
		expect(html.match(/<title>/g)).toHaveLength(1)
		expect(html).toMatch(/<nav aria-label="Breadcrumb">/)
		if (item.section !== undefined) {
			expect(html).toContain(`href="${item.section}"`)
		}
		expect(html).toContain('<div lang="en">')
		expect(html).not.toContain('Not translated yet')
	})

	it.each(CASES)('$name title carries the site suffix after a pipe', async (item) => {
		const html = await renderEntry(item.view, item.entry, 'en')
		expect(html).toContain(`<title>${item.entry.title} | ${SITE_NAME}</title>`)
	})

	it('loads the post cover eagerly with a high fetch priority', async () => {
		const entry = makeEntry({ slug: 'hello', title: 'Hello', featured_image: COVER })
		const html = await renderEntry(BlogEntry, entry, 'en')
		expect(html).toMatch(/<img[^>]*fetchpriority="high"/)
	})

	it('describes posts as BlogPosting and cases as Article, others not at all', async () => {
		const types = await Promise.all(
			CASES.map(async (item) => {
				const html = await renderEntry(item.view, item.entry, 'en')
				return [item.name, html.match(/"@type":"(BlogPosting|Article)"/)?.[1]]
			})
		)
		expect(Object.fromEntries(types)).toEqual({
			post: 'BlogPosting',
			case: 'Article',
			project: undefined,
			page: undefined,
			generic: undefined
		})
	})

	it('puts the entry data and the author in the post JSON-LD', async () => {
		const html = await renderEntry(BlogEntry, POST, 'en')
		const json = html.match(
			/<script[^>]*>({"@context":"https:\/\/schema.org","@type":"BlogPosting".*?})<\/script>/
		)
		expect(JSON.parse(json?.[1] ?? '{}')).toMatchObject({
			headline: 'Hello',
			url: `${SITE_ORIGIN}/blog/hello`,
			inLanguage: 'en',
			author: { '@type': 'Person', name: SITE_NAME }
		})
	})

	it('links the translations of an entry with hreflang', async () => {
		const html = await renderEntry(BlogEntry, POST, 'en')
		expect(html).toContain(`hreflang="pt-BR" href="${SITE_ORIGIN}/br/blog/ola"`)
	})

	it('shows the fallback notice in the page locale for an untranslated entry', async () => {
		const entry = makeEntry({ slug: 'only-english', fallback: true })
		const html = await renderEntry(BlogEntry, entry, 'pt_BR')
		expect(html).toContain('<p lang="pt-BR"')
		expect(html).toContain('Ainda não traduzido: exibido em English.')
		expect(html).toContain('<div lang="en">')
	})
})
