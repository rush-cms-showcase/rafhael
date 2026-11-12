import type { Media } from '@rushcms/client'
import { Window } from 'happy-dom'
import ProjectGallery from '../../src/components/project-gallery.astro'
import { mountGallery } from '../../src/scripts/gallery'
import { render } from './container'

type EventInit = Record<string, unknown>

export type MountedGallery = {
	window: Window
	root: HTMLElement
	slides: HTMLElement[]
	thumbs: HTMLElement[]
	thumbList: HTMLElement | null
	dialog: HTMLDialogElement
	stage: HTMLElement
	counter: HTMLElement
	live: HTMLElement
	click: (target: Element, init?: EventInit) => void
	press: (key: string, init?: EventInit) => void
	swipe: (dx: number, dy?: number) => void
}

function pick(root: HTMLElement, selector: string): HTMLElement[] {
	return [...root.querySelectorAll<HTMLElement>(selector)]
}

function only(root: HTMLElement, selector: string): HTMLElement {
	const [element] = pick(root, selector)
	if (element === undefined) {
		throw new Error(`missing ${selector}`)
	}
	return element
}

export async function mountedGallery(media: Media[]): Promise<MountedGallery> {
	const window = new Window()
	window.document.body.innerHTML = await render(ProjectGallery, {
		media,
		title: 'Engine',
		locale: 'en'
	})
	const root = only(window.document.body as unknown as HTMLElement, '[data-gallery]')
	mountGallery(root)
	const stage = only(root, '[data-gallery-stage]')
	const dispatch = (target: Element, event: Event) => target.dispatchEvent(event)
	return {
		window,
		root,
		slides: pick(root, '[data-gallery-slide]'),
		thumbs: pick(root, '[data-gallery-thumb]'),
		thumbList: root.querySelector<HTMLElement>('[data-gallery-thumbs]'),
		dialog: only(root, '[data-gallery-dialog]') as HTMLDialogElement,
		stage,
		counter: only(root, '[data-gallery-counter]'),
		live: only(root, '[data-gallery-live]'),
		click: (target, init = {}) =>
			dispatch(
				target,
				new window.MouseEvent('click', {
					bubbles: true,
					cancelable: true,
					...init
				}) as never
			),
		press: (key, init = {}) =>
			dispatch(
				only(root, '[data-gallery-dialog]'),
				new window.KeyboardEvent('keydown', {
					key,
					bubbles: true,
					cancelable: true,
					...init
				}) as never
			),
		swipe: (dx, dy = 0) => {
			const pointer = (type: string, x: number) =>
				dispatch(
					stage,
					new window.MouseEvent(type, { bubbles: true, clientX: x, clientY: 0 }) as never
				)
			pointer('pointerdown', 100)
			dispatch(
				stage,
				new window.MouseEvent('pointerup', {
					bubbles: true,
					clientX: 100 + dx,
					clientY: dy
				}) as never
			)
			dispatch(
				stage.querySelector('img') ?? stage,
				new window.MouseEvent('click', { bubbles: true, cancelable: true }) as never
			)
		}
	}
}
