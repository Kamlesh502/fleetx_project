import React from 'react'

const ImageCard = React.forwardRef((props, ref) => {


  const handleImageClick = () => {
    props.handleShowPreview(props.imgData.download_url)
  }
  return (
    <>
      <div className="img__card " onClick={handleImageClick} ref={ref}>
        <>
          <img src={props.imgData.download_url}  ></img>
          <div className='img__description'>  {props.imgData.author}</div>
        </>
      </div>
    </>

  )
})

export default ImageCard