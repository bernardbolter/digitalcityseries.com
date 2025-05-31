'use client';

import React, { useEffect, useState } from 'react';
import LoadingScreen from './ui/LoadingScreen';
import { usePathname, useSearchParams } from 'next/navigation';

interface ClientWrapperProps {
  children: React.ReactNode;
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Track route changes to trigger loading screen
  useEffect(() => {
    // This effect runs on route changes
    // The LoadingScreen component will handle showing/hiding based on its props
  }, [pathname, searchParams]);
  
  return (
    <>
      <LoadingScreen showOnRouteChange={true} />
      {/* Add SEO-friendly noscript fallback for search engines */}
      <noscript>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          This website works best with JavaScript enabled.
        </div>
      </noscript>
      {children}
    </>
  );
};

export default ClientWrapper;
