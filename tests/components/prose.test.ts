import { describe, expect, it } from 'vitest'
import Prose from '../../src/components/prose.astro'
import { render } from '../helpers/container'
import { makeEntry } from '../helpers/make-entry'

describe('Prose', () => {
	it('renders inline code as a code element without literal backticks', async () => {
		const html = await render(Prose, {
			entry: makeEntry({ data: { content: 'use `x` here' } })
		})
		expect(html).toContain('<code>x</code>')
		expect(html).toContain('prose-code:before:content-none')
		expect(html).toContain('prose-code:after:content-none')
	})

	it('marks links to other hosts as external against the site origin', async () => {
		const content = '[in](https://site.example.test/a) [out](https://other.example.test/b)'
		const html = await render(Prose, { entry: makeEntry({ data: { content } }) })
		expect(html.match(/rel="nofollow noopener noreferrer"/g)).toHaveLength(1)
	})

	it('renders nothing for an empty body', async () => {
		expect((await render(Prose, { entry: makeEntry({ data: {} }) })).trim()).toBe('')
	})
})
