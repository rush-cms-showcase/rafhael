import { existsSync } from 'node:fs'
import node from '@astrojs/node'
import rush from '@rushcms/astro'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import Icons from 'unplugin-icons/vite'
import { allowedDomain, siteOrigin } from './src/lib/site-env'

if (existsSync('.env')) {
	process.loadEnvFile('.env')
}

const origin = siteOrigin(process.env)

export default defineConfig({
	site: origin.origin,
	output: 'static',
	adapter: node({ mode: 'standalone' }),
	security: {
		allowedDomains: [allowedDomain(origin)]
	},
	vite: {
		plugins: [tailwindcss(), Icons({ compiler: 'astro' })]
	},
	integrations: [
		rush({
			localePaths: { en: '', pt_BR: 'br', es: 'es' },
			routes: {
				blog: '/{locale}/blog/{slug}',
				cases: '/{locale}/cases/{slug}',
				projects: '/{locale}/projects/{slug}',
				pages: '/{locale}/{slug}'
			},
			pageSegments: { en: 'page', pt_BR: 'pagina', es: 'pagina' },
			taxonomies: {
				category: { en: 'category', pt_BR: 'categoria', es: 'categoria' },
				tag: { en: 'tag', pt_BR: 'tag', es: 'etiqueta' }
			},
			trustedProxies: 1
		})
	]
})
