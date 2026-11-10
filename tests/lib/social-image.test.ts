import { describe, expect, it } from 'vitest'
import { socialImageTag } from '../../src/lib/social-image'

describe('socialImageTag', () => {
	it('returns the banner when allowed and set', () => {
		expect(socialImageTag('https://cdn.example.test/b.png', true)).toBe(
			'https://cdn.example.test/b.png'
		)
	})

	it('returns nothing without a banner or when the page has its own image', () => {
		expect(socialImageTag(undefined, true)).toBeUndefined()
		expect(socialImageTag('https://cdn.example.test/b.png', false)).toBeUndefined()
	})
})
