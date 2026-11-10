import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, it } from 'vitest'
import CaseRow from '../../src/components/case-row.astro'
import { entryFixture } from '../helpers/entry'

describe('CaseRow', () => {
	let container: AstroContainer

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	function render(data: Record<string, unknown>) {
		const entry = entryFixture(data, { title: 'Billing platform' })
		return container.renderToString(CaseRow, { props: { entry, href: '/cases/billing' } })
	}

	it('renders the title, the client and the link', async () => {
		const html = await render({ client_name: 'Acme', period: '2024' })
		expect(html).toContain('Billing platform')
		expect(html).toContain('Acme')
		expect(html).toContain('href="/cases/billing"')
	})

	it('renders no date and no time element', async () => {
		const html = await render({ client_name: 'Acme', period: '2024' })
		expect(html).not.toContain('<time')
		expect(html).not.toContain('2026')
		expect(html).not.toContain('Jun')
	})

	it('omits the client line when there is no client', async () => {
		const html = await render({})
		expect(html).toContain('Billing platform')
		expect(html).not.toContain('undefined')
		expect(html).not.toContain('data-client')
	})
})
