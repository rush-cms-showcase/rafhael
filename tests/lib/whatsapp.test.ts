import { describe, expect, it } from 'vitest'
import { whatsappUrl } from '../../src/lib/whatsapp'

describe('whatsappUrl', () => {
	it('keeps only the digits of the number and encodes the text', () => {
		expect(whatsappUrl('+55 (11) 91234-5678', 'oi, tudo bem?')).toBe(
			'https://wa.me/5511912345678?text=oi%2C+tudo+bem%3F'
		)
	})

	it('turns spaces into plus signs and keeps a literal plus encoded', () => {
		expect(whatsappUrl('15550100', 'a b  c+d')).toBe('https://wa.me/15550100?text=a+b++c%2Bd')
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
