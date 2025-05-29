'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ArtworkProps {
  artwork: {
    id: string;
    title: string;
  };
}

const Artwork = ({ artwork }: ArtworkProps) => {
  return (
    <div className="artwork__card">
      {artwork.title}
    </div>
    //   <div className="artwork__image-container">
    //     {artwork.acf.artwork_image && (
    //       <Image
    //         className="artwork__image"
    //         src={artwork.acf.artwork_image}
    //         alt={artwork.title.rendered}
    //         fill
    //         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    //         priority={false}
    //       />
    //     )}
    //   </div>
    //   <div className="artwork__content">
    //     <h3 className="artwork__title">{artwork.title.rendered}</h3>
    //     <div className="artwork__meta">
    //       {artwork.acf.city && (
    //         <span className="artwork__city">
    //           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //             <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z"></path>
    //             <circle cx="12" cy="9" r="2.5"></circle>
    //           </svg>
    //           {artwork.acf.city}
    //         </span>
    //       )}
    //       {artwork.acf.year && (
    //         <span className="artwork__year">
    //           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //             <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    //             <line x1="16" y1="2" x2="16" y2="6"></line>
    //             <line x1="8" y1="2" x2="8" y2="6"></line>
    //             <line x1="3" y1="10" x2="21" y2="10"></line>
    //           </svg>
    //           {artwork.acf.year}
    //         </span>
    //       )}
    //     </div>
    //     <Link href={`/artwork/${artwork.id}/${slug}`} className="artwork__link">
    //       View Details
    //       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //         <line x1="5" y1="12" x2="19" y2="12"></line>
    //         <polyline points="12 5 19 12 12 19"></polyline>
    //       </svg>
    //     </Link>
    //   </div>
    // </div>
  );
};

export default Artwork;
