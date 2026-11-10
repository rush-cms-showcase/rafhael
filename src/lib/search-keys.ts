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

export function nextActiveIndex(current: number, count: number, key: string): number {
	if (count === 0) {
		return -1
	}
	if (key === 'ArrowDown') {
		return (current + 1) % count
	}
	if (key === 'ArrowUp') {
		return current <= 0 ? count - 1 : current - 1
	}
	return current
}
