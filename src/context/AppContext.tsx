'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, gql } from '@apollo/client';
import { filter, shuffle, isEmpty } from 'lodash';
import { client } from '../lib/apollo-client';
import { GET_ARTWORK } from '../graphql/queries';

// Define types for our artwork data
interface Artwork {
  id: string;
  title: string;
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
  searchSection: boolean;
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
  const [filteredArt, setFilteredArt] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('');
  const [widthOfWindow, setWidthOfWindow] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );


  const [recentChecked, setRecentChecked] = useState<boolean>(true);
  const [ogChecked, setOgChecked] = useState<boolean>(false);
  const [randomChecked, setRandomChecked] = useState<boolean>(false);
  const [aboutSection, setAboutSection] = useState<boolean>(false);
  const [searchSection, setSearchSection] = useState<boolean>(false);

  // GraphQL query to fetch artwork data
  const { loading, error, data } = useQuery(GET_ARTWORK, {
    client,
    fetchPolicy: 'cache-first'
  });

  // Update artlist when data is loaded
  useEffect(() => {
    if (data?.allArtwork?.nodes) {
      setArtlist(data.allArtwork.nodes);
      setFilteredArt(data.allArtwork.nodes);
    }
    setIsLoading(loading);
    
    if (error) {
      console.error('Error loading artwork:', error);
    }
  }, [data, loading, error]);

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
    setSearchSection(!searchSection);
  };

  // Compute filtered artwork
  // const filteredArt = (() => {
  //   const matchesFilter = new RegExp(filter, 'i');
  //   let artworkFiltered = artlist.filter(art => {
  //     const title = art.title || '';
  //     return !filter || matchesFilter.test(title);
  //   });
    
  //   if (ogChecked) {
  //     return [...artworkFiltered].reverse();
  //   } else if (randomChecked) {
  //     return shuffle(artworkFiltered);
  //   } else {
  //     return artworkFiltered;
  //   }
  // })();

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
    searchSection,
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
