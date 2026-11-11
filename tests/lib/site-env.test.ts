import { describe, expect, it } from 'vitest'
import { siteOrigin } from '../../src/lib/site-env'

describe('siteOrigin', () => {
	it('returns the configured origin', () => {
		const origin = siteOrigin({ SITE_URL: 'https://example.test', NODE_ENV: 'production' })
		expect(origin).toBeInstanceOf(URL)
		expect(origin.href).toBe('https://example.test/')
	})

	it('throws when SITE_URL is missing', () => {
		expect(() => siteOrigin({ NODE_ENV: 'production' })).toThrow('SITE_URL is required')
		expect(() => siteOrigin({ SITE_URL: '', NODE_ENV: 'development' })).toThrow(
			'SITE_URL is required'
		)
	})

	it('throws when SITE_URL is not a valid URL', () => {
		expect(() => siteOrigin({ SITE_URL: 'not a url', NODE_ENV: 'production' })).toThrow(
			'SITE_URL must be a valid URL'
		)
	})

	it('rejects http in production', () => {
		expect(() =>
			siteOrigin({ SITE_URL: 'http://example.test', NODE_ENV: 'production' })
		).toThrow('SITE_URL must be https in production')
	})

	it('accepts http outside production', () => {
		const origin = siteOrigin({ SITE_URL: 'http://localhost:4321', NODE_ENV: 'development' })
		expect(origin.href).toBe('http://localhost:4321/')
	})
})
