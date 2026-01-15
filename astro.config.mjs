// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react'
import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
	build: {
		inlineStylesheets: 'always'
	},

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
		react(),
		partytown({
			config: {
				forward: ['dataLayer.push']
			}
		})
	]
})