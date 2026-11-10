import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, it } from 'vitest'
import Pager from '../../src/components/pager.astro'
import { collectionPageUrl } from '../../src/lib/page-url'
import { makeUrls } from '../helpers/make-urls'

const COLLECTION = { id: 'blog', slug: 'blog', name: 'Blog' }

describe('Pager', () => {
	let container: AstroContainer

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	function render(current: number, last: number) {
		return container.renderToString(Pager, {
			props: {
				locale: 'en',
				current,
				last,
				pageUrl: collectionPageUrl(makeUrls(), COLLECTION, 'en')
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
})
