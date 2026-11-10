import { describe, expect, it } from 'vitest'
import { safeHref } from '../../src/lib/safe-href'

describe('safeHref', () => {
	it('keeps web, mail and phone links', () => {
		for (const value of [
			'https://a.example.test/x',
			'http://a.example.test',
			'mailto:a@example.test',
			'tel:+15550100'
		]) {
			expect(safeHref(value)).toBe(value)
		}
	})

	it('drops scripts, relative paths and empties', () => {
		for (const value of [
			'javascript:alert(1)',
			'data:text/html,x',
			'/relative',
			'no scheme',
			'',
			undefined
		]) {
			expect(safeHref(value)).toBeUndefined()
		}
	})
})
