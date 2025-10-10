import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['da', 'en', 'de', 'es', 'fr', 'hr', 'it', 'lv', 'pt', 'sv', 'th', 'tr', 'yue', 'zh'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/'
  }
});