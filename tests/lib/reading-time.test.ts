import { describe, expect, it } from 'vitest'
import { readingTime } from '../../src/lib/reading-time'

function words(count: number): string {
	return Array.from({ length: count }, () => 'word').join(' ')
}

describe('readingTime', () => {
	it('is at least one minute for an empty body', () => {
		expect(readingTime('')).toBe(1)
		expect(readingTime('   \n ')).toBe(1)
	})

	it('rounds up by 200 words per minute', () => {
		expect(readingTime(words(200))).toBe(1)
		expect(readingTime(words(201))).toBe(2)
		expect(readingTime(words(400))).toBe(2)
		expect(readingTime(words(401))).toBe(3)
	})

	it('ignores html tags', () => {
		expect(readingTime(`<div class="${words(300)}">one</div>`)).toBe(1)
	})
})
