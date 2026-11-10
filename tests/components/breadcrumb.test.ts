import { describe, expect, it } from 'vitest'
import Breadcrumb from '../../src/components/breadcrumb.astro'
import { breadcrumbTrail } from '../../src/lib/breadcrumb'
import { render as renderComponent } from '../helpers/container'
import { COLLECTIONS, makeUrls } from '../helpers/make-urls'

const TITLE = 'Billing platform'

describe('Breadcrumb', () => {
	function render() {
		const trail = breadcrumbTrail({
			kind: 'case',
			locale: 'pt_BR',
			urls: makeUrls(COLLECTIONS),
			title: TITLE,
			path: '/br/cases/billing'
		})
		return renderComponent(Breadcrumb, { trail })
	}

	function visible(html: string): string {
		return html.replace(/<script[\s\S]*?<\/script>/g, '')
	}

	it('renders a labelled nav with an ordered list linking home and the section', async () => {
		const html = visible(await render())
		expect(html).toMatch(/<nav[^>]*aria-label="[^"]+"/)
		expect(html).toContain('<ol')
		expect(html).toContain('href="/br"')
		expect(html).toContain('href="/br/cases"')
		expect(html).toContain('Cases')
	})

	it('marks the generic current crumb as the page without linking or repeating the title', async () => {
		const html = visible(await render())
		expect(html).toMatch(/<span[^>]*aria-current="page"[^>]*>\s*Este case\s*<\/span>/)
		expect(html).not.toContain('href="/br/cases/billing"')
		expect(html).not.toContain(TITLE)
	})

	it('emits a BreadcrumbList with the real title as the last item', async () => {
		const html = await render()
		const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
		const data = JSON.parse(match?.[1] ?? '{}')
		expect(data['@type']).toBe('BreadcrumbList')
		expect(data.itemListElement.at(-1).name).toBe(TITLE)
		expect(data.itemListElement[0].item).toBe('https://site.example.test/br')
	})
})
