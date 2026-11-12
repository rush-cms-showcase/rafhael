import type { LocaleCode, RushUrls } from '@rushcms/client'
import { labelsFor } from './labels'
import type { Labels, TextLabelKey } from './labels'
import { absoluteUrl, collectionHref } from './routing'

export type BreadcrumbKind = 'case' | 'post' | 'project' | 'page' | 'category' | 'tag'

export type BreadcrumbInput = {
	kind: BreadcrumbKind
	locale: LocaleCode
	urls: RushUrls
	title: string
	path: string | undefined
}

export type BreadcrumbLink = {
	label: string
	href: string
}

export type BreadcrumbCurrent = {
	label: string
	title: string
	path: string | undefined
}

export type Breadcrumb = {
	label: string
	home: BreadcrumbLink
	section: BreadcrumbLink | undefined
	current: BreadcrumbCurrent
}

export type BreadcrumbListItem = {
	'@type': 'ListItem'
	position: number
	name: string
	item: string | undefined
}

export type BreadcrumbJsonLd = {
	'@context': 'https://schema.org'
	'@type': 'BreadcrumbList'
	itemListElement: BreadcrumbListItem[]
}

type BreadcrumbNode = {
	name: string
	path: string | undefined
}

type SectionRule = {
	collection: string
	label: TextLabelKey
}

type KindRule = {
	section: SectionRule | undefined
	current: TextLabelKey
}

const BLOG: SectionRule = { collection: 'blog', label: 'blog' }

const RULES: Record<BreadcrumbKind, KindRule> = {
	case: { section: { collection: 'cases', label: 'cases' }, current: 'thisCase' },
	post: { section: BLOG, current: 'thisPost' },
	project: { section: { collection: 'projects', label: 'projects' }, current: 'thisProject' },
	page: { section: undefined, current: 'thisPage' },
	category: { section: BLOG, current: 'thisCategory' },
	tag: { section: BLOG, current: 'thisTag' }
}

function sectionLink(
	rule: SectionRule | undefined,
	input: BreadcrumbInput,
	labels: Labels
): BreadcrumbLink | undefined {
	const href =
		rule === undefined ? undefined : collectionHref(input.urls, rule.collection, input.locale)
	return rule === undefined || href === undefined
		? undefined
		: { label: labels[rule.label], href }
}

export function breadcrumbTrail(input: BreadcrumbInput): Breadcrumb {
	const labels = labelsFor(input.locale)
	const rule = RULES[input.kind]
	return {
		label: labels.breadcrumb,
		home: { label: labels.home, href: input.urls.homepage(input.locale) },
		section: sectionLink(rule.section, input, labels),
		current: { label: labels[rule.current], title: input.title, path: input.path }
	}
}

export function breadcrumbJsonLd(trail: Breadcrumb, site: URL): BreadcrumbJsonLd {
	const links: BreadcrumbLink[] =
		trail.section === undefined ? [trail.home] : [trail.home, trail.section]
	const named: BreadcrumbNode[] = [
		...links.map((link): BreadcrumbNode => ({ name: link.label, path: link.href })),
		{ name: trail.current.title, path: trail.current.path }
	]
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: named.map((entry, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: entry.name,
			item: entry.path === undefined ? undefined : absoluteUrl(entry.path, site)
		}))
	}
}

export function jsonLdScript(value: unknown): string {
	return JSON.stringify(value).replace(/</g, '\\u003c')
}
