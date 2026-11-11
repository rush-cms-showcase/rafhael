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
