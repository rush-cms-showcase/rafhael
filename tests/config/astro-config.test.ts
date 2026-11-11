import type { AstroUserConfig } from 'astro'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

type RushOptions = { forms?: boolean }

const IMPORT_TIMEOUT = 60_000

const captured = vi.hoisted(() => ({ options: undefined as RushOptions | undefined }))

vi.mock('@rushcms/astro', () => ({
	default: (options: RushOptions) => {
		captured.options = options
		return { name: 'rush', hooks: {} }
	}
}))

describe('astro config', () => {
	let config: AstroUserConfig

	beforeAll(async () => {
		vi.stubEnv('SITE_URL', 'https://example.test')
		config = (await import('../../astro.config')).default
	}, IMPORT_TIMEOUT)

	afterAll(() => {
		vi.unstubAllEnvs()
	})

	it('is static without an adapter', () => {
		expect(config.output).toBe('static')
		expect(config.adapter).toBeUndefined()
		expect(config.security).toBeUndefined()
	})

	it('builds the site from SITE_URL', () => {
		expect(config.site).toBe('https://example.test')
	})

	it('turns the forms route off', () => {
		expect(captured.options?.forms).toBe(false)
	})
})
