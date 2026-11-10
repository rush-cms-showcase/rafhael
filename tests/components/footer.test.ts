import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, it } from 'vitest'
import Footer from '../../src/components/footer.astro'
import { creditsFrom } from '../../src/lib/site-credits'

const CREATOR = 'https://creator.example.test'
const PLATFORM = 'https://platform.example.test'

describe('footer credits', () => {
	let container: AstroContainer

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	function render(credits: object) {
		return container.renderToString(Footer, {
			props: { name: 'Ada Lovelace', locale: 'en', links: [], credits }
		})
	}

	it('omits both credit links when the options are unset', async () => {
		const html = await render({})
		expect(html).not.toContain('Created by')
		expect(html).not.toContain('Powered by')
		expect(html).not.toContain('rush-cms.svg')
		expect(html).not.toContain('undefined')
	})

	it('renders each credit link only when its option is set', async () => {
		const creatorOnly = await render({ creatorUrl: CREATOR })
		expect(creatorOnly).toContain(`href="${CREATOR}"`)
		expect(creatorOnly).not.toContain('Powered by')
		const platformOnly = await render({ platformUrl: PLATFORM })
		expect(platformOnly).toContain(`href="${PLATFORM}"`)
		expect(platformOnly).not.toContain('Created by')
	})
})

describe('footer copyright', () => {
	it('separates the year, the name and the rights text', async () => {
		const container = await AstroContainer.create()
		const html = await container.renderToString(Footer, {
			props: { name: 'Ada Lovelace', locale: 'en', links: [], credits: {} }
		})
		const year = new Date().getFullYear()
		expect(html).toContain(`© ${year} Ada Lovelace. All rights reserved.`)
	})
})

describe('creditsFrom', () => {
	it('reads non-empty string values and ignores the rest', () => {
		const group = {
			slug: 'contact',
			name: 'Contact',
			description: '',
			values: { creator_url: CREATOR, platform_url: '' },
			media: {},
			updated_at: ''
		}
		expect(creditsFrom(group)).toEqual({ creatorUrl: CREATOR, platformUrl: undefined })
		expect(creditsFrom(undefined)).toEqual({ creatorUrl: undefined, platformUrl: undefined })
	})
})
