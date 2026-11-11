import { describe, expect, it } from 'vitest'
import { brandHeadTitle, documentTitle } from '../../src/lib/document-title'

describe('documentTitle', () => {
	it('leaves the title to the seo tags, uses the site name alone or suffixes a page', () => {
		expect(documentTitle({ from: 'seo' }, 'Ada')).toBeUndefined()
		expect(documentTitle({ from: 'site' }, 'Ada')).toBe('Ada')
		expect(documentTitle({ from: 'page', page: 'Blog' }, 'Ada')).toBe('Blog | Ada')
	})
})

describe('brandHeadTitle', () => {
	it('suffixes the head title with the separator and the escaped site name', () => {
		expect(brandHeadTitle('<title>Post</title><meta name="x">', 'Ada & Co')).toBe(
			'<title>Post | Ada &amp; Co</title><meta name="x">'
		)
	})

	it('leaves a head without a title alone', () => {
		expect(brandHeadTitle('<meta name="x">', 'Ada')).toBe('<meta name="x">')
	})
})
