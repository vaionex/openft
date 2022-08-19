import { useState, useRef, useEffect, useCallback } from 'react'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import ModalImgCropper from '../modal-img-cropper'

const ImageCropper = ({ src, aspect, isCropping, setIsCropping }) => {
  const [cropConfig, setCropConfig] = useState({
    unit: 'px',
    width: 100,
    height: 100,
  })

  // crop functions

  const handleOnCropImageLoaded = (image) => {
    console.log(image, 'imageeeeeee')
  }

  const onCropChange = useCallback((crop) => {
    setCropConfig(crop)
  }, [])

  const onCropComplete = useCallback((crop, pixelCrop) => {
    console.log(crop, 'crop')
    console.log(pixelCrop, 'pixelCrop')
  }, [])

  // end crop functions

  return (
    <ModalImgCropper isOpen={isCropping} handleOnClose={setIsCropping}>
      <div>
        <ReactCrop
          crop={cropConfig}
          aspect={aspect || 1}
          onChange={onCropChange}
          onComplete={onCropComplete}
        >
          <img src={src} alt="Crop" />
        </ReactCrop>
        {JSON.stringify(src)}
      </div>
    </ModalImgCropper>
  )
}

export default ImageCropper
