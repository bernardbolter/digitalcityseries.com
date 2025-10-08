'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ArtworkNode } from '@/types/artworkTypes';
import { shuffleArray } from '@/helpers';

interface AppContextState {
  artlist: ArtworkNode[];
  filteredArt: ArtworkNode[];
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
  selectArtwork: (id: number) => void;
}

const AppContext = createContext<AppContextState | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  initialArtwork: ArtworkNode[]; // Data passed from server
}

export const AppProvider = ({ children, initialArtwork }: AppProviderProps) => {
  const [artlist] = useState<ArtworkNode[]>(initialArtwork);
  const [filteredArt, setFilteredArt] = useState<ArtworkNode[]>(initialArtwork);
  const [filter, setFilter] = useState<string>('');
  const [widthOfWindow, setWidthOfWindow] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  const [latestChecked, setLatestChecked] = useState<boolean>(true);
  const [oldestChecked, setOldestChecked] = useState<boolean>(false);
  const [randomChecked, setRandomChecked] = useState<boolean>(false);
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [paintingsOpen, setPaintingsOpen] = useState<boolean>(false);

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

  // Apply sorting when sort options change
  useEffect(() => {
    let newFilteredArt = [...artlist];

    // Apply text filter if needed
    if (filter) {
      newFilteredArt = newFilteredArt.filter(artwork => {
        const searchStr = filter.toLowerCase();
        return (
          artwork.title?.toLowerCase().includes(searchStr) ||
          artwork.artworkFields?.city?.toLowerCase().includes(searchStr) ||
          artwork.artworkFields?.country?.toLowerCase().includes(searchStr)
        );
      });
    }

    // Apply sorting
    if (latestChecked) {
      newFilteredArt.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        const yearA = parseInt(a.artworkFields?.year || '0');
        const yearB = parseInt(b.artworkFields?.year || '0');
        
        if (dateA && dateB) {
          return dateB - dateA;
        }
        return yearB - yearA;
      });
    } else if (oldestChecked) {
      newFilteredArt.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
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
  }, [artlist, latestChecked, oldestChecked, randomChecked, filter]);

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
    setAboutOpen(!aboutOpen);
  };

  const togglePaintings = () => {
    setPaintingsOpen(!paintingsOpen);
  };

  const selectArtwork = (id: number) => {
    setFilteredArt(currentFilteredArt => {
      const selectedArtworkIndex = currentFilteredArt.findIndex(
        artwork => artwork.databaseId === id
      );
      if (selectedArtworkIndex === -1) {
        return currentFilteredArt;
      }

      const newArray = [...currentFilteredArt];
      const [selectedArtwork] = newArray.splice(selectedArtworkIndex, 1);
      newArray.unshift(selectedArtwork);
      
      return newArray;
    });
  };

  const value = {
    artlist,
    filteredArt,
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
    selectArtwork,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};