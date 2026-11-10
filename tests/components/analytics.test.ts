import { describe, expect, it } from 'vitest'
import Analytics from '../../src/components/analytics.astro'
import { render } from '../helpers/container'

const MEASUREMENT_ID = 'G-TEST000000'

describe('analytics', () => {
	it('renders nothing without a measurement id', async () => {
		expect((await render(Analytics)).trim()).toBe('')
		expect((await render(Analytics, { id: '' })).trim()).toBe('')
	})

	it('renders the gtag snippet with the measurement id', async () => {
		const html = await render(Analytics, { id: MEASUREMENT_ID })
		expect(html).toContain(`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`)
		expect(html).toContain(MEASUREMENT_ID)
		expect(html).not.toContain('undefined')
	})
})
