'use client';

import { useAppContext } from '@/context/AppContext';
import { useLocale } from '@/context/LocaleContext';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

const About = () => {
  const { aboutSection, toggleAbout } = useAppContext();
  const { t } = useLocale();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="about" ref={contentRef}>
      <button 
        className={`about__toggle ${aboutSection ? 'is-active' : ''}`}
        onClick={toggleAbout}
        aria-expanded={aboutSection}
        aria-controls="about-content"
      >
        {t('nav.about')}
      </button>
      
      <div 
        id="about-content"
        className={`about__content ${aboutSection ? 'is-open' : ''}`}
      >
        <h2 className="about__title">{t('about.title')}</h2>
        <div className="about__section">
          <div className="about__text">
            <p>
              {t('about.description')}
            </p>
            <p>
              Each artwork is created using a unique process that involves photography, digital collage, and 
              various digital painting techniques.
            </p>
            <h3>{t('about.artist')}</h3>
            <p>
              {t('about.artistDescription')}
            </p>
          </div>
          <div className="about__image-container">
            <Image 
              src="https://www.bernardbolter.com/artwork/wp-content/uploads/2019/01/bernard-bolter.jpg" 
              alt="Bernard Bolter" 
              width={500} 
              height={600}
              className="about__image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
