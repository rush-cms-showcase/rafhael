import { describe, expect, it } from 'vitest'
import { isRecord, optionalText, text, textList } from '../../src/lib/values'

const PADDING = ['', ' ', '  ', '\t', '\n', ' \t\n ']
const CORES = ['', 'a', 'Ada', 'two words', 'ação', '0']
const NON_STRINGS: unknown[] = [undefined, null, 0, 1, true, false, {}, [], ['a'], { a: 1 }]

type Padded = {
	value: string
	core: string
}

const PADDED: Padded[] = PADDING.flatMap((before) =>
	PADDING.flatMap((after) => CORES.map((core) => ({ value: `${before}${core}${after}`, core })))
)

describe('text', () => {
	it('trims every padded string to its core', () => {
		for (const { value, core } of PADDED) {
			expect(text(value)).toBe(core)
		}
	})

	it('is empty for every non-string', () => {
		for (const value of NON_STRINGS) {
			expect(text(value)).toBe('')
		}
	})
})

describe('optionalText', () => {
	it('is the core or undefined when the core is empty', () => {
		for (const { value, core } of PADDED) {
			expect(optionalText(value)).toBe(core === '' ? undefined : core)
		}
		for (const value of NON_STRINGS) {
			expect(optionalText(value)).toBeUndefined()
		}
	})
})

describe('textList', () => {
	it('keeps the non-empty cores of the strings in order', () => {
		const values: unknown[] = [...PADDED.map((item) => item.value), ...NON_STRINGS]
		const cores = PADDED.map((item) => item.core).filter((core) => core !== '')
		expect(textList(values)).toEqual(cores)
	})

	it('is empty for every non-array', () => {
		for (const value of [...NON_STRINGS.filter((item) => !Array.isArray(item)), 'a b']) {
			expect(textList(value)).toEqual([])
		}
	})
})

describe('isRecord', () => {
	it('accepts plain objects only', () => {
		expect(isRecord({})).toBe(true)
		expect(isRecord({ a: 1 })).toBe(true)
		for (const value of [undefined, null, 0, 'a', true, [], ['a']]) {
			expect(isRecord(value)).toBe(false)
		}
	})
})
