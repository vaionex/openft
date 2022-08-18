import { useState, useRef, useEffect } from 'react'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import ModalSimple from '../modal-simple'

const ImageCropper = ({
  file,
  crop,
  isCropping,
  setIsCropping,
  onCropChange,
  onCropComplete,
  onCropImageLoaded,
}) => {
  return (
    <ModalSimple isOpen={isCropping} handleOnClose={setIsCropping}>
      <div>
        <ReactCrop
          crop={crop}
          aspect={1 / 1}
          onImageLoaded={onCropImageLoaded}
          onChange={onCropChange}
          onComplete={onCropComplete}
        >
          <img src={file?.src} />
        </ReactCrop>
      </div>
    </ModalSimple>
  )
}

export default ImageCropper
