import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) => [
    {
      url: `https://www.digitalcityseries.com/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: {
        languages: {
        'da': 'https://www.digitalcityseries.com/da',
        'de': 'https://www.digitalcityseries.com/de',
        'en': 'https://www.digitalcityseries.com/en',
        'es': 'https://www.digitalcityseries.com/es',
        'fr': 'https://www.digitalcityseries.com/fr',
        'hr': 'https://www.digitalcityseries.com/hr',
        'it': 'https://www.digitalcityseries.com/it',
        'lv': 'https://www.digitalcityseries.com/lv',
        'pt': 'https://www.digitalcityseries.com/pt',
        'sv': 'https://www.digitalcityseries.com/sv',
        'th': 'https://www.digitalcityseries.com/th',
        'tr': 'https://www.digitalcityseries.com/tr',
        'yue': 'https://www.digitalcityseries.com/yue',
        'zh': 'https://www.digitalcityseries.com/zh',
        }
      }
    },
    {
      url: `https://www.digitalcityseries.com/business-plan`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }
  ]);
}