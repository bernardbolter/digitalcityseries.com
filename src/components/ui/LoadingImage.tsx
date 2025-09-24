'use client'

import React from 'react'

interface LoadingImageProps {
    loadingImageText?: string
}

const LoadingImage: React.FC<LoadingImageProps> = ({
    loadingImageText
}) => {
    return (
        <div className="loading-image-container">
            <img src="/images/globe.gif" alt="Spinning Globe Loader"/>
            {loadingImageText && <p>{loadingImageText}</p>}
        </div>
    )
}

export default LoadingImage