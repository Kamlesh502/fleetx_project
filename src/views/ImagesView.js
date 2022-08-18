import React, { useEffect, useState } from 'react'
import { getImages } from '../api/imageAPI'
import ImageCard from './ImageCard'
import CloseIcon from "../assets/icons8-close.svg"
export default function ImagesView() {
  const [images, setImages] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [previewImageURL, setPreviewImageURL] = useState("")
  useEffect(() => {
    getImages().then((res) => {
      setImages(res)
    })
  }, [])

  const handleShowPreview = (id) => {
    setPreviewImageURL(id)
    setShowPreview(true)
  }
  return (
    <div className='img__view'>
      <div className='img__wrapper'>
        {
          images.map(img => {
            return <ImageCard img_url={img.download_url} key={img.id} handleShowPreview={handleShowPreview} />
          })
        }
      </div>
      {
        showPreview &&
        <div className='img__preview'>
          <div className='preview__close' onClick={() => setShowPreview(false)}>
            <img src={CloseIcon}></img>
          </div>
          <div>
            <img src={previewImageURL}></img>
          </div>
        </div>
      }

    </div>
  )
}
