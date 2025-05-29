import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Helper function for getting translations on the server side
export const getI18nProps = async (locale: string, namespaces = ['common']) => {
  return {
    ...(await serverSideTranslations(locale, namespaces)),
  };
};

// Helper hook for getting the current locale and changing it
export const useLocale = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  
  const currentLocale = router.locale || 'en';
  
  const changeLocale = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };
  
  return {
    currentLocale,
    changeLocale,
    t: i18n.t,
    locales: router.locales || ['en', 'fr', 'es'],
    defaultLocale: router.defaultLocale || 'en',
  };
};

// Get the localized path for a given path
export const getLocalizedPath = (path: string, locale: string) => {
  if (path === '/') return `/${locale}`;
  return `/${locale}${path}`;
};

// Helper function to generate static paths for all locales
export const generateStaticPaths = (paths: any[], locales: string[] = ['en', 'fr', 'es']) => {
  return paths.flatMap((path) => 
    locales.map((locale) => ({
      ...path,
      locale,
    }))
  );
};
