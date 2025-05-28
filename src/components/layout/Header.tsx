'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';

const Header = () => {
  const { toggleAbout, toggleSearch, searchButton, aboutSection } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link href="/" className="header__logo-link">
          <span>Digital City Series</span>
        </Link>
      </div>

      <nav className="header__nav">
        <ul className={`header__menu ${mobileMenuOpen ? 'header__menu--open' : ''}`}>
          <li className="header__menu-item">
            <Link href="/">Home</Link>
          </li>
          <li className="header__menu-item">
            <button 
              className={`header__menu-item ${aboutSection ? 'header__menu-item--active' : ''}`}
              onClick={toggleAbout}
            >
              About
            </button>
          </li>
          <li className="header__menu-item">
            <a href="https://www.bernardbolter.com" target="_blank" rel="noopener noreferrer">
              Bernard Bolter
            </a>
          </li>
        </ul>

        <div className="header__buttons">
          <button 
            className={`header__button ${searchButton ? 'header__button--active' : ''}`}
            onClick={toggleSearch}
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          
          <button 
            className="header__mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
