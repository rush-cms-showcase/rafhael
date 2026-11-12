import { describe, expect, it } from 'vitest'
import { mediaAlt } from '../../src/lib/media-alt'

describe('mediaAlt', () => {
	it('prefers the media alt', () => {
		expect(mediaAlt('Dashboard', 'Context', 'Site')).toBe('Dashboard')
	})

	it.each([undefined, '', '   '])('falls back to the context for alt %j', (alt) => {
		expect(mediaAlt(alt, 'Context', 'Site')).toBe('Context')
	})

	it.each([undefined, '', '  '])('falls back to the site name for context %j', (context) => {
		expect(mediaAlt(undefined, context, 'Site')).toBe('Site')
		expect(mediaAlt(' ', context, 'Site')).toBe('Site')
	})

	it('never returns an empty text when the site name exists', () => {
		const alts = [undefined, '', ' ', 'A']
		const contexts = [undefined, '', ' ', 'C']
		for (const alt of alts) {
			for (const context of contexts) {
				expect(mediaAlt(alt, context, 'Site').trim()).not.toBe('')
			}
		}
	})
})
