import { describe, expect, it } from 'vitest'
import { documentTitle, titleSuffix } from '../../src/lib/document-title'

describe('documentTitle', () => {
	it('leaves the title to the seo tags, uses the site name alone or suffixes a page', () => {
		expect(documentTitle({ from: 'seo' }, 'Ada')).toBeUndefined()
		expect(documentTitle({ from: 'site' }, 'Ada')).toBe('Ada')
		expect(documentTitle({ from: 'page', page: 'Blog' }, 'Ada')).toBe('Blog | Ada')
	})
})

describe('titleSuffix', () => {
	it('joins the site name after the separator', () => {
		expect(titleSuffix('Ada & Co')).toBe(' | Ada & Co')
	})
})
