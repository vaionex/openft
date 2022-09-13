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
import ButtonWLoading from '@/components/ui/button-w-loading'

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
  const { currentUser } = useSelector(userSelector)
  const DESC_MAX_LENGTH = 40
  const { usdBalance } = usePriceConverter()
  const [photoValues, setPhotoValues] = useState({})
  const [croppedImageBlob, setCroppedImageBlob] = useState(null)
  const [bsvPrice, setBsvPrice] = useState(0)
  //
  const [isError, setIsError] = useState(false)
  const [isPending, setIsPending] = useState(false)
  //

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: null,
    supply: null,
    // artist: {
    //   name: currentUser?.username || '',
    //   profileImage: currentUser?.profileImage || '',
    //   username: currentUser?.username || '',
    // },
  })

  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })

  const { isSubmitting, isValid, errors } = formState

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageState = ({ id, file, croppedBlobFile }) => {
    setPhotoValues({
      [id]: file,
    })
    setCroppedImageBlob(croppedBlobFile)
  }

  const onSubmit = async (data) => {
    console.log(data)
  }

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
            htmlFor="nftImage"
          />
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <ImageUploadDragAndDrop
              attributes={inputAttributes}
              handleClear={() => setPhotoValues({})}
              isSelected={!!photoValues[inputAttributes.id]}
              setImageToState={handleImageState}
              photoValues={photoValues}
            />
            {/* <div className="text-xs text-red-600 ">
              {msg?.photoValidateMessage}
            </div> */}
          </div>
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label label="Artwork name" htmlFor="name" />
          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              return (
                <InputMain.Input
                  id="name"
                  sublabel="This will be displayed on your artwork."
                  className="sm:col-span-2"
                  placeholder="e.g. My artwork"
                  onChange={() => {}}
                  error={errors['name']?.message}
                  {...field}
                />
              )
            }}
          />
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Description"
            sublabel="A quick snapshot of your artwork."
            htmlFor="description"
          />
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <InputMain.Textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Write a short description of your artwork."
                  onChange={handleOnChange}
                  error={errors['description']?.message}
                  {...field}
                />
              )}
            />
            <p className="mt-2 text-sm text-gray-500">
              {DESC_MAX_LENGTH - formValues.description.length} characters left
            </p>
          </div>
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Starting price"
            sublabel="This is the collection where your item will appear."
            htmlFor="price"
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => {
              return (
                <InputMain.Input
                  name="price"
                  type="number"
                  id="price"
                  autoComplete="given-name"
                  placeholder="e.g. $0.00"
                  error={errors['price']?.message}
                  {...field}
                />
              )
            }}
          />
          <InputMain.Input
            name="bsv"
            id="bsv"
            disabled
            value={bsvPrice}
            className="mt-2 text-gray-500 sm:mt-0"
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
          <Controller
            name="supply"
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
                  error={errors['supply']?.message}
                  {...field}
                />
              )
            }}
          />
        </InputMain>

        <div className="flex flex-col items-center justify-end space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          {/* {isSuccess && (
                <span className="text-xs text-green-500">
                  Profile successfully updated.{' '}
                </span>
              )} */}
          <ButtonWLoading
            isError={isError}
            isPending={isPending}
            text="Save"
            type="submit"
          />
        </div>
      </div>
    </form>
  )
}

export default UploadForm
