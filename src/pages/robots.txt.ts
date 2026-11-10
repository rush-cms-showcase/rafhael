import type { APIRoute } from 'astro'
import { RUSH_PREVIEW } from 'astro:env/server'
import { absoluteUrl } from '../lib/routing'

export const GET: APIRoute = ({ site }) => {
	const rules = RUSH_PREVIEW ? 'Disallow: /' : 'Allow: /'
	const sitemap = site === undefined ? '' : `\nSitemap: ${absoluteUrl('/sitemap.xml', site)}\n`
	return new Response(`User-agent: *\n${rules}\n${sitemap}`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	})
}
