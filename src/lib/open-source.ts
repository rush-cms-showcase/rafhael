import type { DynamicPageContent, HeroBlockData } from '@/types/blocks'

export interface ProjectMeta {
	slug: string
	title: string
	description: string
	logo?: string
}

export function extractProjectMeta(
	module: Record<string, unknown>,
	filepath: string,
	locale: 'en' | 'pt_BR'
): ProjectMeta | null {
	const slug = filepath.split('/').pop()?.replace('.ts', '')
	if (!slug) return null

	const contentKey = Object.keys(module).find(
		key => !!(module[key] as DynamicPageContent | null)?.en &&
			!!(module[key] as DynamicPageContent | null)?.pt_BR
	)
	if (!contentKey) return null

	const content = module[contentKey] as DynamicPageContent
	if (!content?.en?.blocks) return null

	const localeData = content[locale]
	const heroBlock = localeData.blocks.find(b => b._type === 'hero')
	const heroData = heroBlock?.data as HeroBlockData | undefined
	const logo = localeData.page.og_banner?.logo || heroData?.logo

	return {
		slug,
		title: localeData.page.title,
		description: localeData.page.description,
		logo
	}
}
