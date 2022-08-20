import { ImageUploadedIcon } from '@/components/common/icons'
import { TrashIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'
import ProgressBar from '@ramonak/react-progress-bar'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import bytesToSize from '@/utils/bytesToSizes'
import { Avatar } from '../../avatars'

const ImageUploadReviewCard = ({
  filename,
  filesize,
  imageFile,
  imageUrl,
  collection,
  clearImage,
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-lg">
      <div className="flex gap-4">
        <ImageUploadedIcon className="w-8 h-8 " />
        <div className="flex flex-col flex-1">
          <span className="text-sm text-gray-700">{imageUrl && filename}</span>
          <span className="text-sm text-gray-500">
            {imageUrl && bytesToSize(filesize)}
          </span>
        </div>
        <div className="flex gap-2">
          <CheckCircleIcon className="w-5 h-5 text-blue-500" />
          <TrashIcon
            className="w-5 h-5 text-gray-300 cursor-pointer "
            onClick={clearImage}
          />
        </div>
      </div>
      {imageUrl && collection === 'profileImage' && (
        <>
          <h3 className="text-center">Profile Photo</h3>
          <img
            src={imageUrl}
            alt={filename}
            className="w-24 h-24 mx-auto rounded-full"
          />
        </>
      )}
      {imageUrl && collection === 'coverImage' && (
        <>
          <h3 className="text-center">Cover Photo</h3>
          <img src={imageUrl} alt={filename} className="w-full h-full" />
        </>
      )}
      {/* <div>
        <div className="relative pr-10">
          <ProgressBar
            height="8px"
            className="progress-bar-wrapper"
            barContainerClassName="bg-gray-200 rounded-lg"
            labelClassName="absolute right-0 text-sm text-gray-700"
            completed={20}
          />
        </div>
      </div> */}
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
