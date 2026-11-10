import { describe, expect, it } from 'vitest'
import Footer from '../../src/components/footer.astro'
import { render } from '../helpers/container'

const BASE = { name: 'Ada Lovelace', locale: 'en', homeUrl: '/', links: [], year: 2031 }

function renderFooter(props: Record<string, unknown> = {}) {
	return render(Footer, { ...BASE, ...props })
}

describe('footer credits', () => {
	it('always shows created by and powered by with fixed links', async () => {
		const html = await renderFooter({ locale: 'pt_BR', homeUrl: '/br' })
		expect(html).toContain('Criado por')
		expect(html).toContain('href="/br"')
		expect(html).toContain('Desenvolvido com')
		expect(html).toContain('href="https://rushcms.com"')
		expect(html).toContain('rush-cms.svg')
	})

	it('uses each locale wording and falls back to English', async () => {
		const pt = await renderFooter({ locale: 'pt_BR' })
		expect(pt).toContain('Criado por')
		expect(pt).toContain('Desenvolvido com')
		const es = await renderFooter({ locale: 'es' })
		expect(es).toContain('Creado por')
		expect(es).toContain('Desarrollado con')
		expect(await renderFooter()).toContain('Created by')
		const fallback = await renderFooter({ locale: 'fr' })
		expect(fallback).toContain('Created by')
		expect(fallback).toContain('Powered by')
	})
})

describe('footer copyright', () => {
	it('separates the given year, the name and the rights text', async () => {
		expect(await renderFooter()).toContain('© 2031 Ada Lovelace. All rights reserved.')
	})
})

describe('footer contacts', () => {
	it('renders one labelled link per contact and none when empty', async () => {
		const contacts = [
			{ kind: 'github', href: 'https://github.example.test/ada' },
			{ kind: 'email', href: 'mailto:ada@example.test' }
		]
		const html = await renderFooter({ contacts })
		expect(html).toContain('href="https://github.example.test/ada"')
		expect(html).toContain('aria-label="GitHub"')
		expect(html).toContain('href="mailto:ada@example.test"')
		expect(html).toContain('aria-label="E-mail"')
		expect(await renderFooter()).not.toContain('aria-label')
	})
})

describe('footer logo', () => {
	it('uses the CMS logo with the default as fallback, like the header', async () => {
		const html = await renderFooter({ logoUrl: 'https://cdn.example.test/logo.svg' })
		expect(html).toContain('src="https://cdn.example.test/logo.svg"')
		expect(html).toContain("this.src='/favicon.svg'")
	})
})
