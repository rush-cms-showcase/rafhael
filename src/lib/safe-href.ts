const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:']

export function safeHref(value: string | undefined): string | undefined {
	if (value === undefined) {
		return undefined
	}
	const url = URL.parse(value)
	return url !== null && ALLOWED_PROTOCOLS.includes(url.protocol) ? value : undefined
}
