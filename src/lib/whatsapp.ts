import { withQuery } from './query'
import { text } from './values'

export function whatsappUrl(
	number: string | undefined,
	message: string | undefined
): string | undefined {
	const digits = (number ?? '').replace(/\D/g, '')
	if (digits === '') {
		return undefined
	}
	const body = text(message)
	const base = `https://wa.me/${digits}`
	return body === '' ? base : withQuery(base, { text: body })
}
