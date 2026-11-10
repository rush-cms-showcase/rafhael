import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { beforeAll, describe, expect, it } from 'vitest'
import Hero from '../../src/components/home/hero.astro'
import Loop from '../../src/components/home/loop.astro'
import WhatsappFloat from '../../src/components/whatsapp-float.astro'
import type { HeroSection, LoopSection } from '../../src/lib/home-sections'
import { makeEntry } from '../helpers/make-entry'
import { makeUrls } from '../helpers/make-urls'

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
	let container: AstroContainer

	beforeAll(async () => {
		container = await AstroContainer.create()
	})

	describe('Hero', () => {
		it('puts the avatar between the lead and a tight comma', async () => {
			const html = await container.renderToString(Hero, { props: { section: hero } })
			expect(html).toContain(AVATAR)
			expect(html).toMatch(/<\/span><img[^>]*\/?><span[^>]*>,<\/span>/)
			expect(html).toContain('I build engines.')
		})

		it('never prints the avatar token', async () => {
			const html = await container.renderToString(Hero, {
				props: { section: { ...hero, text: 'Ada {avatar}, builds.', avatar: undefined } }
			})
			expect(html).not.toContain('{avatar}')
			expect(html).toMatch(/Ada<\/span><span[^>]*>,<\/span>/)
		})

		it('renders no image and no stray comma gap without an avatar', async () => {
			const html = await container.renderToString(Hero, {
				props: { section: { ...hero, avatar: undefined } }
			})
			expect(html).not.toContain('<img')
			expect(html).toMatch(/I&#39;m Ada<\/span><span[^>]*>,<\/span>/)
		})

		it('renders plain text for links without a usable url', async () => {
			const html = await container.renderToString(Hero, { props: { section: hero } })
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

		function render(section: LoopSection, items = entries) {
			return container.renderToString(Loop, {
				props: { section, entries: items, locale: 'en', urls }
			})
		}

		it('renders nothing when there are no entries', async () => {
			expect((await render(loop({}), [])).trim()).toBe('')
		})

		it('renders the title and a card per entry for blog grids', async () => {
			const html = await render(loop({ title: 'Latest posts' }))
			expect(html).toContain('Latest posts')
			expect(html).toContain('First entry')
			expect(html).toContain('Second entry')
			expect(html).toContain('lg:grid-cols-3')
		})

		it('renders rows for list dispositions and for cases', async () => {
			const list = await render(loop({ disposition: 'list' }))
			expect(list).toContain('First entry')
			expect(list).not.toContain('grid-cols')
			const cases = await render(loop({ type: 'cases', disposition: 'grid' }))
			expect(cases).toContain('Second entry')
			expect(cases).not.toContain('grid-cols')
		})

		it('renders two columns for project grids with the default link label', async () => {
			const html = await render(loop({ type: 'projects' }))
			expect(html).toContain('md:grid-cols-2')
			expect(html).toContain('View project')
		})

		it('omits the heading when the title is empty', async () => {
			const html = await render(loop({ title: '' }))
			expect(html).not.toContain('<h2')
			expect(html).toContain('First entry')
		})
	})

	describe('WhatsappFloat', () => {
		it('links to the given url with a label', async () => {
			const html = await container.renderToString(WhatsappFloat, {
				props: { href: 'https://wa.me/15550100', label: 'Chat on WhatsApp' }
			})
			expect(html).toContain('href="https://wa.me/15550100"')
			expect(html).toContain('aria-label="Chat on WhatsApp"')
		})
	})
})
