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
	seeAll: string
	email: string
	phone: string
	whatsappChat: string
	openProject: string
	allProjects: string
	projects: string
	projectsDescription: string
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
	seeAll: 'See all',
	email: 'E-mail',
	phone: 'Phone',
	whatsappChat: 'Chat on WhatsApp',
	openProject: 'View project',
	allProjects: 'All projects',
	projects: 'Projects',
	projectsDescription: 'Software projects and products.'
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
		seeAll: 'Ver todos',
		email: 'E-mail',
		phone: 'Telefone',
		whatsappChat: 'Conversar no WhatsApp',
		openProject: 'Ver projeto',
		allProjects: 'Todos os projetos',
		projects: 'Projetos',
		projectsDescription: 'Projetos e produtos de software.'
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
		seeAll: 'Ver todos',
		email: 'Correo',
		phone: 'Teléfono',
		whatsappChat: 'Conversar por WhatsApp',
		openProject: 'Ver proyecto',
		allProjects: 'Todos los proyectos',
		projects: 'Proyectos',
		projectsDescription: 'Proyectos y productos de software.'
	}
}

export function labelsFor(locale: LocaleCode): Labels {
	return dictionary[locale] ?? english
}
