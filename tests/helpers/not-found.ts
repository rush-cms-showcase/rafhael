import { RushError } from '@rushcms/client'

export function notFound(): RushError<'not_found'> {
	return new RushError({
		status: 404,
		code: 'not_found',
		message: 'not found',
		params: { resource: 'collection' },
		errors: []
	})
}
