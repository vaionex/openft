import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import ModalImgCropper from '../modal-img-cropper'
import { v4 as uuidv4 } from 'uuid'

import { getStorage, ref, uploadBytes } from 'firebase/storage'
import getCroppedImg from '@/utils/cropImageUtils'
import { useDispatch } from 'react-redux'
import { setPhotoValues } from '@/redux/slices/registration-form'

const ImageCropper = ({
  id,
  image,
  aspect,
  isCropping,
  setIsCropping,
  setToState,
}) => {
  const dispatch = useDispatch()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCroppedImage = useCallback(async () => {
    const src = image.src
    const ext = image.ext
    const name = `${uuidv4()}.${ext}`
    const type = id
    try {
      const { file, url } = await getCroppedImg(
        { src, ext, name, type },
        croppedAreaPixels,
      )

      setToState({
        id,
        file: {
          src,
          srcCropped: url,
          name: image.name,
          ext: ext,
          size: file.size,
          type: id,
          croppedAreaPixels,
        },
        croppedBlobFile: file,
      })

      setIsCropping(false)
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
          classes={{
            containerClassName: 'bg-blue-500',
            mediaClassName: 'shadow-2xl',
          }}
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
