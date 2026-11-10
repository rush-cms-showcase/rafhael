import { describe, expect, it } from 'vitest'
import PostCard from '../../src/components/blog/post-card.astro'
import CaseRows from '../../src/components/case-rows.astro'
import ProjectCard from '../../src/components/project-card.astro'
import { buildSearchIndex } from '../../src/lib/search-index'
import { render } from '../helpers/container'
import { makeEntry } from '../helpers/make-entry'
import { makeUrls } from '../helpers/make-urls'

const urls = makeUrls()

function hrefs(html: string): string[] {
	return [...new Set([...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1] ?? ''))]
}

describe('entry links', () => {
	it('link a fallback entry to its canonical url from every listing', async () => {
		const entry = makeEntry({ locale: 'en', fallback: true, slug: 'only-english' })
		const expected = urls.entry(entry)
		const post = await render(PostCard, { entry, locale: 'pt_BR', urls })
		const project = await render(ProjectCard, { entry, locale: 'pt_BR', urls })
		const rows = await render(CaseRows, { entries: [entry], urls })
		expect(expected).toBe('/blog/only-english')
		expect(hrefs(post)).toEqual([expected])
		expect(hrefs(project)).toEqual([expected])
		expect(hrefs(rows)).toEqual([expected])
	})

	it('link a native entry the same way from the search index', () => {
		const entry = makeEntry({ locale: 'pt_BR', slug: 'ola' })
		expect(buildSearchIndex([entry], urls, 'pt_BR').map((item) => item.url)).toEqual([
			urls.entry(entry)
		])
	})
})
