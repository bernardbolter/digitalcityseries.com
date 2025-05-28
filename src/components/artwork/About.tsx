'use client';

import { useAppContext } from '../../context/AppContext';
import Image from 'next/image';

const About = () => {
  const { aboutSection } = useAppContext();

  if (!aboutSection) return null;

  return (
    <div className="about__container">
      <div className="about__header">
        <h2 className="about__title">About Digital City Series</h2>
        <p className="about__subtitle">
          A collection of digital artwork exploring urban environments around the world
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
          <h3>The Artist</h3>
          <p>
            Bernard Bolter is a San Francisco-born artist who has lived and worked in various cities around 
            the world. His work explores the relationship between urban environments, architecture, and the 
            human experience. The Digital City Series represents his ongoing exploration of how we perceive 
            and interact with the cities we inhabit.
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
