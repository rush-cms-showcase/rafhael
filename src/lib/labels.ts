import type { LocaleCode } from '@rushcms/client'

export type Labels = {
	skipToContent: string
	search: string
	searchPlaceholder: string
	searchHint: string
	searchEmpty: string
	searchNoResults: string
	searchLoading: string
	searchError: string
	searchResults: string
	searchClose: string
	pages: string
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
	pagination: string
	searchShortcut: string
	notTranslated: string
	notFoundTitle: string
	notFoundText: string
	backHome: string
	emptyCollection: string
	createdBy: string
	poweredBy: string
	github: string
	linkedin: string
}

export type LabelValues = Record<string, string>

const english: Labels = {
	skipToContent: 'Skip to content',
	search: 'Search',
	searchPlaceholder: 'Search posts, cases and projects',
	searchHint: 'Type to search',
	searchEmpty: 'Start typing to find something.',
	searchNoResults: 'No results for',
	searchLoading: 'Loading…',
	searchError: 'Search is unavailable right now.',
	searchResults: 'Search results',
	searchClose: 'Close search',
	pages: 'Pages',
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
	thisTag: 'This tag',
	pagination: 'Pagination',
	searchShortcut: 'Ctrl K',
	notTranslated: 'Not translated yet: shown in {language}.',
	notFoundTitle: 'Page not found',
	notFoundText: 'The page you are looking for does not exist or is no longer available.',
	backHome: 'Back to the home page',
	emptyCollection: 'Nothing has been published here yet.',
	createdBy: 'Created by',
	poweredBy: 'Powered by',
	github: 'GitHub',
	linkedin: 'LinkedIn'
}

const dictionary: Record<string, Labels> = {
	en: english,
	pt_BR: {
		skipToContent: 'Pular para o conteúdo',
		search: 'Buscar',
		searchPlaceholder: 'Buscar artigos, cases e projetos',
		searchHint: 'Digite para buscar',
		searchEmpty: 'Comece a digitar para encontrar algo.',
		searchNoResults: 'Nenhum resultado para',
		searchLoading: 'Carregando…',
		searchError: 'A busca está indisponível no momento.',
		searchResults: 'Resultados da busca',
		searchClose: 'Fechar busca',
		pages: 'Páginas',
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
		thisTag: 'Esta tag',
		pagination: 'Paginação',
		searchShortcut: 'Ctrl K',
		notTranslated: 'Ainda não traduzido: exibido em {language}.',
		notFoundTitle: 'Página não encontrada',
		notFoundText: 'A página que você procura não existe ou não está mais disponível.',
		backHome: 'Voltar para o início',
		emptyCollection: 'Nada foi publicado aqui ainda.',
		createdBy: 'Criado por',
		poweredBy: 'Desenvolvido com',
		github: 'GitHub',
		linkedin: 'LinkedIn'
	},
	es: {
		skipToContent: 'Saltar al contenido',
		search: 'Buscar',
		searchPlaceholder: 'Buscar artículos, casos y proyectos',
		searchHint: 'Escribe para buscar',
		searchEmpty: 'Empieza a escribir para encontrar algo.',
		searchNoResults: 'Sin resultados para',
		searchLoading: 'Cargando…',
		searchError: 'La búsqueda no está disponible ahora.',
		searchResults: 'Resultados de búsqueda',
		searchClose: 'Cerrar búsqueda',
		pages: 'Páginas',
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
		thisTag: 'Esta etiqueta',
		pagination: 'Paginación',
		searchShortcut: 'Ctrl K',
		notTranslated: 'Aún sin traducir: se muestra en {language}.',
		notFoundTitle: 'Página no encontrada',
		notFoundText: 'La página que buscas no existe o ya no está disponible.',
		backHome: 'Volver al inicio',
		emptyCollection: 'Todavía no se ha publicado nada aquí.',
		createdBy: 'Creado por',
		poweredBy: 'Desarrollado con',
		github: 'GitHub',
		linkedin: 'LinkedIn'
	}
}

export function kindLabels(labels: Labels): Record<string, string> {
	return {
		blog: labels.blog,
		cases: labels.cases,
		projects: labels.projects,
		pages: labels.pages
	}
}

export function labelsFor(locale: LocaleCode): Labels {
	return dictionary[locale] ?? english
}

export function formatLabel(template: string, values: LabelValues): string {
	return template.replace(/\{(\w+)\}/g, (token, name: string) => values[name] ?? token)
}
