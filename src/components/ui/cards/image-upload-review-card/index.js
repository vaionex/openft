import { ImageUploadedIcon } from '@/components/common/icons'
import { TrashIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'
// import ProgressBar from '@ramonak/react-progress-bar'
import PropTypes from 'prop-types'
import bytesToSize from '@/utils/bytesToSizes'
import registrationFormSelector from '@/redux/selectors/registration-form'
import { useSelector } from 'react-redux'

const ImageUploadReviewCard = ({ id, cleanUpState }) => {
  const { photoValues } = useSelector(registrationFormSelector)

  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg">
      {photoValues[id].srcCropped && id === 'profileImage' && (
        <>
          <h3 className="text-center">Profile Photo</h3>
          <img
            src={photoValues[id].srcCropped}
            alt={photoValues[id].filename}
            className="w-16 h-16 mx-auto rounded-full"
          />
        </>
      )}
      {photoValues[id].srcCropped && id === 'coverImage' && (
        <>
          <h3 className="text-center">Cover Photo</h3>
          <img
            src={photoValues[id].srcCropped}
            alt={photoValues[id].filename}
            className="w-full h-full rounded-md"
          />
        </>
      )}
      <div className="flex gap-4">
        <ImageUploadedIcon className="w-8 h-8 " />
        <div className="flex flex-col flex-1">
          <span className="text-sm text-gray-700">{photoValues[id].name}</span>
          <span className="text-sm text-gray-500">
            {bytesToSize(photoValues[id].size)}
          </span>
        </div>
        <div className="flex gap-2">
          <CheckCircleIcon className="w-5 h-5 text-blue-500" />
          <TrashIcon
            className="w-5 h-5 text-gray-300 cursor-pointer "
            onClick={cleanUpState}
          />
        </div>
      </div>

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
