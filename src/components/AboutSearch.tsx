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
                    {t('nav.search')}
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
