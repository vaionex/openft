import PropTypes from 'prop-types'
import { EyeIcon } from '@heroicons/react/outline'
import DropdownSelect from '@/components/ui/dropdown-select'
import ImageUpload from '@/components/ui/image-upload'
import { InputMain } from '@/components/ui/inputs'

const UploadForm = () => {
  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })
  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Upload artwork file"
            sublabel="This will be your NFT"
          />
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <ImageUpload subinfo="Dimension: 1:1. Max size: 100 MB" />
          </div>
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label label="Artwork name" htmlFor="artwork-name" />
          <InputMain.Input
            id="artwork-name"
            placeholder="e.g. My artwork"
            className="sm:col-span-2"
            sublabel="This will be displayed on your artwork."
            onChange={() => {}}
          />
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Description"
            sublabel="A quick snapshot of your artwork."
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

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="External link"
            sublabel="Additional links about your artwork."
            htmlFor="external-link"
            tooltip={{
              title: 'External link',
              text: "Openft will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.",
            }}
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

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Collections"
            sublabel="This is the collection where your item will appear."
            htmlFor="collections"
          />
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <DropdownSelect add />
            <p className="mt-2 text-sm text-gray-500">
              You can also create new collections from here.
            </p>
          </div>
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Starting price"
            sublabel="This is the collection where your item will appear."
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
            tooltip={{
              text: 'This conversion is based on coinmarketcap.',
            }}
          />
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Supply"
            sublabel="The number of copies minted artwork."
            htmlFor="supply"
          />
          <InputMain.Input
            id="supply"
            type="number"
            placeholder="e.g. 10"
            onChange={() => {}}
            className="sm:col-span-2"
            tooltip={{
              title: 'Supply',
              text: 'Presently we only provide 1 supply for each NFT to preserve the originality of each NFT.',
            }}
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
