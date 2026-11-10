import type { Entry, Media } from '@rushcms/client'
import type { Labels } from './labels'
import { safeHref } from './safe-href'
import { optionalText, text, textList } from './values'

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

export type ProjectMeta = {
	linkUrl: string | undefined
	linkLabel: string | undefined
}

export function projectMeta(entry: Entry): ProjectMeta {
	return {
		linkUrl: safeHref(text(entry.data.link_url)),
		linkLabel: optionalText(entry.data.link_label)
	}
}
