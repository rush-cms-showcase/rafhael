# rafhael.pro

The personal site of Rafhael Marsigli, built with [Astro](https://astro.build) on top of
[Rush CMS](https://github.com/rush-cms/rush-cms) through `@rushcms/astro` and `@rushcms/client`. Blog posts, cases,
projects, pages, navigation and site options come from the CMS; the interface copy lives in `src/lib/labels.ts` in
English, Portuguese (Brazil) and Spanish.

Requires Node 24 or later.

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
| `bun run preview`      | Serve the build with the Node server       |
| `bun run test`         | Unit and component tests                   |
| `bun run check`        | Type check                                 |
| `bun run format:check` | Prettier check                             |

## Deploy

The site is a static build (`dist/client`) rebuilt whenever the CMS fires its deploy hook. It is served by the Node
server (`node dist/server/entry.mjs`), not by a plain static file server, because the 404 page is rendered on demand.
The `RUSH_*` variables are needed at runtime; `SITE_URL` and `GTAG` at build time.
