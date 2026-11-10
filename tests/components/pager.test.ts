import { describe, expect, it } from 'vitest'
import Pager from '../../src/components/pager.astro'
import { collectionPageUrl } from '../../src/lib/routing'
import { render } from '../helpers/container'
import { BLOG } from '../helpers/fixtures'
import { makeUrls } from '../helpers/make-urls'

function renderPager(current: number, last: number, locale = 'en') {
	return render(Pager, {
		locale,
		current,
		last,
		pageUrl: collectionPageUrl(makeUrls(), BLOG, locale)
	})
}

describe('Pager', () => {
	it('renders nothing for a single page', async () => {
		expect(await renderPager(1, 1)).not.toContain('<nav')
	})

	it('links only forward on the first page', async () => {
		const html = await renderPager(1, 3)
		expect(html).toContain('href="/blog/page/2" rel="next"')
		expect(html).not.toContain('rel="prev"')
		expect(html).toContain('1 / 3')
		expect(html).toContain('Next')
	})

	it('links only back on the last page', async () => {
		const html = await renderPager(3, 3)
		expect(html).toContain('href="/blog/page/2" rel="prev"')
		expect(html).not.toContain('rel="next"')
	})

	it('links both ways in the middle', async () => {
		const html = await renderPager(2, 3)
		expect(html).toContain('href="/blog" rel="prev"')
		expect(html).toContain('href="/blog/page/3" rel="next"')
	})

	it('uses the page segment of the locale from the site url config', async () => {
		const html = await renderPager(2, 3, 'es')
		expect(html).toContain('href="/es/blog/pagina/3"')
		expect(html).toContain('href="/es/blog"')
	})
})
