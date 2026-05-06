import type { ProductHeroContent } from '@/components/blocks/hero/product-hero.astro'
import type { ModulesGridContent } from '@/components/blocks/modules-grid.astro'

export interface MktMaestroContent {
	hero: ProductHeroContent
	modules: ModulesGridContent
}

const en: MktMaestroContent = {
	hero: {
		title: 'Marketing',
		accent: 'Maestro',
		tagline: 'Self-hosted Marketing Control Room. Multi-Tenant MMS with Google Ads, Meta Instagram & Facebook, automations, and an MCP server. One Docker command away.',
		repoUrl: 'https://github.com/rafhael/mkt-maestro',
		actions: [
			{ label: 'View Repository', icon: 'github', url: 'https://github.com/rafhael/mkt-maestro', variant: 'primary' },
			{ label: 'Read Docs', icon: 'book', url: '/open-source/mkt-maestro/docs', variant: 'secondary' },
		],
		badges: ['v0.1-alpha', 'MIT License', 'Multi-language', 'Docker ready']
	},
	modules: {
		title: 'Six modules,',
		italicWord: 'One database',
		lede: 'Tenants are first-class. Drafts move through a real workflow. Campaigns deploy to Google Ads with one call. Reports write themselves.',
		items: [
			{
				tag: 'social',
				title: 'Social',
				desc: 'With drafts, review, approved, scheduled and published status control. Calendar planner with Meta Graph publishing for Facebook or Instagram.',
				bullets: ['Workflow with RBAC', 'Media on R2/S3', 'Carousel support'],
				icon: 'calendar',
				accent: true
			},
			{
				tag: 'google-ads',
				title: 'Google Ads',
				desc: 'Local drafts deploy to live API. Negatives, budgets, schedules, extensions.',
				bullets: ['Live + draft mode', 'Bulk negatives', 'Budget pacing'],
				icon: 'chart',
				accent: true
			},
			{
				tag: 'monitoring',
				title: 'Monitoring',
				desc: 'Daily metrics collection. Threshold alerts on CPA, conversions, impression share, budget pacing — WARN/CRITICAL inbox.',
				bullets: ['Cron + on-demand', 'Read-state inbox', 'Per-tenant rules'],
				icon: 'shield',
				accent: true
			},
			{
				tag: 'reports',
				title: 'Reports',
				desc: 'Markdown reports auto-typed by slug. LLM-summarized executive overview. Print-to-PDF, auto-emailed via automations.',
				bullets: ['Markdown source', 'LLM summaries', 'Scheduled delivery'],
				icon: 'file',
				accent: true
			},
			{
				tag: 'integrations',
				title: 'Integrations Hub',
				desc: 'Pluggable provider system. Each integration is a Go struct that registers a schema — the UI renders the setup modal from it.',
				bullets: ['Google Ads · Meta · R2/S3', 'Anthropic · OpenAI · Groq · Gemini', 'And a lot more!'],
				icon: 'plug',
				accent: true
			},
			{
				tag: 'automations',
				title: 'Automations',
				desc: 'Cron jobs configured from the UI. Email reports, collect metrics, publish posts — replaces hand-edited crontabs.',
				bullets: ['Visual cron builder', 'Run history + logs', 'Typed email templates'],
				icon: 'clock',
				accent: true
			}
		]
	}
}

const pt_BR: MktMaestroContent = {
	hero: {
		title: 'Marketing',
		accent: 'Maestro',
		tagline: 'Sala de controle de marketing self-hosted. MMS multi-tenant com Google Ads, Meta, automações e um servidor MCP. A um comando Docker de distância.',
		repoUrl: 'https://github.com/rafhael/rush-maestro',
		actions: [
			{ label: 'Star no GitHub', icon: 'star', url: 'https://github.com/rafhael/rush-maestro', variant: 'primary' },
			{ label: 'Ver Repositório', icon: 'github', url: 'https://github.com/rafhael/rush-maestro', variant: 'secondary' }
		],
		command: { text: 'docker compose up', icon: 'terminal' },
		badges: ['v0.1 · pre-release', 'Apache 2.0', 'self-hosted', 'EN · pt-BR']
	},
	modules: {
		title: 'Seis módulos,',
		italicWord: 'Um banco de dados',
		lede: 'Tenants são prioridade. Drafts fluem por um workflow real. Campanhas publicadas no Google Ads com um clique. Relatórios que se escrevem sozinhos.',
		items: [
			{
				tag: 'social',
				title: 'Social',
				desc: 'Com controle de rascunho, revisão, aprovado, agendado e publicado. Calendário com publicação via Meta Graph para Facebook ou Instagram.',
				bullets: ['Workflow com RBAC', 'Mídia em R2/S3', 'Suporte a carrossel'],
				icon: 'calendar',
				accent: true
			},
			{
				tag: 'google-ads',
				title: 'Google Ads',
				desc: 'Rascunhos locais publicados na API live. Negativas, orçamentos, cronogramas, extensões.',
				bullets: ['Modo Live + Rascunho', 'Negativas em massa', 'Ritmo de orçamento'],
				icon: 'chart',
				accent: true
			},
			{
				tag: 'monitoring',
				title: 'Monitoramento',
				desc: 'Coleta diária de métricas. Alertas de limite em CPA, conversões, impression share, ritmo de orçamento — inbox de AVISO/CRÍTICO.',
				bullets: ['Cron + sob demanda', 'Inbox com estado de leitura', 'Regras por tenant'],
				icon: 'shield',
				accent: true
			},
			{
				tag: 'reports',
				title: 'Relatórios',
				desc: 'Relatórios Markdown tipados automaticamente por slug. Visão geral executiva resumida por IA. Imprimir para PDF, enviado automaticamente via automações.',
				bullets: ['Fonte Markdown', 'Resumos por IA (LLM)', 'Entrega agendada'],
				icon: 'file',
				accent: true
			},
			{
				tag: 'integrations',
				title: 'Central de Integrações',
				desc: 'Sistema de provedores plugável. Cada integração é uma struct Go que registra um esquema — a UI renderiza o modal de configuração a partir dele.',
				bullets: ['Google Ads · Meta · R2/S3', 'Anthropic · OpenAI · Groq · Gemini', 'E muito mais!'],
				icon: 'plug',
				accent: true
			},
			{
				tag: 'automations',
				title: 'Automações',
				desc: 'Jobs cron configurados pela UI. Relatórios por e-mail, coleta de métricas, publicação de posts — substitui crontabs editados manualmente.',
				bullets: ['Construtor visual de cron', 'Histórico de execução + logs', 'Templates de e-mail tipados'],
				icon: 'clock',
				accent: true
			}
		]
	}
}

export const mktMaestroContent: { pt_BR: MktMaestroContent; en: MktMaestroContent } = {
	pt_BR,
	en
}