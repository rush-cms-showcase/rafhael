export type EntryKind = 'post' | 'case' | 'project' | 'page'

export const ENTRY_WIDTHS: Record<EntryKind, string> = {
	post: 'max-w-4xl',
	case: 'max-w-4xl',
	project: 'max-w-6xl',
	page: 'max-w-3xl'
}
