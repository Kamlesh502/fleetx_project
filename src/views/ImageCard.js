import React from 'react'

export default function ImageCard({ img_url, handleShowPreview }) {

  const handleImageClick = () => {
    handleShowPreview(img_url)
  }
  return (
    <div style={{ width: '150px', height: '150px', cursor: 'pointer' }} className="img__card" onClick={handleImageClick}>
      <img src={img_url} alt="like icon" style={{ width: '150px', height: '150px' }}></img>
    </div>
  )
}
