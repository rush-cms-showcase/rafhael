export function socialImageTag(banner: string | undefined, allowed: boolean): string | undefined {
	return allowed ? banner : undefined
}
