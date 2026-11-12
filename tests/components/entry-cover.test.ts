import { describe, expect, it } from 'vitest'
import EntryCover from '../../src/components/entry-cover.astro'
import { render } from '../helpers/container'
import { COVER } from '../helpers/fixtures'
import { makeEntry } from '../helpers/make-entry'
import { SITE_NAME } from '../helpers/runtime'

function cover(alt: string, title: string) {
	return render(EntryCover, { entry: makeEntry({ featured_image: { ...COVER, alt }, title }) })
}

describe('EntryCover', () => {
	it('uses the media alt first', async () => {
		expect(await cover('Skyline', 'Queues')).toMatch(/<img[^>]*alt="Skyline"/)
	})

	it('falls back to the entry title', async () => {
		expect(await cover(' ', 'Queues')).toMatch(/<img[^>]*alt="Queues"/)
	})

	it('falls back to the site name without a title', async () => {
		expect(await cover('', '')).toMatch(new RegExp(`<img[^>]*alt="${SITE_NAME}"`))
	})
})
