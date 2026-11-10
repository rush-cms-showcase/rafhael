import { toBcp47 } from '@rushcms/client'
import type { LocaleCode } from '@rushcms/client'

const ENGLISH: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
const NUMERIC: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }

export function formatDate(value: string, locale: LocaleCode): string {
	const date = new Date(value)
	if (Number.isNaN(date.getTime())) {
		return ''
	}
	const tag = locale === 'en' ? 'en-US' : toBcp47(locale)
	const options = locale === 'en' ? ENGLISH : NUMERIC
	return new Intl.DateTimeFormat(tag, { ...options, timeZone: 'UTC' }).format(date)
}
