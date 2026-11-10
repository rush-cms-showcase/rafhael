import type { Media, Tag } from '@rushcms/client'

export const SITE = new URL('https://site.example.test')

export const SITE_ORIGIN = SITE.origin

export const BLOG = { id: 'blog', slug: 'blog', name: 'Blog' }

export const CATEGORY: Tag = {
	id: 'c1',
	type: 'category',
	name: 'Engineering',
	slug: 'engineering',
	entry_count: 1
}

export const TAG: Tag = {
	id: 't1',
	type: 'tag',
	name: 'Engineering',
	slug: 'engineering',
	entry_count: 1
}

export const COVER: Media = {
	url: 'https://media.example.test/cover/master',
	alt: 'Cover',
	width: 1200,
	height: 675
}
