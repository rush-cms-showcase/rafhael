import { describe, expect, it } from 'vitest'
import type { Entry } from '@rushcms/client'
import BlogEntry from '../../src/views/blog/entry.astro'
import CaseEntry from '../../src/views/cases/entry.astro'
import GenericEntry from '../../src/views/entry.astro'
import PageEntry from '../../src/views/pages/entry.astro'
import ProjectEntry from '../../src/views/projects/entry.astro'
import { render } from '../helpers/container'
import type { Component } from '../helpers/container'
import { makeEntry } from '../helpers/make-entry'
import { fakeLocals } from '../helpers/runtime'

type EntryCase = {
	name: string
	view: Component
	entry: Entry
	path: string
	section: string | undefined
}

const SITE = 'https://site.example.test'

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
		expect(html).toContain(`<link rel="canonical" href="${SITE}${item.path}">`)
		expect(html).toContain(`<link rel="alternate" hreflang="en" href="${SITE}${item.path}">`)
		expect(html.match(/<title>/g)).toHaveLength(1)
		expect(html).toMatch(/<nav aria-label="Breadcrumb">/)
		if (item.section !== undefined) {
			expect(html).toContain(`href="${item.section}"`)
		}
		expect(html).toContain('<div lang="en">')
		expect(html).not.toContain('Not translated yet')
	})

	it('links the translations of an entry with hreflang', async () => {
		const html = await renderEntry(BlogEntry, POST, 'en')
		expect(html).toContain(`hreflang="pt-BR" href="${SITE}/br/blog/ola"`)
	})

	it('shows the fallback notice in the page locale for an untranslated entry', async () => {
		const entry = makeEntry({ slug: 'only-english', fallback: true })
		const html = await renderEntry(BlogEntry, entry, 'pt_BR')
		expect(html).toContain('<p lang="pt-BR"')
		expect(html).toContain('Ainda não traduzido: exibido em English.')
		expect(html).toContain('<div lang="en">')
	})
})
