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

function collectionPage(id: string, name: string) {
	return (number: number) => ({
		kind: 'collection',
		locale: 'pt_BR',
		collection: { id, slug: id, name },
		page: number,
		lastPage: 3,
		entries: { items: [makeEntry({ locale: 'pt_BR', slug: `${id}-one` })] }
	})
}

const CASES: ListCase[] = [
	{
		name: 'blog',
		view: BlogList,
		heading: 'Artigos',
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
		heading: 'Notas',
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

	it('shows the category filters on the blog list and marks the active category', async () => {
		const blog = await renderList(CASES[0] as ListCase, 1)
		expect(blog).toMatch(/<a href="\/br\/blog" aria-current="page"/)
		expect(blog).toMatch(/<a href="\/br\/categoria\/engineering" class=/)
		const taxonomy = await renderList(CASES[4] as ListCase, 1)
		expect(taxonomy).toMatch(/<a href="\/br\/blog" class=/)
		expect(taxonomy).toMatch(/<a href="\/br\/categoria\/engineering" aria-current="page"/)
	})
})
