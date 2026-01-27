import type { APIRoute } from 'astro'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json()

		const response = await fetch('https://app.rushcms.com/api/v1/rafhael/analytics/pageview', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(body)
		})

		if (!response.ok) {
			return new Response(JSON.stringify({ success: false }), { status: response.status })
		}

		const data = await response.json()
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	} catch (error) {
		return new Response(JSON.stringify({ success: false }), { status: 500 })
	}
}
