import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['ar', 'en'] as const,
  defaultLocale: 'ar',
  localePrefix: 'as-needed',
})

export const locales = routing.locales
export type Locale = (typeof routing.locales)[number]
export const defaultLocale = routing.defaultLocale
