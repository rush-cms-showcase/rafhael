import type { LocaleCode } from '@rushcms/client'

export type Labels = {
	skipToContent: string
	search: string
	openMenu: string
	closeMenu: string
	menu: string
	selectLanguage: string
	rights: string
	createdBy: string
	poweredBy: string
	blog: string
	blogDescription: string
	allCategories: string
	readArticle: string
	minRead: string
	previous: string
	next: string
	tags: string
	shareOnX: string
	shareOnLinkedin: string
	shareOnWhatsapp: string
	copyLink: string
	caseClient: string
	caseRole: string
	casePeriod: string
	caseStack: string
	allCases: string
	previousPage: string
	nextPage: string
}

const english: Labels = {
	skipToContent: 'Skip to content',
	search: 'Search',
	openMenu: 'Open menu',
	closeMenu: 'Close menu',
	menu: 'Menu',
	selectLanguage: 'Select language',
	rights: 'All rights reserved.',
	createdBy: 'Created by',
	poweredBy: 'Powered by',
	blog: 'Blog',
	blogDescription: 'Articles about software development, architecture and technology.',
	allCategories: 'All',
	readArticle: 'Read article',
	minRead: 'min read',
	previous: 'Previous',
	next: 'Next',
	tags: 'Tags',
	shareOnX: 'Share on X',
	shareOnLinkedin: 'Share on LinkedIn',
	shareOnWhatsapp: 'Share on WhatsApp',
	copyLink: 'Copy link',
	caseClient: 'Client',
	caseRole: 'Role',
	casePeriod: 'Period',
	caseStack: 'Stack',
	allCases: 'All cases',
	previousPage: 'Previous',
	nextPage: 'Next'
}

const dictionary: Record<string, Labels> = {
	en: english,
	pt_BR: {
		skipToContent: 'Pular para o conteúdo',
		search: 'Buscar',
		openMenu: 'Abrir menu',
		closeMenu: 'Fechar menu',
		menu: 'Menu',
		selectLanguage: 'Selecionar idioma',
		rights: 'Todos os direitos reservados.',
		createdBy: 'Criado por',
		poweredBy: 'Powered by',
		blog: 'Blog',
		blogDescription: 'Artigos sobre desenvolvimento, arquitetura e tecnologia.',
		allCategories: 'Todos',
		readArticle: 'Ler artigo',
		minRead: 'min de leitura',
		previous: 'Anterior',
		next: 'Próxima',
		tags: 'Tags',
		shareOnX: 'Compartilhar no X',
		shareOnLinkedin: 'Compartilhar no LinkedIn',
		shareOnWhatsapp: 'Compartilhar no WhatsApp',
		copyLink: 'Copiar link',
		caseClient: 'Cliente',
		caseRole: 'Função',
		casePeriod: 'Período',
		caseStack: 'Stack',
		allCases: 'Todos os cases',
		previousPage: 'Anterior',
		nextPage: 'Próxima'
	},
	es: {
		skipToContent: 'Saltar al contenido',
		search: 'Buscar',
		openMenu: 'Abrir menú',
		closeMenu: 'Cerrar menú',
		menu: 'Menú',
		selectLanguage: 'Seleccionar idioma',
		rights: 'Todos los derechos reservados.',
		createdBy: 'Creado por',
		poweredBy: 'Powered by',
		blog: 'Blog',
		blogDescription: 'Artículos sobre desarrollo, arquitectura y tecnología.',
		allCategories: 'Todos',
		readArticle: 'Leer artículo',
		minRead: 'min de lectura',
		previous: 'Anterior',
		next: 'Siguiente',
		tags: 'Etiquetas',
		shareOnX: 'Compartir en X',
		shareOnLinkedin: 'Compartir en LinkedIn',
		shareOnWhatsapp: 'Compartir en WhatsApp',
		copyLink: 'Copiar enlace',
		caseClient: 'Cliente',
		caseRole: 'Rol',
		casePeriod: 'Período',
		caseStack: 'Stack',
		allCases: 'Todos los casos',
		previousPage: 'Anterior',
		nextPage: 'Siguiente'
	}
}

export function labelsFor(locale: LocaleCode): Labels {
	return dictionary[locale] ?? english
}
