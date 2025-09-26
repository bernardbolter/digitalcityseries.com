'use client';

import { useRef } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useLocale } from '@/context/LocaleContext';
import Image from 'next/image';
import Close from '@/svg/close';


const About = () => {
  const { 
    aboutOpen, 
    toggleAbout 
  } = useAppContext();

  console.log(aboutOpen)

  const { t } = useLocale();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className={aboutOpen ? "about-container about-container__open" : "about-container"} 
      ref={contentRef}
    >
      <div
        onClick={() => {
          toggleAbout()
        }} 
        className="about-close-container"
      >
        <Close />
      </div>
      
      {/* <div className="about-container__inside"> */}
      
      <div 
        id="about-content"
        className={`about__content ${aboutOpen ? 'is-open' : ''}`}
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
      {/* </div> */}
    </div>
  );
};

export default About;
