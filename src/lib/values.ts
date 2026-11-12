import type { RepeaterItem } from '@rushcms/client'

export function text(value: unknown): string {
	return typeof value === 'string' ? value.trim() : ''
}

export function optionalText(value: unknown): string | undefined {
	const result = text(value)
	return result === '' ? undefined : result
}

export function textList(value: unknown): string[] {
	return Array.isArray(value) ? value.map(text).filter((item) => item !== '') : []
}

export function isRepeaterItem(item: unknown): item is RepeaterItem {
	return typeof item === 'object' && item !== null && '_id' in item
}

export function ownValue(record: Record<string, string>, key: string): string | undefined {
	return Object.hasOwn(record, key) ? record[key] : undefined
}
