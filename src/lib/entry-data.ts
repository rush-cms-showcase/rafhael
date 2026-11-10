import type { Entry } from '@rushcms/client'
import type { Labels } from './labels'
import { safeHref } from './safe-href'

export type CaseMeta = {
	clientName: string
	role: string
	period: string
	stack: string[]
}

function textOf(value: unknown): string {
	return typeof value === 'string' ? value.trim() : ''
}

function listOf(value: unknown): string[] {
	return Array.isArray(value) ? value.map(textOf).filter((item) => item !== '') : []
}

export function caseMeta(entry: Entry): CaseMeta {
	return {
		clientName: textOf(entry.data.client_name),
		role: textOf(entry.data.role),
		period: textOf(entry.data.period),
		stack: listOf(entry.data.stack)
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
	const label = textOf(entry.data.link_label)
	return {
		linkUrl: safeHref(textOf(entry.data.link_url)),
		linkLabel: label === '' ? undefined : label
	}
}
