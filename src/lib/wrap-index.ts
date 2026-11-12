export function wrapIndex(current: number, count: number, step: number): number {
	if (count <= 0) {
		return -1
	}
	const from = current < 0 && step < 0 ? 0 : current
	return (((from + step) % count) + count) % count
}

export function stepForKey(steps: ReadonlyMap<string, number>, key: string): number | undefined {
	return steps.get(key)
}
