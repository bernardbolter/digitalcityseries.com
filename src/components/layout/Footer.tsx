'use client';

import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';

const Footer = () => {
  const { toggleAbout } = useAppContext();
  
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3 className="footer__title">Digital City Series</h3>
          <p>A collection of digital artwork exploring urban environments around the world.</p>
          <div className="footer__social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="footer__section">
          <h3 className="footer__title">Navigation</h3>
          <nav className="footer__nav">
            <Link href="/" className="footer__link">Home</Link>
            <button onClick={toggleAbout} className="footer__link">About</button>
            <a href="https://www.bernardbolter.com" target="_blank" rel="noopener noreferrer" className="footer__link">Bernard Bolter</a>
          </nav>
        </div>
        
        <div className="footer__section">
          <h3 className="footer__title">Contact</h3>
          <nav className="footer__nav">
            <a href="mailto:info@digitalcityseries.com" className="footer__link">info@digitalcityseries.com</a>
            <a href="https://www.bernardbolter.com/contact" target="_blank" rel="noopener noreferrer" className="footer__link">Contact Form</a>
          </nav>
        </div>
      </div>
      
      <div className="footer__copyright">
        © {new Date().getFullYear()} Digital City Series. All rights reserved. Created by Bernard Bolter.
      </div>
    </footer>
  );
};

export default Footer;
