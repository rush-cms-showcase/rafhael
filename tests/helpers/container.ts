import { experimental_AstroContainer as AstroContainer } from 'astro/container'

export const SITE = new URL('https://site.example.test')

type Component = Parameters<AstroContainer['renderToString']>[0]

type Props = Record<string, unknown>

let container: Promise<AstroContainer> | undefined

export async function render(component: Component, props: Props = {}): Promise<string> {
	container ??= AstroContainer.create({ astroConfig: { site: SITE.href } })
	return (await container).renderToString(component, { props })
}
