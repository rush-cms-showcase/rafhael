import type { LocaleCode, RushCollections } from '@rushcms/client'
import { describe, expect, it } from 'vitest'
import { breadcrumbJsonLd, breadcrumbTrail, jsonLdScript } from '../../src/lib/breadcrumb'
import type { BreadcrumbKind } from '../../src/lib/breadcrumb'
import { SITE } from '../helpers/fixtures'
import { COLLECTIONS, makeUrls } from '../helpers/make-urls'

const TITLE = 'A very specific page title'

type Expectation = {
	kind: BreadcrumbKind
	locale: LocaleCode
	home: string
	section: [string, string] | undefined
	current: string
}

const CASES: Expectation[] = [
	{ kind: 'case', locale: 'en', home: '/', section: ['Cases', '/cases'], current: 'This case' },
	{ kind: 'post', locale: 'en', home: '/', section: ['Blog', '/blog'], current: 'This post' },
	{
		kind: 'project',
		locale: 'en',
		home: '/',
		section: ['Projects', '/projects'],
		current: 'This project'
	},
	{ kind: 'page', locale: 'en', home: '/', section: undefined, current: 'This page' },
	{
		kind: 'category',
		locale: 'en',
		home: '/',
		section: ['Blog', '/blog'],
		current: 'This category'
	},
	{ kind: 'tag', locale: 'en', home: '/', section: ['Blog', '/blog'], current: 'This tag' },
	{
		kind: 'case',
		locale: 'pt_BR',
		home: '/br',
		section: ['Cases', '/br/cases'],
		current: 'Este case'
	},
	{
		kind: 'post',
		locale: 'pt_BR',
		home: '/br',
		section: ['Blog', '/br/blog'],
		current: 'Este artigo'
	},
	{
		kind: 'project',
		locale: 'pt_BR',
		home: '/br',
		section: ['Projetos', '/br/projects'],
		current: 'Este projeto'
	},
	{ kind: 'page', locale: 'pt_BR', home: '/br', section: undefined, current: 'Esta página' },
	{
		kind: 'category',
		locale: 'pt_BR',
		home: '/br',
		section: ['Blog', '/br/blog'],
		current: 'Esta categoria'
	},
	{
		kind: 'tag',
		locale: 'pt_BR',
		home: '/br',
		section: ['Blog', '/br/blog'],
		current: 'Esta tag'
	},
	{
		kind: 'case',
		locale: 'es',
		home: '/es',
		section: ['Casos', '/es/cases'],
		current: 'Este caso'
	},
	{
		kind: 'post',
		locale: 'es',
		home: '/es',
		section: ['Blog', '/es/blog'],
		current: 'Este artículo'
	},
	{
		kind: 'project',
		locale: 'es',
		home: '/es',
		section: ['Proyectos', '/es/projects'],
		current: 'Este proyecto'
	},
	{ kind: 'page', locale: 'es', home: '/es', section: undefined, current: 'Esta página' },
	{
		kind: 'category',
		locale: 'es',
		home: '/es',
		section: ['Blog', '/es/blog'],
		current: 'Esta categoría'
	},
	{
		kind: 'tag',
		locale: 'es',
		home: '/es',
		section: ['Blog', '/es/blog'],
		current: 'Esta etiqueta'
	}
]

function trail(
	kind: BreadcrumbKind,
	locale: LocaleCode,
	collections: RushCollections = COLLECTIONS
) {
	return breadcrumbTrail({
		kind,
		locale,
		urls: makeUrls(collections),
		title: TITLE,
		path: '/somewhere/current'
	})
}

describe('breadcrumbTrail', () => {
	it.each(CASES)('$kind in $locale', ({ kind, locale, home, section, current }) => {
		const result = trail(kind, locale)
		expect(result.home.href).toBe(home)
		expect(result.home.label).not.toBe('')
		expect(
			result.section === undefined ? undefined : [result.section.label, result.section.href]
		).toEqual(section)
		expect(result.current.label).toBe(current)
		expect(result.current.label).not.toBe(TITLE)
		expect(result.current.title).toBe(TITLE)
	})

	it('drops the section when its collection is not configured', () => {
		const partial: RushCollections = { ...COLLECTIONS, pt_BR: [{ id: 'blog', slug: 'blog' }] }
		expect(trail('case', 'pt_BR', partial).section).toBeUndefined()
		expect(trail('case', 'en', partial).section?.href).toBe('/cases')
	})
})

describe('breadcrumbJsonLd', () => {
	it('lists home, section and the real title with absolute urls', () => {
		const result = breadcrumbJsonLd(trail('post', 'pt_BR'), SITE)
		expect(result['@context']).toBe('https://schema.org')
		expect(result['@type']).toBe('BreadcrumbList')
		expect(result.itemListElement).toEqual([
			{
				'@type': 'ListItem',
				position: 1,
				name: trail('post', 'pt_BR').home.label,
				item: 'https://site.example.test/br'
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Blog',
				item: 'https://site.example.test/br/blog'
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: TITLE,
				item: 'https://site.example.test/somewhere/current'
			}
		])
	})

	it('uses the real title and never the generic label for the last item', () => {
		const items = breadcrumbJsonLd(trail('page', 'en'), SITE).itemListElement
		expect(items).toHaveLength(2)
		expect(items.at(-1)?.name).toBe(TITLE)
		expect(items.map((item) => item.name)).not.toContain('This page')
	})

	it('leaves the current item without a url when its path is unknown', () => {
		const current = breadcrumbTrail({
			kind: 'tag',
			locale: 'es',
			urls: makeUrls(COLLECTIONS),
			title: TITLE,
			path: undefined
		})
		const items = breadcrumbJsonLd(current, SITE).itemListElement
		expect(items.map((item) => item.item)).toEqual([
			'https://site.example.test/es',
			'https://site.example.test/es/blog',
			undefined
		])
	})
})

describe('jsonLdScript', () => {
	it('escapes markup so a title cannot close the script', () => {
		const script = jsonLdScript({ name: '</script><b>x</b>' })
		expect(script).not.toContain('<')
		expect(JSON.parse(script)).toEqual({ name: '</script><b>x</b>' })
	})
})
