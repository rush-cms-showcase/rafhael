import { fillTemplate, required } from '../lib/dom'
import { wrapIndex } from '../lib/wrap-index'

const SWIPE_THRESHOLD = 48

const KEY_STEPS = new Map<string, number>([
	['ArrowLeft', -1],
	['ArrowRight', 1]
])

type GalleryElements = {
	slides: HTMLAnchorElement[]
	thumbs: HTMLButtonElement[]
	dialog: HTMLDialogElement
	stage: HTMLElement
	counter: HTMLElement
	templates: HTMLTemplateElement[]
	steps: HTMLButtonElement[]
}

type SwipeStart = {
	x: number
	y: number
}

function collectElements(root: HTMLElement): GalleryElements {
	const dialog = required<HTMLDialogElement>(root, '[data-gallery-dialog]')
	return {
		slides: [...root.querySelectorAll<HTMLAnchorElement>('[data-gallery-slide]')],
		thumbs: [...root.querySelectorAll<HTMLButtonElement>('[data-gallery-thumb]')],
		dialog,
		stage: required<HTMLElement>(dialog, '[data-gallery-stage]'),
		counter: required<HTMLElement>(dialog, '[data-gallery-counter]'),
		templates: [
			...dialog.querySelectorAll<HTMLTemplateElement>('template[data-gallery-large]')
		],
		steps: [...dialog.querySelectorAll<HTMLButtonElement>('[data-gallery-step]')]
	}
}

function isPlainClick(event: MouseEvent): boolean {
	return (
		event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
	)
}

function mountGallery(root: HTMLElement): void {
	const elements = collectElements(root)
	const { dialog, stage, counter, templates } = elements
	const total = templates.length
	const large = new Map<number, HTMLElement>()
	let selected = 0
	let viewed = 0
	let swipe: SwipeStart | undefined
	let swiped = false

	function select(index: number): void {
		selected = index
		elements.slides.forEach((slide, position) => {
			slide.hidden = position !== index
		})
		elements.thumbs.forEach((thumb, position) => {
			if (position === index) {
				thumb.setAttribute('aria-current', 'true')
			} else {
				thumb.removeAttribute('aria-current')
			}
		})
	}

	function largeImage(index: number): HTMLElement | undefined {
		const template = templates[index]
		if (template === undefined) {
			return undefined
		}
		const image = large.get(index) ?? fillTemplate(template)
		large.set(index, image)
		return image
	}

	function show(index: number, direction: number): void {
		viewed = index
		const image = largeImage(index)
		stage.replaceChildren(...(image === undefined ? [] : [image]))
		counter.textContent = `${index + 1} / ${total}`
		if (total > 1) {
			largeImage(wrapIndex(index, total, direction))
		}
	}

	function step(direction: number): void {
		show(wrapIndex(viewed, total, direction), direction)
	}

	function open(index: number): void {
		show(index, 1)
		if (!dialog.open) {
			dialog.showModal()
		}
	}

	elements.slides.forEach((slide, index) => {
		slide.addEventListener('click', (event) => {
			if (isPlainClick(event)) {
				event.preventDefault()
				open(index)
			}
		})
	})
	elements.thumbs.forEach((thumb, index) => {
		thumb.addEventListener('click', () => select(index))
	})
	elements.steps.forEach((button) => {
		button.addEventListener('click', () => step(Number(button.dataset.galleryStep)))
	})
	dialog.addEventListener('keydown', (event) => {
		const direction = KEY_STEPS.get(event.key)
		if (direction !== undefined && total > 1) {
			event.preventDefault()
			step(direction)
		}
	})
	stage.addEventListener('pointerdown', (event) => {
		swipe = { x: event.clientX, y: event.clientY }
		swiped = false
	})
	stage.addEventListener('pointerup', (event) => {
		if (swipe === undefined) {
			return
		}
		const dx = event.clientX - swipe.x
		const dy = event.clientY - swipe.y
		swipe = undefined
		if (Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) && total > 1) {
			swiped = true
			step(dx < 0 ? 1 : -1)
		}
	})
	stage.addEventListener('pointercancel', () => {
		swipe = undefined
	})
	dialog.addEventListener('click', (event) => {
		const target = event.target as Element
		const outside = target === dialog || target === stage
		if ((outside && !swiped) || target.closest('[data-gallery-close]') !== null) {
			dialog.close()
		}
		swiped = false
	})
	dialog.addEventListener('close', () => {
		if (viewed === selected) {
			return
		}
		select(viewed)
		elements.slides[viewed]?.focus({ preventScroll: true })
	})
}

for (const root of document.querySelectorAll<HTMLElement>('[data-gallery]')) {
	mountGallery(root)
}
