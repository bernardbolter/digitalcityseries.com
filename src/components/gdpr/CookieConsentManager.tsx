'use client';

import { useEffect } from 'react';
import { run, CookieValue, CookieConsentConfig, Translation } from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

// Define 'window.gtag' for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

/**
 * Updates the gtag consent state based on the user's accepted categories.
 * @param categories - Array of categories accepted by the user (e.g., ['necessary', 'analytics']).
 */
const updateGtagConsent = (categories: string[]) => {
  const granted = categories.includes('analytics');
  
  window.gtag?.('consent', 'update', {
    ad_storage: 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
  });
};

// --- The Main Component ---
export default function CookieConsentManager() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      
      // Define the 'en' translation content separately.
      // We use a type assertion to force TypeScript to accept this structure,
      // as it is the structure required by the runtime, despite the library's
      // internal type definition conflict (which can happen with complex object types).
      const enTranslation: Translation = {
        consent_modal: {
          title: 'We use cookies',
          description:
            'We use essential cookies to run our website. With your consent, we will use non-essential cookies to improve your experience.',
          primary_btn: {
            text: 'Accept all',
            role: 'accept_all',
          },
          secondary_btn: {
            text: 'Reject all',
            role: 'reject_all',
          },
        },
        settings_modal: {
          title: 'Cookie Preferences',
          save_settings_btn: 'Save Settings',
          accept_necessary_btn: 'Accept Only Necessary',
          accept_all_btn: 'Accept All',
          categories: [
            {
              category: 'necessary',
              read_only: true,
              text: 'These cookies are essential for the proper functioning of the website.',
            },
            {
              category: 'analytics',
              text: 'Analytics cookies are used to track user behavior and measure performance.',
              services: [
                {
                  name: 'Google Analytics',
                  label: 'Google Analytics 4 (GA4)',
                  cookies: [{ name: '_ga'}, { name: '_gid'}],
                }
              ],
            },
          ],
        }
      } as Translation; // Explicitly assert the type here
      
      const config: CookieConsentConfig = {
        
        // FIX: Assign the validated structure to the translations object.
        language: {
          default: 'en',
          translations: {
            en: enTranslation,
          }
        },
        
        autoClearCookies: true,
        pageScripts: true,
        
        // --- Essential Callbacks for Integration ---
        onFirstConsent: ({ cookie }: { cookie: CookieValue }) => {
          updateGtagConsent(cookie.categories);
        },
        onConsent: ({ cookie }: { cookie: CookieValue }) => {
          updateGtagConsent(cookie.categories);
        },
        // 'changedCategories' is included in the type but ignored in the body
        onChange: ({ cookie }: { cookie: CookieValue, changedCategories: string[] }) => { 
          updateGtagConsent(cookie.categories);
        },
      };
      
      run(config);
    }
  }, []);

  return null;
}