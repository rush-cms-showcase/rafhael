import { describe, expect, it } from 'vitest'
import { setDisclosure } from '../../src/lib/disclosure'

class FakeTarget {
	attributes = new Map<string, string>()

	setAttribute(name: string, value: string): void {
		this.attributes.set(name, value)
	}
}

const LABELS = { open: 'Open menu', close: 'Close menu' }

describe('setDisclosure', () => {
	it('reflects the open state and switches the label to close', () => {
		const target = new FakeTarget()
		setDisclosure(target, true, LABELS)
		expect(target.attributes.get('aria-expanded')).toBe('true')
		expect(target.attributes.get('aria-label')).toBe('Close menu')
	})

	it('reflects the closed state and switches the label back to open', () => {
		const target = new FakeTarget()
		setDisclosure(target, true, LABELS)
		setDisclosure(target, false, LABELS)
		expect(target.attributes.get('aria-expanded')).toBe('false')
		expect(target.attributes.get('aria-label')).toBe('Open menu')
	})

	it('leaves the label alone when none are given', () => {
		const target = new FakeTarget()
		setDisclosure(target, true)
		expect(target.attributes.get('aria-expanded')).toBe('true')
		expect(target.attributes.has('aria-label')).toBe(false)
	})
})
