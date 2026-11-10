import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, it } from 'vitest'
import Prose from '../../src/components/prose.astro'
import { renderMarkdown } from '../../src/lib/markdown'

describe('Prose', () => {
	let container: AstroContainer

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	it('renders inline code as a code element without literal backticks', async () => {
		const html = await renderMarkdown('use `x` here', new URL('https://example.test'))
		expect(html).toContain('<code>x</code>')
		const page = await container.renderToString(Prose, { props: { html } })
		expect(page).toContain('prose-code:before:content-none')
		expect(page).toContain('prose-code:after:content-none')
	})
})
