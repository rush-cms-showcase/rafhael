import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter.B_FCNTcq.js';
import { manifest } from './manifest_CsghVbS5.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about-me.astro.mjs');
const _page3 = () => import('./pages/api/track.astro.mjs');
const _page4 = () => import('./pages/blog/_slug_.astro.mjs');
const _page5 = () => import('./pages/blog/_---page_.astro.mjs');
const _page6 = () => import('./pages/br/404.astro.mjs');
const _page7 = () => import('./pages/br/blog/_slug_.astro.mjs');
const _page8 = () => import('./pages/br/blog/_---page_.astro.mjs');
const _page9 = () => import('./pages/br/cases.astro.mjs');
const _page10 = () => import('./pages/br/categoria/_category_/_---page_.astro.mjs');
const _page11 = () => import('./pages/br/contato.astro.mjs');
const _page12 = () => import('./pages/br/sobre-mim.astro.mjs');
const _page13 = () => import('./pages/br/tag/_slug_.astro.mjs');
const _page14 = () => import('./pages/br/_slug_.astro.mjs');
const _page15 = () => import('./pages/br.astro.mjs');
const _page16 = () => import('./pages/cases.astro.mjs');
const _page17 = () => import('./pages/category/_category_/_---page_.astro.mjs');
const _page18 = () => import('./pages/contact.astro.mjs');
const _page19 = () => import('./pages/search-index/_locale_.json.astro.mjs');
const _page20 = () => import('./pages/tag/_slug_.astro.mjs');
const _page21 = () => import('./pages/_slug_.astro.mjs');
const _page22 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.16.15_@types+node@25.0.3_@vercel+functions@2.2.13_jiti@2.6.1_lightningcss@1.30._f355674d4a21119b966b18ecf4d90fa5/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about-me.astro", _page2],
    ["src/pages/api/track.ts", _page3],
    ["src/pages/blog/[slug].astro", _page4],
    ["src/pages/blog/[...page].astro", _page5],
    ["src/pages/br/404.astro", _page6],
    ["src/pages/br/blog/[slug].astro", _page7],
    ["src/pages/br/blog/[...page].astro", _page8],
    ["src/pages/br/cases.astro", _page9],
    ["src/pages/br/categoria/[category]/[...page].astro", _page10],
    ["src/pages/br/contato.astro", _page11],
    ["src/pages/br/sobre-mim.astro", _page12],
    ["src/pages/br/tag/[slug].astro", _page13],
    ["src/pages/br/[slug].astro", _page14],
    ["src/pages/br/index.astro", _page15],
    ["src/pages/cases.astro", _page16],
    ["src/pages/category/[category]/[...page].astro", _page17],
    ["src/pages/contact.astro", _page18],
    ["src/pages/search-index/[locale].json.ts", _page19],
    ["src/pages/tag/[slug].astro", _page20],
    ["src/pages/[slug].astro", _page21],
    ["src/pages/index.astro", _page22]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "dac08452-0b12-4cfc-b365-a2e8742a58bc",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
