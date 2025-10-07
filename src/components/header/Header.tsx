'use client';

import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { usePathname } from 'next/navigation'

import Nav from '@/components/header/Nav'

const Header = () => {
  const t = useTranslations()
  const pathname = usePathname()

  return (
    <header>
      <div className="hero" id="hero-top">
        <h1>
          {t('header.digital')}<br />
          {t('header.city')}<br />
          {t('header.series')}
        </h1>
        {pathname !== '/' && (
          <p>digital city series</p>
        )}
      </div>
      <LanguageSwitcher />
      <Nav />
    </header>
  );
};

export default Header;