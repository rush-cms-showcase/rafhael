import { describe, expect, it } from 'vitest'
import { makeMedia } from '../helpers/make-entry'
import { mountedGallery } from '../helpers/mount-gallery'

const MEDIA = ['photo', 'shot', 'scan'].map(makeMedia)

function hiddenFlags(slides: HTMLElement[]): boolean[] {
	return slides.map((slide) => slide.hidden === true)
}

function pressed(thumbs: HTMLElement[]): (string | null)[] {
	return thumbs.map((thumb) => thumb.getAttribute('aria-pressed'))
}

describe('gallery script', () => {
	it('reveals the thumbnail list on mount', async () => {
		const gallery = await mountedGallery(MEDIA)
		expect(gallery.thumbList?.hidden).toBe(false)
	})

	it('syncs the main slide and the pressed thumbnail on thumbnail click', async () => {
		const gallery = await mountedGallery(MEDIA)
		expect(pressed(gallery.thumbs)).toEqual(['true', 'false', 'false'])
		gallery.click(gallery.thumbs[2]!)
		expect(hiddenFlags(gallery.slides)).toEqual([true, true, false])
		expect(pressed(gallery.thumbs)).toEqual(['false', 'false', 'true'])
	})

	it('opens the lightbox on the selected image and announces it', async () => {
		const gallery = await mountedGallery(MEDIA)
		gallery.click(gallery.thumbs[1]!)
		gallery.click(gallery.slides[1]!)
		expect(gallery.dialog.open).toBe(true)
		expect(gallery.counter.textContent).toBe('2 / 3')
		expect(gallery.stage.querySelector('img')?.getAttribute('src')).toContain('shot')
		expect(gallery.live.textContent).toBe('2 / 3, Engine, image 2 of 3')
	})

	it('keeps modified clicks as normal link clicks', async () => {
		const gallery = await mountedGallery(MEDIA)
		gallery.click(gallery.slides[0]!, { ctrlKey: true })
		expect(gallery.dialog.open).toBe(false)
	})

	it('wraps with ArrowRight and ArrowLeft', async () => {
		const gallery = await mountedGallery(MEDIA)
		gallery.click(gallery.slides[0]!)
		gallery.press('ArrowLeft')
		expect(gallery.counter.textContent).toBe('3 / 3')
		gallery.press('ArrowRight')
		expect(gallery.counter.textContent).toBe('1 / 3')
		gallery.press('ArrowRight')
		expect(gallery.counter.textContent).toBe('2 / 3')
	})

	it.each(['altKey', 'ctrlKey', 'metaKey', 'shiftKey'])(
		'ignores arrows with %s',
		async (modifier) => {
			const gallery = await mountedGallery(MEDIA)
			gallery.click(gallery.slides[0]!)
			gallery.press('ArrowRight', { [modifier]: true })
			expect(gallery.counter.textContent).toBe('1 / 3')
		}
	)

	it('syncs the main slide to the last viewed image on close', async () => {
		const gallery = await mountedGallery(MEDIA)
		gallery.click(gallery.slides[0]!)
		gallery.press('ArrowRight')
		gallery.press('ArrowRight')
		gallery.dialog.close()
		expect(hiddenFlags(gallery.slides)).toEqual([true, true, false])
		expect(pressed(gallery.thumbs)).toEqual(['false', 'false', 'true'])
	})

	it('steps on swipe without closing', async () => {
		const gallery = await mountedGallery(MEDIA)
		gallery.click(gallery.slides[0]!)
		gallery.swipe(-80)
		expect(gallery.counter.textContent).toBe('2 / 3')
		expect(gallery.dialog.open).toBe(true)
		gallery.swipe(80)
		expect(gallery.counter.textContent).toBe('1 / 3')
		expect(gallery.dialog.open).toBe(true)
	})

	it('closes on empty areas and the close button but not on the image or counter', async () => {
		const gallery = await mountedGallery(MEDIA)
		const surfaces = [
			gallery.dialog,
			gallery.stage,
			gallery.root.querySelector<HTMLElement>('[data-gallery-dismiss].flex-col')!,
			gallery.counter.parentElement!,
			gallery.root.querySelector<HTMLElement>('[data-gallery-close]')!
		]
		for (const surface of surfaces) {
			gallery.click(gallery.slides[0]!)
			gallery.click(surface)
			expect(gallery.dialog.open).toBe(false)
		}
		gallery.click(gallery.slides[0]!)
		gallery.click(gallery.stage.querySelector('img')!)
		gallery.click(gallery.counter)
		expect(gallery.dialog.open).toBe(true)
	})

	it('does not step with a single image', async () => {
		const gallery = await mountedGallery([MEDIA[0]!])
		expect(gallery.thumbList).toBeNull()
		gallery.click(gallery.slides[0]!)
		gallery.press('ArrowRight')
		gallery.swipe(-80)
		expect(gallery.counter.textContent).toBe('1 / 1')
		expect(gallery.dialog.open).toBe(true)
	})
})
