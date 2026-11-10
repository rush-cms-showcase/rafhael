import { describe, expect, it } from 'vitest'
import { markdownBody, renderMarkdown } from '../../src/lib/markdown'
import { makeEntry } from '../helpers/make-entry'

const ORIGIN = new URL('https://example.test')

describe('renderMarkdown', () => {
	it('turns a fenced block into expressive-code markup', async () => {
		const html = await renderMarkdown('```go\nfmt.Println("x")\n```', ORIGIN)
		expect(html).toContain('class="expressive-code"')
		expect(html).toContain('Println')
	})

	it('opens external links in a new tab without referrer', async () => {
		const html = await renderMarkdown('[out](https://other.example.test/a)', ORIGIN)
		expect(html).toContain('target="_blank"')
		expect(html).toContain('rel="nofollow noopener noreferrer"')
	})

	it('treats protocol-relative links to other hosts as external', async () => {
		const html = await renderMarkdown('[out](//cdn.example.test/a)', ORIGIN)
		expect(html).toContain('rel="nofollow noopener noreferrer"')
	})

	it('leaves same-origin, relative and mailto links alone', async () => {
		const html = await renderMarkdown(
			'[a](https://example.test/a) [b](/b) [c](#c) [d](mailto:someone@example.test)',
			ORIGIN
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
