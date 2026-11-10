import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { Entry } from '@rushcms/client'
import { beforeAll, describe, expect, it } from 'vitest'
import CaseArticle from '../../src/components/case-article.astro'
import CaseRows from '../../src/components/case-rows.astro'
import { labelsFor } from '../../src/lib/labels'
import { makeEntry } from '../helpers/make-entry'
import { makeUrls } from '../helpers/make-urls'

const IMAGE: NonNullable<Entry['featured_image']> = {
	url: 'https://media.example.test/photo.jpg',
	alt: 'Photo'
}

function withImage(entry: Entry): Entry {
	return { ...entry, featured_image: IMAGE }
}

const caseData = {
	client_name: 'Acme',
	role: 'Lead engineer',
	period: '2023 - 2024',
	stack: ['Go', 'Astro'],
	content: 'ignored'
}

describe('case article', () => {
	let container: AstroContainer
	const labels = labelsFor('en')

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	function render(entry: Entry) {
		return container.renderToString(CaseArticle, {
			props: { entry, html: '<p>Body text</p>', backHref: '/cases', labels }
		})
	}

	it('renders the structured header and the body', async () => {
		const html = await render(makeEntry({ data: caseData, title: 'Billing platform' }))
		expect(html).toContain('Billing platform')
		for (const value of ['Acme', 'Lead engineer', '2023 - 2024', 'Go', 'Astro', 'Body text']) {
			expect(html).toContain(value)
		}
		expect(html).toContain(labels.caseClient)
		expect(html).toContain('href="/cases"')
	})

	it('renders no image and no time even with a featured image and a publication date', async () => {
		const html = await render(withImage(makeEntry({ data: caseData })))
		expect(html).not.toContain('<img')
		expect(html).not.toContain('<time')
		expect(html).not.toContain(IMAGE.url)
		expect(html).not.toContain('2026')
	})

	it('omits the metadata labels that have no value', async () => {
		const html = await render(makeEntry({ data: {} }))
		expect(html).not.toContain(labels.caseClient)
		expect(html).not.toContain(labels.caseStack)
		expect(html).not.toContain('undefined')
	})
})

describe('case rows', () => {
	let container: AstroContainer

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	it('renders one item per case with excerpt and stack, and no image or time', async () => {
		const first = withImage(
			makeEntry({ data: caseData, title: 'Billing platform', excerpt: 'Short summary' })
		)
		const second = makeEntry({
			data: { client_name: 'Globex' },
			title: 'Search rewrite',
			slug: 'search',
			collection: { id: 'cases', slug: 'cases' }
		})
		const html = await container.renderToString(CaseRows, {
			props: {
				entries: [first, second],
				locale: 'en',
				urls: makeUrls(),
				detailed: true
			}
		})
		for (const value of ['Billing platform', 'Short summary', 'Go', 'Search rewrite']) {
			expect(html).toContain(value)
		}
		expect(html).toContain('href="/cases/search"')
		expect(html).not.toContain('Globex')
		expect(html).not.toMatch(/>\s*0?1\s*</)
		expect(html).not.toContain('<img')
		expect(html).not.toContain('<time')
		expect(html).not.toContain('2026')
	})
})
