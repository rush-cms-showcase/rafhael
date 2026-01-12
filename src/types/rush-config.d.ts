// Temporary type definitions until @rushcms/types is published

export type LocaleCode = string

export interface NavConfig {
  header: string
  footer?: string
  [key: string]: string | undefined
}

export interface TaxonomyPaths {
  categories: string
  tags: string
}

export interface LocaleConfig {
  code: string
  label: string
  path: string
  navs?: NavConfig
  taxonomies: TaxonomyPaths
  pagination: string
}

export interface RushSiteConfig {
  defaultLocale: string
  locales: Record<string, LocaleConfig>
  /**
   * Routes configuration
   * mapping path -> collection ID
   */
  routes: Record<string, number | number[]>
  defaults: {
    perPage: number
  }
}
