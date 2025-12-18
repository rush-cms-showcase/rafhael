import type { TipTapDocument, TipTapNode, TipTapMark } from './types'

export function tiptapToHtml(doc: TipTapDocument): string {
	if (!doc || !doc.content) {
		return ''
	}

	return doc.content.map(node => nodeToHtml(node)).join('')
}

function nodeToHtml(node: TipTapNode): string {
	switch (node.type) {
		case 'paragraph':
			return `<p>${renderContent(node)}</p>`

		case 'heading':
			const level = node.attrs?.level || 1
			return `<h${level}>${renderContent(node)}</h${level}>`

		case 'hardBreak':
			return '<br />'

		case 'text':
			return renderText(node)

		case 'bulletList':
			return `<ul>${renderContent(node)}</ul>`

		case 'orderedList':
			return `<ol>${renderContent(node)}</ol>`

		case 'listItem':
			return `<li>${renderContent(node)}</li>`

		case 'blockquote':
			return `<blockquote>${renderContent(node)}</blockquote>`

		case 'codeBlock':
			const language = node.attrs?.language || 'plaintext'
			const code = node.content?.[0]?.text || ''
			return `<pre><code class="language-${language}">${escapeHtml(code)}</code></pre>`

		case 'horizontalRule':
			return '<hr />'

		default:
			return renderContent(node)
	}
}

function renderContent(node: TipTapNode): string {
	if (!node.content) {
		return ''
	}

	return node.content.map(child => nodeToHtml(child)).join('')
}

function renderText(node: TipTapNode): string {
	if (!node.text) {
		return ''
	}

	let html = escapeHtml(node.text)

	if (node.marks && node.marks.length > 0) {
		html = applyMarks(html, node.marks)
	}

	return html
}

function applyMarks(text: string, marks: TipTapMark[]): string {
	let result = text

	for (const mark of marks) {
		switch (mark.type) {
			case 'bold':
				result = `<strong>${result}</strong>`
				break

			case 'italic':
				result = `<em>${result}</em>`
				break

			case 'code':
				result = `<code>${result}</code>`
				break

			case 'strike':
				result = `<s>${result}</s>`
				break

			case 'underline':
				result = `<u>${result}</u>`
				break

			case 'link':
				const href = mark.attrs?.href || '#'
				const target = mark.attrs?.target || '_self'
				result = `<a href="${escapeHtml(href)}" target="${target}">${result}</a>`
				break

			case 'highlight':
				const color = mark.attrs?.color || 'yellow'
				result = `<mark style="background-color: ${color}">${result}</mark>`
				break
		}
	}

	return result
}

function escapeHtml(text: string): string {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	}

	return text.replace(/[&<>"']/g, char => map[char] || char)
}
