/// <reference types="unplugin-icons/types/astro" />

interface ImportMetaEnv {
	readonly GTAG?: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
