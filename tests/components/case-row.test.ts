import { describe, expect, it } from 'vitest'
import CaseRow from '../../src/components/case-row.astro'
import { render } from '../helpers/container'
import { makeEntry } from '../helpers/make-entry'

type RowOptions = {
	detailed?: boolean
	excerpt?: string
}

function renderRow(data: Record<string, unknown>, options: RowOptions = {}) {
	const entry = makeEntry({
		data,
		title: 'Billing platform',
		...(options.excerpt === undefined ? {} : { excerpt: options.excerpt })
	})
	return render(CaseRow, { entry, href: '/cases/billing', detailed: options.detailed ?? false })
}

describe('CaseRow', () => {
	it('renders the title and the link without client or role', async () => {
		const html = await renderRow({ client_name: 'Acme', role: 'Lead engineer', period: '2024' })
		expect(html).toContain('Billing platform')
		expect(html).toContain('href="/cases/billing"')
		for (const value of ['Acme', 'Lead engineer']) {
			expect(html).not.toContain(value)
		}
	})

	it('renders no date and no time element', async () => {
		const html = await renderRow({ client_name: 'Acme', period: '2024' })
		expect(html).not.toContain('<time')
		expect(html).not.toContain('2026')
		expect(html).not.toContain('Jun')
	})

	it('shows excerpt and stack only when detailed, never the role', async () => {
		const data = { client_name: 'Acme', role: 'Lead engineer', stack: ['Go'] }
		const compact = await renderRow(data, { excerpt: 'Short summary' })
		for (const value of ['Short summary', '>Go<']) {
			expect(compact).not.toContain(value)
		}
		const detailed = await renderRow(data, { excerpt: 'Short summary', detailed: true })
		for (const value of ['Short summary', '>Go<']) {
			expect(detailed).toContain(value)
		}
		expect(detailed).not.toContain('Lead engineer')
		expect(detailed).not.toContain('undefined')
	})
})
