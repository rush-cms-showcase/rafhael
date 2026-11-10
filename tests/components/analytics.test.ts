import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, it } from 'vitest'
import Analytics from '../../src/components/analytics.astro'

const MEASUREMENT_ID = 'G-TEST000000'

describe('analytics', () => {
	let container: AstroContainer

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	it('renders nothing without a measurement id', async () => {
		expect((await container.renderToString(Analytics)).trim()).toBe('')
		expect((await container.renderToString(Analytics, { props: { id: '' } })).trim()).toBe('')
	})

	it('renders the gtag snippet with the measurement id', async () => {
		const html = await container.renderToString(Analytics, { props: { id: MEASUREMENT_ID } })
		expect(html).toContain(`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`)
		expect(html).toContain(MEASUREMENT_ID)
		expect(html).not.toContain('undefined')
	})
})
