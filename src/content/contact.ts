import type { IconName } from '@/lib/icons'

interface ContactChannel {
	name: string
	value: string
	href: string
	icon: IconName
	color: string
}

interface ContactLocaleContent {
	title: string
	description: string
	hello: string
	channels: ContactChannel[]
}

export const contactContent: Record<'en' | 'pt_BR', ContactLocaleContent> = {
	en: {
		title: 'Contact Me',
		description: "Choose your preferred channel and let's talk about your project.",
		hello: 'Hello! 👋',
		channels: [
			{
				name: 'WhatsApp (Direct)',
				value: '+55 12 98317 3077',
				href: 'https://wa.me/5512983173077',
				icon: 'whatsapp',
				color: 'hover:border-green-500 hover:text-green-500 hover:bg-green-500/10',
			},
			{
				name: 'E-mail',
				value: 'oi@rafhael.com.br',
				href: 'mailto:oi@rafhael.com.br',
				icon: 'mail',
				color: 'hover:border-primary hover:text-primary hover:bg-primary/10',
			},
			{
				name: 'Telegram',
				value: '@rmarsigli',
				href: 'https://t.me/rmarsigli',
				icon: 'telegram',
				color: 'hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/10',
			},
			{
				name: 'Call Me',
				value: '+55 12 98317 3077',
				href: 'tel:5512983173077',
				icon: 'phone',
				color: 'hover:border-orange-500 hover:text-orange-500 hover:bg-orange-500/10',
			},
		],
	},
	pt_BR: {
		title: 'Fale Comigo',
		description: 'Escolha seu canal preferido e vamos conversar sobre seu projeto.',
		hello: 'Olá! 👋',
		channels: [
			{
				name: 'WhatsApp (Direto)',
				value: '+55 12 98317 3077',
				href: 'https://wa.me/5512983173077',
				icon: 'whatsapp',
				color: 'hover:border-green-500 hover:text-green-500 hover:bg-green-500/10',
			},
			{
				name: 'E-mail',
				value: 'oi@rafhael.com.br',
				href: 'mailto:oi@rafhael.com.br',
				icon: 'mail',
				color: 'hover:border-primary hover:text-primary hover:bg-primary/10',
			},
			{
				name: 'Telegram',
				value: '@rmarsigli',
				href: 'https://t.me/rmarsigli',
				icon: 'telegram',
				color: 'hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/10',
			},
			{
				name: 'Ligar',
				value: '+55 12 98317 3077',
				href: 'tel:5512983173077',
				icon: 'phone',
				color: 'hover:border-orange-500 hover:text-orange-500 hover:bg-orange-500/10',
			},
		],
	},
}

export type ContactContent = typeof contactContent.en
