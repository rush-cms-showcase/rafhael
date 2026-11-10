import { describe, expect, it } from 'vitest'
import { formatDate } from '../../src/lib/format-date'

describe('formatDate', () => {
	it('formats pt_BR as dd/mm/yyyy', () => {
		expect(formatDate('2026-06-25T00:00:00Z', 'pt_BR')).toBe('25/06/2026')
	})

	it('formats en with a short month', () => {
		expect(formatDate('2026-06-25T00:00:00Z', 'en')).toBe('Jun 25, 2026')
		expect(formatDate('2025-01-12T23:59:00Z', 'en')).toBe('Jan 12, 2025')
	})

	it('formats es as dd/mm/yyyy', () => {
		expect(formatDate('2026-06-05T12:00:00Z', 'es')).toBe('05/06/2026')
	})

	it('returns an empty string for an invalid date', () => {
		expect(formatDate('not a date', 'en')).toBe('')
	})
})
