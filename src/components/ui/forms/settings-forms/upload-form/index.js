import PropTypes from 'prop-types'
import { EyeIcon } from '@heroicons/react/outline'
import { InputMain } from '../../../inputs'
import ImageUpload from '../../settings-parts/image-upload'

const UploadForm = () => {
  const showPreview = (e) => {
    e.preventDefault()
    console.log('show preview')
  }

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
              <button onClick={showPreview} className="btn-secondary">
                Preview
                <span className="ml-2">
                  <EyeIcon width={20} height={20} />
                </span>
              </button>
            </div>
          </div>
        </div>

        <InputMain>
          <InputMain.Label
            label="Upload artwork file"
            subLabel="This will be your NFT"
          />
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <ImageUpload />
          </div>
        </InputMain>

        <InputMain>
          <InputMain.Label label="Artwork name" htmlFor="artwork-name" />
          <InputMain.Input
            id="artwork-name"
            placeholder="e.g. My artwork"
            className="sm:col-span-2"
            subLabel="This will be displayed on your artwork."
            onChange={() => {}}
          />
        </InputMain>

        <InputMain>
          <InputMain.Label
            label="Description"
            subLabel="A quick snapshot of your artwork."
            htmlFor="description"
          />
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
        </InputMain>

        <InputMain>
          <InputMain.Label
            label="External link"
            subLabel="Additional links about your artwork."
            htmlFor="external-link"
          />
          <InputMain.Input
            id="external-link"
            variant="add-on"
            addon="https://"
            placeholder="e.g. openft.com"
            onChange={() => {}}
            className="sm:col-span-2"
          />
        </InputMain>

        <InputMain>
          <InputMain.Label
            label="Collections"
            subLabel="This is the collection where your item will appear."
            htmlFor="collections"
          />
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <select
              id="collections"
              name="collections"
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
        </InputMain>

        <InputMain>
          <InputMain.Label
            label="Starting price"
            subLabel="This is the collection where your item will appear."
            htmlFor="starting-price"
          />
          <InputMain.Input
            name="starting-price"
            id="starting-price"
            autoComplete="given-name"
            placeholder="e.g. $0.00"
            onChange={() => {}}
          />
          <InputMain.Input
            name="bsv"
            id="bsv"
            placeholder="1 BSV"
            onChange={() => {}}
          />
        </InputMain>

        <InputMain>
          <InputMain.Label
            label="Supply"
            subLabel="The number of copies minted artwork."
            htmlFor="supply"
          />
          <InputMain.Input
            id="supply"
            type="number"
            placeholder="e.g. 10"
            onChange={() => {}}
            className="sm:col-span-2"
          />
        </InputMain>

        <div className="flex justify-end gap-3 border-none">
          <button type="button" className="btn-secondary py-2.5">
            Cancel
          </button>
          <button type="button" className="btn-primary py-2.5">
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default UploadForm
