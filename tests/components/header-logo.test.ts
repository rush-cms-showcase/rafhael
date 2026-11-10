import { describe, expect, it } from 'vitest'
import HeaderLogo from '../../src/components/header-logo.astro'
import { render } from '../helpers/container'

function renderLogo(logoUrl: string | undefined) {
	return render(HeaderLogo, { homeUrl: '/', name: 'Ada Lovelace', logoUrl })
}

describe('HeaderLogo', () => {
	it('uses the configured logo with the default as the error fallback', async () => {
		const html = await renderLogo('https://cdn.example.test/logo.svg')
		expect(html).toContain('src="https://cdn.example.test/logo.svg"')
		expect(html).toContain("this.src='/favicon.svg'")
	})

	it('uses the default logo when none is configured', async () => {
		expect(await renderLogo(undefined)).toContain('src="/favicon.svg"')
	})
})
