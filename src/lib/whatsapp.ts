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
	return message === ''
		? base
		: `${base}?text=${encodeURIComponent(message).replaceAll('%20', '+')}`
}
