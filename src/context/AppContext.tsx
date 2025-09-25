'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery } from '@apollo/client';
import { client } from '../lib/apollo-client';
import { GET_ARTWORK } from '../graphql/queries';
import { ArtworkNode } from '@/types/artworkTypes';
import { shuffleArray } from '@/helpers';

// Define the context state type
interface AppContextState {
  artlist: ArtworkNode[];
  filteredArt: ArtworkNode[];
  isLoading: boolean;
  filter: string;
  widthOfWindow: number;

  latestChecked: boolean;
  oldestChecked: boolean;
  randomChecked: boolean;
  aboutOpen: boolean;
  paintingsOpen: boolean;

  setFilter: (filter: string) => void;
  toggleLatest: () => void;
  toggleOldest: () => void;
  toggleRandom: () => void;
  toggleAbout: () => void;
  togglePaintings: () => void;
  selectArtwork: (id: string) => void;
}

// Create the context with default values
const AppContext = createContext<AppContextState | undefined>(undefined);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [artlist, setArtlist] = useState<ArtworkNode[]>([]);
  const [filteredArt, setFilteredArt] = useState<ArtworkNode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('');
  const [widthOfWindow, setWidthOfWindow] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  const [latestChecked, setLatestChecked] = useState<boolean>(true);
  const [oldestChecked, setOldestChecked] = useState<boolean>(false);
  const [randomChecked, setRandomChecked] = useState<boolean>(false);
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [paintingsOpen, setPaintingsOpen] = useState<boolean>(false);

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

  useEffect(() => {
    let newFilteredArt = [...artlist];

    if (latestChecked) {
      newFilteredArt.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        const yearA = parseInt(a.artworkFields?.year || '0');
        const yearB = parseInt(b.artworkFields?.year || '0');
        
        if (dateA && dateB) {
            return dateB - dateA;
        }
        return yearB - yearA;
      });
    } else if (oldestChecked) {
      newFilteredArt.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        const yearA = parseInt(a.artworkFields?.year || '0');
        const yearB = parseInt(b.artworkFields?.year || '0');
        
        if (dateA && dateB) {
            return dateA - dateB;
        }
        return yearA - yearB;
      });
    } else if (randomChecked) {
      newFilteredArt = shuffleArray(newFilteredArt);
    }

    setFilteredArt(newFilteredArt);

  }, [artlist, latestChecked, oldestChecked, randomChecked]);

  // Toggle functions
  const toggleLatest = () => {
    setLatestChecked(true);
    setOldestChecked(false);
    setRandomChecked(false);
  };

  const toggleOldest = () => {
    setLatestChecked(false);
    setOldestChecked(true);
    setRandomChecked(false);
  };

  const toggleRandom = () => {
    setLatestChecked(false);
    setOldestChecked(false);
    setRandomChecked(true);
  };

  const toggleAbout = () => {
    console.log('toggled about')
    setAboutOpen(!aboutOpen);
  };

  const togglePaintings = () => {
    console.log('toggled paintings')
    setPaintingsOpen(!paintingsOpen);
  };

  const selectArtwork = (id: string) => {
    setFilteredArt(currentFilteredArt => {
      const selectedArtworkIndex = currentFilteredArt.findIndex(artwork => artwork.id === id);
      if (selectedArtworkIndex === -1) {
        return currentFilteredArt;
      }

      const newArray = [...currentFilteredArt];
      const [selectedArtwork] = newArray.splice(selectedArtworkIndex, 1);
      newArray.unshift(selectedArtwork);
      
      return newArray;
    });
  };


  // Context value
  const value = {
    artlist,
    filteredArt,
    isLoading,
    filter,
    widthOfWindow,
    latestChecked,
    oldestChecked,
    randomChecked,
    aboutOpen,
    paintingsOpen,
    setFilter,
    toggleLatest,
    toggleOldest,
    toggleRandom,
    toggleAbout,
    togglePaintings,
    selectArtwork
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
