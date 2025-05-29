'use client';

import { useLocale } from '@/context/LocaleContext';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

const Header = () => {
  const { t } = useLocale();

  return (
    <header className="header">
      <div className="hero">
        <h1>DIGITAL<br />CITY<br />SERIES</h1>
        <span>{t('site.title')}</span>
      </div>
      <div className="header__language-switcher--container">
      <LanguageSwitcher className="header__language-switcher" />
      </div>
    </header>
  );
};

export default Header;