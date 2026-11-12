export function wrapIndex(current: number, count: number, step: number): number {
	if (count <= 0) {
		return -1
	}
	const from = current < 0 && step < 0 ? 0 : current
	return (((from + step) % count) + count) % count
}
