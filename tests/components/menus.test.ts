import { describe, expect, it } from 'vitest'
import LanguageSelector from '../../src/components/language-selector.astro'
import MobileMenu from '../../src/components/mobile-menu.astro'
import type { LanguageLink } from '../../src/lib/locale'
import { render } from '../helpers/container'

const LANGUAGES: LanguageLink[] = [
	{ locale: 'en', code: 'EN', hreflang: 'en', url: '/' },
	{ locale: 'pt_BR', code: 'PT', hreflang: 'pt-BR', url: '/br' }
]

describe('menu toggles', () => {
	it('starts the mobile menu toggle collapsed with both labels from the dictionary', async () => {
		const html = await render(MobileMenu, { links: [], languages: LANGUAGES, locale: 'pt_BR' })
		expect(html).toMatch(/id="menu-toggle"[^>]*aria-label="Abrir menu"/)
		expect(html).toMatch(/id="menu-toggle"[^>]*aria-expanded="false"/)
		expect(html).toContain('data-open-label="Abrir menu"')
		expect(html).toContain('data-close-label="Fechar menu"')
	})

	it('starts the language button collapsed', async () => {
		const html = await render(LanguageSelector, { current: 'en', links: LANGUAGES })
		expect(html).toMatch(/<button[^>]*aria-expanded="false"/)
		expect(html).toContain('data-language-menu')
	})
})
