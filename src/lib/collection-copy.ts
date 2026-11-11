import type { CollectionRef, LocaleCode, RushUrls } from '@rushcms/client'
import { kindLabels, labelsFor } from './labels'
import type { Labels } from './labels'

export type CollectionCopy = {
	title: string
	description: string | undefined
}

const DESCRIPTIONS: Record<string, keyof Labels> = {
	blog: 'blogDescription',
	cases: 'casesDescription',
	projects: 'projectsDescription'
}

export function collectionCopy(
	urls: RushUrls,
	collection: CollectionRef & { name: string },
	locale: LocaleCode
): CollectionCopy {
	const labels = labelsFor(locale)
	const titles = kindLabels(labels)
	const key = urls
		.collectionKeys(collection)
		.find((candidate) => Object.hasOwn(titles, candidate))
	const description = key === undefined ? undefined : DESCRIPTIONS[key]
	return {
		title: key === undefined ? collection.name : (titles[key] ?? collection.name),
		description: description === undefined ? undefined : labels[description]
	}
}
