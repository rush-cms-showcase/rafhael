import { describe, expect, it } from 'vitest'
import { bindSearchShortcut, isSearchShortcut, nextActiveIndex } from '../../src/lib/search-keys'
import type { ShortcutEvent } from '../../src/lib/search-keys'

function press(key: string, modifiers: Partial<ShortcutEvent> = {}): Event & ShortcutEvent {
	return Object.assign(new Event('keydown', { cancelable: true }), {
		key,
		ctrlKey: false,
		metaKey: false,
		altKey: false,
		shiftKey: false,
		...modifiers
	})
}

describe('isSearchShortcut', () => {
	it('accepts Ctrl+K and Cmd+K in any case', () => {
		expect(isSearchShortcut(press('k', { ctrlKey: true }))).toBe(true)
		expect(isSearchShortcut(press('K', { metaKey: true }))).toBe(true)
	})

	it('rejects a bare K, other keys and extra modifiers', () => {
		expect(isSearchShortcut(press('k'))).toBe(false)
		expect(isSearchShortcut(press('j', { ctrlKey: true }))).toBe(false)
		expect(isSearchShortcut(press('k', { ctrlKey: true, altKey: true }))).toBe(false)
		expect(isSearchShortcut(press('k', { ctrlKey: true, shiftKey: true }))).toBe(false)
	})
})

describe('bindSearchShortcut', () => {
	it('opens on the shortcut, prevents the default and can be unbound', () => {
		const target = new EventTarget()
		let opened = 0
		const unbind = bindSearchShortcut(target, () => {
			opened += 1
		})
		const event = press('k', { ctrlKey: true })
		target.dispatchEvent(event)
		expect(opened).toBe(1)
		expect(event.defaultPrevented).toBe(true)
		target.dispatchEvent(press('k'))
		expect(opened).toBe(1)
		unbind()
		target.dispatchEvent(press('k', { metaKey: true }))
		expect(opened).toBe(1)
	})
})

describe('nextActiveIndex', () => {
	it('moves down and up with wrap-around', () => {
		expect(nextActiveIndex(0, 3, 'ArrowDown')).toBe(1)
		expect(nextActiveIndex(2, 3, 'ArrowDown')).toBe(0)
		expect(nextActiveIndex(0, 3, 'ArrowUp')).toBe(2)
		expect(nextActiveIndex(2, 3, 'ArrowUp')).toBe(1)
	})

	it('starts at the ends from no selection and ignores other keys or empty lists', () => {
		expect(nextActiveIndex(-1, 3, 'ArrowDown')).toBe(0)
		expect(nextActiveIndex(-1, 3, 'ArrowUp')).toBe(2)
		expect(nextActiveIndex(1, 3, 'Home')).toBe(1)
		expect(nextActiveIndex(-1, 0, 'ArrowDown')).toBe(-1)
	})
})
