import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, it } from 'vitest'
import ProjectArticle from '../../src/components/project-article.astro'
import ProjectCard from '../../src/components/project-card.astro'
import { labelsFor } from '../../src/lib/labels'
import { makeEntry } from '../helpers/make-entry'
import { makeUrls } from '../helpers/make-urls'

describe('projects', () => {
	let container: AstroContainer
	const urls = makeUrls()

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	function card(data: Record<string, unknown>, locale: 'en' | 'pt_BR' = 'en') {
		const entry = makeEntry({ data, title: 'Engine', excerpt: 'Runs things' })
		return container.renderToString(ProjectCard, { props: { entry, locale, urls } })
	}

	function article(data: Record<string, unknown>) {
		const entry = makeEntry({ data, title: 'Engine' })
		return container.renderToString(ProjectArticle, {
			props: { entry, html: '<p>Body</p>', backHref: '/projects', labels: labelsFor('en') }
		})
	}

	it('card falls back to a localized default label', async () => {
		expect(await card({})).toContain('View project')
		expect(await card({}, 'pt_BR')).toContain('Ver projeto')
		expect(await card({ link_label: 'Open the app' })).toContain('Open the app')
	})

	it('card shows the title and excerpt', async () => {
		const html = await card({})
		expect(html).toContain('Engine')
		expect(html).toContain('Runs things')
	})

	it('page renders the external button with the link and label', async () => {
		const html = await article({ link_url: 'https://app.example.test', link_label: 'Visit it' })
		expect(html).toContain('href="https://app.example.test"')
		expect(html).toContain('target="_blank"')
		expect(html).toContain('rel="noopener"')
		expect(html).toContain('Visit it')
	})

	it('page uses the default label and omits the button without a link', async () => {
		expect(await article({ link_url: 'https://app.example.test' })).toContain('View project')
		const without = await article({ link_label: 'Visit it' })
		expect(without).not.toContain('_blank')
		expect(without).not.toContain('Visit it')
	})
})
