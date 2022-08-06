import TextEditor from '@/components/ui/text-editor'
import { EyeIcon } from '@heroicons/react/outline'
import PropTypes from 'prop-types'
import { SettingsFormInput } from '../../inputs'
import SettingsForm from '../settings-form-old'
import ImageUpload from '../settings-parts/image-upload'

const SettingsUploadForm = () => {
  return (
    <form className="space-y-8 divide-y divide-gray-200 ">
      <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-b sm:border-gray-200 sm:pb-5">
          <label
            htmlFor="photo"
            className="block text-lg font-medium text-gray-700"
          >
            Upload Artwork
            <span className="block text-sm font-normal text-gray-500">
              This will be displayed on your profile.
            </span>
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="flex items-center justify-end">
              <button className="btn-secondary">
                Preview
                <span className="ml-2">
                  <EyeIcon width={20} height={20} />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-b sm:border-gray-200 sm:pb-5">
          <label className="block text-sm font-medium text-gray-700">
            Upload artwork file
            <span className="block font-normal text-gray-500">
              This will be your NFT
            </span>
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <ImageUpload />
          </div>
        </div>

        <SettingsFormInput
          label="Artwork name"
          id="artwork-name"
          placeholder="e.g. My artwork"
          subLabel="This will be displayed on your artwork."
          onChange={() => {}}
        />

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-b sm:border-gray-200 sm:pb-5">
          <label
            htmlFor="art-description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
            <span className="block font-normal text-gray-500">
              A quick snapshot of your artwork.
            </span>
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <textarea
              id="art-description"
              name="art-description"
              rows={3}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              defaultValue={''}
              placeholder="Write a short description of your artwork."
            />
            <p className="mt-2 text-sm text-gray-500">40 characters left</p>
          </div>
        </div>

        <SettingsFormInput
          label="External link"
          subLabel="Additional links about your artwork."
          id="external-link"
          variant="add-on"
          addon="https://"
          placeholder="e.g. openft.com"
          onChange={() => {}}
        />

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-b sm:border-gray-200 sm:pb-5">
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-700"
          >
            Collections
            <span className="block font-normal text-gray-500">
              This is the collection where your item will appear.
            </span>
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <select
              id="location"
              name="location"
              className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              defaultValue="Awesome Boxes"
            >
              <option>Awesome Boxes</option>
              <option>Awesome Boxes 2</option>
              <option>Awesome Boxes 3</option>
            </select>
            <p className="mt-2 text-sm text-gray-500">
              You can also create new collections from here.
            </p>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-b sm:border-gray-200 sm:pb-5">
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-700"
          >
            Starting price
            <span className="block font-normal text-gray-500">
              This is the collection where your item will appear.
            </span>
          </label>
          <input
            type="text"
            name="starting-price"
            id="starting-price"
            autoComplete="given-name"
            className="block w-full border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g. $0.00"
          />
          <input
            type="text"
            name="bsv"
            id="bsv"
            className="block w-full border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="1 BSV"
          />
        </div>

        <SettingsFormInput
          label="Supply"
          subLabel="The number of copies minted artwork."
          id="supply"
          type="number"
          placeholder="e.g. 10"
          onChange={() => {}}
        />
      </div>
    </form>
  )
}

export default SettingsUploadForm
