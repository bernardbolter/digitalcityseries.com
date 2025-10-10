// translations.ts

import { Translation } from 'vanilla-cookieconsent';

// --- ENGLISH TRANSLATION ---
export const enTranslation: Translation = {
  consentModal: {
    title: 'We use cookies',
    description:
      'We use essential cookies to run our website. With your consent, we will use non-essential cookies to improve your experience.',
    // FIX: Confirmed use of primaryBtn (camelCase)
    // primaryBtn: {
    //   text: 'Accept all',
    //   role: 'accept_all',
    // },
    // FIX: Confirmed use of secondaryBtn (camelCase)
    secondaryBtn: {
      text: 'Reject all',
      role: 'reject_all',
    },
  },
  settingsModal: {
    title: 'Cookie Preferences',
    // FIX: Confirmed use of camelCase for settings buttons
    saveSettingsBtn: 'Save Settings',
    acceptNecessaryBtn: 'Accept Only Necessary',
    acceptAllBtn: 'Accept All',
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
};

// --- GERMAN TRANSLATION ---
export const deTranslation: Translation = {
  consentModal: {
    title: 'Wir verwenden Cookies',
    description:
      'Wir verwenden notwendige Cookies, um unsere Website zu betreiben. Mit Ihrer Zustimmung verwenden wir zusätzliche Cookies, um Ihre Erfahrung zu verbessern.',
    // FIX: Confirmed use of primaryBtn (camelCase)
    primaryBtn: {
      text: 'Alle akzeptieren',
      role: 'accept_all',
    },
    // FIX: Confirmed use of secondaryBtn (camelCase)
    secondaryBtn: {
      text: 'Alle ablehnen',
      role: 'reject_all',
    },
  },
  settingsModal: {
    title: 'Cookie-Einstellungen',
    // FIX: Confirmed use of camelCase for settings buttons
    saveSettingsBtn: 'Einstellungen speichern',
    acceptNecessaryBtn: 'Nur Notwendige akzeptieren',
    acceptAllBtn: 'Alle akzeptieren',
    categories: [
      {
        category: 'necessary',
        read_only: true,
        text: 'Diese Cookies sind für die ordnungsgemäße Funktion der Website unerlässlich.',
      },
      {
        category: 'analytics',
        text: 'Analyse-Cookies werden verwendet, um das Nutzerverhalten zu verfolgen und die Leistung zu messen.',
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
};