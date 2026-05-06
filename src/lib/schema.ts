interface WebPageSchemaOptions {
	url: string
	title: string
	description: string
	image?: string
}

interface ServiceSchemaOptions {
	serviceType: string
	providerName: string
	description: string
	currency: string
	price: string
	url: string
}

interface FAQSchemaItem {
	question: string
	answer: string
}

export function buildWebPageSchema(options: WebPageSchemaOptions) {
	return {
		'@type': 'WebPage' as const,
		'@id': options.url,
		url: options.url,
		name: options.title,
		description: options.description,
		...(options.image && { image: options.image }),
	}
}

export function buildServiceSchema(options: ServiceSchemaOptions) {
	return {
		'@type': 'Service' as const,
		serviceType: options.serviceType,
		provider: {
			'@type': 'Person' as const,
			name: options.providerName,
		},
		description: options.description,
		offers: {
			'@type': 'Offer' as const,
			priceCurrency: options.currency,
			price: options.price,
			url: options.url,
		},
	}
}

export function buildFAQSchema(items: FAQSchemaItem[]) {
	return {
		'@type': 'FAQPage' as const,
		mainEntity: items.map((item) => ({
			'@type': 'Question' as const,
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer' as const,
				text: item.answer,
			},
		})),
	}
}

export function buildSchemaGraph(...schemas: Record<string, unknown>[]) {
	return {
		'@context': 'https://schema.org',
		'@graph': schemas,
	}
}
