interface NotFoundLocaleContent {
	title: string
	description: string
	metaDescription: string
	backToHome: string
	readBlog: string
	homeLink: string
	blogLink: string
}

export const notFoundContent: Record<'en' | 'pt_BR', NotFoundLocaleContent> = {
	en: {
		title: 'Page not found',
		description: 'The content you are looking for is not accessible or has been moved.',
		metaDescription: 'The page you are looking for does not exist.',
		backToHome: 'Back to Home',
		readBlog: 'Read Blog',
		homeLink: '/',
		blogLink: '/blog',
	},
	pt_BR: {
		title: 'Página não encontrada',
		description: 'O conteúdo que você procurou não está acessível ou foi movido.',
		metaDescription: 'A página que você está procurando não existe.',
		backToHome: 'Voltar para o Início',
		readBlog: 'Ver Blog',
		homeLink: '/br',
		blogLink: '/br/blog',
	},
}

export type NotFoundContent = typeof notFoundContent.en
