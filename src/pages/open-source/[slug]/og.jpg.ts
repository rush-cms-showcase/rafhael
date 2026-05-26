import type { APIRoute } from 'astro';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function getStaticPaths() {
	const allProjects = import.meta.glob('@/content/open-source/*.ts', { eager: true });
	return Object.entries(allProjects).map(([filepath, module]: [string, any]) => {
		const slug = filepath.split('/').pop()?.replace('.ts', '');
		const contentKey = Object.keys(module).find(key => module[key]?.en && module[key]?.pt_BR);
		const content = contentKey ? module[contentKey] : null;
		if (!content?.en?.blocks) return null;
		return {
			params: { slug },
			props: { projectData: content }
		};
	}).filter(route => route !== null && route.props.projectData !== null);
}

export const generateOgImage = async (data: any) => {
	if (!data) {
		return new Response('Not found', { status: 404 });
	}

	const { page, blocks } = data;
	const heroBlock = blocks.find((b: any) => b._type === 'hero');

	const publicDir = path.resolve('./public');

	let logoBase64 = '';
	const logoUrl = page.og_banner?.logo || heroBlock?.data?.logo;

	if (logoUrl) {
		const logoPath = path.join(publicDir, logoUrl);
		try {
			const ext = path.extname(logoPath).toLowerCase();
			if (ext === '.svg') {
				const svgString = await fs.readFile(logoPath, 'utf-8');
				const logoBuffer = await sharp(Buffer.from(svgString)).resize(180, 180, { fit: 'inside' }).png().toBuffer();
				logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
			} else if (ext === '.webp') {
				const logoBuffer = await fs.readFile(logoPath);
				const pngBuffer = await sharp(logoBuffer).resize(180, 180, { fit: 'inside' }).png().toBuffer();
				logoBase64 = `data:image/png;base64,${pngBuffer.toString('base64')}`;
			} else {
				const logoBuffer = await fs.readFile(logoPath);
				const pngBuffer = await sharp(logoBuffer).resize(180, 180, { fit: 'inside' }).png().toBuffer();
				logoBase64 = `data:image/png;base64,${pngBuffer.toString('base64')}`;
			}
		} catch (error) {
			console.error('Failed to read logo image:', error);
		}
	}

	const fontData = await fetch(
		'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff'
	).then((res) => res.arrayBuffer());

	const titleText = page.og_banner?.title || page.title;
	const descriptionText = page.og_banner?.subtitle || page.description;

	const fallbackTransparentPng = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

	const markup = html`
		<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 1200px; height: 630px; background-color: #0a0a0a; position: relative;">
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; padding: 40px; text-align: center;">
				
				<div style="display: ${logoBase64 ? 'flex' : 'none'}; margin-bottom: 40px;">
					<img src="${logoBase64 || fallbackTransparentPng}" style="width: 180px; height: 180px; object-fit: contain;" />
				</div>

				<div style="color: #3f91f0; font-size: 80px; font-family: 'Inter'; font-weight: 700; line-height: 1.1; display: flex; text-align: center; max-width: 1000px; justify-content: center;">
					${titleText}
				</div>
				
				<div style="font-size: 36px; color: #ffffff; margin-top: 24px; line-height: 1.4; display: flex; text-align: center; max-width: 900px; justify-content: center;">
					${descriptionText}
				</div>
				
			</div>
		</div>
	`;

	const svg = await satori(markup, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'Inter',
				data: fontData,
				weight: 700,
				style: 'normal',
			},
		],
	});

	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width', value: 1200 },
	});

	const pngBuffer = resvg.render().asPng();

	const jpgBuffer = await sharp(pngBuffer).jpeg({ quality: 80 }).toBuffer();

	return new Response(new Uint8Array(jpgBuffer), {
		headers: {
			'Content-Type': 'image/jpeg',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
};

export const GET: APIRoute = async ({ props }) => {
	const { projectData } = props;
	return generateOgImage(projectData['en']);
};
