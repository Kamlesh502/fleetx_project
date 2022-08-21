import React, { useEffect, useState, useRef, useCallback } from 'react'
import ImageCard from './ImageCard'
import CloseIcon from "../assets/icons8-close.svg"
import useMoreImages from '../hooks/useMoreImages'

export default function ImagesView() {
  // const [images, setImages] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [previewImageURL, setPreviewImageURL] = useState("")
  const [pageNumber, setPageNumber] = useState(1)

  const {
    images,
    hasMore,
    loading,
    error
  } = useMoreImages(pageNumber)

  const handleShowPreview = (id) => {
    setPreviewImageURL(id)
    setShowPreview(true)
  }

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading])

  return (
    <>
      <div className='img__view'>
        <div className='img__wrapper'>
          {
            images.map((image, index) => {
              if (images.length === index + 1) {
                return <div className="img__card" onClick={() => handleShowPreview(image)} ref={lastBookElementRef} key={image.id}>
                  <img src={image.urls.small} loading='lazy' ></img>
                  <div className='img__description font-bold'>  {image.user.first_name}</div>
                </div>
              } else {
                return <div className="img__card " onClick={() => handleShowPreview(image)} key={image.id}>
                  <img src={image.urls.small} loading='lazy'></img>
                  <div className='img__description font-bold'>  {image.user.first_name}</div>
                </div>
              }
            })
          }
        </div>
        {
          showPreview &&
          <div className='img__preview__wrapper'>
            <div className='img__preview'>
              <div className='preview__close' onClick={() => setShowPreview(false)}>
                <img src={CloseIcon}></img>
              </div>
              <img className='image_tag' src={previewImageURL.urls.regular}></img>
              <p className='font-bold ml-3 text-lg '>{previewImageURL.user.first_name}</p>
            </div>
          </div>

        }
      </div>
    </>


  )
}
