// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

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
		plugins: [tailwindcss()],
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
		sitemap()
	]
})