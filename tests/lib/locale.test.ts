import { describe, expect, it } from 'vitest'
import { formatLabel, labelsFor } from '../../src/lib/labels'
import { languageCode, languageLinks, linkable } from '../../src/lib/locale'

const homepages = [
	{ locale: 'en', hreflang: 'en', url: '/' },
	{ locale: 'pt_BR', hreflang: 'pt-BR', url: '/br/' },
	{ locale: 'es', hreflang: 'es', url: '/es/' }
]

describe('languageLinks', () => {
	it('uses the homepage of each locale when there are no translations', () => {
		expect(languageLinks(homepages, []).map((link) => [link.code, link.url])).toEqual([
			['EN', '/'],
			['BR', '/br/'],
			['ES', '/es/']
		])
	})

	it('prefers the translation url and keeps the homepage for missing ones', () => {
		const translations = [{ locale: 'pt_BR', hreflang: 'pt-BR', url: '/br/blog/ola' }]
		const urls = languageLinks(homepages, translations).map((link) => link.url)
		expect(urls).toEqual(['/', '/br/blog/ola', '/es/'])
	})
})

describe('languageCode', () => {
	it('falls back to the upper-cased locale', () => {
		expect(languageCode('fr')).toBe('FR')
	})
})

describe('linkable', () => {
	it('drops items without a target', () => {
		const links = [
			{ label: 'A', href: '/a', attributes: {}, children: [] },
			{ label: 'B', attributes: {}, children: [] }
		]
		expect(linkable(links).map((link) => link.label)).toEqual(['A'])
	})
})

describe('formatLabel', () => {
	it('fills every named placeholder and keeps unknown ones', () => {
		expect(formatLabel('Shown in {language}.', { language: 'English' })).toBe(
			'Shown in English.'
		)
		expect(formatLabel('{a} and {a}, {b}', { a: 'x' })).toBe('x and x, {b}')
	})
})

describe('labelsFor', () => {
	it('returns the locale dictionary and falls back to English', () => {
		expect(labelsFor('pt_BR').rights).toBe('Todos os direitos reservados.')
		expect(labelsFor('fr').rights).toBe('All rights reserved.')
	})
})
