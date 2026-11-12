import type { Media } from '@rushcms/client'
import { describe, expect, it } from 'vitest'
import ProjectGallery from '../../src/components/project-gallery.astro'
import { render } from '../helpers/container'
import { makeMedia } from '../helpers/make-entry'

function gallery(media: Media[]) {
	return render(ProjectGallery, { media, title: 'Engine', locale: 'en' })
}

function count(html: string, marker: string): number {
	return html.split(marker).length - 1
}

describe('project gallery', () => {
	const photo = makeMedia('photo')
	const shot = makeMedia('shot')
	const scan = makeMedia('scan')

	it('renders nothing without images', async () => {
		expect(await gallery([])).not.toContain('data-gallery')
	})

	it('renders one image as a link to the full media without a thumbnail row', async () => {
		const html = await gallery([photo])
		expect(html).toContain(`href="${photo.url}"`)
		expect(count(html, 'data-gallery-slide')).toBe(1)
		expect(html).not.toContain('data-gallery-thumbs')
		expect(html).not.toContain('data-gallery-step')
		expect(count(html, '<template data-gallery-large')).toBe(1)
	})

	it('renders thumbnails with the first one current and the others hidden', async () => {
		const html = await gallery([photo, shot, scan])
		const thumbs = html.match(/<button [^>]*data-gallery-thumb [^>]*>/g) ?? []
		expect(thumbs).toHaveLength(3)
		expect(thumbs[0]).toContain('aria-pressed="true"')
		expect(thumbs[1]).toContain('aria-pressed="false"')
		expect(thumbs[0]).toContain('aria-label="Show image 1 of 3"')
		expect(count(html, 'aria-pressed="true"')).toBe(1)
		expect(html).toMatch(/<ul data-gallery-thumbs hidden/)
		expect(html).toContain('aria-label="Engine — Gallery"')
		expect(count(html, 'data-gallery-slide hidden')).toBe(2)
		expect(count(html, '<template data-gallery-large')).toBe(3)
		expect(html).toContain('data-gallery-step="-1"')
		expect(html).toContain('aria-label="Previous image"')
		expect(html).toContain('1 / 3')
	})

	it('uses the media alt and falls back to a numbered localized label', async () => {
		const html = await gallery([
			{ ...photo, alt: 'Dashboard view' },
			shot,
			{ ...scan, alt: ' ' }
		])
		expect(html).toContain('alt="Dashboard view"')
		expect(html).toContain('alt="Engine, image 2 of 3"')
		expect(html).toContain('alt="Engine, image 3 of 3"')
		const portuguese = await render(ProjectGallery, {
			media: [photo],
			title: 'Motor',
			locale: 'pt_BR'
		})
		expect(portuguese).toContain('alt="Motor, imagem 1 de 1"')
	})

	it('gives every thumbnail the alt of its image', async () => {
		const html = await gallery([{ ...photo, alt: 'Dashboard view' }, shot, scan])
		const thumbs = html.match(/<button [^>]*data-gallery-thumb [\s\S]*?<\/button>/g) ?? []
		expect(thumbs).toHaveLength(3)
		expect(thumbs[0]).toContain('alt="Dashboard view"')
		expect(thumbs[1]).toContain('alt="Engine, image 2 of 3"')
		expect(thumbs[2]).toContain('alt="Engine, image 3 of 3"')
		expect(html).not.toContain('alt=""')
	})

	it('loads only the first main image eagerly', async () => {
		const html = await gallery([photo, shot])
		expect(count(html, 'fetchpriority="high"')).toBe(1)
		expect(html.indexOf('fetchpriority="high"')).toBeLessThan(html.indexOf(shot.url))
	})
})
