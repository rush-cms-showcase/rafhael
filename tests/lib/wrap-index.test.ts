import { describe, expect, it } from 'vitest'
import { wrapIndex } from '../../src/lib/wrap-index'

describe('wrapIndex', () => {
	it('moves forward and backward inside the range', () => {
		expect(wrapIndex(0, 4, 1)).toBe(1)
		expect(wrapIndex(2, 4, -1)).toBe(1)
	})

	it('wraps around both ends', () => {
		expect(wrapIndex(3, 4, 1)).toBe(0)
		expect(wrapIndex(0, 4, -1)).toBe(3)
		expect(wrapIndex(1, 4, -6)).toBe(3)
		expect(wrapIndex(2, 4, 7)).toBe(1)
	})

	it('enters the range from no selection at the matching end', () => {
		expect(wrapIndex(-1, 4, 1)).toBe(0)
		expect(wrapIndex(-1, 4, -1)).toBe(3)
	})

	it('stays on the only item and returns -1 for an empty range', () => {
		expect(wrapIndex(0, 1, 1)).toBe(0)
		expect(wrapIndex(0, 1, -1)).toBe(0)
		expect(wrapIndex(0, 0, 1)).toBe(-1)
		expect(wrapIndex(-1, 0, -1)).toBe(-1)
	})
})
