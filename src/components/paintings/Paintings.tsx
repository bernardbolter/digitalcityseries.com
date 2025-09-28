"use client"

import { useAppContext } from "@/context/AppContext"
import { useLocale } from '@/context/LocaleContext'
import Image from "next/image"
import CloseIcon from "@/svg/CloseIcon"

const Paintings = () => {
    const {
        paintingsOpen,
        togglePaintings
    } = useAppContext()

    const { t } = useLocale()

    return (
        <div 
            className={paintingsOpen ? "paintings-container paintings-container__open" : "paintings-container"}
        >
            <div
                onClick={() => togglePaintings()} 
                className="paintings-close-container"
            >
                <CloseIcon />
            </div>
            <div className="paintings-content">
                <h1>{t('paintings.aboutThePaintings')}</h1>
                 <figure className="about-photo__container">
                    <Image
                    src="/images/painting_village_pano.jpg"
                    alt="The Da Fen Oil Pianting Vilaage"
                    fill
                    style={{ objectFit: 'cover' }}
                    />
                    <figcaption className="about-photo__caption">The Da Fen Oil Pianting Vilaage.</figcaption>
                </figure>
                <p>{t('paintings.originStory')}</p>
                <p>{t('paintings.collaborationProcess')}</p>
                <p>{t('paintings.artisticSignificance')}</p>
            </div>
        </div>
    )
}

export default Paintings