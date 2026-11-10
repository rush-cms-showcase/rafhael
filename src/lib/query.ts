export type QueryParams = Record<string, string>

export function withQuery(base: string, params: QueryParams): string {
	return `${base}?${new URLSearchParams(params).toString()}`
}
