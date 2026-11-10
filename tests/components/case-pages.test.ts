import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { Entry } from '@rushcms/client'
import { beforeAll, describe, expect, it } from 'vitest'
import CaseArticle from '../../src/components/case-article.astro'
import CaseIndex from '../../src/components/case-index.astro'
import { labelsFor } from '../../src/lib/labels'
import { entryFixture } from '../helpers/entry'

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
		const html = await render(entryFixture(caseData, { title: 'Billing platform' }))
		expect(html).toContain('Billing platform')
		for (const value of ['Acme', 'Lead engineer', '2023 - 2024', 'Go', 'Astro', 'Body text']) {
			expect(html).toContain(value)
		}
		expect(html).toContain(labels.caseClient)
		expect(html).toContain('href="/cases"')
	})

	it('renders no image and no time even with a featured image and a publication date', async () => {
		const html = await render(withImage(entryFixture(caseData)))
		expect(html).not.toContain('<img')
		expect(html).not.toContain('<time')
		expect(html).not.toContain(IMAGE.url)
		expect(html).not.toContain('2026')
	})

	it('omits the metadata labels that have no value', async () => {
		const html = await render(entryFixture({}))
		expect(html).not.toContain(labels.caseClient)
		expect(html).not.toContain(labels.caseStack)
		expect(html).not.toContain('undefined')
	})
})

describe('case index', () => {
	let container: AstroContainer

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	it('renders one item per case with excerpt and stack, and no image or time', async () => {
		const first = withImage(
			entryFixture(caseData, { title: 'Billing platform', excerpt: 'Short summary' })
		)
		const second = entryFixture({ client_name: 'Globex' }, { title: 'Search rewrite' })
		const html = await container.renderToString(CaseIndex, {
			props: {
				items: [
					{ entry: first, href: '/cases/billing' },
					{ entry: second, href: '/cases/search' }
				]
			}
		})
		for (const value of [
			'Billing platform',
			'Short summary',
			'Go',
			'Search rewrite',
			'Globex'
		]) {
			expect(html).toContain(value)
		}
		expect(html).toContain('href="/cases/search"')
		expect(html).not.toContain('<img')
		expect(html).not.toContain('<time')
		expect(html).not.toContain('2026')
	})
})
