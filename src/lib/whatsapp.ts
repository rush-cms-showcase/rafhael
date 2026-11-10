import { withQuery } from './query'

export function whatsappUrl(
	number: string | undefined,
	text: string | undefined
): string | undefined {
	const digits = (number ?? '').replace(/\D/g, '')
	if (digits === '') {
		return undefined
	}
	const message = (text ?? '').trim()
	const base = `https://wa.me/${digits}`
	return message === '' ? base : withQuery(base, { text: message })
}
