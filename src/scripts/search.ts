import { groupResults } from '../lib/search-index'
import type { SearchItem } from '../lib/search-index'
import { bindSearchShortcut, nextActiveIndex } from '../lib/search-keys'
import type { Search } from '../lib/search-engine'

type KindLabels = Record<string, string>

type SearchState = 'idle' | 'loading' | 'error' | 'none' | 'results'

type SearchElements = {
	dialog: HTMLDialogElement
	input: HTMLInputElement
	results: HTMLElement
	statuses: HTMLElement[]
	queryEcho: HTMLElement
	groupTemplate: HTMLTemplateElement
	optionTemplate: HTMLTemplateElement
}

function required<T extends Element>(root: ParentNode, selector: string): T {
	const element = root.querySelector<T>(selector)
	if (element === null) {
		throw new Error(`search dialog is missing ${selector}`)
	}
	return element
}

function collectElements(dialog: HTMLDialogElement): SearchElements {
	return {
		dialog,
		input: required<HTMLInputElement>(dialog, '#search-input'),
		results: required<HTMLElement>(dialog, '#search-results'),
		statuses: [...dialog.querySelectorAll<HTMLElement>('[data-status]')],
		queryEcho: required<HTMLElement>(dialog, '[data-query]'),
		groupTemplate: required<HTMLTemplateElement>(dialog, '#search-group-template'),
		optionTemplate: required<HTMLTemplateElement>(dialog, '#search-option-template')
	}
}

function fillTemplate(template: HTMLTemplateElement): HTMLElement {
	return required<HTMLElement>(template.content, '*').cloneNode(true) as HTMLElement
}

function mountSearch(dialog: HTMLDialogElement): void {
	const elements = collectElements(dialog)
	const kindLabels = JSON.parse(dialog.dataset.kindLabels ?? '{}') as KindLabels
	const indexUrl = dialog.dataset.indexUrl ?? ''
	let search: Promise<Search> | undefined
	let options: HTMLElement[] = []
	let active = -1

	function showState(state: SearchState): void {
		for (const status of elements.statuses) {
			status.hidden = status.dataset.status !== state
		}
		elements.results.hidden = state !== 'results'
		elements.input.setAttribute('aria-expanded', String(state === 'results'))
	}

	function setActive(index: number): void {
		active = index
		options.forEach((option, position) => {
			option.setAttribute('aria-selected', String(position === index))
		})
		const current = options[index]
		if (current === undefined) {
			elements.input.removeAttribute('aria-activedescendant')
			return
		}
		elements.input.setAttribute('aria-activedescendant', current.id)
		current.scrollIntoView({ block: 'nearest' })
	}

	function renderOption(item: SearchItem, position: number): HTMLElement {
		const option = fillTemplate(elements.optionTemplate)
		option.id = `search-option-${position}`
		option.setAttribute('href', item.url)
		option.setAttribute('aria-selected', 'false')
		required(option, '[data-option-title]').textContent = item.title
		const excerpt = required<HTMLElement>(option, '[data-option-excerpt]')
		excerpt.textContent = item.excerpt
		excerpt.hidden = item.excerpt === ''
		option.addEventListener('mousemove', () => {
			if (active !== position) {
				setActive(position)
			}
		})
		return option
	}

	function renderResults(results: SearchItem[]): void {
		elements.results.replaceChildren()
		options = []
		for (const group of groupResults(results)) {
			const section = fillTemplate(elements.groupTemplate)
			const title = required<HTMLElement>(section, '[data-group-title]')
			title.id = `search-group-${group.kind}`
			title.textContent = kindLabels[group.kind] ?? group.kind
			section.setAttribute('aria-labelledby', title.id)
			for (const item of group.items) {
				const option = renderOption(item, options.length)
				options.push(option)
				section.append(option)
			}
			elements.results.append(section)
		}
		setActive(options.length > 0 ? 0 : -1)
	}

	async function loadSearch(): Promise<Search> {
		const [{ createSearch }, response] = await Promise.all([
			import('../lib/search-engine'),
			fetch(indexUrl)
		])
		if (!response.ok) {
			throw new Error(`search index answered ${response.status}`)
		}
		return createSearch((await response.json()) as SearchItem[])
	}

	function ensureSearch(): Promise<Search> {
		search ??= loadSearch().catch((error: unknown) => {
			search = undefined
			throw error
		})
		return search
	}

	async function update(): Promise<void> {
		const query = elements.input.value
		if (query.trim() === '') {
			renderResults([])
			showState('idle')
			return
		}
		showState('loading')
		const run = await ensureSearch().catch(() => undefined)
		if (run === undefined) {
			showState('error')
			return
		}
		if (query !== elements.input.value) {
			return
		}
		const results = run(query)
		elements.queryEcho.textContent = `“${query.trim()}”`
		renderResults(results)
		showState(results.length > 0 ? 'results' : 'none')
	}

	function open(): void {
		if (!dialog.open) {
			dialog.showModal()
		}
		elements.input.focus()
		void ensureSearch().catch(() => undefined)
	}

	elements.input.addEventListener('input', () => void update())
	elements.input.addEventListener('keydown', (event) => {
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault()
			setActive(nextActiveIndex(active, options.length, event.key))
		}
		const current = options[active]
		if (event.key === 'Enter' && current !== undefined) {
			event.preventDefault()
			current.click()
		}
	})
	dialog.addEventListener('click', (event) => {
		if (event.target === dialog || (event.target as Element).closest('[data-search-close]')) {
			dialog.close()
		}
	})
	dialog.addEventListener('close', () => {
		elements.input.value = ''
		renderResults([])
		showState('idle')
	})

	document.getElementById('search-trigger')?.addEventListener('click', open)
	bindSearchShortcut(document, open)
}

const dialog = document.getElementById('search-dialog')
if (dialog instanceof HTMLDialogElement) {
	mountSearch(dialog)
}
