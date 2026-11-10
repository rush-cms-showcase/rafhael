import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, it } from 'vitest'
import Pager from '../../src/components/pager.astro'
import { collectionPageUrl } from '../../src/lib/routing'
import { makeUrls } from '../helpers/make-urls'

const COLLECTION = { id: 'blog', slug: 'blog', name: 'Blog' }

describe('Pager', () => {
	let container: AstroContainer

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	function render(current: number, last: number, locale = 'en') {
		return container.renderToString(Pager, {
			props: {
				locale,
				current,
				last,
				pageUrl: collectionPageUrl(makeUrls(), COLLECTION, locale)
			}
		})
	}

	it('renders nothing for a single page', async () => {
		expect(await render(1, 1)).not.toContain('<nav')
	})

	it('links only forward on the first page', async () => {
		const html = await render(1, 3)
		expect(html).toContain('rel="next"')
		expect(html).not.toContain('rel="prev"')
		expect(html).toContain('1 / 3')
		expect(html).toContain('rounded-full')
		expect(html).toContain('font-serif')
		expect(html).toContain('Next')
	})

	it('links only back on the last page', async () => {
		const html = await render(3, 3)
		expect(html).toContain('rel="prev"')
		expect(html).not.toContain('rel="next"')
	})

	it('links both ways in the middle', async () => {
		const html = await render(2, 3)
		expect(html).toContain('rel="prev"')
		expect(html).toContain('rel="next"')
	})
	it('uses the page segment of the locale from the site url config', async () => {
		const html = await render(2, 3, 'es')
		expect(html).toContain('href="/es/blog/pagina/3"')
		expect(html).toContain('href="/es/blog"')
	})
})
