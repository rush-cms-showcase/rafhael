import { describe, expect, it } from 'vitest'
import { shareUrl } from '../../src/lib/share'
import { whatsappUrl } from '../../src/lib/whatsapp'

const TARGET = { url: 'https://site.example.test/blog/a?b=1&c', title: 'Go, & Astro?' }

function query(url: string): URLSearchParams {
	return new URL(url).searchParams
}

describe('shareUrl', () => {
	it('builds the X intent with the url and the title', () => {
		const url = shareUrl('x', TARGET)
		expect(url.startsWith('https://x.com/intent/post?')).toBe(true)
		expect(query(url).get('url')).toBe(TARGET.url)
		expect(query(url).get('text')).toBe(TARGET.title)
	})

	it('builds the LinkedIn share with the url only', () => {
		const url = shareUrl('linkedin', TARGET)
		expect(url.startsWith('https://www.linkedin.com/sharing/share-offsite/?')).toBe(true)
		expect([...query(url).keys()]).toEqual(['url'])
		expect(query(url).get('url')).toBe(TARGET.url)
	})

	it('builds the WhatsApp share with the title then the url, encoded like the chat link', () => {
		const url = shareUrl('whatsapp', TARGET)
		expect(query(url).get('text')).toBe(`${TARGET.title} ${TARGET.url}`)
		expect(url).toBe(
			'https://api.whatsapp.com/send?text=Go%2C+%26+Astro%3F+https%3A%2F%2Fsite.example.test%2Fblog%2Fa%3Fb%3D1%26c'
		)
		expect(whatsappUrl('15550100', TARGET.title)).toBe(
			'https://wa.me/15550100?text=Go%2C+%26+Astro%3F'
		)
	})
})
