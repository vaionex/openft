import { ImageUploadedIcon } from '@/components/common/icons'
import { TrashIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'
import ProgressBar from '@ramonak/react-progress-bar'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import bytesToSize from '@/utils/bytesToSizes'

const ImageUploadReviewCard = ({ image, collection }) => {
  const uploadFile = async (file, collection) => {
    return file
  }

  useEffect(() => {
    async function upload() {
      const url = await uploadFile(image?.file, collection)
    }
    upload()
  }, [image])

  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg">
      <div className="flex gap-4">
        <ImageUploadedIcon className="w-8 h-8 " />
        <div className="flex flex-col flex-1">
          <span className="text-sm text-gray-700">{image?.file?.name}</span>
          <span className="text-sm text-gray-500">
            {bytesToSize(image?.file?.size)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <CheckCircleIcon className="w-5 h-5 text-blue-500" />
          <TrashIcon className="w-5 h-5 text-gray-300 cursor-pointer " />
        </div>
      </div>
      <div>
        <div className="relative pr-10">
          <ProgressBar
            height="8px"
            className="progress-bar-wrapper"
            barContainerClassName="bg-gray-200 rounded-lg"
            labelClassName="absolute right-0 text-sm text-gray-700"
            completed={20}
          />
        </div>
      </div>
    </div>
  )
}

ImageUploadReviewCard.defaultProps = {
  image: {},
  collection: '',
}

ImageUploadReviewCard.propTypes = {
  image: PropTypes.object.isRequired,
  collection: PropTypes.string,
}

export default ImageUploadReviewCard
