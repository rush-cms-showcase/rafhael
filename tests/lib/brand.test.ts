import { describe, expect, it } from 'vitest'
import { splitName } from '../../src/lib/brand'

describe('splitName', () => {
	it('splits the first word from the rest', () => {
		expect(splitName('Ada Lovelace King')).toEqual({ first: 'Ada', last: 'Lovelace King' })
	})

	it('handles a single word and extra spaces', () => {
		expect(splitName('  Ada ')).toEqual({ first: 'Ada', last: '' })
	})
})
