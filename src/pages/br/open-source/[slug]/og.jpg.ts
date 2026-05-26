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

import { generateOgImage } from '../../../open-source/[slug]/og.jpg';

export const GET: APIRoute = async ({ props }) => {
	const { projectData } = props;
	return generateOgImage(projectData['pt_BR']);
};
