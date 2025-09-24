import { useState } from 'react'
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';
import { usePathname } from 'next/navigation';
import { Link as ScrollLink} from 'react-scroll';

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
        artlist
    } = useAppContext();

    const { t } = useLocale();
    const pathname = usePathname();
    const [citiesOpen, setCitiesOpen] = useState<boolean>(false)

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
                <div className="nav-filters">
                    <p
                        className={oldestChecked ? 'filter-item__on filter-item' : 'filter-item'}
                        onClick={toggleOldest}
                    >Oldest</p>
                    <p
                        className={latestChecked ? 'filter-item__on filter-item' : 'filter-item'}
                        onClick={toggleLatest}
                    >Latest</p>
                    <p
                        className={randomChecked ? 'filter-item__on filter-item' : 'filter-item'}
                        onClick={toggleRandom}
                    >Random</p>
                </div>
                <div className="nav-select-container">
                    <p
                        className="nav-select__header"
                        onClick={() => setCitiesOpen(!citiesOpen)}
                    >Select a City</p>
                    <div className={citiesOpen ? 'nav-city-list nav-city-list__open' : 'nav-city-list'}>
                        {artlist.map((city, index) => {
                            console.log(city)
                            return (
                                <p key={index}>{city.title}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav