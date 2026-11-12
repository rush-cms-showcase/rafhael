import type { Entry, Media } from '@rushcms/client'
import type { Labels } from './labels'
import type { IconComponent } from './icons'
import { linkIcon } from './icons'
import { safeHref } from './safe-href'
import { isRepeaterItem, optionalText, ownValue, text, textList } from './values'

export function entryCover(entry: Entry): Media | undefined {
	return entry.featured_image?.url === undefined ? undefined : entry.featured_image
}

export type CaseMeta = {
	clientName: string
	role: string
	period: string
	stack: string[]
}

export function caseMeta(entry: Entry): CaseMeta {
	return {
		clientName: text(entry.data.client_name),
		role: text(entry.data.role),
		period: text(entry.data.period),
		stack: textList(entry.data.stack)
	}
}

export type CaseFact = {
	label: string
	value: string
}

export function caseFacts(meta: CaseMeta, labels: Labels): CaseFact[] {
	const facts: CaseFact[] = [
		{ label: labels.caseClient, value: meta.clientName },
		{ label: labels.caseRole, value: meta.role },
		{ label: labels.casePeriod, value: meta.period }
	]
	return facts.filter((fact) => fact.value !== '')
}

export type ProjectLink = {
	href: string
	icon: IconComponent
	label: string
}

export type ProjectMeta = {
	gallery: Media[]
	distribution: string[]
	links: ProjectLink[]
}

type DatabaseName = { name: string }

function isDatabaseName(item: unknown): item is DatabaseName {
	return typeof item === 'object' && item !== null && 'name' in item && text(item.name) !== ''
}

function databaseNames(value: unknown): string[] {
	return Array.isArray(value) ? value.filter(isDatabaseName).map((item) => text(item.name)) : []
}

function hostLabel(href: string): string {
	const hostname = URL.parse(href)?.hostname.replace(/^www\./, '')
	return hostname === undefined || hostname === '' ? href : hostname
}

function projectLink(item: unknown, labels: Labels): ProjectLink | undefined {
	if (!isRepeaterItem(item)) {
		return undefined
	}
	const href = safeHref(optionalText(item.url))
	if (href === undefined) {
		return undefined
	}
	const iconName = databaseNames(item.icon)[0] ?? ''
	return {
		href,
		icon: linkIcon(iconName),
		label: ownValue(labels.linkLabels, iconName) ?? hostLabel(href)
	}
}

function projectGallery(entry: Entry): Media[] {
	const media = Object.values(entry.media)
	const urls = new Set(textList(entry.data['image-gallery']))
	return [...urls].flatMap((url) => media.find((item) => item.url === url) ?? [])
}

export function projectMeta(entry: Entry, labels: Labels): ProjectMeta {
	const links = Array.isArray(entry.data.links) ? entry.data.links : []
	return {
		gallery: projectGallery(entry),
		distribution: databaseNames(entry.data['distribution-model']).map(
			(name) => ownValue(labels.distributionLabels, name) ?? name
		),
		links: links.flatMap((item) => projectLink(item, labels) ?? [])
	}
}
