import type { RushSiteConfig } from './src/types/rush-config'

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
    '/': 2,
    '/blog': 1,
    '/cases': 3,
  },
  
  defaults: {
    perPage: 12,
  },
}
