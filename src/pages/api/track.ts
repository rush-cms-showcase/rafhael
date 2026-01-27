import type { APIRoute } from 'astro'

export const prerender = false

const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Content-Type': 'application/json'
}

export const OPTIONS: APIRoute = async () => {
	return new Response(null, {
		status: 204,
		headers: CORS_HEADERS
	})
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json()

		const controller = new AbortController()
		const timeoutId = setTimeout(() => controller.abort(), 5000)

		const response = await fetch('https://app.rushcms.com/api/v1/rafhael/analytics/pageview', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'User-Agent': 'Rafhael-Website/1.0'
			},
			body: JSON.stringify(body),
			signal: controller.signal
		})

		clearTimeout(timeoutId)

		if (!response.ok) {
			console.error(`[Track API] RushCMS returned ${response.status}`)
			return new Response(JSON.stringify({ success: false, error: `RushCMS error: ${response.status}` }), {
				status: 200,
				headers: CORS_HEADERS
			})
		}

		const data = await response.json()
		return new Response(JSON.stringify({ success: true, data }), {
			status: 200,
			headers: CORS_HEADERS
		})
	} catch (error: any) {
		console.error('[Track API] Error:', error.message)
		return new Response(JSON.stringify({ success: false, error: error.message || 'Unknown error' }), {
			status: 200,
			headers: CORS_HEADERS
		})
	}
}
