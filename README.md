# rafhael.pro

The personal site of Rafhael Marsigli, built with [Astro](https://astro.build) on top of
[Rush CMS](https://github.com/rush-cms/rush-cms) through `@rushcms/astro` and `@rushcms/client`. Blog posts, cases,
projects, pages, navigation and site options come from the CMS; the interface copy lives in `src/lib/labels.ts` in
English, Portuguese (Brazil) and Spanish.

Requires Node 24 or later to build.

## Environment

Copy `.env.example` to `.env` and fill:

- `RUSH_API_URL`, `RUSH_SITE_ID`, `RUSH_API_TOKEN`: the CMS API, the site and a delivery token (secret)
- `RUSH_MEDIA_URL`: the media host, when it differs from the API (optional)
- `RUSH_PREVIEW`: `true` only on a preview deployment (optional)
- `SITE_URL`: the public origin of the site (build time)
- `GTAG`: the analytics measurement id (build time, optional)

## Commands

| Command                | What it does                               |
| ---------------------- | ------------------------------------------ |
| `bun install`          | Install dependencies                       |
| `bun run dev`          | Dev server                                 |
| `bun run build`        | Static build into `dist/`, reading the CMS |
| `bun run preview`      | Serve `dist/` as static files              |
| `bun run test`         | Unit and component tests                   |
| `bun run check`        | Type check                                 |
| `bun run format:check` | Prettier check                             |

## Deploy

The site is purely static: `bun run build` writes plain files to `dist/`, and any static file server can host them.
There is no server, no adapter and no forms route. Every `RUSH_*` variable, `SITE_URL` and `GTAG` are read at build
time only; nothing needs to be set where the files are served. Retired slugs are not redirected: they answer 404.

The build writes one 404 page per locale prefix: `404.html` (English), `br/404/index.html` (Portuguese) and
`es/404/index.html` (Spanish). Name one `error_page` per prefix so each locale gets its own page, for instance with nginx:

```nginx
server {
	root /var/www/example-site;
	error_page 404 /404.html;

	location /br/ {
		error_page 404 /br/404/index.html;
	}

	location /es/ {
		error_page 404 /es/404/index.html;
	}
}
```

The site is rebuilt and the files replaced whenever the CMS fires its deploy hook.
