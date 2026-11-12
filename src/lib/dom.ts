export function required<T extends Element>(root: ParentNode, selector: string): T {
	const element = root.querySelector<T>(selector)
	if (element === null) {
		throw new Error(`missing ${selector}`)
	}
	return element
}

export function fillTemplate(template: HTMLTemplateElement): HTMLElement {
	return required<HTMLElement>(document.importNode(template.content, true), '*')
}
