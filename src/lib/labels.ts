import type { LocaleCode } from '@rushcms/client'

export type Labels = {
	skipToContent: string
	search: string
	openMenu: string
	closeMenu: string
	menu: string
	selectLanguage: string
	rights: string
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
	cases: string
	seeAll: string
	email: string
	phone: string
	whatsappChat: string
	openProject: string
	projects: string
	projectsDescription: string
	breadcrumb: string
	home: string
	thisCase: string
	thisPost: string
	thisProject: string
	thisPage: string
	thisCategory: string
	thisTag: string
}

const english: Labels = {
	skipToContent: 'Skip to content',
	search: 'Search',
	openMenu: 'Open menu',
	closeMenu: 'Close menu',
	menu: 'Menu',
	selectLanguage: 'Select language',
	rights: 'All rights reserved.',
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
	cases: 'Cases',
	seeAll: 'See all',
	email: 'E-mail',
	phone: 'Phone',
	whatsappChat: 'Chat on WhatsApp',
	openProject: 'View project',
	projects: 'Projects',
	projectsDescription: 'Software projects and products.',
	breadcrumb: 'Breadcrumb',
	home: 'Home',
	thisCase: 'This case',
	thisPost: 'This post',
	thisProject: 'This project',
	thisPage: 'This page',
	thisCategory: 'This category',
	thisTag: 'This tag'
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
		cases: 'Cases',
		seeAll: 'Ver todos',
		email: 'E-mail',
		phone: 'Telefone',
		whatsappChat: 'Conversar no WhatsApp',
		openProject: 'Ver projeto',
		projects: 'Projetos',
		projectsDescription: 'Projetos e produtos de software.',
		breadcrumb: 'Trilha de navegação',
		home: 'Início',
		thisCase: 'Este case',
		thisPost: 'Este artigo',
		thisProject: 'Este projeto',
		thisPage: 'Esta página',
		thisCategory: 'Esta categoria',
		thisTag: 'Esta tag'
	},
	es: {
		skipToContent: 'Saltar al contenido',
		search: 'Buscar',
		openMenu: 'Abrir menú',
		closeMenu: 'Cerrar menú',
		menu: 'Menú',
		selectLanguage: 'Seleccionar idioma',
		rights: 'Todos los derechos reservados.',
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
		cases: 'Casos',
		seeAll: 'Ver todos',
		email: 'Correo',
		phone: 'Teléfono',
		whatsappChat: 'Conversar por WhatsApp',
		openProject: 'Ver proyecto',
		projects: 'Proyectos',
		projectsDescription: 'Proyectos y productos de software.',
		breadcrumb: 'Ruta de navegación',
		home: 'Inicio',
		thisCase: 'Este caso',
		thisPost: 'Este artículo',
		thisProject: 'Este proyecto',
		thisPage: 'Esta página',
		thisCategory: 'Esta categoría',
		thisTag: 'Esta etiqueta'
	}
}

export function labelsFor(locale: LocaleCode): Labels {
	return dictionary[locale] ?? english
}
