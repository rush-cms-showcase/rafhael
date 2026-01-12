# Rush Config Implementation Plan

> **Data**: 2026-01-12  
> **Objetivo**: Implementar novo sistema de configuração com i18n, routing dinâmico e taxonomies

---

## 🎯 Visão Geral

Refatoração completa da arquitetura do site para usar o novo sistema `rush.config.ts`, com suporte i18n nativo, routing dinâmico, e URLs traduzidas para taxonomies e pagination.

---

## 📦 Componentes

### 1. `rush.config.ts` (Novo - Root)

Arquivo de configuração limpo, **data-only**, sem lógica.

```typescript
import type { RushSiteConfig } from '@rushcms/types'

export const rushConfig: RushSiteConfig = {
  defaultLocale: 'en',
  
  locales: {
    en: {
      code: 'en',
      label: 'English',
      path: '/',
      navs: {
        header: 'vkQeX2cGZSkv8xOerNN8uZGa',
        footer: undefined,
      },
      taxonomies: {
        categories: 'categories',
        tags: 'tags',
      },
      pagination: 'page',
    },
    
    pt_BR: {
      code: 'pt_BR',
      label: 'Português',
      path: '/br',
      taxonomies: {
        categories: 'categorias',
        tags: 'tags',
      },
      pagination: 'pagina',
    },
  },
  
  routes: {
    '/': 2,        // pages collection
    '/blog': 1,    // blog collection  
    '/cases': 3,   // cases collection
  },
  
  defaults: {
    perPage: 12,
  },
}
```

**Princípios**:
- ✅ Zero lógica (só dados)
- ✅ i18n first-class (taxonomies/pagination traduzidos)
- ✅ Type-safe via `@rushcms/types`
- ✅ Extensível (fácil adicionar novos locales)

---

### 2. `src/lib/rush-helpers.ts` (Novo)

Toda a lógica de routing e URL building.

**Funções**:

#### URL Building
```typescript
buildUrl(collectionId, slug, locale)
// → /blog/my-post (en)
// → /br/blog/meu-post (pt_BR)

buildCategoryUrl(category, locale, collectionId?)
// → /blog/categories/laravel (en)
// → /br/blog/categorias/laravel (pt_BR)

buildTagUrl(tag, locale, collectionId?)
// → /blog/tags/php (en)
// → /br/blog/tags/php (pt_BR)

buildPaginationUrl(collectionId, page, locale)
// → /blog/page/2 (en)
// → /br/blog/pagina/2 (pt_BR)
```

#### Getters
```typescript
getCollectionPath(collectionId) // → '/blog'
getLocalePath(locale)           // → '/br'
getNav(locale, 'header')        // → UUID (com fallback)
getAvailableLocales()           // → ['en', 'pt_BR']
hasMultipleLocales()            // → true
getPerPage()                    // → 12
```

---

### 3. `src/lib/rush.ts` (Atualizar)

Atualizar token de API e integrar com `rush.config.ts`.

**Mudanças**:
```diff
- const API_TOKEN = import.meta.env.RUSH_API_TOKEN
+ const API_TOKEN = '1|BpHoX36Uv9ziBdtFXV6Y4k9lYE1AJ2oBE4NmYnTb'

+ import { rushConfig } from '../../rush.config'
```

---

### 4. `.env` (Atualizar)

Atualizar token de API para produção.

```diff
- RUSH_API_TOKEN=7|YCWzpjsa7ZpkFdjfnixEwWLbCIiOroKNThjUEOaV
+ RUSH_API_TOKEN=1|BpHoX36Uv9ziBdtFXV6Y4k9lYE1AJ2oBE4NmYnTb
```

---

### 5. `package.json` (Atualizar)

Atualizar SDK packages para versões mais recentes.

```bash
pnpm add @rushcms/client@latest @rushcms/types@latest @rushcms/react@latest
```

---

## 🗺️ Estrutura de Rotas

### Padrões de URL

| Tipo | EN | PT_BR |
|------|-----|-------|
| **Page** | `/privacy` | `/br/privacy` |
| **Blog Post** | `/blog/my-post` | `/br/blog/meu-post` |
| **Blog Archive** | `/blog` | `/br/blog` |
| **Category (scoped)** | `/blog/categories/laravel` | `/br/blog/categorias/laravel` |
| **Category (global)** | `/categories/laravel` | `/br/categorias/laravel` |
| **Tag (scoped)** | `/blog/tags/php` | `/br/blog/tags/php` |
| **Tag (global)** | `/tags/php` | `/br/tags/php` |
| **Pagination** | `/blog/page/2` | `/br/blog/pagina/2` |

---

## 🔄 Refatorações de Páginas

### 1. `src/pages/blog/index.astro`

**Antes**:
```typescript
const response = await rush.getEntries("blog", { per_page: 1000 })
```

**Depois**:
```typescript
import { getCollectionPath } from '../../lib/rush-helpers'

const blogId = 1 // Ou pegar de rushConfig.routes['/blog']
const locale = 'en' // Detectar do path
const response = await rush.getEntries(blogId, { 
  locale,
  per_page: 12 
})
```

---

### 2. `src/pages/blog/[slug].astro`

**Mudanças**:
- Usar `buildUrl()` para gerar URLs
- Adicionar `published_at` (apenas blog)
- Suportar múltiplos locales no `getStaticPaths`

---

### 3. `src/pages/[slug].astro`

**Mudanças**:
- Usar collection ID 2 (pages)
- Suportar i18n paths

---

## 🆕 Novas Páginas

### 1. `src/pages/blog/categories/index.astro`

Lista todas as categorias do blog.

**URL**: `/blog/categories` (en) ou `/br/blog/categorias` (pt_BR)

---

### 2. `src/pages/blog/categories/[category].astro`

Posts filtrados por categoria.

**URL**: `/blog/categories/laravel` ou `/br/blog/categorias/laravel`

---

### 3. `src/pages/blog/tags/index.astro`

Lista todas as tags do blog.

---

### 4. `src/pages/blog/tags/[tag].astro`

Posts filtrados por tag.

---

### 5. `src/pages/categories/index.astro` (Global)

Todas categorias de todas collections.

---

### 6. `src/pages/categories/[category].astro` (Global)

Entries de qualquer collection com essa categoria.

---

### 7. Mesmas para Tags (Global)

---

## 🌍 i18n Implementation

### Middleware (Opcional - Fase 2)

Detectar idioma do browser e redirecionar:

```typescript
// src/middleware.ts
export function onRequest({ request, redirect }, next) {
  const url = new URL(request.url)
  const acceptLanguage = request.headers.get('accept-language')
  
  if (shouldRedirectToPtBr(acceptLanguage, url.pathname)) {
    return redirect(`/br${url.pathname}`)
  }
  
  return next()
}
```

---

### Language Selector

```astro
<!-- src/components/language-selector.astro -->
---
import { hasMultipleLocales, getAvailableLocales, rushConfig } from '../lib/rush-helpers'
---

{hasMultipleLocales() && (
  <div class="language-selector">
    {getAvailableLocales().map(locale => (
      <a 
        href={rushConfig.locales[locale].path}
        class:list={[currentLocale === locale && 'active']}
      >
        {rushConfig.locales[locale].label}
      </a>
    ))}
  </div>
)}
```

---

## 📋 Checklist de Implementação

### Fase 1: Setup (Base)
- [ ] Criar `rush.config.ts` na raiz
- [ ] Criar `src/lib/rush-helpers.ts`
- [ ] Atualizar `.env` com novo token
- [ ] Atualizar `package.json` (SDK packages)
- [ ] Instalar dependências (`pnpm install`)
- [ ] Atualizar `src/lib/rush.ts`

### Fase 2: Refatoração de Páginas Existentes
- [ ] Refatorar `src/pages/blog/index.astro`
- [ ] Refatorar `src/pages/blog/[slug].astro`
- [ ] Refatorar `src/pages/[slug].astro`
- [ ] Atualizar `src/components/blog/blog-search.tsx`

### Fase 3: Novas Páginas (Taxonomies)
- [ ] Criar `src/pages/blog/categories/index.astro`
- [ ] Criar `src/pages/blog/categories/[category].astro`
- [ ] Criar `src/pages/blog/tags/index.astro`
- [ ] Criar `src/pages/blog/tags/[tag].astro`

### Fase 4: i18n (Se necessário)
- [ ] Criar estrutura `/br/` (duplicar pages ou usar routing Astro)
- [ ] Criar language selector component
- [ ] Adicionar middleware de detecção (opcional)

### Fase 5: Validação
- [ ] Testar build (`pnpm run build`)
- [ ] Validar URLs geradas
- [ ] Verificar i18n routing
- [ ] Testar navegação entre idiomas

---

## 🎯 Prioridades

### HOJE (Must Have)
1. ✅ Setup base (Fase 1)
2. ✅ Refatoração páginas existentes (Fase 2)
3. ✅ Build passando
4. ✅ URLs funcionando

### AMANHÃ (Nice to Have)
1. 🔜 Taxonomies pages (Fase 3)
2. 🔜 i18n completo (Fase 4)
3. 🔜 Language selector

---

## ⚠️ Riscos e Mitigações

### 1. SDK Breaking Changes

**Risco**: SDK refatorado pode ter API diferente

**Mitigação**: 
- Testar chamadas básicas primeiro
- Verificar documentação do SDK
- Rollback se necessário

---

### 2. Collection IDs Hardcoded

**Risco**: IDs podem mudar entre ambientes

**Mitigação**:
- Usar IDs da API de produção
- Adicionar TODO para migrar para `code`
- Validar na build

---

### 3. i18n Complexity

**Risco**: Routing i18n no Astro é manual

**Mitigação**:
- Começar simples (prefix `/br/`)
- Usar helpers para abstrair complexidade
- Fase 2 se necessário

---

## 📚 Referências

- [Rush Config Spec](.ai/2026-01-12-new-defaults.md)
- [Refactoring Analysis](../../../.gemini/antigravity/brain/39aa4d35-7587-4813-8765-8dc19fc5bc1b/refactoring-analysis.md)
- API: `https://app.rushcms.com`
- Token: `1|BpHoX36Uv9ziBdtFXV6Y4k9lYE1AJ2oBE4NmYnTb`

---

## 🚀 Let's Go!

Tudo pronto para começar a implementação. Seguir o checklist fase por fase.
