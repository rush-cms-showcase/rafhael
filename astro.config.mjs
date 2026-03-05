// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import Icons from 'unplugin-icons/vite'

import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
	site: 'https://rafhael.pro',
	
	build: {
		inlineStylesheets: 'always'
	},

	adapter: vercel({
        webAnalytics: {
            enabled: false
        }
    }),

	vite: {
		plugins: [
			tailwindcss(),
			Icons({
				compiler: 'astro',
				autoInstall: true,
			})
		],
		resolve: {
			conditions: ['development', 'browser']
		},
		build: {
			cssCodeSplit: true,
			cssMinify: 'lightningcss',
			rollupOptions: {
				output: {
					assetFileNames: 'assets/[name].[hash][extname]',
					chunkFileNames: 'chunks/[name].[hash].js',
					entryFileNames: 'entry/[name].[hash].js'
				},
				onwarn(warning, warn) {
					if (warning.code === 'UNUSED_EXTERNAL_IMPORT' && warning.message.includes('@astrojs/internal-helpers')) {
						return
					}
					warn(warning)
				}
			}
		}
	},

	integrations: [
		sitemap({
			filter: (page) =>
				!page.includes('/404') &&
				!/\/blog\/\d+\/$/.test(page) &&
				!/\/br\/blog\/\d+\/$/.test(page) &&
				!/\/categoria\/[^/]+\/\d+\/$/.test(page) &&
				!/\/category\/[^/]+\/\d+\/$/.test(page),
			serialize(item) {
				if (item.url.includes('/fast-website')) {
					item.links = [
						{ lang: 'en', url: item.url },
						{ lang: 'pt-BR', url: item.url.replace('/fast-website', '/br/site-rapido') }
					];
				}
				if (item.url.includes('/br/site-rapido')) {
					item.links = [
						{ lang: 'pt-BR', url: item.url },
						{ lang: 'en', url: item.url.replace('/br/site-rapido', '/fast-website') }
					];
				}
				return item;
			}
		})
	]
})