"use client"

import { useAppContext } from "@/context/AppContext"
// import { useLocale } from '@/context/LocaleContext'

import Close from "@/svg/close"

const Paintings = () => {
    const {
        paintingsOpen,
        togglePaintings
    } = useAppContext()

    // const { t } = useLocale()

    return (
        <div 
            className={paintingsOpen ? "paintings-container paintings-container__open" : "paintings-container"}
        >
            <div
                onClick={() => togglePaintings()} 
                className="paintings-close-container"
            >
                <Close />
            </div>
            <div className="paintings-content">
                <h1>Paintings</h1>
            </div>
        </div>
    )
}

export default Paintings