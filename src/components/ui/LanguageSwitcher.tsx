'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl'; // Import next-intl hooks
import FlagIcon from '../ui/FlagIcon'; // Assuming this component exists

// Helper to get language name (remains mostly the same, but remove displayLocale default)
const getLanguageName = (locale: string): string => {
  // For specific languages, use our custom names to ensure consistency
  const customNames: Record<string, string> = {
    en: 'English',
    fr: 'Français',
    es: 'Español',
    de: 'Deutsch',
    it: 'Italiano',
    yue: '廣東話',
    sv: 'Svenska',
    pt: 'Português',
    da: 'Dansk',
    lv: 'Latviešu',
    tr: 'Türkçe',
    hr: 'Hrvatski',
    zh: '中文',
    th: 'ไทย'
  };

  // Use Intl.DisplayNames to fallback to native name, falling back to uppercase locale code
  // Note: Intl.DisplayNames is only useful if you want the name in a different locale
  // For this component, we'll primarily rely on the custom list and the locale code.
  // The original component used 'en' as the default displayLocale, but we'll simplify.
  return customNames[locale] || new Intl.DisplayNames([locale], { type: 'language' }).of(locale) || locale.toUpperCase();
};

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  // --- New next-intl v4 hooks ---
  const locale = useLocale(); // Get current locale
  const t = useTranslations('LanguageSwitcher'); // Use useTranslations for component-specific text
  // ------------------------------
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPending, startTransition] = useTransition(); // Use useTransition for changing language
  
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Define all supported locales (The list from the original file)
  const supportedLocales = ['en', 'fr', 'es', 'de', 'it', 'yue', 'sv', 'pt', 'da', 'lv', 'tr', 'hr', 'zh', 'th'];
  
  // In v4, you typically pass the supported locales from the config or use 'locales' from an external source
  // Since the original component hardcoded the available locales, we'll keep that for simplicity.
  const availableLocales = supportedLocales; // Assuming all supported are available for now

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      // Use client-side window for mobile check
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 599); // 600 is the phone up breakpoint
      }
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Close dropdown when clicking outside and handle body scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    // Only add listener if the dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // The original component had body scroll logic, which is often done via CSS/global state
      // We will keep the cleanup logic simple for this refactor.
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // document.body.style.overflow = 'auto'; // Removed body scroll control
    };
  }, [isOpen]); // isMobile is not needed in the dependency array for this effect

  // New language change logic using next-intl v4 pattern and useTransition
  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return;
    
    setIsOpen(false); // Close dropdown immediately
    
    startTransition(() => {
      // This logic is for an App Router setup where the locale is the first path segment.
      // We need to construct the new path manually.
      const segments = pathname.split('/').filter(Boolean);
      let newPath: string;

      if (supportedLocales.includes(segments[0])) {
        // If the current path has a locale segment (e.g., /fr/page)
        segments[0] = newLocale; // Replace locale
        newPath = `/${segments.join('/')}`;
      } else {
        // If the path does NOT have a locale segment (e.g., /page)
        newPath = `/${newLocale}${pathname}`;
      }
      
      // Navigate to the new path, Next.js routing handles the rest
      router.push(newPath);
    });
  };
  
  // Toggle dropdown and prevent event propagation
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Toggle button content based on mobile/desktop and open/closed state
  const renderToggleContent = () => {
    // ... (Mobile icons and flag display remain the same)
    
    // Create the mobile icons
    const mobileCloseIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" x="0px" y="0px" className="language-switcher__mobile-icon">
        <path d="M15.71,8.29a1,1,0,0,0-1.41,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12,8.29,14.29a1,1,0,1,0,1.41,1.41L12,13.41l2.29,2.29a1,1,0,0,0,1.41-1.41L13.41,12l2.29-2.29A1,1,0,0,0,15.71,8.29Z"/>
        <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"/>
      </svg>
    );
    
    const mobileOpenIcon = (
      <svg viewBox="0 0 24 24" fill="none" className="language-switcher__mobile-icon">
        <path d="M17 11.94C16.8933 12.3573 16.586 13.3877 16.078 15.031H17.938C17.4587 13.4917 17.1893 12.621 17.13 12.419C17.072 12.218 17.028 12.058 17 11.94Z" />
        <path d="M22 8H12C11.4696 8 10.9609 8.21071 10.5858 8.58579C10.2107 8.96086 10 9.46957 10 10V19C10 19.5304 10.2107 20.0391 10.5858 20.4142C10.9609 20.7893 11.4696 21 12 21H18L22 24V21C22.5304 21 23.0391 20.7893 23.4142 20.4142C23.7893 20.0391 24 19.5304 24 19V10C24 9.46957 23.7893 8.96086 23.4142 8.58579C23.0391 8.21071 22.5304 8 22 8ZM18.819 18L18.3 16.3H15.7L15.181 18H13.55L16.07 10.832H17.92L20.45 18H18.819Z" />
        <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V11C0 11.5304 0.210714 12.0391 0.585786 12.4142C0.960859 12.7893 1.46957 13 2 13V16L6 13H9V10C9.00416 9.86823 9.01752 9.73691 9.04 9.607C8.33704 9.33022 7.67072 8.96818 7.056 8.529C6.0875 9.19811 5.01115 9.69569 3.874 10C3.70254 9.48713 3.44262 9.00823 3.106 8.585C4.10594 8.40409 5.06646 8.04939 5.944 7.537C5.53915 7.09546 5.19265 6.60377 4.913 6.074C4.68191 5.63879 4.49691 5.18064 4.361 4.707C3.89 4.707 3.618 4.723 3.218 4.755V3.308C3.6029 3.34942 3.9899 3.36812 4.377 3.364H6.145V2.884C6.14595 2.71614 6.12987 2.54861 6.097 2.384H7.7C7.66775 2.54432 7.65167 2.70747 7.652 2.871V3.359H9.552C9.9391 3.3633 10.3261 3.3446 10.711 3.303V4.755C10.359 4.723 10.047 4.707 9.576 4.707C9.46497 5.24253 9.28445 5.76125 9.039 6.25C8.80215 6.72091 8.50352 7.1581 8.151 7.55C8.61298 7.82244 9.10491 8.04056 9.617 8.2C9.89402 7.82896 10.2535 7.5274 10.6671 7.31914C11.0806 7.11089 11.537 7.00163 12 7H14V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0.960859 12 0Z" />
        <path d="M7.016 6.642C7.50242 6.08839 7.84576 5.42401 8.016 4.707H5.9C6.1059 5.43451 6.4894 6.09945 7.016 6.642Z"/>
      </svg>
    );
    
    // Create the desktop flag display
    const flagDisplay = (
      <div className="language-switcher__flag-container">
        <FlagIcon code={locale} className="language-switcher__flag" />
        <span className="language-switcher__name">
          {getLanguageName(locale)}
        </span>
      </div>
    );
    
    // Return both mobile and desktop elements with visibility controlled by CSS
    return (
      <>
        <div className="language-switcher__mobile-toggle">
          {isOpen ? mobileCloseIcon : mobileOpenIcon}
        </div>
        <div className="language-switcher__desktop-toggle">
          {flagDisplay}
        </div>
      </>
    );
  };

  return (
    <div className={`language-switcher ${isOpen ? 'is-open' : ''} ${isMobile ? 'is-mobile' : ''} ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="language-switcher__toggle" 
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label={isMobile ? (isOpen ? t('closeMenuLabel') : t('openMenuLabel')) : t('changeLanguageLabel')}
      >
        {renderToggleContent()}
      </button>

      <div className={`language-switcher__dropdown ${isOpen ? 'is-visible' : ''}`} onClick={(e) => e.stopPropagation()}>
          {isMobile && (
            <>
              <div className="language-switcher__current">
                {/* Use the translation hook for text */}
                <h3>{t('currentLanguage')}</h3>
                <div className="language-switcher__current-flag">
                  <FlagIcon code={locale} className="language-switcher__flag" />
                  {/* Use locale for display name language here */}
                  <p>{getLanguageName(locale)}</p>
                </div>
              </div>
              
              <div className="language-switcher__divider"></div>
            </>
          )}
          {/* Use isPending from useTransition instead of isChanging state */}
          <div className={`language-switcher__options ${isPending ? 'is-changing' : ''}`}>
            {isPending && (
              <div className="language-switcher__loading">
                <div className="language-switcher__loading-spinner"></div>
              </div>
            )}
            {availableLocales
              .filter(lang => lang !== locale) // Filter out current language
              .map((lang) => (
                <div 
                  key={lang} 
                  className="language-switcher__option-wrapper"
                  // Call the simplified changeLanguage
                  onClick={() => changeLanguage(lang)}
                >
                  <button
                    className="language-switcher__option"
                    aria-label={t('changeToLabel', { language: getLanguageName(lang) })}
                    disabled={isPending} // Disable while transition is pending
                  >
                    <FlagIcon code={lang} className="language-switcher__flag" />
                    <span className="language-switcher__name">{getLanguageName(lang)}</span>
                  </button>
                </div>
              ))}
          </div>
          {isMobile && <div className="language-switcher__gradient" />}
        </div>
      </div>
  );
};

export default LanguageSwitcher;