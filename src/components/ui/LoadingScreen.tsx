'use client';

import React, { useEffect, useState } from 'react';
import { useLocale } from 'next-intl'

interface LoadingScreenProps {
  minDisplayTime?: number; // Minimum time to display the loading screen in ms
  showOnRouteChange?: boolean; // Whether to show on route changes
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  minDisplayTime = 800, // Default minimum display time is 800ms
  showOnRouteChange = true
}) => {
  const [isLoading, setIsLoading] = useState(false); // Start as false for SEO
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const locale = useLocale();
  
  // Handle initial page load
  useEffect(() => {
    // Only show loading indicator after hydration
    if (typeof window !== 'undefined') {
      // Check if content is still loading
      const contentStillLoading = document.readyState !== 'complete';
      
      if (contentStillLoading) {
        setIsLoading(true);
        
        const handleLoadComplete = () => {
          // Keep loading screen visible for minimum time
          setTimeout(() => {
            setIsLoading(false);
            setIsFirstLoad(false);
          }, minDisplayTime);
        };
        
        if (document.readyState === 'complete') {
          handleLoadComplete();
        } else {
          window.addEventListener('load', handleLoadComplete);
          
          // Fallback timer
          const fallbackTimer = setTimeout(() => {
            setIsLoading(false);
            setIsFirstLoad(false);
          }, 3000); // 3 second maximum for initial load
          
          return () => {
            window.removeEventListener('load', handleLoadComplete);
            clearTimeout(fallbackTimer);
          };
        }
      } else {
        // Content already loaded
        setIsFirstLoad(false);
      }
    }
  }, [minDisplayTime]);
  
  // Show loading screen on language changes
  useEffect(() => {
    if (!isFirstLoad && showOnRouteChange) {
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, minDisplayTime);
      
      return () => clearTimeout(timer);
    }
  }, [locale, isFirstLoad, showOnRouteChange, minDisplayTime]);
  
  // Don't render anything if not loading
  if (!isLoading) return null;
  
  return (
    <div className="loading-screen" aria-live="polite" role="status">
      <div className="loading-screen__content">
        <div className="loading-screen__logo">
          <div className="loading-screen__logo-text">DIGITAL CITY SERIES</div>
        </div>
        <div className="loading-screen__globe">
          <img src="/images/globe.gif" alt="Globe" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
