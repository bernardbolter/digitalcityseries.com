'use client';

import { useAppContext } from '@/context/AppContext';
import { useLocale } from '@/context/LocaleContext';
import Image from 'next/image';

const About = () => {
  const { aboutSection } = useAppContext();
  const { t } = useLocale();

  if (!aboutSection) return null;

  return (
    <div className="about__container">
      <div className="about__header">
        <h2 className="about__title">{t('about.title')}</h2>
        <p className="about__subtitle">
          {t('about.description')}
        </p>
      </div>

      <div className="about__content">
        <div className="about__text">
          <p>
            The Digital City Series is a collection of digital artwork created by artist Bernard Bolter, 
            exploring urban environments and cityscapes around the world. Each piece captures the essence 
            and character of different cities, combining photography, digital manipulation, and artistic 
            interpretation.
          </p>
          <p>
            The series began in 2010 and has grown to include dozens of cities across multiple continents. 
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

      <div className="about__section">
        <h3 className="about__section-title">Featured Cities</h3>
        <div className="about__cities">
          {['New York', 'San Francisco', 'Paris', 'Tokyo', 'London', 'Berlin', 'Barcelona', 'Amsterdam'].map((city) => (
            <div key={city} className="about__city">
              <div className="about__city-name">{city}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
