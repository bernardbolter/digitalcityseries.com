"use client";

import React, { useState, useEffect, useRef } from 'react';
import ArtworkImage from './ArtworkImage';
import DraggableArtwork from './DraggableArtwork';

// --- TypeScript Interfaces ---
interface ImageSrc {
  __typename: string;
  sourceUrl: string | null;
  srcSet: string | null;
  uri: string | null;
}

interface ArtworkLink {
  url: string;
  title: string;
  target: string;
}

interface ArtworkFields {
  __typename: string;
  area?: string | null;
  artworkImage?: ImageSrc | null;
  artworklink?: ArtworkLink | null;
  city?: string | null;
  coordinates?: string | null;
  country?: string | null;
  databaseId?: number | null;
  dcsFlags?: ImageSrc | null; // Note: Original plan used dcsSatellite for 2nd complementary. This is dcsFlags.
  dcsPhoto?: ImageSrc | null;
  dcsRaw?: ImageSrc | null;
  dcsSatellite?: ImageSrc | null;
  density?: string | null;
  elevation?: string | null;
  extraimages?: any[] | null;
  fieldGroupName?: string | null;
  forsale?: boolean | null;
  height?: string | null; // e.g., "48\""
  lat?: number | null;
  lng?: number | null;
  medium?: string | null;
  metadescription?: string | null;
  metakeywords?: string | null;
  orientation?: string | null;
  performance?: any | null;
  population?: string | null;
  proportion?: number | null;
  series?: string | null;
  size?: string | null; // e.g., "48 x 48 in"
  slug?: string | null;
  style?: string | null;
  width?: string | null; // e.g., "48\""
  year?: string | null;
}

interface ArtworkNode {
  id: string;
  title: string | null;
  artworkFields?: ArtworkFields | null;
  slug?: string | null;
  content?: string | null;
  databaseId?: number | null;
}

interface ArtworkProps {
  artwork: ArtworkNode;
}

interface ArtworkImageSources {
  composite: string | null;
  satellite: string | null;
  photo: string | null;
  raw: string | null;
  flags: string | null;
}

// --- Functional Component ---
const Artwork: React.FC<ArtworkProps> = ({ artwork }) => {
  const [selectArtworkView, setSelectArtworkView] = useState<string>('composite');
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [fadeRaw, setFadeRaw] = useState<boolean>(false);
  const [toggleMagnify, setToggleMagnify] = useState<boolean>(false);
  console.log("artwork", artwork);
  const artworkContainerRef = useRef<HTMLDivElement>(null);

  const [imageSources, setImageSources] = useState<ArtworkImageSources>({
    composite: null,
    satellite: null,
    photo: null,
    raw: null,
    flags: null,
  });

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

  const clickRaw = () => {
    setFadeRaw(prevFadeRaw => !prevFadeRaw);
  };

  // --- Helper Rendering Functions ---
  const showCompositeImage = () => { // Renamed from showComposite to avoid conflict with clickComposite
    let currentImageSrc: string | null = null;
    let currentImageSet: string | null = null;
    let dragOn = false;
    currentImageSrc = artwork.artworkFields?.artworkImage?.sourceUrl || ''
    currentImageSet = artwork.artworkFields?.artworkImage?.srcSet || ''
    
    if (selectArtworkView === 'magnify') {
      return (
          <DraggableArtwork
            src={currentImageSrc}
            artworkContainerRef={artworkContainerRef}
            alt="new artwork"
          />
      )
    } else {
      return (
          <img
            src={currentImageSrc}
            alt={artwork.title + ' composite image'}
            srcSet={currentImageSet}
          />
      )
    }
  };

  const showMagnifyButtonAndInfo = () => { // Renamed from showMagnify
    const fields = artwork.artworkFields;
    if (selectArtworkView === 'composite') {
      return (
        <div className="magnify-button" onClick={clickMagnify}>
          <svg className={toggleMagnify ? 'magnify-svg magnify-svg-on' : 'magnify-svg'} id="magnify-svg-button" height="40px" width="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <line id="magnify-svg-vertical-line" stroke="currentColor" strokeWidth="2" x1={24} y1={12} x2={24} y2={22} />
            <line id="magnify-svg-horizontal-line" stroke="currentColor" strokeWidth="2" x1={19} y1={17} x2={29} y2={17} />
            <line id="magnify-svg-handle-line" stroke="currentColor" strokeWidth="2" x1={17} y1={23} x2={8} y2={32} />
            <circle id="magnify-svg-circle" cx="24" cy="17" r="10" fill="transparent" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      );
    } else if (selectArtworkView === 'magnify') {
      return (
        // <>
          <div className="magnify-button" onClick={clickMagnify}>
            <svg className={toggleMagnify ? 'magnify-svg magnify-svg-on' : 'magnify-svg'} id="magnify-svg-button" height="40px" width="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <line id="magnify-svg-vertical-line" stroke="currentColor" strokeWidth="2" x1={24} y1={12} x2={24} y2={22} />
              <line id="magnify-svg-horizontal-line" stroke="currentColor" strokeWidth="2" x1={19} y1={17} x2={29} y2={17} />
              <line id="magnify-svg-handle-line" stroke="currentColor" strokeWidth="2" x1={17} y1={23} x2={8} y2={32} />
              <circle id="magnify-svg-circle" cx="24" cy="17" r="10" fill="transparent" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          /* <div className={fields?.dcsRaw?.sourceUrl ? 'artwork-composite-info' : 'artwork-composite-info artwork-composite-full'}>
            <h1>Composite City Portrait</h1>
            <h2>{fields?.size || `${fields?.width || ''} x ${fields?.height || ''}`} | {fields?.year || 'N/A'}</h2>
            <h3>{fields?.medium || 'Unknown Medium'}</h3>
            <h3>edition of 3</h3> {/* Static */
            // <h4>{fields?.forsale ? 'Available' : 'Not for sale'}</h4>
            // <h4>Contact for details</h4> {/* Static */}
          // </div> */}
        // </>
      );
    }
    return null;
  };

  const showSatelliteViewExtras = () => { // Renamed from showSatellite
    if (selectArtworkView === 'composite') {
      return (
        <div className="artwork-satellite" onClick={clickSatellite}>
          <ArtworkImage imageSRC={imageSources.satellite} dragOn={false} view="satellite" />
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
    const fields = artwork.artworkFields;
    if (selectArtworkView === 'composite') {
      return (
        <div className="artwork-photo" onClick={clickPhoto}>
          <ArtworkImage imageSRC={imageSources.photo} dragOn={false} view="photo" />
        </div>
      );
    } else if (selectArtworkView === 'magnify') {
      if (imageSources.raw) {
        return (
          <div className={fadeRaw ? 'artwork-raw artwork-raw-on' : 'artwork-raw'} onClick={clickRaw}>
            <ArtworkImage imageSRC={imageSources.raw} dragOn={false} view="raw" />
          </div>
        );
      }
      return <div className="artwork-raw-placeholder"></div>; // Placeholder if no raw image
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
          <h2>{fields?.style || 'Photograph'}</h2> {/* Using style as a placeholder for photo title */}
          <h3>{fields?.medium || 'Photograph'} | {fields?.year || 'N/A'}</h3>
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
          <h1>{artwork.title || 'Artwork Title'}</h1>
          {/* <h2>{props.artwork.artworkFields?.city || 'Location'}</h2> */}
        </div>
        {imageSources.flags && (
          <img src={imageSources.flags} alt={'flags from ' + artwork.title } />
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
