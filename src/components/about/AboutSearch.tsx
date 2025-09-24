"use client"

import { useAppContext } from '@/context/AppContext';
import { useLocale } from '@/context/LocaleContext';
import { useRef } from 'react';

const AboutSearch = () => {
    const { aboutSection, toggleAbout, searchSection, toggleSearch } = useAppContext();
    const { t } = useLocale();
    const aboutContentRef = useRef<HTMLDivElement>(null);
    const searchContentRef = useRef<HTMLDivElement>(null);

    return (
        <section className="about-search-nav__container">
            {/* About Section - Accordion style that pushes content down */}
            <div className="about-search-nav__about-container">
                <button 
                    className={`about-search-nav__about-button ${aboutSection ? 'is-active' : ''}`}
                    onClick={toggleAbout}
                    aria-expanded={aboutSection}
                    aria-controls="about-content"
                >
                    {t('nav.about')}
                </button>
                
                <div 
                    id="about-content"
                    className={`about-search-nav__about-content ${aboutSection ? 'is-open' : ''}`}
                    ref={aboutContentRef}
                >
                    <div className="about-search-nav__about-inner">
                        <h2 className="about-search-nav__title">{t('about.title')}</h2>
                        <div className="about-search-nav__section">
                            <div className="about-search-nav__text">
                                <p>{t('about.description')}</p>
                                <p>
                                    Each artwork is created using a unique process that involves photography, digital collage, and 
                                    various digital painting techniques.
                                </p>
                                <h3>{t('about.artist')}</h3>
                                <p>{t('about.artistDescription')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Section - Overlay style that appears on top */}
            <div className="about-search-nav__search-container">
                <button 
                    className={`about-search-nav__search-button ${searchSection ? 'is-active' : ''}`}
                    onClick={toggleSearch}
                    aria-expanded={searchSection}
                    aria-controls="search-content"
                >
                    <div className="about-search__filter-container">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 64 80">
                            <path d="M56,21H23.3c-0.7,0-1.3-0.6-1.3-1.3s0.6-1.3,1.3-1.3H56c0.7,0,1.3,0.6,1.3,1.3S56.7,21,56,21z"/>
                            <path d="M13.1,21H8c-0.7,0-1.3-0.6-1.3-1.3s0.6-1.3,1.3-1.3h5.1c0.7,0,1.3,0.6,1.3,1.3S13.9,21,13.1,21z"/>
                            <path d="M56,33.3h-8.6c-0.7,0-1.3-0.6-1.3-1.3c0-0.7,0.6-1.3,1.3-1.3H56c0.7,0,1.3,0.6,1.3,1.3C57.3,32.7,56.7,33.3,56,33.3z"/>
                            <path d="M37.2,33.3H8c-0.7,0-1.3-0.6-1.3-1.3c0-0.7,0.6-1.3,1.3-1.3h29.2c0.7,0,1.3,0.6,1.3,1.3C38.5,32.7,37.9,33.3,37.2,33.3z"/>
                            <path d="M56,45.7H23.3c-0.7,0-1.3-0.6-1.3-1.3c0-0.7,0.6-1.3,1.3-1.3H56c0.7,0,1.3,0.6,1.3,1.3C57.3,45.1,56.7,45.7,56,45.7z"/>
                            <path d="M13.1,45.7H8c-0.7,0-1.3-0.6-1.3-1.3C6.7,43.6,7.3,43,8,43h5.1c0.7,0,1.3,0.6,1.3,1.3C14.5,45.1,13.9,45.7,13.1,45.7z"/>
                            <path d="M18.2,26.1c-3.5,0-6.4-2.9-6.4-6.4s2.9-6.4,6.4-6.4s6.4,2.9,6.4,6.4S21.8,26.1,18.2,26.1z M18.2,15.9    c-2.1,0-3.8,1.7-3.8,3.8c0,2.1,1.7,3.8,3.8,3.8s3.8-1.7,3.8-3.8C22,17.6,20.3,15.9,18.2,15.9z"/>
                            <path d="M42.3,38.4c-3.5,0-6.4-2.9-6.4-6.4s2.9-6.4,6.4-6.4c3.5,0,6.4,2.9,6.4,6.4S45.9,38.4,42.3,38.4z M42.3,28.2    c-2.1,0-3.8,1.7-3.8,3.8c0,2.1,1.7,3.8,3.8,3.8s3.8-1.7,3.8-3.8C46.1,29.9,44.4,28.2,42.3,28.2z"/>
                            <path d="M18.2,50.8c-3.5,0-6.4-2.9-6.4-6.4c0-3.6,2.9-6.4,6.4-6.4s6.4,2.9,6.4,6.4C24.7,47.9,21.8,50.8,18.2,50.8z M18.2,40.6    c-2.1,0-3.8,1.7-3.8,3.8c0,2.1,1.7,3.8,3.8,3.8s3.8-1.7,3.8-3.8C22,42.3,20.3,40.6,18.2,40.6z"/>
                        </svg>
                    </div>
                    <div className="about-search__list-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" x="0px" y="0px">
                            <circle cx="3" cy="5" r="2"/>
                            <path d="M21,3H9A2,2,0,0,0,9,7H21a2,2,0,0,0,0-4Z"/>
                            <circle cx="3" cy="12" r="2"/>
                            <path d="M21,10H9a2,2,0,0,0,0,4H21a2,2,0,0,0,0-4Z"/>
                            <circle cx="3" cy="19" r="2"/>
                            <path d="M21,17H9a2,2,0,0,0,0,4H21a2,2,0,0,0,0-4Z"/>
                        </svg>
                    </div>
                    <div className="about-search__search-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
                            <path d="M45.5,20a25.5,25.5,0,1,0,15,46.13l12.7,12.7a4,4,0,0,0,5.66-5.66l-12.7-12.7A25.48,25.48,0,0,0,45.5,20Zm0,43A17.5,17.5,0,1,1,63,45.5,17.52,17.52,0,0,1,45.5,63Z"/>
                        </svg>
                    </div>
                </button>
                
                <div 
                    id="search-content"
                    className={`about-search-nav__search-content ${searchSection ? 'is-open' : ''}`}
                    ref={searchContentRef}
                >
                    <div className="about-search-nav__search-inner">
                        <h2 className="about-search-nav__title">{t('search.title')}</h2>
                        <div className="about-search-nav__search-form">
                            <input 
                                type="text" 
                                placeholder={t('search.placeholder')} 
                                className="about-search-nav__search-input"
                            />
                            <div className="about-search-nav__search-filters">
                                <label className="about-search-nav__filter-label">
                                    <input type="checkbox" /> {t('search.recent')}
                                </label>
                                <label className="about-search-nav__filter-label">
                                    <input type="checkbox" /> {t('search.oldest')}
                                </label>
                                <label className="about-search-nav__filter-label">
                                    <input type="checkbox" /> {t('search.random')}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSearch
