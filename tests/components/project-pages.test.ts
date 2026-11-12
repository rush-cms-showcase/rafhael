import type { FieldValues } from '@rushcms/client'
import { describe, expect, it } from 'vitest'
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
