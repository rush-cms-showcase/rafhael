function filled(value: string | undefined): value is string {
	return value !== undefined && value.trim() !== ''
}

export function mediaAlt(
	alt: string | undefined,
	context: string | undefined,
	siteName: string
): string {
	if (filled(alt)) return alt
	if (filled(context)) return context
	return siteName
}
