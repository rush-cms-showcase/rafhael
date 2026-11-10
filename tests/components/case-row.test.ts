import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, it } from 'vitest'
import CaseRow from '../../src/components/case-row.astro'
import { makeEntry } from '../helpers/make-entry'

type RowOptions = {
	position?: number
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
				position: options.position ?? 1,
				detailed: options.detailed ?? false
			}
		})
	}

	it('renders the title, the client and the link', async () => {
		const html = await render({ client_name: 'Acme', period: '2024' })
		expect(html).toContain('Billing platform')
		expect(html).toContain('Acme')
		expect(html).toContain('href="/cases/billing"')
	})

	it('renders the position as a two digit index', async () => {
		expect(await render({}, { position: 3 })).toMatch(/>\s*03\s*</)
		expect(await render({}, { position: 12 })).toMatch(/>\s*12\s*</)
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

	it('shows excerpt, role and stack only when detailed', async () => {
		const data = { client_name: 'Acme', role: 'Lead engineer', stack: ['Go'] }
		const compact = await render(data, { excerpt: 'Short summary' })
		for (const value of ['Short summary', 'Lead engineer', '>Go<']) {
			expect(compact).not.toContain(value)
		}
		const detailed = await render(data, { excerpt: 'Short summary', detailed: true })
		for (const value of ['Short summary', 'Lead engineer', '>Go<']) {
			expect(detailed).toContain(value)
		}
	})
})
