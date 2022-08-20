import React, { useState } from 'react'
import { LoadingCard } from './lodingCard'
export default function ImageCard({ imgData, handleShowPreview }) {
  const [imgLoading, setImgLoading] = useState(true)

  const handleImageClick = () => {
    handleShowPreview(imgData.download_url)
  }
  return (
    <>
      <div className="img__card" onClick={handleImageClick}>
        <>
          <img src={imgData.download_url} onLoad={() => setImgLoading(true)} ></img>
          <div className='img__description'>  {imgData.author}</div>
        </>
      </div>
    </>

  )
}
