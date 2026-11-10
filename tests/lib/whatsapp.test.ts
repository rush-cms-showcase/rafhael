import { describe, expect, it } from 'vitest'
import { whatsappUrl } from '../../src/lib/whatsapp'

describe('whatsappUrl', () => {
	it('keeps only the digits of the number and encodes the text', () => {
		expect(whatsappUrl('+55 (11) 91234-5678', 'oi, tudo bem?')).toBe(
			'https://wa.me/5511912345678?text=oi%2C%20tudo%20bem%3F'
		)
	})

	it('omits the text when it is empty', () => {
		expect(whatsappUrl('+1 555 0100', '')).toBe('https://wa.me/15550100')
	})

	it('returns nothing for an empty or digitless number', () => {
		expect(whatsappUrl('', 'oi')).toBeUndefined()
		expect(whatsappUrl('  ()-', 'oi')).toBeUndefined()
		expect(whatsappUrl(undefined, 'oi')).toBeUndefined()
	})
})
