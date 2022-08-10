import { UploadIcon } from '@/components/common/icons'
import PropTypes from 'prop-types'

const ImageUpload = ({ text, subinfo }) => {
  return (
    <div className="mt-1 sm:mt-0 sm:col-span-2">
      <div className="flex justify-center w-full px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-full bg-gray-50">
            <UploadIcon width={20} height={20} />
          </div>
          <div className="flex justify-center text-sm text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative font-medium text-blue-600 bg-white rounded-md cursor-pointer hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <span>{text}</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM.
          </p>
          {subinfo && <p className="text-xs text-gray-500">{subinfo}</p>}
        </div>
      </div>
    </div>
  )
}

ImageUpload.defaultProps = {
  text: 'Click to upload',
  subinfo: null,
}

ImageUpload.propTypes = {
  text: PropTypes.string,
  subinfo: PropTypes.node,
}

export default ImageUpload
