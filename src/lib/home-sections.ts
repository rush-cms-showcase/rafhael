import type { Homepage } from '@rushcms/client'

export type HomepageSection = Homepage['content'][number]

export const LOOP_TYPES = ['blog', 'projects', 'cases'] as const
export const DISPOSITIONS = ['grid', 'list'] as const
export const HERO_ICONS = [
	'globe',
	'github',
	'linkedin',
	'location',
	'envelope',
	'whatsapp',
	'phone'
] as const

export type LoopType = (typeof LOOP_TYPES)[number]
export type Disposition = (typeof DISPOSITIONS)[number]
export type HeroIcon = (typeof HERO_ICONS)[number]
export type LoopLayout = 'posts' | 'projects' | 'rows'

export type HeroLink = {
	name: string
	url: string | undefined
	icon: HeroIcon | undefined
}

export type HeroSection = {
	kind: 'hero'
	text: string
	avatar: string | undefined
	links: HeroLink[]
}

export type LoopSection = {
	kind: 'loop'
	title: string
	type: LoopType
	quantity: number
	disposition: Disposition
}

export type HomeSection = HeroSection | LoopSection

const DEFAULT_QUANTITY = 3

function textOf(value: unknown): string {
	return typeof value === 'string' ? value.trim() : ''
}

function optionalText(value: unknown): string | undefined {
	const text = textOf(value)
	return text === '' ? undefined : text
}

function oneOf<T extends string>(options: readonly T[], value: unknown): T | undefined {
	return options.find((option) => option === value)
}

function quantityOf(value: unknown): number {
	const parsed = typeof value === 'number' ? value : Number.parseInt(textOf(value), 10)
	return Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_QUANTITY
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function heroLinks(value: unknown): HeroLink[] {
	if (!Array.isArray(value)) {
		return []
	}
	return value.filter(isRecord).flatMap((item) => {
		const name = textOf(item.name)
		return name === ''
			? []
			: [{ name, url: optionalText(item.url), icon: oneOf(HERO_ICONS, item.icon) }]
	})
}

function heroSection(values: Record<string, unknown>): HeroSection | undefined {
	const text = textOf(values.text)
	if (text === '') {
		return undefined
	}
	return {
		kind: 'hero',
		text,
		avatar: optionalText(values.avatar),
		links: heroLinks(values.links)
	}
}

function loopSection(values: Record<string, unknown>): LoopSection | undefined {
	const type = oneOf(LOOP_TYPES, values.type)
	const disposition = oneOf(DISPOSITIONS, values.disposition)
	if (type === undefined || disposition === undefined) {
		return undefined
	}
	return {
		kind: 'loop',
		title: textOf(values.title),
		type,
		quantity: quantityOf(values.quantity),
		disposition
	}
}

function sectionOf(section: HomepageSection): HomeSection | undefined {
	const values = isRecord(section.values) ? section.values : {}
	if (section.block === 'hero') {
		return heroSection(values)
	}
	if (section.block === 'loop') {
		return loopSection(values)
	}
	return undefined
}

export function homeSections(content: HomepageSection[]): HomeSection[] {
	return content.flatMap((section) => sectionOf(section) ?? [])
}

export function loopLayout(type: LoopType, disposition: Disposition): LoopLayout {
	if (disposition === 'grid' && type === 'blog') {
		return 'posts'
	}
	if (disposition === 'grid' && type === 'projects') {
		return 'projects'
	}
	return 'rows'
}

export type HeroText = {
	lead: string
	comma: boolean
	rest: string
}

const AVATAR_TOKEN = '{avatar}'

function afterLead(remainder: string): Pick<HeroText, 'comma' | 'rest'> {
	const text = remainder.trim()
	return text.startsWith(',')
		? { comma: true, rest: text.slice(1).trim() }
		: { comma: false, rest: text }
}

export function splitHeroText(text: string): HeroText {
	const token = text.indexOf(AVATAR_TOKEN)
	if (token !== -1) {
		return {
			lead: text.slice(0, token).trim(),
			...afterLead(text.slice(token + AVATAR_TOKEN.length))
		}
	}
	const comma = text.indexOf(',')
	if (comma === -1) {
		return { lead: text.trim(), comma: false, rest: '' }
	}
	return { lead: text.slice(0, comma).trim(), ...afterLead(text.slice(comma)) }
}
