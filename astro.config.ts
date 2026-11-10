import { existsSync } from 'node:fs'
import node from '@astrojs/node'
import rush from '@rushcms/astro'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import Icons from 'unplugin-icons/vite'
import { URL_CONFIG } from './src/lib/routing'
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
			...URL_CONFIG,
			trustedProxies: 1
		})
	]
})
