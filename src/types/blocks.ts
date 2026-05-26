export type BlockType =
	| 'hero'
	| 'story'
	| 'modules'
	| 'architecture'
	| 'integrations'
	| 'stats'
	| 'roadmap'
	| 'cta'

export interface BaseBlock<T extends BlockType, D> {
	_type: T
	data: D
}

export interface CtaButton {
	label: string
	url: string
	variant?: 'primary' | 'secondary'
	icon?: string
}

export interface HeroBlockData {
	headline: string
	tagline: string
	badges?: string[]
	actions?: CtaButton[]
	command?: {
		text: string
		caption?: string
	}
	background?: string // URL to background image
	logo?: string // URL to logo image
}

export interface StoryBlockData {
	title?: string
	hook: string
	resolution?: string
	callout?: string
}

export interface ModuleItem {
	tag?: string
	title: string
	description: string
	bullets: string[]
	callout?: string
	url?: string
	image?: string
}

export interface ModulesBlockData {
	items: ModuleItem[]
}

export interface ArchitectureItem {
	title: string
	body: string
}

export interface ArchitectureBlockData {
	items: ArchitectureItem[]
}

export interface IntegrationItem {
	name: string
	logo: string
}

export interface IntegrationsBlockData {
	heading: string
	items: IntegrationItem[]
}

export interface StatItem {
	stat: string
	label: string
}

export interface StatsBlockData {
	heading: string
	stats: StatItem[]
	faqs?: {
		question: string
		answer: string
	}[]
}

export interface RoadmapItem {
	title: string
	description: string
	image?: string
	bullets?: string[]
	url?: string
	callout?: string
}

export interface RoadmapBlockData {
	heading?: string
	items: RoadmapItem[]
}

export interface CtaBlockData {
	heading: string
	body: string
	actions: CtaButton[]
	quickStart?: {
		label: string
		code: string
		caption: string
	}
}

export type AnyBlock =
	| BaseBlock<'hero', HeroBlockData>
	| BaseBlock<'story', StoryBlockData>
	| BaseBlock<'modules', ModulesBlockData>
	| BaseBlock<'architecture', ArchitectureBlockData>
	| BaseBlock<'integrations', IntegrationsBlockData>
	| BaseBlock<'stats', StatsBlockData>
	| BaseBlock<'roadmap', RoadmapBlockData>
	| BaseBlock<'cta', CtaBlockData>

export interface DynamicPage {
	page: {
		title: string
		description: string
		og_banner: {
			logo?: string
			title: string
			subtitle: string
		}
	}
	blocks: AnyBlock[]
}

export interface DynamicPageContent {
	en: DynamicPage
	pt_BR: DynamicPage
}
