'use client';

import { useState, useEffect } from 'react'
import { useAppContext } from '@/context/AppContext';
import Artwork from './Artwork';

const ArtworkGrid = () => {
  const { filteredArt } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  useEffect(() => {
    if (filteredArt) {
      setIsLoading(false)
    }
  }, [filteredArt])

  if (isLoading) {
    return (
      <div className="home__loading">
        <div className="home__loading-spinner"></div>
      </div>
    );
  }

  if (filteredArt.length === 0) {
    return (
      <div className="home__empty">
        <div className="home__empty-icon">🔍</div>
        <h3 className="home__empty-title">No artwork found</h3>
        <p className="home__empty-text">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="artwork__grid">
      {filteredArt.map((artwork) => (
        <Artwork 
          key={artwork.databaseId} 
          artwork={artwork} 
        />
      ))}
    </div>
  );
};

export default ArtworkGrid;
