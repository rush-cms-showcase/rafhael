export type DisclosureLabels = {
	open: string
	close: string
}

export type DisclosureTarget = {
	setAttribute(name: string, value: string): void
}

export function setDisclosure(
	target: DisclosureTarget,
	open: boolean,
	labels?: DisclosureLabels
): void {
	target.setAttribute('aria-expanded', String(open))
	if (labels !== undefined) {
		target.setAttribute('aria-label', open ? labels.close : labels.open)
	}
}
