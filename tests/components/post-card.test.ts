import { describe, expect, it } from 'vitest'
import PostCard from '../../src/components/blog/post-card.astro'
import { POST_CARD_SIZES } from '../../src/lib/cover-sizes'
import { render } from '../helpers/container'
import { CATEGORY, COVER } from '../helpers/fixtures'
import { makeEntry } from '../helpers/make-entry'
import type { EntryOverrides } from '../helpers/make-entry'
import { makeUrls } from '../helpers/make-urls'

function renderCard(overrides: EntryOverrides = {}, locale = 'en') {
	return render(PostCard, { entry: makeEntry(overrides), locale, urls: makeUrls() })
}

describe('PostCard', () => {
	it('renders no image when there is no featured image', async () => {
		const html = await renderCard()
		expect(html).not.toContain('<img')
		expect(html).not.toContain('undefined')
	})

	it('renders the cover with the entry title as the missing alt', async () => {
		const html = await renderCard({ featured_image: { ...COVER, alt: '' }, title: 'Queues' })
		expect(html).toContain(COVER.url)
		expect(html).toMatch(/<img[^>]*alt="Queues"/)
	})

	it('tells the browser the width the card image occupies', async () => {
		const html = await renderCard({ featured_image: COVER })
		expect(html).toContain(`sizes="${POST_CARD_SIZES}"`)
	})

	it('renders no category link without categories', async () => {
		expect(await renderCard({ featured_image: COVER })).not.toContain('/category/')
	})

	it('links pills to the category page', async () => {
		const html = await renderCard({ featured_image: COVER, categories: [CATEGORY] })
		expect(html).toContain(CATEGORY.name)
		expect(html).toContain(`href="/category/${CATEGORY.slug}"`)
		expect(html).not.toContain('href="undefined"')
	})

	it('localizes the labels and the date', async () => {
		const html = await renderCard({}, 'pt_BR')
		expect(html).toContain('Ler artigo')
		expect(html).toContain('min de leitura')
		expect(html).toContain('25/06/2026')
	})
})
