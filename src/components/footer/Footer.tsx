'use client';

import { useAppContext } from '@/context/AppContext'
import { useLocale } from '@/context/LocaleContext'
import ContactForm from '@/components/footer/ContactForm'
import { Link as ScrollLink} from 'react-scroll';
import GlobeSvg from '@/svg/GlobeSvg'

const Footer = () => {
  const {
    aboutOpen,
    toggleAbout,
    paintingsOpen,
    togglePaintings
  } = useAppContext();  
  const { t } = useLocale();
  
  return (
    <footer className="footer-container">
      <section className="footer__contact-container">
        <ContactForm />
      </section>
      <section className="footer__info">
        <div className="footer__info--top">
          <div className="footer__info--header">
            <h3>DCS</h3>
            <div className="footer__logo-svg">
              <GlobeSvg />
            </div>
          </div>
          <div className="footer__links--container">
            <p 
              className={aboutOpen ? 'footer__link footer__link--open' : 'footer__link'}
              onClick={toggleAbout}
            >{t('navigation.about')}</p>
            <p 
              className={paintingsOpen ? 'footer__link footer__link--open' : 'footer__link'}
              onClick={togglePaintings}
            >{t('navigation.paintings')}</p>
            <ScrollLink
              className="footer__link"
              to="hero-top"
              smooth={true}
              duration={2000}
            >{t('footer.backToTop')}</ScrollLink>
            <a href="https://www.instagram.com/bernardbolter" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <p className="footer__email">bernard@digitalcityseries.com</p>
          </div>
      </div>
      <div className="footer__info--bottom">
        <div className="footer__line" />
        
        <div className="footer__copyright">
          <p>&copy; {(new Date().getFullYear())} Digital City Series.</p>
          <p>all rights reserved</p>
        </div>
      </div>
      </section>
    </footer>
  );
};

export default Footer;
