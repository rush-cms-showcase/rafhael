import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { describe, expect, it } from 'vitest'
import Footer from '../../src/components/footer.astro'

describe('footer credits', () => {
	it('always shows created by and powered by with fixed links', async () => {
		const container = await AstroContainer.create()
		const html = await container.renderToString(Footer, {
			props: { name: 'Ada Lovelace', locale: 'pt_BR', homeUrl: '/br', links: [] }
		})
		expect(html).toContain('Criado por')
		expect(html).toContain('href="/br"')
		expect(html).toContain('Desenvolvido com')
		expect(html).toContain('href="https://rushcms.com"')
		expect(html).toContain('rush-cms.svg')
	})
})

describe('footer credits wording', () => {
	it('uses each locale wording and falls back to English', async () => {
		const container = await AstroContainer.create()
		const render = (locale: string) =>
			container.renderToString(Footer, {
				props: { name: 'Ada', locale, homeUrl: '/', links: [] }
			})
		expect(await render('pt_BR')).toContain('Criado por')
		expect(await render('pt_BR')).toContain('Desenvolvido com')
		expect(await render('es')).toContain('Creado por')
		expect(await render('es')).toContain('Desarrollado con')
		expect(await render('en')).toContain('Created by')
		const fallback = await render('fr')
		expect(fallback).toContain('Created by')
		expect(fallback).toContain('Powered by')
	})
})

describe('footer copyright', () => {
	it('separates the year, the name and the rights text', async () => {
		const container = await AstroContainer.create()
		const html = await container.renderToString(Footer, {
			props: { name: 'Ada Lovelace', locale: 'en', homeUrl: '/', links: [] }
		})
		const year = new Date().getFullYear()
		expect(html).toContain(`© ${year} Ada Lovelace. All rights reserved.`)
	})
})

describe('footer contacts', () => {
	it('renders one labelled link per contact and none when empty', async () => {
		const container = await AstroContainer.create()
		const contacts = [
			{ kind: 'github', href: 'https://github.example.test/ada' },
			{ kind: 'email', href: 'mailto:ada@example.test' }
		]
		const html = await container.renderToString(Footer, {
			props: { name: 'Ada Lovelace', locale: 'en', homeUrl: '/', links: [], contacts }
		})
		expect(html).toContain('href="https://github.example.test/ada"')
		expect(html).toContain('aria-label="GitHub"')
		expect(html).toContain('href="mailto:ada@example.test"')
		expect(html).toContain('aria-label="E-mail"')
		const empty = await container.renderToString(Footer, {
			props: { name: 'Ada Lovelace', locale: 'en', homeUrl: '/', links: [] }
		})
		expect(empty).not.toContain('aria-label')
	})
})
