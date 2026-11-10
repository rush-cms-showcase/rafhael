import { createUrls } from '@rushcms/client'
import type { RushUrls } from '@rushcms/client'

export function makeUrls(): RushUrls {
	return createUrls({
		localePaths: { en: '', pt_BR: 'br', es: 'es' },
		routes: { blog: '/{locale}/blog/{slug}' }
	})
}
