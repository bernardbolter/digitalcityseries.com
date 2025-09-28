'use client';

import { useRef } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useLocale } from '@/context/LocaleContext';
import Image from 'next/image';
import CloseIcon from '@/svg/CloseIcon'


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
        <CloseIcon />
      </div>
      
      <div className="about__content">
        <h1>{t('about.intro')}</h1>
        <p>{t('about.introText')}</p>
      </div>

        <figure className="about-photo__container">
          <Image
            src="/images/bernard_bolter_portrait.jpg"
            alt="Bernard Bolter at the exhibition of the Digital City Series @ Book & Job Gallery. SF 2013."
            fill
            style={{ objectFit: 'cover' }}
          />
          <figcaption className="about-photo__caption">Bernard Bolter at the exhibition of the Digital City Series. Book & Job Gallery, SF 2013.</figcaption>
        </figure>
        

      <div className="about__content">
        <h2>{t('about.method')}</h2>
        <p>{t('about.methodText')}</p>
      </div>

        <figure className="about-photo__container">
          <Image
            src="/images/bernard-bolter-skaing-in-san-francisco-1989.jpg"
            alt="Bernard Bolter skating in San Francisco on a SHUT board in 1989"
            fill
            style={{ objectFit: 'cover' }}
          />
          <figcaption className="about-photo__caption">Bernard Bolter skating in San Francisco on a SHUT board in 1989.</figcaption>
        </figure>

      <div className="about__content">
        <h2>{t('about.philosophy')}</h2>
        <p>{t('about.philosophyText')}</p>
      </div>

      <figure className="about-photo__container">
          <Image
            src="/images/cutting-cultures-amsterdam-2009.jpg"
            alt="Exhibition of the Digital City Series at Cutting Cultures Gallery. Amsterdam 2009."
            fill
            style={{ objectFit: 'cover' }}
          />
          <figcaption className="about-photo__caption">Exhibition of the Digital City Series at Cutting Cultures Gallery. Amsterdam 2009.</figcaption>
        </figure>

      <div className="about__content">
        <h2>{t('about.collaborations')}</h2>
        <p>{t('about.collaborationsText')}</p>
        <h2>{t('about.relaunch')}</h2>
        <p>{t('about.relaunchText')}</p>
        <p className="about__signature">{t('about.signature')}</p>
      </div>
    </div>
  );
};

export default About;
