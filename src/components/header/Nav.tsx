import { useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import { usePathname } from 'next/navigation'
import { Link as ScrollLink} from 'react-scroll'

import ArrowSvg from '@/svg/ArrowSvg'
import RandomSvg from '@/svg/RandomSvg'
import ListSvg from '@/svg/ListSvg'

import { toCamelCase } from '@/helpers'

import { ArtworkNode } from '@/types/artworkTypes'

const Nav = () => {
    const { 
        aboutOpen, 
        toggleAbout,
        paintingsOpen,
        togglePaintings,
        toggleOldest,
        oldestChecked,
        toggleLatest,
        latestChecked,
        toggleRandom,
        randomChecked,
        artlist,
        selectArtwork
    } = useAppContext();

    const { t } = useLocale();
    const pathname = usePathname();
    const [citiesOpen, setCitiesOpen] = useState<boolean>(false)
    const [filtersOpen, setFiltersOpen] = useState<boolean>(false)

    return (
        <div className="nav-container">
            <div className="nav-links">
            <p
                    onClick={toggleAbout}
                    className={aboutOpen ? 'nav-link nav-link__open' : 'nav-link'}
                >{t('navigation.about')}</p>
                <p
                    onClick={togglePaintings}
                    className={paintingsOpen ? 'nav-link nav-link__open' : 'nav-link'}
                >{t('navigation.paintings')}</p>
                <Link
                    className="nav-link"
                    href="/business-plan"
                    target="_blank"
                    rel="noopener noreferrer"
                >{t('navigation.businessPlan')}
                    <span>{pathname !== '/' ? '(English)' : ''}</span>
                </Link>
                <ScrollLink
                    className="nav-link"
                    to="contact-form"
                    smooth={true}
                    duration={2000}
                >{t('navigation.contact')}</ScrollLink>
            </div>
            <div className="nav-filter-container">
                <div
                    onClick={() => {
                        console.log("click filters")
                        setFiltersOpen(true) 
                    }}
                    className={filtersOpen ? "nav-select__list-svg nav-select__list-svg--hide" : "nav-select__list-svg"}
                >
                    <ListSvg />
                </div>
                <div className={filtersOpen ? "nav-filters nav-filters__open" : "nav-filters"}>
                    <div className="nav-filter">
                        <p
                            className={oldestChecked ? 'filter-item__on filter-item' : 'filter-item'}
                            onClick={() => {
                                toggleOldest()
                                setFiltersOpen(false)
                            }}
                        >{t('filters.oldest')}</p>
                        <div className="nav-filter__svg nav-filter__svg--oldest">
                            <ArrowSvg />
                        </div>
                    </div>
                    <div className="nav-filter">
                        <p
                            className={latestChecked ? 'filter-item__on filter-item' : 'filter-item'}
                            onClick={() => {
                                toggleLatest()
                                setFiltersOpen(false)
                            }}
                        >{t('filters.latest')}</p>
                        <div className="nav-filter__svg nav-filter__svg--latest">
                            <ArrowSvg />
                        </div>
                    </div>
                    <div className="nav-filter">
                        <p
                            className={randomChecked ? 'filter-item__on filter-item' : 'filter-item'}
                            onClick={() => {
                                toggleRandom()
                                setFiltersOpen(false)
                            }}
                        >{t('filters.random')}</p>
                        <div className="nav-filter__svg nav-filter__svg--random">
                            <RandomSvg />
                        </div>
                    </div>
                
                

                <div className="nav-select-container">
                    <div 
                        className={filtersOpen ? "nav-select__header--container nav-select__header--containe-open" : "nav-select__header--container"}
                    >
                        <p
                            className="nav-select__header"
                            onClick={() => setCitiesOpen(!citiesOpen)}
                        >{t('filters.selectACity')}</p>
                        <div 
                            className={citiesOpen ? "nav-select__arrow nav-select__arrow--open" : "nav-select__arrow"}
                        >
                            <ArrowSvg />
                        </div>
                </div>
            </div>
                </div>
                    <div className={citiesOpen ? 'nav-city-list nav-city-list__open' : 'nav-city-list'}>
                        {artlist.map((city: ArtworkNode, index) => {
                            let translatedCityName
                            if (city.artworkFields?.city) {
                                translatedCityName = t(`cities.${toCamelCase(city.artworkFields?.city)}`)
                            } else {
                                translatedCityName = ''
                            }
                            let translatedCountryName
                            if (city.artworkFields?.country) {
                            translatedCountryName = t(`countries.${toCamelCase(city.artworkFields?.country)}`)
                            } else {
                            translatedCountryName = ''
                            }
                            return (
                                <div 
                                    key={index} 
                                    className="nav-city__title"
                                    onClick={() => {
                                        setFiltersOpen(false)
                                        setCitiesOpen(false)
                                        selectArtwork(city.id)
                                    }}
                                >
                                    <h1>{translatedCityName} <span>{translatedCountryName}</span></h1>
                                    
                                    {city.artworkFields?.dcsFlags?.sourceUrl && (
                                    <img 
                                        src={city.artworkFields?.dcsFlags.sourceUrl} 
                                        alt={'flags from ' + city.title } 
                                    />
                                    )}
                                </div>
                            )
                        })}
                    </div>
            </div>
        </div>
    )
}

export default Nav