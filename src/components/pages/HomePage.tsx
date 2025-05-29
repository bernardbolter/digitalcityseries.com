'use client';

import ArtworkGrid from "../artwork/ArtworkGrid";
import Search from "../Search";
import About from "../artwork/About";
import Link from "next/link";
import { useLocale } from '../../context/LocaleContext';

export default function HomePage() {
  const { t, getLocalizedPath } = useLocale();
  
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <div className="home__container">
          <h1 className="home__title">{t('hero.title')}</h1>
          <p className="home__subtitle">{t('hero.subtitle')}</p>
          <div className="home__buttons">
            <Link href={getLocalizedPath('#artwork')} className="button button--primary">
              {t('hero.viewArtwork')}
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <About />
      
      {/* Search Section */}
      <Search />
      
      {/* Artwork Grid Section */}
      <section id="artwork" className="home__section">
        <div className="home__container">
          <div className="home__section-header">
            <h2 className="home__section-title">{t('artwork.collection')}</h2>
          </div>
          <ArtworkGrid />
        </div>
      </section>
    </div>
  );
}
