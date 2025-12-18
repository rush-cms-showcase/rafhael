export interface Block {
	type: string
	data: Record<string, any>
}

export interface RichTextBlock extends Block {
	type: 'richtext'
	data: {
		content: TipTapDocument
	}
}

export interface CodeBlock extends Block {
	type: 'code'
	data: {
		code: string
		language: string
		filename?: string | null
		show_line_numbers: boolean
		highlight_lines: boolean
	}
}

export interface ImageBlock extends Block {
	type: 'image'
	data: {
		image: MediaData
		caption?: string
		alt?: string
		width?: string
		alignment?: string
	}
}

export interface MediaData {
	id: number
	name: string
	file_name: string
	mime_type: string
	size: number
	url: string
	thumb?: string
	preview?: string
}

export interface TipTapDocument {
	type: 'doc'
	content: TipTapNode[]
}

export interface TipTapNode {
	type: string
	attrs?: Record<string, any>
	content?: TipTapNode[]
	text?: string
	marks?: TipTapMark[]
}

export interface TipTapMark {
	type: string
	attrs?: Record<string, any>
}
