import type { Entry, FieldValues, LocaleCode } from '@rushcms/client'
import { describe, expect, it } from 'vitest'
import { caseFacts, caseMeta, projectMeta } from '../../src/lib/entry-data'
import { Icons } from '../../src/lib/icons'
import { labelsFor } from '../../src/lib/labels'
import { makeEntry, makeMedia } from '../helpers/make-entry'
import { makeDatabaseItem, makeProjectLink } from '../helpers/make-project'

describe('caseMeta', () => {
	it('reads the case fields', () => {
		const entry = makeEntry({
			data: {
				client_name: ' Acme ',
				role: 'Lead',
				period: '2024',
				stack: ['Go', ' Astro ', '']
			}
		})
		expect(caseMeta(entry)).toEqual({
			clientName: 'Acme',
			role: 'Lead',
			period: '2024',
			stack: ['Go', 'Astro']
		})
	})

	it('returns empty values for missing or mistyped fields', () => {
		expect(caseMeta(makeEntry({ data: { client_name: 4, stack: 'Go' } }))).toEqual({
			clientName: '',
			role: '',
			period: '',
			stack: []
		})
	})
})

describe('caseFacts', () => {
	const labels = labelsFor('pt_BR')

	it('pairs each filled value with its translated label in order', () => {
		const meta = caseMeta(
			makeEntry({ data: { client_name: 'Acme', role: 'Lead', period: '2024' } })
		)
		expect(caseFacts(meta, labels)).toEqual([
			{ label: 'Cliente', value: 'Acme' },
			{ label: 'Função', value: 'Lead' },
			{ label: 'Período', value: '2024' }
		])
	})

	it('hides every pair whose value is empty', () => {
		const meta = caseMeta(
			makeEntry({ data: { client_name: 'Acme', role: ' ', period: '2024' } })
		)
		expect(caseFacts(meta, labels)).toEqual([
			{ label: 'Cliente', value: 'Acme' },
			{ label: 'Período', value: '2024' }
		])
		expect(caseFacts(caseMeta(makeEntry({ data: {} })), labels)).toEqual([])
	})
})

describe('projectMeta', () => {
	const photo = makeMedia('photo')
	const shot = makeMedia('shot')

	function meta(data: FieldValues, media: Entry['media'] = {}, locale: LocaleCode = 'en') {
		return projectMeta(makeEntry({ data, media }), labelsFor(locale))
	}

	it('reads a full entry', () => {
		const result = meta(
			{
				'image-gallery': [photo.url, shot.url],
				links: [
					makeProjectLink('https://www.example.test/app', 'globe'),
					makeProjectLink('https://store.example.test/app', 'windows', 'link-2')
				],
				'distribution-model': [makeDatabaseItem('Closed Source')]
			},
			{ a: photo, b: shot }
		)
		expect(result).toEqual({
			gallery: [photo, shot],
			distribution: ['Closed source'],
			links: [
				{
					href: 'https://www.example.test/app',
					icon: Icons.globe,
					label: 'Official website'
				},
				{
					href: 'https://store.example.test/app',
					icon: Icons.windows,
					label: 'Microsoft Store'
				}
			]
		})
	})

	it('returns empty values for missing or mistyped fields', () => {
		const empty = { gallery: [], distribution: [], links: [] }
		expect(meta({})).toEqual(empty)
		expect(meta({ 'image-gallery': 3, links: 'x', 'distribution-model': 'x' })).toEqual(empty)
	})

	it('renders a repeated gallery url once and keeps the order', () => {
		const result = meta(
			{ 'image-gallery': [shot.url, photo.url, shot.url] },
			{ a: photo, b: shot }
		)
		expect(result.gallery).toEqual([shot, photo])
	})

	it('drops gallery urls missing from the media map', () => {
		const result = meta(
			{ 'image-gallery': ['https://cdn.example.test/gone.webp', photo.url] },
			{ a: photo }
		)
		expect(result.gallery).toEqual([photo])
	})

	it('drops links with an invalid or missing url', () => {
		const result = meta({
			links: [
				makeProjectLink('javascript:alert(1)', 'globe'),
				makeProjectLink('', 'globe'),
				{ _id: 'z' }
			]
		})
		expect(result.links).toEqual([])
	})

	it('falls back to the external link icon and the hostname for unknown icons', () => {
		const result = meta({
			links: [
				makeProjectLink('https://www.example.test/a', 'unknown'),
				makeProjectLink('https://docs.example.test/b', undefined, 'link-2'),
				makeProjectLink('https://example.test/c', 'constructor', 'link-3')
			]
		})
		expect(result.links).toEqual([
			{
				href: 'https://www.example.test/a',
				icon: Icons.external_link,
				label: 'example.test'
			},
			{
				href: 'https://docs.example.test/b',
				icon: Icons.external_link,
				label: 'docs.example.test'
			},
			{ href: 'https://example.test/c', icon: Icons.external_link, label: 'example.test' }
		])
	})

	it('localizes link labels', () => {
		const data = { links: [makeProjectLink('https://example.test', 'globe')] }
		expect(meta(data, {}, 'pt_BR').links[0]?.label).toBe('Site oficial')
		expect(meta(data, {}, 'es').links[0]?.label).toBe('Sitio oficial')
	})

	it('translates distribution by name and keeps unknown names raw', () => {
		const data = {
			'distribution-model': [
				makeDatabaseItem('Closed Source'),
				makeDatabaseItem('Freemium'),
				makeDatabaseItem(' ')
			]
		}
		expect(meta(data).distribution).toEqual(['Closed source', 'Freemium'])
		expect(meta(data, {}, 'pt_BR').distribution).toEqual(['Código fechado', 'Freemium'])
		expect(meta(data, {}, 'es').distribution).toEqual(['Código cerrado', 'Freemium'])
	})

	it('ignores project_status', () => {
		const base = meta({})
		expect(meta({ project_status: [makeDatabaseItem('Active')] })).toEqual(base)
	})
})
