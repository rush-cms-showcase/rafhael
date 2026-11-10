import { describe, expect, it } from 'vitest'
import { homeSections, loopLayout, splitHeroText } from '../../src/lib/home-sections'
import type { HomepageSection } from '../../src/lib/home-sections'

function loop(values: Record<string, unknown>): HomepageSection {
	return { block: 'loop', values }
}

const hero: HomepageSection = {
	block: 'hero',
	id: 'a',
	values: {
		text: 'Hello, I build things.',
		avatar: 'https://cdn.example.test/me.png',
		links: [
			{ _id: '1', name: 'Site', url: 'https://example.test', icon: 'globe' },
			{ _id: '2', name: 'Town', url: '', icon: 'location' },
			{ _id: '3', name: 'Odd', url: 'https://odd.example.test', icon: 'unknown' }
		]
	}
}

describe('homeSections', () => {
	it('keeps the order the CMS returns', () => {
		const sections = homeSections([
			loop({ title: 'A', type: 'blog', quantity: '3', disposition: 'grid' }),
			hero,
			loop({ title: 'B', type: 'cases', quantity: '2', disposition: 'list' })
		])
		expect(sections.map((section) => section.kind)).toEqual(['loop', 'hero', 'loop'])
	})

	it('drops removed blocks and unknown block slugs', () => {
		const sections = homeSections([
			{ block: null, values: {} },
			{ block: 'gone', values: { text: 'x' } },
			hero
		])
		expect(sections).toHaveLength(1)
		expect(sections[0]?.kind).toBe('hero')
	})

	it('parses the hero and its links', () => {
		const [section] = homeSections([hero])
		expect(section).toEqual({
			kind: 'hero',
			text: 'Hello, I build things.',
			avatar: 'https://cdn.example.test/me.png',
			links: [
				{ name: 'Site', url: 'https://example.test', icon: 'globe' },
				{ name: 'Town', url: undefined, icon: 'location' },
				{ name: 'Odd', url: 'https://odd.example.test', icon: undefined }
			]
		})
	})

	it('drops a hero without text and tolerates a missing avatar and links', () => {
		expect(homeSections([{ block: 'hero', values: { text: '  ' } }])).toEqual([])
		const [section] = homeSections([{ block: 'hero', values: { text: 'Hi' } }])
		expect(section).toEqual({ kind: 'hero', text: 'Hi', avatar: undefined, links: [] })
	})

	it('reads the quantity as a number', () => {
		const [section] = homeSections([
			loop({ title: 'A', type: 'projects', quantity: '8', disposition: 'grid' })
		])
		expect(section).toEqual({
			kind: 'loop',
			title: 'A',
			type: 'projects',
			quantity: 8,
			disposition: 'grid'
		})
	})

	it('falls back to a default quantity when it is not a positive integer', () => {
		for (const quantity of ['', 'many', '0', '-2', undefined, null]) {
			const [section] = homeSections([
				loop({ title: 'A', type: 'blog', quantity, disposition: 'grid' })
			])
			expect(section).toMatchObject({ kind: 'loop', quantity: 3 })
		}
	})

	it('drops loops with an unknown type or disposition', () => {
		const sections = homeSections([
			loop({ title: 'A', type: 'videos', quantity: '3', disposition: 'grid' }),
			loop({ title: 'B', type: 'blog', quantity: '3', disposition: 'carousel' }),
			loop({ title: 'C', quantity: '3', disposition: 'grid' })
		])
		expect(sections).toEqual([])
	})
})

describe('loopLayout', () => {
	it('picks a renderer for every type and disposition', () => {
		expect(loopLayout('blog', 'grid')).toBe('posts')
		expect(loopLayout('projects', 'grid')).toBe('projects')
		expect(loopLayout('cases', 'grid')).toBe('rows')
		for (const type of ['blog', 'projects', 'cases'] as const) {
			expect(loopLayout(type, 'list')).toBe('rows')
		}
	})
})

describe('splitHeroText', () => {
	it('splits the lead from the rest at the first comma', () => {
		expect(splitHeroText("I'm Ada, I build things, well.")).toEqual({
			lead: "I'm Ada",
			comma: true,
			rest: 'I build things, well.'
		})
	})

	it('keeps everything as the lead when there is no comma', () => {
		expect(splitHeroText('Just a sentence.')).toEqual({
			lead: 'Just a sentence.',
			comma: false,
			rest: ''
		})
	})

	it('splits at the avatar token and keeps the comma that follows it', () => {
		expect(splitHeroText('Hello! I am Ada {avatar}, I build things.')).toEqual({
			lead: 'Hello! I am Ada',
			comma: true,
			rest: 'I build things.'
		})
		expect(splitHeroText('Ada {avatar} builds things.')).toEqual({
			lead: 'Ada',
			comma: false,
			rest: 'builds things.'
		})
	})
})
