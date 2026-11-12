import { stepForKey, wrapIndex } from './wrap-index'

export type ShortcutEvent = {
	key: string
	ctrlKey: boolean
	metaKey: boolean
	altKey: boolean
	shiftKey: boolean
}

export function isSearchShortcut(event: ShortcutEvent): boolean {
	return (
		event.key.toLowerCase() === 'k' &&
		(event.ctrlKey || event.metaKey) &&
		!event.altKey &&
		!event.shiftKey
	)
}

export function bindSearchShortcut(target: EventTarget, open: () => void): () => void {
	const listener = (event: Event) => {
		if (isSearchShortcut(event as Event & ShortcutEvent)) {
			event.preventDefault()
			open()
		}
	}
	target.addEventListener('keydown', listener)
	return () => target.removeEventListener('keydown', listener)
}

const ARROW_STEPS = new Map<string, number>([
	['ArrowDown', 1],
	['ArrowUp', -1]
])

export function nextActiveIndex(current: number, count: number, key: string): number {
	const step = stepForKey(ARROW_STEPS, key)
	if (count === 0) {
		return -1
	}
	return step === undefined ? current : wrapIndex(current, count, step)
}
