import React, { useEffect, useRef, useState } from 'react'
import { getImages } from '../api/imageAPI'
import ImageCard from './ImageCard'
import CloseIcon from "../assets/icons8-close.svg"
import clsx from 'clsx'

export default function ImagesView() {
  const [images, setImages] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [previewImageURL, setPreviewImageURL] = useState("")
  const [loader, setLoader] = useState(true);
  const triggerRef = useRef(null)
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
    <>
      <div className='img__view'>
        <div className='img__wrapper'>
          {
            images.map(img => {
              return <ImageCard imgData={img} key={img.id} handleShowPreview={handleShowPreview} />
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
        <div ref={triggerRef} className={clsx('trigger', { visible: false })}></div>
      </div>
    </>


  )
}
