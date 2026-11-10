import { getRush, getUrls } from '@rushcms/astro'
import type { APIRoute, GetStaticPaths } from 'astro'
import { LOCALE_PATHS } from '../../lib/locale'
import { buildSearchIndex, collectSearchEntries } from '../../lib/search-index'

export const getStaticPaths: GetStaticPaths = () =>
	Object.keys(LOCALE_PATHS).map((code) => ({ params: { code } }))

export const GET: APIRoute = async (context) => {
	const urls = getUrls(context)
	const locale = urls.locales.find((candidate) => candidate === context.params.code)
	if (locale === undefined) {
		return new Response(null, { status: 404 })
	}
	const entries = await collectSearchEntries(getRush(context), urls, locale)
	return Response.json(buildSearchIndex(entries, urls, locale))
}
