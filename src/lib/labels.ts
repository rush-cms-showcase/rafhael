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
	poweredBy: 'Powered by'
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
		poweredBy: 'Powered by'
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
		poweredBy: 'Powered by'
	}
}

export function labelsFor(locale: LocaleCode): Labels {
	return dictionary[locale] ?? english
}
