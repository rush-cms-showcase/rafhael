import { describe, expect, it } from 'vitest'
import Pager from '../../src/components/pager.astro'
import { collectionPageUrl } from '../../src/lib/routing'
import CollectionView from '../../src/views/collection.astro'
import NotFound from '../../src/views/not-found.astro'
import { render } from '../helpers/container'
import { BLOG } from '../helpers/fixtures'
import { makeUrls } from '../helpers/make-urls'
import { fakeLocals } from '../helpers/runtime'

const ENGLISH = [
	'Page not found',
	'does not exist',
	'Back to the home',
	'Nothing has been published',
	'Pagination',
	'Page 1 of',
	'⌘',
	' lang="en"'
]

function expectNoEnglish(html: string): void {
	for (const phrase of ENGLISH) {
		expect(html).not.toContain(phrase)
	}
}

describe('ui copy in pt_BR', () => {
	const locals = fakeLocals({ locale: 'pt_BR' })

	it('renders the not-found page in Portuguese', async () => {
		const html = await render(NotFound, {}, locals)
		expect(html).toContain('Página não encontrada')
		expect(html).toContain('Voltar para o início')
		expect(html).toContain('Ctrl K')
		expect(html).toContain('lang="pt-BR"')
		expectNoEnglish(html)
	})

	it('renders an empty collection list in Portuguese', async () => {
		const page = {
			kind: 'collection',
			locale: 'pt_BR',
			collection: BLOG,
			page: 1,
			lastPage: 1,
			entries: { items: [] }
		}
		const html = await render(CollectionView, { page }, locals)
		expect(html).toContain('Nada foi publicado aqui ainda.')
		expectNoEnglish(html)
	})

	it('labels the pager in Portuguese', async () => {
		const html = await render(Pager, {
			locale: 'pt_BR',
			current: 2,
			last: 3,
			pageUrl: collectionPageUrl(makeUrls(), BLOG, 'pt_BR')
		})
		expect(html).toContain('aria-label="Paginação"')
		expect(html).toContain('Anterior')
		expectNoEnglish(html)
	})
})
