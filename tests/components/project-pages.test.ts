import type { FieldValues } from '@rushcms/client'
import { describe, expect, it } from 'vitest'
import ProjectArticle from '../../src/components/project-article.astro'
import ProjectCard from '../../src/components/project-card.astro'
import { render } from '../helpers/container'
import { makeEntry } from '../helpers/make-entry'
import { makeUrls } from '../helpers/make-urls'

describe('projects', () => {
	const urls = makeUrls()

	function card(data: FieldValues, locale: 'en' | 'pt_BR' = 'en') {
		const entry = makeEntry({ data, title: 'Engine', excerpt: 'Runs things' })
		return render(ProjectCard, { entry, locale, urls })
	}

	function article(data: FieldValues) {
		const entry = makeEntry({ data: { content: 'Body', ...data }, title: 'Engine' })
		return render(ProjectArticle, { entry, locale: 'en' })
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
