import { readFileSync } from 'node:fs'
import type { LocaleCode } from '@rushcms/client'
import { describe, expect, it } from 'vitest'
import PageEn from '../../src/pages/404.astro'
import PageBr from '../../src/pages/br/404.astro'
import PageEs from '../../src/pages/es/404.astro'
import { render } from '../helpers/container'
import { fakeLocals } from '../helpers/runtime'

type NotFoundCase = {
	page: Parameters<typeof render>[0]
	source: string
	locale: LocaleCode
	lang: string
	title: string
	backHome: string
}

const CASES: NotFoundCase[] = [
	{
		page: PageEn,
		source: 'src/pages/404.astro',
		locale: 'en',
		lang: 'en',
		title: 'Page not found',
		backHome: 'Back to the home'
	},
	{
		page: PageBr,
		source: 'src/pages/br/404.astro',
		locale: 'pt_BR',
		lang: 'pt-BR',
		title: 'Página não encontrada',
		backHome: 'Voltar para o início'
	},
	{
		page: PageEs,
		source: 'src/pages/es/404.astro',
		locale: 'es',
		lang: 'es',
		title: 'Página no encontrada',
		backHome: 'Volver al inicio'
	}
]

describe.each(CASES)('404 page for $locale', ({ page, source, locale, lang, title, backHome }) => {
	it('renders the document language and translated copy', async () => {
		const html = await render(page, {}, fakeLocals({ locale }))
		expect(html).toContain(`lang="${lang}"`)
		expect(html).toContain(title)
		expect(html).toContain(backHome)
	})

	it('is prerendered', () => {
		expect(readFileSync(source, 'utf8')).not.toMatch(/prerender\s*=\s*false/)
	})
})
