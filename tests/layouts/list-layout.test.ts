import { describe, expect, it } from 'vitest'
import BlogList from '../../src/views/blog/list.astro'
import CaseList from '../../src/views/cases/list.astro'
import GenericList from '../../src/views/collection.astro'
import ProjectList from '../../src/views/projects/list.astro'
import Taxonomy from '../../src/views/taxonomy.astro'
import { render } from '../helpers/container'
import type { Component } from '../helpers/container'
import { CATEGORY, SITE_ORIGIN } from '../helpers/fixtures'
import { makeEntry } from '../helpers/make-entry'
import { fakeLocals, SITE_NAME } from '../helpers/runtime'

type ListCase = {
	name: string
	view: Component
	heading: string
	first: string
	second: string
	page: (number: number) => Record<string, unknown>
}

function collectionPage(id: string, name: string, locale = 'pt_BR') {
	return (number: number) => ({
		kind: 'collection',
		locale,
		collection: { id, slug: id, name },
		page: number,
		lastPage: 3,
		entries: { items: [makeEntry({ locale, slug: `${id}-one` })] }
	})
}

const CASES: ListCase[] = [
	{
		name: 'blog',
		view: BlogList,
		heading: 'Blog',
		first: '/br/blog',
		second: '/br/blog/pagina/2',
		page: collectionPage('blog', 'Artigos')
	},
	{
		name: 'cases',
		view: CaseList,
		heading: 'Cases',
		first: '/br/cases',
		second: '/br/cases/pagina/2',
		page: collectionPage('cases', 'Cases')
	},
	{
		name: 'projects',
		view: ProjectList,
		heading: 'Projetos',
		first: '/br/projects',
		second: '/br/projects/pagina/2',
		page: collectionPage('projects', 'Projetos')
	},
	{
		name: 'generic',
		view: GenericList,
		heading: 'Blog',
		first: '/br/blog',
		second: '/br/blog/pagina/2',
		page: collectionPage('blog', 'Notas')
	},
	{
		name: 'taxonomy',
		view: Taxonomy,
		heading: 'Engineering',
		first: '/br/categoria/engineering',
		second: '/br/categoria/engineering/pagina/2',
		page: (number) => ({
			kind: 'taxonomy',
			locale: 'pt_BR',
			tag: CATEGORY,
			page: number,
			lastPage: 3,
			entries: { items: [makeEntry({ locale: 'pt_BR' })] },
			alternates: [{ locale: 'pt_BR', hreflang: 'pt-BR', url: '/br/categoria/engineering' }]
		})
	}
]

const BANNER = 'https://media.example.test/banner/master'

const locals = fakeLocals({ locale: 'pt_BR', categories: [CATEGORY] })

function renderList(item: ListCase, number: number): Promise<string> {
	return render(item.view, { page: item.page(number) }, locals)
}

describe('list layout', () => {
	it.each(CASES)('$name titles, canonicalizes and links languages on page one', async (item) => {
		const html = await renderList(item, 1)
		expect(html).toContain(`<title>${item.heading} | ${SITE_NAME}</title>`)
		expect(html).toContain(`<link rel="canonical" href="${SITE_ORIGIN}${item.first}">`)
		expect(html).toContain(`hreflang="pt-BR" href="${SITE_ORIGIN}${item.first}"`)
		expect(html.match(/<h1[^>]*>/g)).toHaveLength(1)
		expect(html).toContain(`>${item.heading}</h1>`)
	})

	it.each(CASES)('$name suffixes the page and drops hreflang after page one', async (item) => {
		const html = await renderList(item, 2)
		expect(html).toContain(`<title>${item.heading} (2/3) | ${SITE_NAME}</title>`)
		expect(html).toContain(`<link rel="canonical" href="${SITE_ORIGIN}${item.second}">`)
		expect(html).not.toContain('hreflang="pt-BR" href=')
	})

	it.each(CASES)('$name emits one description, canonical and the social tags', async (item) => {
		const html = await renderList(item, 1)
		expect(html.match(/<link rel="canonical"/g)).toHaveLength(1)
		expect(html.match(/<meta name="description"/g)).toHaveLength(1)
		expect(html).toContain(`<meta property="og:title" content="${item.heading}">`)
		expect(html).toContain(`<meta property="og:url" content="${SITE_ORIGIN}${item.first}">`)
		expect(html).toContain('<meta property="og:locale" content="pt_BR">')
		expect(html).toContain('<meta name="twitter:card" content="summary">')
		expect(html).not.toContain('name="robots"')
	})

	it.each(CASES)('$name falls back to the site banner as its social image', async (item) => {
		const html = await render(
			item.view,
			{ page: item.page(1) },
			fakeLocals({ locale: 'pt_BR', categories: [CATEGORY], bannerUrl: BANNER })
		)
		expect(html.match(/property="og:image"/g)).toHaveLength(1)
		expect(html).toContain(`<meta property="og:image" content="${BANNER}">`)
		expect(html).toContain('<meta name="twitter:card" content="summary_large_image">')
	})

	it.each(CASES)('$name marks an empty list noindex', async (item) => {
		const empty = { ...item.page(1), entries: { items: [] } }
		const html = await render(item.view, { page: empty }, locals)
		expect(html).toContain('<meta name="robots" content="noindex">')
	})

	it('shows the category filters on the blog list and marks the active category', async () => {
		const blog = await renderList(CASES[0] as ListCase, 1)
		expect(blog).toMatch(/<a href="\/br\/blog" aria-current="page"/)
		expect(blog).toMatch(/<a href="\/br\/categoria\/engineering" class=/)
		const taxonomy = await renderList(CASES[4] as ListCase, 1)
		expect(taxonomy).toMatch(/<a href="\/br\/blog" class=/)
		expect(taxonomy).toMatch(/<a href="\/br\/categoria\/engineering" aria-current="page"/)
	})
})

type Locale = 'en' | 'pt_BR' | 'es'

type DescriptionCase = {
	name: string
	view: Component
	locale: Locale
	text: string
}

const DESCRIPTIONS: DescriptionCase[] = [
	{
		name: 'blog',
		view: BlogList,
		locale: 'en',
		text: 'Articles about software development, architecture and technology.'
	},
	{
		name: 'blog',
		view: BlogList,
		locale: 'pt_BR',
		text: 'Artigos sobre desenvolvimento, arquitetura e tecnologia.'
	},
	{
		name: 'blog',
		view: BlogList,
		locale: 'es',
		text: 'Artículos sobre desarrollo, arquitectura y tecnología.'
	},
	{
		name: 'cases',
		view: CaseList,
		locale: 'es',
		text: 'Casos de estudio de software creado para clientes.'
	},
	{ name: 'projects', view: ProjectList, locale: 'en', text: 'Software projects and products.' },
	{
		name: 'projects',
		view: ProjectList,
		locale: 'pt_BR',
		text: 'Projetos e produtos de software.'
	},
	{
		name: 'projects',
		view: ProjectList,
		locale: 'es',
		text: 'Proyectos y productos de software.'
	}
]

describe('list descriptions', () => {
	it.each(DESCRIPTIONS)('$name renders its $locale description', async (item) => {
		const html = await render(
			item.view,
			{ page: collectionPage(item.name, 'List', item.locale)(1) },
			fakeLocals({ locale: item.locale, categories: [CATEGORY] })
		)
		expect(html).toContain(`<meta name="description" content="${item.text}">`)
	})
})

type HeadingCase = {
	name: string
	view: Component
	locale: Locale
	heading: string
}

const HEADINGS: HeadingCase[] = [
	{ name: 'cases', view: CaseList, locale: 'en', heading: 'Cases' },
	{ name: 'cases', view: CaseList, locale: 'es', heading: 'Casos' },
	{ name: 'projects', view: ProjectList, locale: 'en', heading: 'Projects' },
	{ name: 'projects', view: ProjectList, locale: 'es', heading: 'Proyectos' },
	{ name: 'blog', view: BlogList, locale: 'es', heading: 'Blog' }
]

describe('list headings', () => {
	it.each(HEADINGS)(
		'$name reads $heading in $locale whatever the collection is named',
		async (item) => {
			const html = await render(
				item.view,
				{ page: collectionPage(item.name, 'Nome do CMS', item.locale)(1) },
				fakeLocals({ locale: item.locale, categories: [CATEGORY] })
			)
			expect(html).toContain(`>${item.heading}</h1>`)
			expect(html).toContain(`<title>${item.heading} | ${SITE_NAME}</title>`)
			expect(html).not.toContain('Nome do CMS')
		}
	)
})

describe('list card headings', () => {
	it.each(CASES.filter((item) => item.name !== 'cases'))(
		'$name cards sit one level below the page title',
		async (item) => {
			const html = await renderList(item, 1)
			expect(html).toContain('<h2')
			expect(html).not.toContain('<h3')
		}
	)
})

type TermCase = {
	locale: Locale
	text: string
}

const TERMS: TermCase[] = [
	{ locale: 'en', text: 'Articles about Engineering' },
	{ locale: 'pt_BR', text: 'Artigos sobre Engineering' },
	{ locale: 'es', text: 'Artículos sobre Engineering' }
]

describe('taxonomy descriptions', () => {
	it.each(TERMS)('describes a category in $locale', async (item) => {
		const html = await render(
			Taxonomy,
			{
				page: {
					kind: 'taxonomy',
					locale: item.locale,
					tag: CATEGORY,
					page: 1,
					lastPage: 1,
					entries: { items: [] },
					alternates: []
				}
			},
			fakeLocals({ locale: item.locale, categories: [CATEGORY] })
		)
		expect(html).toContain(`<meta name="description" content="${item.text}">`)
	})
})
