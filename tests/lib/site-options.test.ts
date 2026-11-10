import { describe, expect, it } from 'vitest'
import {
	SITE_OPTIONS_GROUP,
	contactLinks,
	loadSiteOptions,
	siteOptionsFrom
} from '../../src/lib/site-options'
import type { SiteOptionGroup } from '@rushcms/client'
import { notFound } from '../helpers/not-found'

function group(values: Record<string, unknown>): SiteOptionGroup {
	return {
		slug: SITE_OPTIONS_GROUP,
		name: 'Options',
		description: '',
		values,
		media: {},
		updated_at: ''
	} as SiteOptionGroup
}

describe('siteOptionsFrom', () => {
	it('reads non-empty strings and ignores nulls and blanks', () => {
		const options = siteOptionsFrom(
			group({
				contact_email: 'ada@example.test',
				contact_github: 'https://github.example.test/ada',
				contact_linkedin: null,
				contact_phone: '  ',
				whatsapp_number: '+1 555 0100',
				whatsapp_text: 'hello'
			})
		)
		expect(options).toMatchObject({
			contactEmail: 'ada@example.test',
			contactGithub: 'https://github.example.test/ada',
			contactLinkedin: undefined,
			contactPhone: undefined,
			whatsappNumber: '+1 555 0100',
			whatsappText: 'hello',
			creatorUrl: undefined,
			platformUrl: undefined
		})
	})

	it('is empty when the group is missing', () => {
		expect(siteOptionsFrom(undefined).contactEmail).toBeUndefined()
	})
})

describe('contactLinks', () => {
	it('lists github, linkedin, email and phone only when set', () => {
		const links = contactLinks(
			siteOptionsFrom(
				group({
					contact_email: 'ada@example.test',
					contact_github: 'https://github.example.test/ada',
					contact_phone: '+1 555 0100'
				})
			)
		)
		expect(links).toEqual([
			{ kind: 'github', href: 'https://github.example.test/ada' },
			{ kind: 'email', href: 'mailto:ada@example.test' },
			{ kind: 'phone', href: 'tel:+15550100' }
		])
		expect(contactLinks(siteOptionsFrom(undefined))).toEqual([])
	})
})

describe('loadSiteOptions', () => {
	it('reads the group once per locale', async () => {
		let reads = 0
		const rush = {
			siteOptions: {
				get: async (slug: string) => {
					reads += 1
					expect(slug).toBe(SITE_OPTIONS_GROUP)
					return group({ contact_email: 'ada@example.test' })
				}
			}
		}
		const first = await loadSiteOptions(rush, 'en')
		const second = await loadSiteOptions(rush, 'en')
		expect(first).toBe(second)
		expect(reads).toBe(1)
		await loadSiteOptions(rush, 'es')
		expect(reads).toBe(2)
	})

	it('treats a missing group as empty options', async () => {
		const rush = {
			siteOptions: {
				get: async () => {
					throw notFound()
				}
			}
		}
		expect((await loadSiteOptions(rush, 'fr')).contactEmail).toBeUndefined()
	})
})
