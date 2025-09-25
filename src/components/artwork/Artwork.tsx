"use client";

import React, { useState, useRef } from 'react'
import { useLocale } from '@/context/LocaleContext';

import DraggableArtwork from './DraggableArtwork'
import LoadingImage from '@/components/ui/LoadingImage'

import HandDrag from '@/svg/HandDrag'
import { toCamelCase } from '@/helpers'

import { ArtworkProps } from '@/types/artworkTypes'


// Helper function to create responsive sizes attribute
const getResponsiveSizes = (type: 'main' | 'thumbnail' | 'flag') => {
  switch (type) {
    case 'main':
      return "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px";
    case 'thumbnail':
      return "(max-width: 768px) 50vw, 300px";
    case 'flag':
      return "200px";
    default:
      return "100vw";
  }
};

// Helper function to handle image loading errors
const handleImageError = (imageSrc: string, imageType: string) => {
  console.error(`Failed to load ${imageType} image:`, imageSrc);
};

// --- Functional Component ---
const Artwork: React.FC<ArtworkProps> = ({ artwork }) => {
  console.log(artwork)
  const { t } = useLocale();
  const [selectArtworkView, setSelectArtworkView] = useState<string>('composite')
  const [fadeOut, setFadeOut] = useState<boolean>(false)
  const [toggleMagnify, setToggleMagnify] = useState<boolean>(false)
  const artworkContainerRef = useRef<HTMLDivElement>(null)
  const [handDragVisible, setHandDragVisible] = useState<boolean>(false)
  const [handDragCount, setHandDragCount] = useState<number>(0)
  const [isLoadingMain, setIsLoadingMain] = useState<boolean>(true)
  let handDragTimeoutId: NodeJS.Timeout | null;

  const translatedCityName = t(`cities.${toCamelCase(artwork.artworkFields?.city)}`);
  let translatedCountryName
  if (artwork.artworkFields?.country) {
    translatedCountryName = t(`countries.${toCamelCase(artwork.artworkFields?.country)}`)
  } else {
    translatedCountryName = ''
  }
  

  // --- Event Handlers ---
  const clickComposite = () => {
    setFadeOut(true);
    setTimeout(() => {
      setSelectArtworkView('composite');
      setToggleMagnify(false); // Ensure magnify is off when returning to composite
      setFadeOut(false);
    }, 500);
  };

  const clickMagnify = () => {
    console.log("clicked magnify")
    setFadeOut(true);
    setTimeout(() => {
      if (!toggleMagnify) {
        setSelectArtworkView('magnify');
        setToggleMagnify(true);
      } else {
        setSelectArtworkView('composite');
        setToggleMagnify(false);
      }
      setFadeOut(false);

    }, 500);
  };

  const clickHandDragVisible = () => {
    if (handDragCount === 0) {
      setHandDragVisible(true)
      handDragTimeoutId = setTimeout(() => {
        setHandDragVisible(false)
        setHandDragCount(1)
        clearTheTimeout(handDragTimeoutId)
      }, 2000)
    }
  }

  function clearTheTimeout(handDragTimeoutId: NodeJS.Timeout | null): void {
    if (handDragTimeoutId !== null) {
        clearTimeout(handDragTimeoutId);
      }
    }

  const clickSatellite = () => {
    setFadeOut(true);
    setTimeout(() => {
      setSelectArtworkView('satellite');
      setToggleMagnify(false); // Ensure magnify is off
      setFadeOut(false);
    }, 500);
  };

  const clickPhoto = () => {
    setFadeOut(true);
    setTimeout(() => {
      setSelectArtworkView('photo');
      setToggleMagnify(false); // Ensure magnify is off
      setFadeOut(false);
    }, 500);
  };

  // --- Helper Rendering Functions ---
  const showCompositeImage = () => { 
    const compositeData = artwork.artworkFields?.artworkImage
    const photoData = artwork.artworkFields?.dcsPhoto
    const satelliteData = artwork.artworkFields?.dcsSatellite
    const rawData = artwork.artworkFields?.dcsRaw

    const handleMainLoad = () => {
      console.log('image loaded')
        setIsLoadingMain(false);
    };

    if (selectArtworkView === 'magnify') {
      return (
          <DraggableArtwork
            src={compositeData?.sourceUrl || '' }
            artworkContainerRef={artworkContainerRef}
            alt="new artwork"
          />
      )
    } else if (selectArtworkView === 'photo') {
      return (
          <>
            {isLoadingMain && <LoadingImage loadingImageText={'loading ' + selectArtworkView + ' image' } />}
            <img
              src={photoData?.sourceUrl || undefined}
              alt={artwork.title + ' decisive moment photograph'}
              srcSet={photoData?.srcSet || undefined}
              sizes={getResponsiveSizes('main')}
              loading="eager"
              decoding="async"
              onLoad={handleMainLoad}
              onError={() => {
                handleImageError(photoData?.sourceUrl || '', 'photo')
                handleMainLoad()
              }}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </>
      )
    } else if (selectArtworkView === 'satellite') {
      return (
          <>
            {isLoadingMain && <LoadingImage loadingImageText={'loading ' + selectArtworkView + ' image' } />}
              <img
                src={satelliteData?.sourceUrl || undefined}
                alt={artwork.title + ' satellite image'}
                srcSet={satelliteData?.srcSet || undefined}
                sizes={getResponsiveSizes('main')}
                loading="eager"
                decoding="async"
                onError={() => handleImageError(satelliteData?.sourceUrl || '', 'satellite')}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
          </>
      )
    } else if (selectArtworkView === 'raw') {
      return (
            <img
              src={rawData?.sourceUrl || undefined}
              alt={artwork.title + ' raw'}
              srcSet={rawData?.srcSet || undefined}
              sizes={getResponsiveSizes('main')}
              loading="eager"
              decoding="async"
              onError={() => handleImageError(rawData?.sourceUrl || '', 'raw')}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
      )
    } else {
      return (
          <>
            {isLoadingMain && <LoadingImage loadingImageText={'loading ' + selectArtworkView + ' image' } />}
            <img
              src={compositeData?.sourceUrl || undefined}
              alt={artwork.title + ' composite image'}
              srcSet={compositeData?.srcSet || undefined}
              sizes={getResponsiveSizes('main')}
              loading="lazy"
              decoding="async"
              onLoad={handleMainLoad}
              onError={() => {
                  handleImageError(compositeData?.sourceUrl || '', 'compositeData')
                  handleMainLoad()
                }}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </>
      )
    }
  };

  const showMagnifyButtonAndInfo = () => { // Renamed from showMagnify
    // const fields = artwork.artworkFields;
    if (selectArtworkView === 'composite') {
      return (
        <div 
          className="magnify-button" 
          onClick={() => {
            clickMagnify()
            clickHandDragVisible()
          }}
        >
          <svg className={toggleMagnify ? 'magnify-svg magnify-svg-on' : 'magnify-svg'} id="magnify-svg-button" height="40px" width="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <line id="magnify-svg-vertical-line" stroke="currentColor" strokeWidth="2" x1={24} y1={12} x2={24} y2={22} />
            <line id="magnify-svg-horizontal-line" stroke="currentColor" strokeWidth="2" x1={19} y1={17} x2={29} y2={17} />
            <line id="magnify-svg-handle-line" stroke="currentColor" strokeWidth="2" x1={17} y1={23} x2={8} y2={32} />
            <circle id="magnify-svg-circle" cx="24" cy="17" r="10" fill="transparent" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      );
    } else if (selectArtworkView === 'magnify') {
      // setHandDragVisible(true)
      return (
        <>
          <div 
            className="magnify-button" 
            onClick={clickMagnify}
          >
            <svg className={toggleMagnify ? 'magnify-svg magnify-svg-on' : 'magnify-svg'} id="magnify-svg-button" height="40px" width="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <line id="magnify-svg-vertical-line" stroke="currentColor" strokeWidth="2" x1={24} y1={12} x2={24} y2={22} />
              <line id="magnify-svg-horizontal-line" stroke="currentColor" strokeWidth="2" x1={19} y1={17} x2={29} y2={17} />
              <line id="magnify-svg-handle-line" stroke="currentColor" strokeWidth="2" x1={17} y1={23} x2={8} y2={32} />
              <circle id="magnify-svg-circle" cx="24" cy="17" r="10" fill="transparent" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          {handDragVisible && (
            <div className="drag-hand-container">
              <HandDrag />
            </div>
          )}
        </>
      );
    }
    return null;
  };

  const showSatelliteViewExtras = () => { // Renamed from showSatellite
    const satelliteData = artwork.artworkFields?.dcsSatellite

    if (selectArtworkView === 'composite') {
      return (
        <div 
          className="artwork-satellite" 
          onClick={clickSatellite}
        >
          <img
            src={satelliteData?.sourceUrl || undefined}
            alt={artwork.title + ' satellite image'}
            srcSet={satelliteData?.srcSet || undefined}
            sizes={getResponsiveSizes('thumbnail')}
            loading="lazy"
            decoding="async"
            onError={() => handleImageError(satelliteData?.sourceUrl || '', 'satellite')}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      );
    } else if (selectArtworkView === 'magnify') {
      return null; // Extras for magnify are handled by showPhotoViewExtras (raw image)
    } else if (selectArtworkView === 'satellite' || selectArtworkView === 'photo') {
      // Close button for satellite and photo views (when they are the main view)
      return (
        <div className="close-button-container" onClick={clickComposite}>
          <svg className='close-button-svg' id="close-button-svg-button" height="40px" width="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <line id="close-button-svg-cross-one" stroke="currentColor" strokeWidth="2" x1={15} y1={25} x2={25} y2={15} />
            <line id="close-button-svg-cross-two" stroke="currentColor" strokeWidth="2" x1={25} y1={25} x2={15} y2={15} />
            <circle id="close-button-svg-circle" cx="20" cy="20" r="16" fill="transparent" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      );
    }
    return null;
  };

  const showPhotoViewExtras = () => { // Renamed from showPhoto
    const photoData = artwork.artworkFields?.dcsPhoto;
    const fields = artwork.artworkFields

    if (selectArtworkView === 'composite') {
      return (
        <div className="artwork-photo" onClick={clickPhoto}>
          <img
            src={photoData?.sourceUrl || undefined}
            alt={artwork.title + ' decisive moment photo'}
            srcSet={photoData?.srcSet || undefined}
            sizes={getResponsiveSizes('thumbnail')}
            loading="lazy"
            decoding="async"
            onError={() => handleImageError(photoData?.sourceUrl || '', 'satellite')}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      );
    } else if (selectArtworkView === 'magnify') {
        return (
            <div className={fields?.dcsRaw?.sourceUrl ? 'artwork-composite-info' : 'artwork-composite-info artwork-composite-full'}>
              <h1>Composite City Portrait</h1>
              <h2>{`${fields?.width || ''} x ${fields?.height || ''}`} | {fields?.year || 'N/A'}</h2>
              <h3>{fields?.medium || 'Unknown Medium'}</h3>
              <h3>edition of 3</h3> 
              <h4>{fields?.forsale ? 'Available' : 'Not for sale'}</h4>
              <h4>Contact for details</h4>
            </div> 
        )
    } else if (selectArtworkView === 'satellite') {
      // City information for satellite view
      return (
        <div className="city-info">
          <p>Coordinates: {fields?.coordinates || 'N/A'}</p>
          <p>Area: {fields?.area || 'N/A'}</p>
          <p>Population: {fields?.population || 'N/A'}</p>
          <p>Density: {fields?.density || 'N/A'}</p>
          <p>Elevation: {fields?.elevation || 'N/A'}</p>
        </div>
      );
    } else if (selectArtworkView === 'photo') {
      // Photo details for photo view
      return (
        <div className="photo-info">
          <h2>&quot;{fields?.dcsPhotoTitle || 'Photograph'}&quot;</h2> {/* Using style as a placeholder for photo title */}
          <h4>The Decisive Moment Photograph</h4>
          <h3>{fields?.year || 'N/A'}</h3>
        </div>
      );
    }
    return null;
  };

  // --- Main Render ---
  return (
    <section className="artwork">
      <div className="artwork-header">
        <div className="artwork-title">
          <h1>{translatedCityName} <span>{translatedCountryName}</span></h1>
        </div>
        {artwork.artworkFields?.dcsFlags?.sourceUrl && (
          <img 
            src={artwork.artworkFields?.dcsFlags.sourceUrl} 
            alt={'flags from ' + artwork.title } 
          />
        )}
        
      </div>
      <div className="artwork-container">
        <div 
          className={
            fadeOut 
            ? 'artwork-composite artwork-composite-fade' 
            : 'artwork-composite'}
          ref={artworkContainerRef}
        >
          {showMagnifyButtonAndInfo()}
          {showCompositeImage()}
        </div>
        <div className={fadeOut ? 'artwork-extras artwork-extras-fade' : 'artwork-extras'}>
          {showSatelliteViewExtras()}
          {showPhotoViewExtras()}
        </div>
      </div>
    </section>
  );
};

export default Artwork;
