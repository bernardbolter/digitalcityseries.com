"use client";

import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import NextImage from 'next/image';
// ReactResizeDetector import removed

interface ArtworkImageProps {
  imageSRC: string | null; // This will be the srcSet string or a single URL
  dragOn: boolean;
  view: string;
}

const ArtworkImage: React.FC<ArtworkImageProps> = (props) => {
    // console.log("imageSRC", props.imageSRC);
    // console.log('props', props);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [draggableBoundsValue, setDraggableBoundsValue] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const [imageURLToRender, setImageURLToRender] = useState<string | null>(null);
  // const [isGlobePreloader, setIsGlobePreloader] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Renamed handleResize to updateWindowWidth and simplified
  const updateWindowWidth = () => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  };

  // Effect for managing window resize listener
  useEffect(() => {
    if (typeof window !== 'undefined') {
      updateWindowWidth(); // Initial call to set width
      window.addEventListener('resize', updateWindowWidth);
      return () => {
        window.removeEventListener('resize', updateWindowWidth);
      };
    }
  }, []); // Empty dependency array: runs once on mount, cleans up on unmount

  // Effect for calculating draggable bounds based on windowWidth
  useEffect(() => {
    let offsetCalc: number;
    if (windowWidth > 899) {
      offsetCalc = (1500 - windowWidth * 0.62) / 2;
    } else {
      offsetCalc = (1000 - windowWidth * 0.94) / 2;
    }
    setDraggableBoundsValue({
      left: -offsetCalc,
      right: offsetCalc,
      top: -offsetCalc,
      bottom: offsetCalc,
    });
  }, [windowWidth]);

  // Effect for setting the image URL to render and resetting loading/error states
  useEffect(() => {
    if (props.imageSRC) {
      setImageURLToRender(props.imageSRC);
      setIsLoading(true);
      setHasError(false);
    } else {
      setImageURLToRender(null);
      setIsLoading(false);
      setHasError(true); // No src means it's an error or "no image" state
    }
  }, [props.imageSRC]);

  // Effect for setting the preloader type
  // useEffect(() => {
  //   const compositeViews = ['composite', 'magnify', 'satellite', 'photo'];
  //   if (compositeViews.includes(props.view)) {
  //     setIsGlobePreloader(true);
  //   } else {
  //     setIsGlobePreloader(false);
  //   }
  // }, [props.view]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const currentSrc = imageURLToRender;

  const customLoaderUI = (
    <div className='image-loader-container'>
      <img alt="Loading..." src='./images/globe.gif' />
      <p>loading image...</p>
    </div>
  );

  const customUnloaderUI = (
    <div className='image-loader-container-unable'>
      <img alt="Failed to load" src='./images/globe.gif' />
      <p>unable to load image, try to refresh or come back later, sorry, I&apos;m just an artist :-)</p>
    </div>
  );
  
  const imageComponent = currentSrc && !hasError ? (
    <NextImage
      key={currentSrc} 
      src={currentSrc} // next/image can handle srcSet here if currentSrc is a srcSet string
      layout="fill"
      objectFit="contain" 
      // draggable prop does not exist on NextImage, dragging is handled by parent Draggable component
      onLoadingComplete={handleLoadingComplete}
      onError={handleError}
      alt={props.view || "Artwork image"}
      priority={props.view === 'composite-composite'} // Example: prioritize main composite image
    />
  ) : null;

  if (props.dragOn) {
    return (
      <div className="composite-container" style={{ position: 'relative' }}>
        {/* ReactResizeDetector removed */}
        {isLoading && customLoaderUI}
        {!isLoading && hasError && customUnloaderUI}
        <Draggable bounds={draggableBoundsValue} disabled={!currentSrc || isLoading || hasError}>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {imageComponent}
          </div>
        </Draggable>
      </div>
    );
  } else {
    return (
      <div className="image-container" style={{ position: 'relative' }}>
        {/* ReactResizeDetector removed */}
        {isLoading && customLoaderUI}
        {!isLoading && hasError && customUnloaderUI}
        {/* Render imageComponent directly only if not loading and no error */}
        {!isLoading && !hasError && imageComponent}
      </div>
    );
  }
};

export default ArtworkImage;
