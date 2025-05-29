'use client';

import { useLocale } from '@/context/LocaleContext';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { t } = useLocale();
  const pathname = usePathname();

  return (
    <header>
      <div className="hero">
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
    </header>
  );
};

export default Header;