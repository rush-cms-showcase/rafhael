import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, it } from 'vitest'
import HeaderLogo from '../../src/components/header-logo.astro'

describe('HeaderLogo', () => {
	let container: AstroContainer

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	function render(logoUrl: string | undefined) {
		return container.renderToString(HeaderLogo, {
			props: { homeUrl: '/', name: 'Ada Lovelace', logoUrl }
		})
	}

	it('uses the configured logo with the default as the error fallback', async () => {
		const html = await render('https://cdn.example.test/logo.svg')
		expect(html).toContain('src="https://cdn.example.test/logo.svg"')
		expect(html).toContain("this.src='/favicon.svg'")
	})

	it('uses the default logo when none is configured', async () => {
		const html = await render(undefined)
		expect(html).toContain('src="/favicon.svg"')
	})
})
