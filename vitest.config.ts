import { getViteConfig } from 'astro/config'
import { defineConfig } from 'vitest/config'

const testConfig = defineConfig({
	test: {
		include: ['tests/**/*.test.ts']
	}
})

export default getViteConfig(testConfig, { configFile: false })
