// components/GATracker.tsx
import Script from 'next/script';
import { Fragment } from 'react';

// Your Google Analytics / Tag Manager Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export function GATracker() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <Fragment>
      {/* 1. Load the gtag script after interactive (Client Component behavior) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      {/* 2. Initialize gtag and set default consent to 'denied' */}
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            // --- Google Analytics Consent Mode: Default State ---
            // ALL non-essential storage is denied by default (GDPR requirement)
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500 // Wait for a quick update from the banner
            });

            // This fires the initial pageview, but GA will only store it
            // if analytics_storage is granted (via the banner update)
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </Fragment>
  );
}