const WORDS_PER_MINUTE = 200

export function readingTime(markdown: string): number {
	const words = markdown
		.replace(/<[^>]*>/g, ' ')
		.split(/\s+/)
		.filter((word) => word !== '').length
	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}
