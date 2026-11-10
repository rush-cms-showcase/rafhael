import type { Homepage } from '@rushcms/client'
import { isRecord, optionalText, text } from './values'

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
export type GridLayout = 'posts' | 'projects'
export type LoopLayout = GridLayout | 'rows'

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

function oneOf<T extends string>(options: readonly T[], value: unknown): T | undefined {
	return options.find((option) => option === value)
}

function quantityOf(value: unknown): number {
	const parsed = typeof value === 'number' ? value : Number.parseInt(text(value), 10)
	return Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_QUANTITY
}

function heroLinks(value: unknown): HeroLink[] {
	if (!Array.isArray(value)) {
		return []
	}
	return value.filter(isRecord).flatMap((item) => {
		const name = text(item.name)
		return name === ''
			? []
			: [{ name, url: optionalText(item.url), icon: oneOf(HERO_ICONS, item.icon) }]
	})
}

function heroSection(values: Record<string, unknown>): HeroSection | undefined {
	const body = text(values.text)
	if (body === '') {
		return undefined
	}
	return {
		kind: 'hero',
		text: body,
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
		title: text(values.title),
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
	const trimmed = remainder.trim()
	return trimmed.startsWith(',')
		? { comma: true, rest: trimmed.slice(1).trim() }
		: { comma: false, rest: trimmed }
}

export function splitHeroText(source: string): HeroText {
	const token = source.indexOf(AVATAR_TOKEN)
	if (token !== -1) {
		return {
			lead: source.slice(0, token).trim(),
			...afterLead(source.slice(token + AVATAR_TOKEN.length))
		}
	}
	const comma = source.indexOf(',')
	if (comma === -1) {
		return { lead: source.trim(), comma: false, rest: '' }
	}
	return { lead: source.slice(0, comma).trim(), ...afterLead(source.slice(comma)) }
}
