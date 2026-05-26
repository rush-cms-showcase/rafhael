import { defineCollection } from 'astro:content'

const openSource = defineCollection({
	loader: async () => []
})

export const collections = {
	'open-source': openSource
}
