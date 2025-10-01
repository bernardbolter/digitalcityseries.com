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

// --- NEW/UPDATED TYPES FOR TRANSLATIONS ---

/** Defines the value of a translation entry: either a string or another object (for nesting). */
type TranslationValue = string | TranslationMap;

/** Defines the structure of a translation object (recursive map of keys to values). */
interface TranslationMap {
  [key: string]: TranslationValue;
}

// /** Alias for use where a generic translation object is needed. */
// type Translations = TranslationMap; 

/** Defines the shape of the variables object passed for string interpolation. */
type InterpolationVariables = {
    [key: string]: string | number;
}
// ----------------------------------------

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  // Updated 't' signature to accept optional variables for interpolation
  t: (key: string, variables?: InterpolationVariables) => string; 
  locales: string[];
  defaultLocale: string;
  getLocalizedPath: (path: string) => string;
};

// Use the strongly typed TranslationMap for the imports
const translations: { [key: string]: TranslationMap } = {
  en: enTranslations as TranslationMap, // Cast to enforce type and remove 'any'
  fr: frTranslations as TranslationMap,
  es: esTranslations as TranslationMap,
  de: deTranslations as TranslationMap,
  it: itTranslations as TranslationMap,
  yue: yueTranslations as TranslationMap, 
  sv: svTranslations as TranslationMap,   
  pt: ptTranslations as TranslationMap,   
  da: daTranslations as TranslationMap,   
  lv: lvTranslations as TranslationMap,   
  tr: trTranslations as TranslationMap,   
  hr: hrTranslations as TranslationMap,   
  zh: zhTranslations as TranslationMap,   
  th: thTranslations as TranslationMap    
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
  }, [pathname, locale]);

  // Custom setLocale function that navigates to the localized route
  const setLocale = (newLocale: string) => {
    if (!supportedLocales.includes(newLocale) || newLocale === locale) return;
    
    // Save to localStorage for persistence
    localStorage.setItem('locale', newLocale);
    
    // Get the current path without the locale
    let newPath = removeLocaleFromPath(pathname);
    
    // Logic to construct the new path based on locale change
    if (newLocale === defaultLocale) {
      if (pathname === `/${locale}`) {
        newPath = '/';
      }
    } else {
      if (pathname === '/') {
        newPath = `/${newLocale}`;
      } else if (supportedLocales.includes(pathname.split('/')[1])) {
        newPath = `/${newLocale}${newPath}`;
      } else {
        newPath = `/${newLocale}${pathname}`;
      }
    }
    
    // Only navigate if the path would change
    if (newPath !== pathname) {
      router.push(newPath);
    } else {
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

  // Translation function with Interpolation
  const t = (key: string, variables?: InterpolationVariables): string => {
    const keys = key.split('.');
    let value: TranslationValue = translations[locale]; // Use TranslationValue type
    
    // Logic to find the translation value
    for (const k of keys) {
      // Check if value is a TranslationMap (object) before accessing the key
      if (typeof value === 'object' && value && k in value) {
        value = value[k];
      } else {
        // Fallback to default locale
        let fallbackValue: TranslationValue = translations[defaultLocale];
        for (const fk of keys) {
          if (typeof fallbackValue === 'object' && fallbackValue && fk in fallbackValue) {
            fallbackValue = fallbackValue[fk];
          } else {
            return key; // Return the key if not found in default
          }
        }
        value = fallbackValue;
        break; // Stop searching in the current locale once fallback is found
      }
    }
    
    // Final check and type guard: value must be a string to be interpolated
    if (typeof value !== 'string') {
        return key; // Return key if translation is not found or is not a string
    }

    // Interpolation logic
    let translatedString: string = value; // Explicitly assign as string (no 'any' issue)
    
    if (variables) {
        // Simple string replacement for {{variable}} placeholders
        for (const varKey in variables) {
            // Use a regular expression to replace all occurrences of the placeholder
            const placeholder = new RegExp(`{{${varKey}}}`, 'g');
            // Ensure the variable value is converted to a string
            translatedString = translatedString.replace(placeholder, String(variables[varKey]));
        }
    }
    
    return translatedString; // Return the interpolated string
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