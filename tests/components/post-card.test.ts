import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, it } from 'vitest'
import PostCard from '../../src/components/blog/post-card.astro'
import { makeEntry } from '../helpers/make-entry'
import type { EntryOverrides } from '../helpers/make-entry'
import { makeUrls } from '../helpers/make-urls'

const COVER = { url: 'https://media.example.test/cover/master', width: 1200, height: 675 }
const CATEGORY = { id: 'c1', type: 'category' as const, name: 'Engineering', slug: 'engineering' }

describe('PostCard', () => {
	let container: AstroContainer

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	function render(overrides: EntryOverrides = {}, locale = 'en') {
		return container.renderToString(PostCard, {
			props: { entry: makeEntry(overrides), locale, urls: makeUrls() }
		})
	}

	it('renders no image when there is no featured image', async () => {
		const html = await render()
		expect(html).not.toContain('<img')
		expect(html).not.toContain('undefined')
	})

	it('renders the cover when present', async () => {
		const html = await render({ featured_image: COVER })
		expect(html).toContain('<img')
		expect(html).toContain('aspect-video')
	})

	it('renders no pill list without categories', async () => {
		const html = await render({ featured_image: COVER })
		expect(html).not.toContain('flex-wrap')
	})

	it('renders pills as plain labels while taxonomy has no target', async () => {
		const html = await render({ featured_image: COVER, categories: [CATEGORY] })
		expect(html).toContain('Engineering')
		expect(html).not.toContain('/category/')
		expect(html).not.toContain('href="undefined"')
	})

	it('links a fallback entry to its served url', async () => {
		const entry = makeEntry({ locale: 'en', fallback: true, slug: 'only-english' })
		const html = await container.renderToString(PostCard, {
			props: { entry, locale: 'pt_BR', urls: makeUrls() }
		})
		expect(html).toContain('href="/blog/only-english"')
		expect(html).not.toContain('/br/blog/only-english')
	})

	it('localizes the labels and the date', async () => {
		const html = await render({}, 'pt_BR')
		expect(html).toContain('Ler artigo')
		expect(html).toContain('min de leitura')
		expect(html).toContain('25/06/2026')
	})
})
