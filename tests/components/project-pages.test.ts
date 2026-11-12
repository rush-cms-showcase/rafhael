import type { FieldValues } from '@rushcms/client'
import { describe, expect, it } from 'vitest'
import ProjectArticle from '../../src/components/project-article.astro'
import ProjectCard from '../../src/components/project-card.astro'
import { render } from '../helpers/container'
import { COVER } from '../helpers/fixtures'
import { makeEntry, makeMedia } from '../helpers/make-entry'
import { makeDatabaseItem, makeProjectLink } from '../helpers/make-project'
import { makeUrls } from '../helpers/make-urls'

describe('projects', () => {
	const urls = makeUrls()

	function card(data: FieldValues, locale: 'en' | 'pt_BR' = 'en') {
		const entry = makeEntry({ data, title: 'Engine', excerpt: 'Runs things' })
		return render(ProjectCard, { entry, locale, urls })
	}

	it('card always uses the localized open label', async () => {
		expect(await card({})).toContain('View project')
		expect(await card({}, 'pt_BR')).toContain('Ver projeto')
		const withLink = await card({
			link_label: 'Open the app',
			links: [{ _id: 'l', url: 'https://example.test' }]
		})
		expect(withLink).toContain('View project')
		expect(withLink).not.toContain('Open the app')
	})

	it('card shows the title and excerpt', async () => {
		const html = await card({})
		expect(html).toContain('Engine')
		expect(html).toContain('Runs things')
	})
})

describe('project article', () => {
	const shot = makeMedia('shot')

	function article(data: FieldValues) {
		const entry = makeEntry({
			data,
			title: 'Engine',
			excerpt: 'Runs things',
			featured_image: COVER,
			media: { a: shot }
		})
		return render(ProjectArticle, { entry, locale: 'en' })
	}

	const full = {
		content: 'Body text',
		'image-gallery': [shot.url],
		'distribution-model': [makeDatabaseItem('Closed Source')],
		links: [
			makeProjectLink('https://www.example.test/app', 'globe'),
			makeProjectLink('https://store.example.test/app', 'windows', 'link-2')
		]
	}

	function anchors(html: string): string[] {
		return html.match(/<a [^>]*target="_blank"[^>]*>/g) ?? []
	}

	it('renders the header, the text and an aside after the text without the cover', async () => {
		const html = await article(full)
		expect(html).toContain('Engine')
		expect(html).toContain('Runs things')
		expect(html).not.toContain(COVER.url)
		expect(html.indexOf('Body text')).toBeLessThan(html.indexOf('<aside'))
		expect(html).toContain('lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]')
		expect(html).toContain('prose-lg')
		expect(html).not.toContain('lg:prose-xl')
	})

	it('shows the gallery, the distribution fact and the links in order inside the aside', async () => {
		const html = await article(full)
		const aside = html.slice(html.indexOf('<aside'), html.indexOf('</aside>'))
		expect(aside).toContain('data-gallery')
		expect(aside).toContain('Distribution')
		expect(aside).toContain('Closed source')
		expect(aside.indexOf('Official website')).toBeLessThan(aside.indexOf('Microsoft Store'))
		const [first, second] = anchors(aside)
		expect(first).toContain('href="https://www.example.test/app"')
		expect(second).toContain('href="https://store.example.test/app"')
		for (const anchor of [first, second]) {
			expect(anchor).toContain('rel="noopener"')
			expect(anchor).toContain('text-sm text-text-muted')
			expect(anchor).not.toContain('bg-primary')
		}
	})

	it('renders the text alone in one column when the aside has nothing to show', async () => {
		const html = await article({ content: 'Body text' })
		expect(html).toContain('Body text')
		expect(html).not.toContain('<aside')
		expect(html).not.toContain('lg:grid-cols-')
		expect(html).not.toContain('Distribution')
	})
})
