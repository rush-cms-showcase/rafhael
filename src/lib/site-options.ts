import { optional } from '@rushcms/client'
import type { SiteOptionGroup } from '@rushcms/client'
import { isRecord, optionalText } from './values'

export const SITE_OPTIONS_GROUP = 'opcoes-do-site'

export type SiteOptions = {
	contactEmail: string | undefined
	contactGithub: string | undefined
	contactLinkedin: string | undefined
	contactPhone: string | undefined
	whatsappNumber: string | undefined
	whatsappText: string | undefined
	logoUrl: string | undefined
	bannerUrl: string | undefined
	blogDescription: string | undefined
	projectsDescription: string | undefined
}

export type ContactKind = 'github' | 'linkedin' | 'email' | 'phone'

export type ContactLink = {
	kind: ContactKind
	href: string
}

export type SiteOptionsReader = {
	get(slug: string): Promise<SiteOptionGroup>
}

function optionText(group: SiteOptionGroup | undefined, field: string): string | undefined {
	return optionalText(group?.values[field])
}

function optionImage(group: SiteOptionGroup | undefined, field: string): string | undefined {
	const value = group?.values[field]
	const url = optionalText(isRecord(value) ? value.url : value)
	return url !== undefined && /^https?:\/\//i.test(url) ? url : undefined
}

export function siteOptionsFrom(group: SiteOptionGroup | undefined): SiteOptions {
	return {
		contactEmail: optionText(group, 'contact_email'),
		contactGithub: optionText(group, 'contact_github'),
		contactLinkedin: optionText(group, 'contact_linkedin'),
		contactPhone: optionText(group, 'contact_phone'),
		whatsappNumber: optionText(group, 'whatsapp_number'),
		whatsappText: optionText(group, 'whatsapp_text'),
		logoUrl: optionImage(group, 'site_logo'),
		bannerUrl: optionImage(group, 'site_banner'),
		blogDescription: optionText(group, 'blog_description'),
		projectsDescription: optionText(group, 'projects_description')
	}
}

export function contactLinks(options: SiteOptions): ContactLink[] {
	const links: ContactLink[] = []
	if (options.contactGithub !== undefined) {
		links.push({ kind: 'github', href: options.contactGithub })
	}
	if (options.contactLinkedin !== undefined) {
		links.push({ kind: 'linkedin', href: options.contactLinkedin })
	}
	if (options.contactEmail !== undefined) {
		links.push({ kind: 'email', href: `mailto:${options.contactEmail}` })
	}
	if (options.contactPhone !== undefined) {
		links.push({ kind: 'phone', href: `tel:${options.contactPhone.replace(/[^\d+]/g, '')}` })
	}
	return links
}

export async function loadSiteOptions(reader: SiteOptionsReader): Promise<SiteOptions> {
	return siteOptionsFrom(await optional(reader.get(SITE_OPTIONS_GROUP)))
}
