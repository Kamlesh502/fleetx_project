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
            images.map((img, index) => {
              if (images.length === index + 1) {
                return <ImageCard imgData={img} key={img.id} handleShowPreview={handleShowPreview} ref={lastBookElementRef} />
              } else {
                return <ImageCard imgData={img} key={img.id} handleShowPreview={handleShowPreview} />
              }
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
    </>


  )
}
