import { existsSync } from 'node:fs'
import rush from '@rushcms/astro'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import Icons from 'unplugin-icons/vite'
import { URL_CONFIG } from './src/lib/routing'
import { siteOrigin } from './src/lib/site-env'

if (existsSync('.env')) {
	process.loadEnvFile('.env')
}

const origin = siteOrigin(process.env)

export default defineConfig({
	site: origin.origin,
	output: 'static',
	vite: {
		plugins: [tailwindcss(), Icons({ compiler: 'astro' })]
	},
	integrations: [
		rush({
			...URL_CONFIG,
			forms: false,
			trustedProxies: 0
		})
	]
})
