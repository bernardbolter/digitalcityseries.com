'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Import translations
import enTranslations from '../../public/locales/en/common.json';
import frTranslations from '../../public/locales/fr/common.json';
import esTranslations from '../../public/locales/es/common.json';
import deTranslations from '../../public/locales/de/common.json';
import itTranslations from '../../public/locales/it/common.json';
import yueTranslations from '../../public/locales/yue/common.json';
import svTranslations from '../../public/locales/sv/common.json';
import ptTranslations from '../../public/locales/pt/common.json';
import daTranslations from '../../public/locales/da/common.json';
import lvTranslations from '../../public/locales/lv/common.json';
import trTranslations from '../../public/locales/tr/common.json';
import hrTranslations from '../../public/locales/hr/common.json';
import zhTranslations from '../../public/locales/zh/common.json';
import thTranslations from '../../public/locales/th/common.json';

type Translations = {
  [key: string]: any;
};

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
  locales: string[];
  defaultLocale: string;
  getLocalizedPath: (path: string) => string;
};

const translations: { [key: string]: Translations } = {
  en: enTranslations,
  fr: frTranslations,
  es: esTranslations,
  de: deTranslations,
  it: itTranslations,
  yue: yueTranslations, // Cantonese
  sv: svTranslations,   // Swedish
  pt: ptTranslations,   // Portuguese
  da: daTranslations,   // Danish
  lv: lvTranslations,   // Latvian
  tr: trTranslations,   // Turkish
  hr: hrTranslations,   // Croatian
  zh: zhTranslations,   // Mandarin
  th: thTranslations    // Thai
};

const defaultLocale = process.env.DEFAULT_LOCALE || 'en';
const supportedLocales = process.env.SUPPORTED_LOCALES ? 
  (process.env.SUPPORTED_LOCALES as string).split(',') : 
  ['en', 'fr', 'es', 'de', 'it', 'yue', 'sv', 'pt', 'da', 'lv', 'tr', 'hr', 'zh', 'th'];

const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  t: () => '',
  locales: supportedLocales,
  defaultLocale,
  getLocalizedPath: () => '',
});

// Helper function to detect locale from pathname
const detectLocaleFromPath = (pathname: string): string => {
  // Check if the path starts with a locale
  for (const locale of supportedLocales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return defaultLocale;
};

// Helper function to remove locale from path
const removeLocaleFromPath = (pathname: string): string => {
  for (const locale of supportedLocales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return pathname.replace(`/${locale}`, '') || '/';
    }
  }
  return pathname;
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Detect locale from URL path
  const pathLocale = detectLocaleFromPath(pathname);
  const [locale, setLocaleState] = useState(pathLocale);

  // Update locale when path changes
  useEffect(() => {
    const newLocale = detectLocaleFromPath(pathname);
    if (newLocale !== locale) {
      setLocaleState(newLocale);
    }
  }, [pathname]);

  // Custom setLocale function that navigates to the localized route
  const setLocale = (newLocale: string) => {
    if (!supportedLocales.includes(newLocale) || newLocale === locale) return;
    
    // Save to localStorage for persistence
    localStorage.setItem('locale', newLocale);
    
    // Get the current path without the locale
    let newPath = removeLocaleFromPath(pathname);
    
    // If we're not already on the default locale and switching to default
    if (newLocale === defaultLocale) {
      // If we're on the root path of a non-default language
      if (pathname === `/${locale}`) {
        newPath = '/';
      }
    } else {
      // If we're on the root path
      if (pathname === '/') {
        newPath = `/${newLocale}`;
      } else if (supportedLocales.includes(pathname.split('/')[1])) {
        // If we're on a path with a locale, replace it
        newPath = `/${newLocale}${newPath}`;
      } else {
        // If we're on a path without a locale, add the new locale
        newPath = `/${newLocale}${pathname}`;
      }
    }
    
    // Only navigate if the path would change
    if (newPath !== pathname) {
      router.push(newPath);
    } else {
      // If the path wouldn't change but the locale does, just update the state
      setLocaleState(newLocale);
    }
  };

  // Get localized path for navigation
  const getLocalizedPath = (path: string): string => {
    // If path already starts with locale, return as is
    for (const loc of supportedLocales) {
      if (path === `/${loc}` || path.startsWith(`/${loc}/`)) {
        return path;
      }
    }
    
    // Otherwise, add current locale prefix (except for default locale)
    return locale === defaultLocale ? path : `/${locale}${path}`;
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to default locale if key not found
        let fallbackValue = translations[defaultLocale];
        for (const fk of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fk in fallbackValue) {
            fallbackValue = fallbackValue[fk];
          } else {
            return key; // Return the key if not found in default locale either
          }
        }
        return typeof fallbackValue === 'string' ? fallbackValue : key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LocaleContext.Provider value={{ 
      locale, 
      setLocale, 
      t, 
      locales: supportedLocales, 
      defaultLocale,
      getLocalizedPath
    }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
