import { toBcp47 } from '@rushcms/client'
import type { Alternate, LocaleCode, NavigationLink } from '@rushcms/client'

export type LanguageLink = {
	locale: LocaleCode
	code: string
	hreflang: string
	url: string
}

export type LinkableNavigation = NavigationLink & { href: string }

const languageCodes: Record<string, string> = { en: 'EN', pt_BR: 'BR', es: 'ES' }

export function languageName(locale: LocaleCode): string {
	const tag = toBcp47(locale)
	const name = new Intl.DisplayNames([tag], { type: 'language' }).of(tag) ?? tag
	return name.charAt(0).toLocaleUpperCase(tag) + name.slice(1)
}

export function formatDate(value: string, locale: LocaleCode): string {
	return new Intl.DateTimeFormat(toBcp47(locale), { dateStyle: 'long' }).format(new Date(value))
}

export function languageCode(locale: LocaleCode): string {
	return languageCodes[locale] ?? locale.toUpperCase()
}

export function languageLinks(homepages: Alternate[], translations: Alternate[]): LanguageLink[] {
	return homepages.map((home) => ({
		locale: home.locale,
		code: languageCode(home.locale),
		hreflang: home.hreflang,
		url: translations.find((translation) => translation.locale === home.locale)?.url ?? home.url
	}))
}

export function linkable(links: NavigationLink[]): LinkableNavigation[] {
	return links.flatMap((link) => (link.href === undefined ? [] : [{ ...link, href: link.href }]))
}
