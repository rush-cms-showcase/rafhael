import { getNavigation } from '@rushcms/astro'
import type { RushContext } from '@rushcms/astro'
import { optional } from '@rushcms/client'
import { linkable } from './locale'
import type { LinkableNavigation } from './locale'

export const MAIN_NAVIGATION = 'main-nav'
export const LEGAL_NAVIGATION = 'legal-nav'

export async function siteNavigation(
	context: RushContext,
	key: string
): Promise<LinkableNavigation[]> {
	return linkable((await optional(getNavigation(context, key))) ?? [])
}
