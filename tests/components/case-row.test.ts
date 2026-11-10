import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, it } from 'vitest'
import CaseRow from '../../src/components/case-row.astro'
import { makeEntry } from '../helpers/make-entry'

type RowOptions = {
	detailed?: boolean
	excerpt?: string
}

describe('CaseRow', () => {
	let container: AstroContainer

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	function render(data: Record<string, unknown>, options: RowOptions = {}) {
		const entry = makeEntry({
			data,
			title: 'Billing platform',
			...(options.excerpt === undefined ? {} : { excerpt: options.excerpt })
		})
		return container.renderToString(CaseRow, {
			props: {
				entry,
				href: '/cases/billing',
				detailed: options.detailed ?? false
			}
		})
	}

	it('renders the title and the link without client, role or index', async () => {
		const html = await render({ client_name: 'Acme', role: 'Lead engineer', period: '2024' })
		expect(html).toContain('Billing platform')
		expect(html).toContain('href="/cases/billing"')
		for (const value of ['Acme', 'Lead engineer', 'data-client', '>01<', '>1<']) {
			expect(html).not.toContain(value)
		}
	})

	it('marks the row with an accent line instead of a number', async () => {
		expect(await render({})).toContain('data-accent')
	})

	it('renders no date and no time element', async () => {
		const html = await render({ client_name: 'Acme', period: '2024' })
		expect(html).not.toContain('<time')
		expect(html).not.toContain('2026')
		expect(html).not.toContain('Jun')
	})

	it('shows excerpt and stack only when detailed, never the role', async () => {
		const data = { client_name: 'Acme', role: 'Lead engineer', stack: ['Go'] }
		const compact = await render(data, { excerpt: 'Short summary' })
		for (const value of ['Short summary', '>Go<']) {
			expect(compact).not.toContain(value)
		}
		const detailed = await render(data, { excerpt: 'Short summary', detailed: true })
		for (const value of ['Short summary', '>Go<']) {
			expect(detailed).toContain(value)
		}
		expect(detailed).not.toContain('Lead engineer')
		expect(detailed).not.toContain('undefined')
	})
})
