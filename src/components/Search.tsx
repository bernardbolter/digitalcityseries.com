'use client';

import { useAppContext } from '../context/AppContext';
import { useLocale } from '../context/LocaleContext';
import { useRef } from 'react';

const Search = () => {
  const { 
    filter, 
    setFilter, 
    recentChecked, 
    ogChecked, 
    randomChecked, 
    toggleRecent, 
    toggleOg, 
    toggleRandom,
    toggleSearch
  } = useAppContext();
  const { t } = useLocale();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="search" ref={contentRef}>
      <h1>Search Section</h1>
    </div>
  );
};

export default Search;
