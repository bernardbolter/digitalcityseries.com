'use client';

import { useAppContext } from '../../context/AppContext';
import { useLocale } from '../../context/LocaleContext';

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
    searchButton
  } = useAppContext();
  const { t } = useLocale();

  if (!searchButton) return null;

  return (
    <div className="search__container">
      <div className="search__form">
        <input
          type="text"
          className="search__input"
          placeholder={t('search.placeholder')}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className="search__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      <div className="search__filters">
        <button 
          className={`search__filter ${recentChecked ? 'search__filter--active' : ''}`}
          onClick={toggleRecent}
        >
          {t('search.recent')}
        </button>
        <button 
          className={`search__filter ${ogChecked ? 'search__filter--active' : ''}`}
          onClick={toggleOg}
        >
          {t('search.original')}
        </button>
        <button 
          className={`search__filter ${randomChecked ? 'search__filter--active' : ''}`}
          onClick={toggleRandom}
        >
          {t('search.random')}
        </button>
      </div>
    </div>
  );
};

export default Search;
