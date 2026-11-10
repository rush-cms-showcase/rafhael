import type { Entry } from '@rushcms/client'

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

export function bodyOf(entry: Entry): string {
	return typeof entry.data.content === 'string' ? entry.data.content : ''
}
