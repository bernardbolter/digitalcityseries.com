'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useLocale } from '../../../../context/LocaleContext';

interface ArtworkDetailProps {
  params: {
    id: string;
    slug: string;
  };
}

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
}

export default function ArtworkDetail({ params }: ArtworkDetailProps) {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { t } = useLocale();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://www.bernardbolter.com/artwork/wp-json/wp/v2/artwork/${params.id}`);
        setArtwork(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching artwork:', err);
        setError('Failed to load artwork details. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchArtwork();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="artwork-detail__container">
        <div className="home__loading">
          <div className="home__loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error || !artwork) {
    return (
      <div className="artwork-detail__container">
        <div className="home__empty">
          <div className="home__empty-icon">⚠️</div>
          <h3 className="home__empty-title">{t('artwork.details')}</h3>
          <p className="home__empty-text">{error || t('search.noResults')}</p>
          <Link href="/" className="button button--primary">
            {t('artwork.backToCollection')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="artwork-detail">
      <div className="artwork-detail__container">
        <Link href="/" className="artwork-detail__back">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          {t('artwork.backToCollection')}
        </Link>

        <div className="artwork-detail__header">
          <h1 className="artwork-detail__title">{artwork.title.rendered}</h1>
          <div className="artwork-detail__meta">
            {artwork.acf.city && (
              <div className="artwork-detail__city">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Z"></path>
                  <circle cx="12" cy="9" r="2.5"></circle>
                </svg>
                {artwork.acf.city}
              </div>
            )}
            {artwork.acf.year && (
              <div className="artwork-detail__year">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {artwork.acf.year}
              </div>
            )}
          </div>
        </div>

        {artwork.acf.artwork_image && (
          <div className="artwork-detail__image-container">
            <Image
              src={artwork.acf.artwork_image}
              alt={artwork.title.rendered}
              width={1200}
              height={800}
              className="artwork-detail__image"
              priority
            />
          </div>
        )}

        <div className="artwork-detail__content">
          <div className="artwork-detail__description">
            {artwork.acf.description && (
              <div dangerouslySetInnerHTML={{ __html: artwork.acf.description }} />
            )}
          </div>

          <div className="artwork-detail__specs">
            {artwork.acf.city && (
              <div className="artwork-detail__spec">
                <div className="artwork-detail__spec-label">{t('artwork.city')}</div>
                <div className="artwork-detail__spec-value">{artwork.acf.city}</div>
              </div>
            )}
            {artwork.acf.year && (
              <div className="artwork-detail__spec">
                <div className="artwork-detail__spec-label">{t('artwork.year')}</div>
                <div className="artwork-detail__spec-value">{artwork.acf.year}</div>
              </div>
            )}
            {artwork.acf.dimensions && (
              <div className="artwork-detail__spec">
                <div className="artwork-detail__spec-label">{t('artwork.dimensions')}</div>
                <div className="artwork-detail__spec-value">{artwork.acf.dimensions}</div>
              </div>
            )}
            {artwork.acf.medium && (
              <div className="artwork-detail__spec">
                <div className="artwork-detail__spec-label">{t('artwork.medium')}</div>
                <div className="artwork-detail__spec-value">{artwork.acf.medium}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
