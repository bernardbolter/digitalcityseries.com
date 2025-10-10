'use client';

import CookieConsent from 'react-cookie-consent';
import { useMessages } from 'next-intl';

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

const updateGtagConsent = (accepted: boolean) => {
  console.log('🟪 [updateGtagConsent] analytics accepted:', accepted);
  window.gtag?.('consent', 'update', {
    ad_storage: 'denied',
    analytics_storage: accepted ? 'granted' : 'denied'
  });
};

export default function CookieConsentManager() {
  // const locale = useLocale();
  const messages = useMessages();

const translations = (messages?.cookieConsent as {
    message?: string;
    acceptButton?: string;
    declineButton?: string;
    learnMore?: string;
  }) || {
    message: 'This website uses cookies to ensure basic functionality and to analyze usage. By clicking "Accept", you agree to the use of analytics cookies.',
    acceptButton: 'Accept',
    declineButton: 'Decline',
    learnMore: 'Learn more'
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText={translations.acceptButton}
      declineButtonText={translations.declineButton}
      cookieName="digitalCitySeriesAnalyticsConsent"
      onAccept={() => updateGtagConsent(true)}
      onDecline={() => updateGtagConsent(false)}
      enableDeclineButton
      containerClasses='consent__container'
      buttonClasses='consent__button'
      declineButtonClasses='consent__button--decline'
      expires={150}
    >
      {translations.message}
    </CookieConsent>
  );
}