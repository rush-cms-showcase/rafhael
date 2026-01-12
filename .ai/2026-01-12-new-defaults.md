# Rush CMS's Website New Defaults

# Rush CMS's website new defaults

## For real life testing

This is the current live api and key:

Three collections, pages (with the id 2) is the `/(root)` one. Others will be in `/{collection.slug}/{entry.slug}` pattern.

* **Token da API:** `1|BpHoX36Uv9ziBdtFXV6Y4k9lYE1AJ2oBE4NmYnTb`
* **Link do website:** https://rafhael.com.br

> SDK was refactored right now, so update npm packges is needed:`@rushcms/{types, client, react}`. There are posts in blog collection with id 2, use this collection/entries as default for testing.

***

## About i18n

Website will be `/` for `{default en}` and `/br/` for `{pt_BR lang}`:

```
# URL Examples
https://rafhael.com.br/blog/this-is-a-blog-post-slug
https://rafhael.com.br/br/esta-e-uma-slug-do-post
```

Site will **AUTO VERIFY** user's language, returning default or `pt-br`.

***

## The new approach

We'll use a new approach, with a `ts` file in the root folder:

```typescript
// rush.config.ts
{
  default: {
    path: '/',
    navs: {
      main_nav: 'vkQeX2cGZSkv8xOerNN8uZGa',
      footer_nav: 'soon', // soon, but it will have!
    },
    routes: {
      '/': 2,
      '/blog': 1,
      '/cases': 3,
    }
  },
  pt_BR: {
    // If is the same nav (native i18n), we don't need add again
    // Same routes as default lang? Don't nedd add again
    path: '/br',
  }
}
```

I'm fully open to ideias for thus approach.

***

## Implementation

You have:

* The production ready api for local testing
* The new i18n method
* The new `rush.config.ts` configuration file

### We need

update this website with new standards, new packages, and improve:

* category loop
* tag loop
* entries loop (only blog - id 2 - will show published date)
* new i18n path pattern
* i18n check in toolbar (if 1+ languages are settled)

All loops/archives with pagination.

