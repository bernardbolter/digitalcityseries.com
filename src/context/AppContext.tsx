'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { filter, shuffle, isEmpty } from 'lodash';

// Define types for our artwork data
interface Artwork {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    city: string;
    year: string;
    dimensions: string;
    medium: string;
    description: string;
    artwork_image: string;
  };
  series: string;
}

// Define the context state type
interface AppContextState {
  artlist: Artwork[];
  isLoading: boolean;
  filter: string;
  widthOfWindow: number;
  recentChecked: boolean;
  ogChecked: boolean;
  randomChecked: boolean;
  aboutSection: boolean;
  searchButton: boolean;
  filteredArt: Artwork[];
  setFilter: (filter: string) => void;
  toggleRecent: () => void;
  toggleOg: () => void;
  toggleRandom: () => void;
  toggleAbout: () => void;
  toggleSearch: () => void;
}

// Create the context with default values
const AppContext = createContext<AppContextState | undefined>(undefined);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [artlist, setArtlist] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('');
  const [widthOfWindow, setWidthOfWindow] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const [recentChecked, setRecentChecked] = useState<boolean>(true);
  const [ogChecked, setOgChecked] = useState<boolean>(false);
  const [randomChecked, setRandomChecked] = useState<boolean>(false);
  const [aboutSection, setAboutSection] = useState<boolean>(false);
  const [searchButton, setSearchButton] = useState<boolean>(false);

  // Load artwork data
  useEffect(() => {
    const loadArtwork = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://www.bernardbolter.com/artwork/wp-json/wp/v2/artwork?per_page=100');
        const dcsArtwork = filter(response.data, { series: 'dcs' });
        setArtlist(dcsArtwork);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading artwork:', error);
        setIsLoading(false);
      }
    };

    loadArtwork();
  }, []);

  // Handle window resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWidthOfWindow(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Toggle functions
  const toggleRecent = () => {
    setRecentChecked(true);
    setOgChecked(false);
    setRandomChecked(false);
  };

  const toggleOg = () => {
    setRecentChecked(false);
    setOgChecked(true);
    setRandomChecked(false);
  };

  const toggleRandom = () => {
    setRecentChecked(false);
    setOgChecked(false);
    setRandomChecked(true);
  };

  const toggleAbout = () => {
    setAboutSection(!aboutSection);
  };

  const toggleSearch = () => {
    setSearchButton(!searchButton);
    if (isEmpty(filteredArt)) {
      setFilter('');
    }
  };

  // Compute filtered artwork
  const filteredArt = (() => {
    const matchesFilter = new RegExp(filter, 'i');
    let artworkFiltered = artlist.filter(
      art => !filter || matchesFilter.test(art.title.rendered)
    );
    
    if (ogChecked) {
      return [...artworkFiltered].reverse();
    } else if (randomChecked) {
      return shuffle(artworkFiltered);
    } else {
      return artworkFiltered;
    }
  })();

  // Context value
  const value = {
    artlist,
    isLoading,
    filter,
    widthOfWindow,
    recentChecked,
    ogChecked,
    randomChecked,
    aboutSection,
    searchButton,
    filteredArt,
    setFilter,
    toggleRecent,
    toggleOg,
    toggleRandom,
    toggleAbout,
    toggleSearch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
