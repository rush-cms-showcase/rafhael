import { describe, expect, it } from 'vitest'
import Hero from '../../src/components/home/hero.astro'
import Loop from '../../src/components/home/loop.astro'
import WhatsappFloat from '../../src/components/whatsapp-float.astro'
import HomeView from '../../src/views/home.astro'
import type { HeroSection, LoopSection } from '../../src/lib/home-sections'
import { render } from '../helpers/container'
import { makeEntry } from '../helpers/make-entry'
import { makeUrls } from '../helpers/make-urls'
import { fakeLocals, SITE_NAME } from '../helpers/runtime'

type GraphNode = {
	'@type': string
}

const AVATAR = 'https://cdn.example.test/me.png'

const hero: HeroSection = {
	kind: 'hero',
	text: "I'm Ada, I build engines.",
	avatar: AVATAR,
	links: [
		{ name: 'Town', url: undefined, icon: 'location' },
		{ name: 'Site', url: 'https://site.example.test', icon: 'globe' },
		{ name: 'Bad', url: 'javascript:alert(1)', icon: undefined }
	]
}

function loop(overrides: Partial<LoopSection>): LoopSection {
	return {
		kind: 'loop',
		title: 'Section',
		type: 'blog',
		quantity: 3,
		disposition: 'grid',
		...overrides
	}
}

describe('home components', () => {
	describe('Hero', () => {
		it('puts the avatar between the lead and a tight comma', async () => {
			const html = await render(Hero, { section: hero })
			expect(html).toContain(AVATAR)
			expect(html).toMatch(/<\/span><img[^>]*\/?><span[^>]*>,<\/span>/)
			expect(html).toContain('I build engines.')
		})

		it('never prints the avatar token', async () => {
			const html = await render(Hero, {
				section: { ...hero, text: 'Ada {avatar}, builds.', avatar: undefined }
			})
			expect(html).not.toContain('{avatar}')
			expect(html).toMatch(/Ada<\/span><span[^>]*>,<\/span>/)
		})

		it('renders no image and no stray comma gap without an avatar', async () => {
			const html = await render(Hero, { section: { ...hero, avatar: undefined } })
			expect(html).not.toContain('<img')
			expect(html).toMatch(/I&#39;m Ada<\/span><span[^>]*>,<\/span>/)
		})

		it('renders plain text for links without a usable url', async () => {
			const html = await render(Hero, { section: hero })
			expect(html).toContain('href="https://site.example.test"')
			expect(html).toContain('Town')
			expect(html).not.toContain('javascript:')
			expect(html).not.toContain('undefined')
		})
	})

	describe('Loop', () => {
		const urls = makeUrls()
		const entries = [
			makeEntry({ slug: 'one', title: 'First entry' }),
			makeEntry({ slug: 'two', title: 'Second entry' })
		]

		function renderLoop(section: LoopSection, items = entries) {
			return render(Loop, { section, entries: items, locale: 'en', urls })
		}

		it('renders nothing when there are no entries', async () => {
			expect((await renderLoop(loop({}), [])).trim()).toBe('')
		})

		it('renders the title and a card per entry for blog grids', async () => {
			const html = await renderLoop(loop({ title: 'Latest posts' }))
			expect(html).toContain('Latest posts')
			expect(html).toContain('First entry')
			expect(html).toContain('Second entry')
			expect(html.match(/<article/g)).toHaveLength(2)
			expect(html.match(/Read article/g)).toHaveLength(2)
		})

		it('renders rows for list dispositions and for cases', async () => {
			const list = await renderLoop(loop({ disposition: 'list' }))
			expect(list).toContain('First entry')
			expect(list).toContain('<ol')
			expect(list).not.toContain('<article')
			const cases = await renderLoop(loop({ type: 'cases', disposition: 'grid' }))
			expect(cases).toContain('Second entry')
			expect(cases).toContain('<ol')
			expect(cases).not.toContain('<article')
		})

		it('renders project cards with the default link label for project grids', async () => {
			const html = await renderLoop(loop({ type: 'projects' }))
			expect(html.match(/View project/g)).toHaveLength(2)
			expect(html).not.toContain('Read article')
		})

		it('omits the heading when the title is empty', async () => {
			const html = await renderLoop(loop({ title: '' }))
			expect(html).not.toContain('<h2')
			expect(html).toContain('First entry')
		})
	})

	describe('WhatsappFloat', () => {
		it('links to the given url with a label', async () => {
			const html = await render(WhatsappFloat, {
				href: 'https://wa.me/15550100',
				locale: 'en'
			})
			expect(html).toContain('href="https://wa.me/15550100"')
			expect(html).toContain('aria-label="Chat on WhatsApp"')
		})
	})

	describe('HomeView', () => {
		it('describes the site and its person in one JSON-LD graph', async () => {
			const html = await render(
				HomeView,
				{ page: { kind: 'homepage', locale: 'es', homepage: undefined } },
				fakeLocals({ locale: 'es' })
			)
			const json = html.match(
				/<script[^>]*>({"@context":"https:\/\/schema.org","@graph".*?})<\/script>/
			)
			const graph = JSON.parse(json?.[1] ?? '{}')['@graph']
			expect(graph.map((node: GraphNode) => node['@type'])).toEqual(['WebSite', 'Person'])
			expect(graph[0]).toMatchObject({ name: SITE_NAME, inLanguage: 'es' })
		})
	})
})
