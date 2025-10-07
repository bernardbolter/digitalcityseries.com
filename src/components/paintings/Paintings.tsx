"use client"

import { useAppContext } from "@/context/AppContext"
import { useTranslations } from 'next-intl'
import Image from "next/image"
import CloseIcon from "@/svg/CloseIcon"

const Paintings = () => {
    const {
        paintingsOpen,
        togglePaintings
    } = useAppContext()

    const t = useTranslations()

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
            <div className="paintings-content paintings-content__header">
                <h1>{t('paintings.aboutThePaintings')}</h1>
            </div>
                 <figure className="paintings-photo__container paintings-da-fen">
                    <Image
                    src="/images/painting_village_pano.jpg"
                    alt="The Da Fen Oil Pianting Vilaage"
                    fill
                    style={{ objectFit: 'cover' }}
                    />
                    <figcaption className="paintings-photo__caption">The Da Fen Oil Pianting Vilaage.</figcaption>
                </figure>
            <div className="paintings-content">
                <p>{t('paintings.originStory')}</p>
            </div>
                <figure className="paintings-photo__container paintings-sanzi-brush">
                    <Image
                    src="/images/sanzi_infront_studio_and_da_fen_brush_scuplture.jpg"
                    alt="The entrance to the Da Fen Oil Painting Village and the artist Sanzi in front of his studio"
                    fill
                    style={{ objectFit: 'cover' }}
                    />
                    <figcaption className="paintings-photo__caption paintings-photo__caption--long">The entrance to the Da Fen Oil Painting Village and the artist Sanzi in front of his studio.</figcaption>
                </figure>
            <div className="paintings-content">
                <p>{t('paintings.collaborationProcess')}</p>
            </div>
                <figure className="paintings-photo__container">
                    <Image
                    src="/images/sanzi_la_paint.jpg"
                    alt="Sanzi's painting of the Los Angeles California composition"
                    fill
                    style={{ objectFit: 'cover' }}
                    />
                    <figcaption className="about-photo__caption">Sanzi&#39;s painting of the Los Angeles California composition.</figcaption>
                </figure>
            <div className="paintings-content">
                <p>{t('paintings.artisticSignificance')}</p>
            </div>
                <figure className="paintings-photo__container">
                    <Image
                    src="/images/basel_switzerland_painting.jpg"
                    alt="Oil painting of the Basel Switzerland composition."
                    fill
                    style={{ objectFit: 'cover' }}
                    />
                    <figcaption className="paintings-photo__caption">Oil painting of the Basel Switzerland composition.</figcaption>
                </figure>
                <figure className="paintings-photo__container paintings-da-huzi">
                    <Image
                    src="/images/bernard-bolter-and-da-huzi-with-his-painting-of-venice-italy.jpg"
                    alt="Bernard Bolter and the artist Da Huzi with his painting of Venice, Italy."
                    fill
                    style={{ objectFit: 'cover' }}
                    />
                <figcaption className="paintings-photo__caption paintings-photo__caption--long">Bernard Bolter and the artist Da Huzi with his painting of Venice, Italy.</figcaption>
            </figure>
        </div>
    )
}

export default Paintings