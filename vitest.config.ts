import { getViteConfig } from 'astro/config'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vitest/config'

const testConfig = defineConfig({
	plugins: [Icons({ compiler: 'astro' })],
	test: {
		include: ['tests/**/*.test.ts']
	}
})

export default getViteConfig(testConfig, { configFile: false })
