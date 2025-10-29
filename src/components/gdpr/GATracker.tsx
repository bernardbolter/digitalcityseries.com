'use client';

import Script from 'next/script'
import { Fragment } from 'react'
import { useLocale } from 'next-intl'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export function GATracker() {
  const locale = useLocale()
  
  if (!GA_MEASUREMENT_ID) {
    console.warn('🟥 [GATracker] No GA_MEASUREMENT_ID found');
    return null;
  }

  return (
    <Fragment>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: false,
              dimension1: '${locale}',
              dimension2: navigator.language
            });
            console.log('🟦 [GATracker] gtag initialized:', typeof window.gtag);
          `,
        }}
      />
    </Fragment>
  );
}