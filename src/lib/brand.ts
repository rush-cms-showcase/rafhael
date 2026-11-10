export type SplitName = {
	first: string
	last: string
}

export function splitName(name: string): SplitName {
	const [first = '', ...rest] = name.trim().split(/\s+/)
	return { first, last: rest.join(' ') }
}
