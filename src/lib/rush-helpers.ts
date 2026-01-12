import type { LocaleCode } from '../types/rush-config'
import { rushConfig } from '../../rush.config'

export const getCollectionPath = (collectionId: number): string => {
  const routes = rushConfig.routes
  const path = Object.keys(routes).find((route) => {
    const value = routes[route]
    return value === collectionId || (Array.isArray(value) && value.includes(collectionId))
  })
  
  if (!path) {
    throw new Error(`Path for collection ID ${collectionId} not found in rush.config.ts`)
  }
  
  return path
}

export const buildUrl = (
  collectionId: number, 
  slug: string, 
  locale: LocaleCode = 'en'
): string => {
  const localeConfig = rushConfig.locales[locale]
  const collectionPath = getCollectionPath(collectionId)
  
  const base = localeConfig.path === '/' ? '' : localeConfig.path
  const path = collectionPath === '/' ? '' : collectionPath
  
  return `${base}${path}/${slug}`
}

export const buildCategoryUrl = (collectionId: number, categorySlug: string): string => {
  const base = getCollectionPath(collectionId)
  const taxonomy = rushConfig.locales?.[rushConfig.defaultLocale]?.taxonomies?.categories || 'categories'
  return `${base}/${taxonomy}/${categorySlug}`
}

export const buildTagUrl = (collectionId: number, tagSlug: string): string => {
  const base = getCollectionPath(collectionId)
  const taxonomy = rushConfig.locales?.[rushConfig.defaultLocale]?.taxonomies?.tags || 'tags'
  return `${base}/${taxonomy}/${tagSlug}`
}

export const buildPaginationUrl = (collectionId: number, page: number): string => {
  const base = getCollectionPath(collectionId)
  const pagination = rushConfig.locales?.[rushConfig.defaultLocale]?.pagination || 'page'
  
  if (page === 1) return base
  
  return `${base}/${pagination}/${page}`
}

export const getLocalePath = (locale: LocaleCode): string => {
  return rushConfig.locales[locale].path
}

export const getNav = (
  locale: LocaleCode, 
  nav: 'header' | 'footer'
): string | undefined => {
  const localeConfig = rushConfig.locales[locale]
  const navId = localeConfig.navs?.[nav]
  
  if (navId) return navId
  
  if (locale !== rushConfig.defaultLocale) {
    return rushConfig.locales[rushConfig.defaultLocale].navs?.[nav]
  }
  
  return undefined
}

export const getAvailableLocales = (): LocaleCode[] => {
  return Object.keys(rushConfig.locales) as LocaleCode[]
}

export const hasMultipleLocales = (): boolean => {
  return getAvailableLocales().length > 1
}

export const getPerPage = (): number => {
  return rushConfig.defaults.perPage
}
