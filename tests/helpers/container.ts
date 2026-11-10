import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { SITE } from './fixtures'

export type Component = Parameters<AstroContainer['renderToString']>[0]

type Props = Record<string, unknown>

let container: Promise<AstroContainer> | undefined

export async function render(
	component: Component,
	props: Props = {},
	locals: object = {}
): Promise<string> {
	container ??= AstroContainer.create({ astroConfig: { site: SITE.href } })
	return (await container).renderToString(component, { props, locals })
}
