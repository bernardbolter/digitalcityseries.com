'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '../../context/LocaleContext';
import FlagIcon from '../ui/FlagIcon';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { locale, setLocale, locales } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const localeNames: Record<string, string> = {
    en: 'English',
    fr: 'Français',
    es: 'Español',
    de: 'Deutsch',
    it: 'Italiano',
    yue: '廣東話', // Cantonese
    sv: 'Svenska', // Swedish
    pt: 'Português', // Portuguese
    da: 'Dansk',    // Danish
    lv: 'Latviešu',  // Latvian
    tr: 'Türkçe',    // Turkish
    hr: 'Hrvatski',  // Croatian
    zh: '中文',      // Mandarin
    th: 'ไทย'       // Thai
  };


  const supportedLocales = ['en', 'fr', 'es', 'de', 'it', 'yue', 'sv', 'pt', 'da', 'lv', 'tr', 'hr', 'zh', 'th'];
  const availableLocales = locales.filter(locale => supportedLocales.includes(locale));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (newLocale: string) => {
    // Update the URL based on the current path
    let newPath = '';
    
    if (pathname === '/') {
      // If we're at the root, just go to the language root
      newPath = newLocale === 'en' ? '/' : `/${newLocale}`;
    } else {
      // Replace the language segment in the current path
      const pathSegments = pathname.split('/').filter(Boolean);
      if (['fr', 'es'].includes(pathSegments[0])) {
        // Replace the language segment
        pathSegments[0] = newLocale === 'en' ? '' : newLocale;
        newPath = pathSegments.filter(Boolean).join('/');
        if (newPath && !newPath.startsWith('/')) newPath = `/${newPath}`;
      } else {
        // Add language segment
        newPath = newLocale === 'en' ? pathname : `/${newLocale}${pathname}`;
      }
    }
    
    // Update the URL
    router.push(newPath || '/');
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className={`language-switcher ${className} ${isOpen ? 'language-switcher--open' : ''}`}>
      <button 
        className="language-switcher__current" 
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="language-switcher__flag-container">
          <FlagIcon code={locale} className="language-switcher__flag" />
          <span className="language-switcher__name">{localeNames[locale]}</span>
        </div>
      </button>
      
      {isOpen && (
        <div className="language-switcher__dropdown">
          {availableLocales
            .filter(loc => loc !== locale)
            .map((loc) => (
              <button
                key={loc}
                onClick={() => changeLanguage(loc)}
                className="language-switcher__option"
              >
                <div className="language-switcher__flag-container">
                  <FlagIcon code={loc} className="language-switcher__flag" />
                  <span className="language-switcher__name">{localeNames[loc]}</span>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
