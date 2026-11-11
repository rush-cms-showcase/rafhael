import { describe, expect, it } from 'vitest'
import { markdownBody, renderMarkdown } from '../../src/lib/markdown'
import { SITE } from '../helpers/fixtures'
import { makeEntry } from '../helpers/make-entry'

describe('renderMarkdown', () => {
	it('turns a fenced block into expressive-code markup', async () => {
		const html = await renderMarkdown('```go\nfmt.Println("x")\n```', SITE)
		expect(html).toContain('class="expressive-code"')
		expect(html).toContain('Println')
	})

	it('highlights postgresql fences through the sql grammar', async () => {
		const html = await renderMarkdown('```postgresql\nSELECT 1;\n```', SITE)
		expect(html).toContain('class="expressive-code"')
		expect(html).toContain('SELECT')
	})

	it('opens external links in a new tab without referrer', async () => {
		const html = await renderMarkdown('[out](https://other.example.test/a)', SITE)
		expect(html).toContain('target="_blank"')
		expect(html).toContain('rel="nofollow noopener noreferrer"')
	})

	it('treats protocol-relative links to other hosts as external', async () => {
		const html = await renderMarkdown('[out](//cdn.example.test/a)', SITE)
		expect(html).toContain('rel="nofollow noopener noreferrer"')
	})

	it('leaves same-origin, relative and mailto links alone', async () => {
		const html = await renderMarkdown(
			'[a](https://site.example.test/a) [b](/b) [c](#c) [d](mailto:someone@example.test)',
			SITE
		)
		expect(html).not.toContain('target=')
		expect(html).not.toContain('rel=')
	})
})

describe('markdownBody', () => {
	it('reads the content field', () => {
		expect(markdownBody(makeEntry({ data: { content: '# Title' } }))).toBe('# Title')
	})

	it('is empty when the field is missing or not text', () => {
		expect(markdownBody(makeEntry({ data: {} }))).toBe('')
		expect(markdownBody(makeEntry({ data: { content: { type: 'doc' } } }))).toBe('')
	})
})
