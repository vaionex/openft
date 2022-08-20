import { getCroppedImg } from '@/utils/cropImageUtils'
import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import ModalImgCropper from '../modal-img-cropper'

import { getStorage, ref, uploadBytes } from 'firebase/storage'

const ImageCropper = ({
  image,
  filename,
  aspect,
  isCropping,
  setIsCropping,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image.src, croppedAreaPixels)
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)

      const storage = getStorage()

      const storageRef = ref(storage, `${image.name}`)

      uploadBytes(storageRef, croppedImage).then((snapshot) => {
        console.log('Uploaded a blob or file!')
        console.log(snapshot)
      })
    } catch (e) {
      console.warn(e)
    }
  }, [image?.src, croppedAreaPixels])

  const onClose = () => {
    setIsCropping(false)
  }

  return (
    <ModalImgCropper isOpen={isCropping}>
      <div className="relative min-h-[300px]  sm:min-w-[600px] sm:min-h-[400px] w-100 ">
        <Cropper
          image={image.src}
          crop={crop}
          zoom={zoom}
          aspect={aspect || 1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <div className="flex gap-4 mt-4">
        <div className="text-xs">ZOOM</div>
        <input
          value={zoom}
          step={0.1}
          min={1}
          max={3}
          aria-labelledby="Zoom"
          className="w-full"
          type="range"
          onChange={(e) => setZoom(e.target.value)}
        />
      </div>

      <div>
        <img src={croppedImage} alt="" />
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-10">
        <button className="min-w-[180px] btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button
          className="min-w-[180px] btn-primary"
          onClick={handleCroppedImage}
        >
          Crop Image
        </button>
      </div>
    </ModalImgCropper>
  )
}

export default ImageCropper
