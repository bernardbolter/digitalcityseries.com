"use client";

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import DraggableArtwork from './DraggableArtwork'
import LoadingImage from '@/components/ui/LoadingImage'

import HandDrag from '@/svg/HandDrag'
import PlusSvg from '@/svg/PlusSvg'
import { toCamelCase } from '@/helpers'

import { ArtworkNode } from '@/types/artworkTypes'

interface ArtworkProps  {
  artwork: ArtworkNode
}

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
  const t = useTranslations()
  const [selectArtworkView, setSelectArtworkView] = useState<string>('composite')
  const [fadeOut, setFadeOut] = useState<boolean>(false)
  const [toggleMagnify, setToggleMagnify] = useState<boolean>(false)

  const compositeContainerRef = useRef<HTMLDivElement>(null)

  const [handDragVisible, setHandDragVisible] = useState<boolean>(false)
  const [handDragCount, setHandDragCount] = useState<number>(0)
  
  // Separate loading states for each image type
  const [isLoadingComposite, setIsLoadingComposite] = useState<boolean>(true)
  const [isLoadingPhoto, setIsLoadingPhoto] = useState<boolean>(true)
  const [isLoadingSatellite, setIsLoadingSatellite] = useState<boolean>(true)
  
  // Track if we're transitioning to a new view
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)

  let handDragTimeoutId: NodeJS.Timeout | null;

  const translatedCityName = artwork.artworkFields?.city 
    ? t(`cities.${toCamelCase(artwork.artworkFields.city)}`)
    : '';
  
  const translatedCountryName = artwork.artworkFields?.country
    ? t(`countries.${toCamelCase(artwork.artworkFields.country)}`)
    : '';

  // SEO-friendly alt text generator
  const getAltText = (type: 'composite' | 'photo' | 'satellite' | 'flag') => {
    const cityCountry = `${translatedCityName}${translatedCountryName ? ', ' + translatedCountryName : ''}`;
    const fields = artwork.artworkFields;
    
    switch (type) {
      case 'composite':
        return t('artwork.alt.composite', { 
          city: cityCountry,
          year: fields?.year || ''
        });
      case 'photo':
        return t('artwork.alt.photo', { 
          city: cityCountry,
          title: fields?.dcsPhotoTitle || 'decisive moment'
        });
      case 'satellite':
        return t('artwork.alt.satellite', { city: cityCountry });
      case 'flag':
        return t('artwork.alt.flag', { country: translatedCountryName });
      default:
        return cityCountry;
    }
  };

  // --- Event Handlers ---
  const clickComposite = () => {
    setFadeOut(true);
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectArtworkView('composite');
      setToggleMagnify(false);
      setFadeOut(false);
      // Don't reset transitioning here - let the image onLoad do it
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
      setIsTransitioning(false); // Magnify doesn't need loading
    }, 500);
  };

  const clickHandDragVisible = () => {
    if (handDragCount === 0) {
      setHandDragVisible(true)
      handDragTimeoutId = setTimeout(() => {
        setHandDragVisible(false)
        setHandDragCount(1)
        clearTheTimeout(handDragTimeoutId)
      }, 4000)
    }
  }

  function clearTheTimeout(handDragTimeoutId: NodeJS.Timeout | null): void {
    if (handDragTimeoutId !== null) {
      clearTimeout(handDragTimeoutId);
    }
  }

  const clickSatellite = () => {
    setFadeOut(true);
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectArtworkView('satellite');
      setToggleMagnify(false);
      setFadeOut(false);
    }, 500);
  };

  const clickPhoto = () => {
    setFadeOut(true);
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectArtworkView('photo');
      setToggleMagnify(false);
      setFadeOut(false);
    }, 500);
  };

  // --- Helper Rendering Functions ---
  const showCompositeImage = () => { 
    const compositeData = artwork.artworkFields?.artworkImage?.node
    const photoData = artwork.artworkFields?.dcsPhoto?.node
    const satelliteData = artwork.artworkFields?.dcsSatellite?.node
    const rawData = artwork.artworkFields?.dcsRaw?.node

    if (selectArtworkView === 'magnify') {
      return (
        <DraggableArtwork
          src={compositeData?.sourceUrl || '' }
          artworkContainerRef={compositeContainerRef}
          alt={getAltText('composite')}
        />
      )
    } else if (selectArtworkView === 'photo') {
      const showLoading = isLoadingPhoto || isTransitioning;
      return (
        <>
          {showLoading && (
            <LoadingImage loadingImageText={t('artwork.loading.photo') || 'loading photo image'} />
          )}
          {photoData?.sourceUrl && (
            <Image
              src={photoData.sourceUrl}
              alt={getAltText('photo')}
              width={photoData.mediaDetails?.width || 1200}
              height={photoData.mediaDetails?.height || 1200}
              sizes={getResponsiveSizes('main')}
              priority
              quality={90}
              onLoad={() => {
                setIsLoadingPhoto(false);
                setIsTransitioning(false);
              }}
              onError={() => {
                handleImageError(photoData.sourceUrl, 'photo')
                setIsLoadingPhoto(false);
                setIsTransitioning(false);
              }}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                display: showLoading ? 'none' : 'block'
              }}
            />
          )}
        </>
      )
    } else if (selectArtworkView === 'satellite') {
      const showLoading = isLoadingSatellite || isTransitioning;
      return (
        <>
          {showLoading && (
            <LoadingImage loadingImageText={t('artwork.loading.satellite') || 'loading satellite image'} />
          )}
          {satelliteData?.sourceUrl && (
            <Image
              src={satelliteData.sourceUrl}
              alt={getAltText('satellite')}
              width={satelliteData.mediaDetails?.width || 1200}
              height={satelliteData.mediaDetails?.height || 1200}
              sizes={getResponsiveSizes('main')}
              priority
              quality={90}
              onLoad={() => {
                setIsLoadingSatellite(false);
                setIsTransitioning(false);
              }}
              onError={() => {
                handleImageError(satelliteData.sourceUrl, 'satellite')
                setIsLoadingSatellite(false);
                setIsTransitioning(false);
              }}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                display: showLoading ? 'none' : 'block'
              }}
            />
          )}
        </>
      )
    } else if (selectArtworkView === 'raw') {
      return (
        <>
          {rawData?.sourceUrl && (
            <Image
              src={rawData.sourceUrl}
              alt={getAltText('composite')}
              width={rawData.mediaDetails?.width || 1200}
              height={rawData.mediaDetails?.height || 1200}
              sizes={getResponsiveSizes('main')}
              priority
              quality={90}
              onError={() => handleImageError(rawData.sourceUrl, 'raw')}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          )}
        </>
      )
    } else {
      const showLoading = isLoadingComposite || isTransitioning;
      return (
        <>
          {showLoading && (
            <LoadingImage loadingImageText={t('artwork.loading.composite') || 'loading composite image'} />
          )}
          {compositeData?.sourceUrl && (
            <Image
              src={compositeData.sourceUrl}
              alt={getAltText('composite')}
              width={compositeData.mediaDetails?.width || 1200}
              height={compositeData.mediaDetails?.height || 1200}
              sizes={getResponsiveSizes('main')}
              priority
              quality={90}
              onLoad={() => {
                setIsLoadingComposite(false);
                setIsTransitioning(false);
              }}
              onError={() => {
                handleImageError(compositeData.sourceUrl, 'composite')
                setIsLoadingComposite(false);
                setIsTransitioning(false);
              }}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                display: showLoading ? 'none' : 'block'
              }}
            />
          )}
        </>
      )
    }
  };

  const showMagnifyButtonAndInfo = () => {
    if (selectArtworkView === 'composite') {
      return (
        <button 
          className="magnify-button"
          onClick={() => {
            clickMagnify()
            clickHandDragVisible()
          }}
          aria-label={t('artwork.magnifyButton') || 'Magnify image'}
          type="button"
        >
          <svg className={toggleMagnify ? 'magnify-svg magnify-svg-on' : 'magnify-svg'} id="magnify-svg-button" height="40px" width="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line id="magnify-svg-vertical-line" stroke="currentColor" strokeWidth="2" x1={24} y1={12} x2={24} y2={22} />
            <line id="magnify-svg-horizontal-line" stroke="currentColor" strokeWidth="2" x1={19} y1={17} x2={29} y2={17} />
            <line id="magnify-svg-handle-line" stroke="currentColor" strokeWidth="2" x1={17} y1={23} x2={8} y2={32} />
            <circle id="magnify-svg-circle" cx="24" cy="17" r="10" fill="transparent" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      );
    } else if (selectArtworkView === 'magnify') {
      return (
        <>
          <button 
            className="magnify-button" 
            onClick={clickMagnify}
            aria-label={t('artwork.closeButton') || 'Close magnified view'}
            type="button"
          >
            <svg className={toggleMagnify ? 'magnify-svg magnify-svg-on' : 'magnify-svg'} id="magnify-svg-button" height="40px" width="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <line id="magnify-svg-vertical-line" stroke="currentColor" strokeWidth="2" x1={24} y1={12} x2={24} y2={22} />
              <line id="magnify-svg-horizontal-line" stroke="currentColor" strokeWidth="2" x1={19} y1={17} x2={29} y2={17} />
              <line id="magnify-svg-handle-line" stroke="currentColor" strokeWidth="2" x1={17} y1={23} x2={8} y2={32} />
              <circle id="magnify-svg-circle" cx="24" cy="17" r="10" fill="transparent" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          {handDragVisible && (
            <div className="drag-hand-container" aria-hidden="true">
              <HandDrag />
            </div>
          )}
        </>
      );
    }
    return null;
  };

  const showSatelliteViewExtras = () => {
    const satelliteData = artwork.artworkFields?.dcsSatellite?.node

    if (selectArtworkView === 'composite') {
      return (
        <button 
          className="artwork-satellite"
          onClick={clickSatellite}
          aria-label={t('artwork.viewSatellite') || 'View satellite image'}
          type="button"
        >
          {satelliteData?.sourceUrl && (
            <Image
              src={satelliteData.sourceUrl}
              alt={getAltText('satellite')}
              width={satelliteData.mediaDetails?.width || 300}
              height={satelliteData.mediaDetails?.height || 300}
              sizes={getResponsiveSizes('thumbnail')}
              quality={75}
              onError={() => handleImageError(satelliteData.sourceUrl, 'satellite')}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          )}
          <div className="artwork-satellite__magnify">
            <PlusSvg />
          </div>
        </button>
      );
    } else if (selectArtworkView === 'magnify') {
      return null;
    } else if (selectArtworkView === 'satellite' || selectArtworkView === 'photo') {
      return (
        <button 
          className="close-button-container" 
          onClick={clickComposite}
          aria-label={t('artwork.closeButton') || 'Close and return to composite view'}
          type="button"
        >
          <svg className='close-button-svg' id="close-button-svg-button" height="40px" width="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line id="close-button-svg-cross-one" stroke="currentColor" strokeWidth="2" x1={15} y1={25} x2={25} y2={15} />
            <line id="close-button-svg-cross-two" stroke="currentColor" strokeWidth="2" x1={25} y1={25} x2={15} y2={15} />
            <circle id="close-button-svg-circle" cx="20" cy="20" r="16" fill="transparent" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      );
    }
    return null;
  };

  const showPhotoViewExtras = () => {
    const photoData = artwork.artworkFields?.dcsPhoto?.node;
    const fields = artwork.artworkFields

    if (selectArtworkView === 'composite') {
      return (
        <button 
          className="artwork-photo" 
          onClick={clickPhoto}
          aria-label={t('artwork.viewPhoto') || 'View decisive moment photograph'}
          type="button"
        >
          {photoData?.sourceUrl && (
            <Image
              src={photoData.sourceUrl}
              alt={getAltText('photo')}
              width={photoData.mediaDetails?.width || 300}
              height={photoData.mediaDetails?.height || 300}
              sizes={getResponsiveSizes('thumbnail')}
              quality={75}
              onError={() => handleImageError(photoData.sourceUrl, 'photo')}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          )}
          <div className="artwork-satellite__magnify">
            <PlusSvg />
          </div>
        </button>
      );
    } else if (selectArtworkView === 'magnify') {
      return (
        <div className={fields?.dcsRaw?.node?.sourceUrl ? 'artwork-composite-info' : 'artwork-composite-info artwork-composite-full'}>
          <h2>{t('artwork.compositeTitle') || 'Composite City Portrait'}</h2>
          <h3>{`${fields?.width || ''} x ${fields?.height || ''}`} | {fields?.year || 'N/A'}</h3>
          <h4>{t('artwork.digitalPhotography') || 'Digital Photography'}</h4>
          <h4>{t('artwork.edition') || 'Edition of 3'}</h4> 
          <p>{(t('artwork.available') || 'Available')}</p>
          <p>{t('artwork.contactForDetails') || 'Contact for details'}</p>
        </div> 
      )
    } else if (selectArtworkView === 'satellite') {
      return (
        <div className="city-info">
          <p>{t('artwork.coordinates') || 'Coordinates'}: {fields?.coordinates || 'N/A'}</p>
          <p>{t('artwork.area') || 'Area'}: {fields?.area || 'N/A'}</p>
          <p>{t('artwork.population') || 'Population'}: {fields?.population || 'N/A'}</p>
          <p>{t('artwork.density') || 'Density'}: {fields?.density || 'N/A'}</p>
          <p>{t('artwork.elevation') || 'Elevation'}: {fields?.elevation || 'N/A'}</p>
        </div>
      );
    } else if (selectArtworkView === 'photo') {
      return (
        <div className="photo-info">
          <h2>&quot;{fields?.dcsPhotoTitle || t('artwork.photograph') || 'Photograph'}&quot;</h2>
          <h4>{t('artwork.decisiveMoment') || 'The Decisive Moment Photograph'}</h4>
          <h3>{fields?.year || 'N/A'}</h3>
        </div>
      );
    }
    return null;
  };

  // --- Main Render ---
  return (
    <section 
      className="artwork"
    >
      <div className="artwork-header">
        <div className="artwork-title">
          <h1>{translatedCityName} <span>{translatedCountryName}</span></h1>
        </div>
        {artwork.artworkFields?.dcsFlags?.node?.sourceUrl && (
          <Image
            src={artwork.artworkFields.dcsFlags.node.sourceUrl}
            alt={getAltText('flag')}
            width={artwork.artworkFields.dcsFlags.node.mediaDetails?.width || 200}
            height={artwork.artworkFields.dcsFlags.node.mediaDetails?.height || 133}
            sizes="200px"
            quality={85}
          />
        )}
      </div>
      <div className={`artwork-container ${toggleMagnify ? 'artwork-container--magnified' : ''}`}>
        <div 
          className={
            fadeOut 
            ? 'artwork-composite artwork-composite-fade' 
            : 'artwork-composite'}
          ref={compositeContainerRef}
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