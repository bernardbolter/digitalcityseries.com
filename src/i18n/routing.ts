import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'fr', 'es', 'it', 'yue', 'sv', 'pt', 'da', 'lv', 'tr', 'hr', 'zh', 'th'],
  defaultLocale: 'en',
  localePrefix: 'always'
});