import { useEffect, useRef, useState } from 'react'
import ImageUploadDragAndDrop from '@/components/ui/image-upload-drag-n-drop'
import { InputMain } from '@/components/ui/inputs'
import validationSchema from './validationScheme'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { useForm, Controller, useWatch } from 'react-hook-form'
import usePriceConverter from '@/hooks/usePriceConverter'
import { firbaseAddDoc, firebaseUploadBlob } from '@/firebase/utils'
import Spinner from '@/components/ui/spinner'
import { useSelector } from 'react-redux'
import userSelector from '@/redux/selectors/user'
import { mintNFT } from '@/services/relysia-queries'
import { ButtonWLoading } from '@/components/ui/buttons'

const inputAttributes = {
  id: 'nftImage',
  name: 'nftImage',
  title: 'NFT Image',
  text: 'Click to upload cover photo',
  subinfo: 'Dimension: 1:1. Max size:4 MB',
  limits: {
    maxWidth: 3840,
    maxHeight: 2160,
    maxSize: 10, //MB
  },
  aspect: 1,
}

const UploadForm = () => {
  const { currentUser, isAuthenticated } = useSelector(userSelector)
  const [bsValue, setBsValue] = useState('')
  const DESC_MAX_LENGTH = 40
  const { usdBalance } = usePriceConverter()
  const [photoValues, setPhotoValues] = useState({})
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    supply: '',
  })
  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })

  const [msg, setMsg] = useState({
    photoValidateMessage: null,
    descriptionValidateMessage: null,
  })
  const [descriptionLen, setDescriptionLen] = useState(null)
  const descriptionRef = useRef(null)

  const { isSubmitting, isValid, errors } = formState

  // useEffect(() => {
  //   if (usdPrice) {
  //     setBsValue((usdPrice / usdBalance).toFixed(3))
  //   } else {
  //     setBsValue('0 BSV')
  //   }
  // }, [usdPrice])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 divide-y divide-gray-200"
    >
      <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Upload artwork file"
            sublabel="This will be your NFT"
          />
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <ImageUploadDragAndDrop
              attributes={inputAttributes}
              handleClear={() => setPhotoValues({})}
              isSelected={!!photoValues[inputAttributes.id]}
              srcUploadNft={photoValues}
              setImageToState={handleImageState}
              photoValues={photoValues}
            />
            <div className="text-xs text-red-600 ">
              {msg.photoValidateMessage}
            </div>
          </div>
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label label="Artwork name" htmlFor="artworkName" />
          <Controller
            name={'artworkName'}
            control={control}
            render={({ field }) => {
              return (
                <InputMain.Input
                  id="artworkName"
                  sublabel="This will be displayed on your artwork."
                  className="sm:col-span-2"
                  placeholder="e.g. My artwork"
                  onChange={() => {}}
                  {...field}
                />
              )
            }}
          />
          <div className="grid text-xs text-red-600 sm:col-span-3 sm:grid-cols-3">
            <div className="sm:col-span-1"></div>
            <div className="mt-3 sm:col-span-2 sm:pl-2 sm:mt-0">
              {errors['artworkName']?.message}
            </div>
          </div>
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Description"
            sublabel="A quick snapshot of your artwork."
            htmlFor="art-description"
          />
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <textarea
              id="art-description"
              name="art-description"
              ref={descriptionRef}
              onChange={onDescriptonChange}
              rows={3}
              maxLength={40}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              defaultValue={''}
              placeholder="Write a short description of your artwork."
            />
            <p className="mt-2 text-sm text-gray-500">
              {40 - descriptionLen} characters left
            </p>
            <div className="grid text-xs text-red-600 sm:col-span-3 sm:grid-cols-3">
              {msg.descriptionValidateMessage}
            </div>
          </div>
        </InputMain>

        {/* <InputMain className="sm:grid-cols-3">
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
        </InputMain> */}

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Starting price"
            sublabel="This is the collection where your item will appear."
            htmlFor="price"
          />
          <Controller
            name={'price'}
            control={control}
            render={({ field }) => {
              return (
                <InputMain.Input
                  name="price"
                  type="number"
                  id="price"
                  autoComplete="given-name"
                  placeholder="e.g. $0.00"
                  {...field}
                />
              )
            }}
          />
          <InputMain.Input
            name="bsv"
            id="bsv"
            disabled
            value={bsValue}
            className="mt-2 sm:mt-0"
            placeholder="1 BSV"
            onChange={() => {}}
            tooltip={{
              text: 'This conversion is based on coinmarketcap.',
            }}
          />
          <div className="grid text-xs text-red-600 sm:col-span-3 sm:grid-cols-3">
            <div className="sm:col-span-1"></div>
            <div className="mt-3 sm:col-span-2 sm:pl-2 sm:mt-0">
              {errors['price']?.message}
            </div>
          </div>
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Supply"
            sublabel="The number of copies minted artwork."
            htmlFor="supply"
          />
          <Controller
            name={'supply'}
            control={control}
            render={({ field }) => {
              return (
                <InputMain.Input
                  id="supply"
                  type="number"
                  placeholder="e.g. 10"
                  className="sm:col-span-2"
                  tooltip={{
                    title: 'Supply',
                    text: 'Presently we only provide 1 supply for each NFT to preserve the originality of each NFT.',
                  }}
                  onChange={() => {}}
                  {...field}
                />
              )
            }}
          />
          <div className="grid text-xs text-red-600 sm:col-span-3 sm:grid-cols-3">
            <div className="sm:col-span-1"></div>
            <div className="mt-3 sm:col-span-2 sm:pl-2 sm:mt-0">
              {errors['supply']?.message}
            </div>
          </div>
        </InputMain>

        <div className="flex flex-col items-center space-y-3 justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4">
          {/* {isSuccess && (
                <span className="text-xs text-green-500">
                  Profile successfully updated.{' '}
                </span>
              )} */}
          <ButtonWLoading
            isError={isError}
            isPending={isPending}
            text="Save"
            onClick={onSubmit}
          />
        </div>
      </div>
    </form>
  )
}

export default UploadForm
