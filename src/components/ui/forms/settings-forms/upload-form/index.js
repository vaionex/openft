import PropTypes from 'prop-types'
import { EyeIcon } from '@heroicons/react/outline'
import DropdownSelect from '@/components/ui/dropdown-select'
import ImageUpload from '@/components/ui/image-upload'
import ImageUploadDragAndDrop from '@/components/ui/image-upload-drag-n-drop'
import { InputMain } from '@/components/ui/inputs'
import validationSchema from './validationScheme'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import usePriceConverter from '@/hooks/usePriceConverter'
import mint from '@/utils/mint'
import { firbaseAddDoc, firebaseUploadBlob } from '@/firebase/utils'
import Spinner from '@/components/ui/spinner'
import { useSelector } from 'react-redux'
import userSelector from '@/redux/selectors/user'

const inputAttribute = {
  id: 'coverImage',
  name: 'coverImage',
  text: 'Click to upload cover photo',
  subinfo: 'Dimension: 1:1. Max size:4 MB',
  limits: {
    maxWidth: 3840,
    maxHeight: 2160,
    maxSize: 4, //MB
  },
  aspect: 1,
}

const UploadForm = () => {
  const { currentUser, isAuthenticated } = useSelector(userSelector)
  const [bsValue, setBsValue] = useState('')
  const [msg, setMsg] = useState({
    photoValidateMessage: null,
    descriptionValidateMessage: null,
  })
  const { usdBalance } = usePriceConverter()
  const [descriptionLen, setDescriptionLen] = useState(null)
  const [photoValues, setPhotoValues] = useState({})
  const descriptionRef = useRef(null)
  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })
  const { isSubmitting, isValid, errors } = formState

  const usdPrice = useWatch({
    control,
    name: 'price',
  })

  const resetHandler = () => {
    setMsg({
      photoValidateMessage: null,
      descriptionValidateMessage: null,
    })
    reset({ artworkName: '', supply: '', price: 0 })
  }

  const setImageToState = ({ id, file, buffer }) => {
    setPhotoValues({
      [id]: { ...file, buffer },
    })
  }

  const onSubmit = async (data) => {
    const { artworkName, supply, price } = data
    if (descriptionRef.current.value && photoValues.coverImage) {
      const randomUID = Math.random().toString(36).substring(2, 14)
      const date = new Date()
      const { buffer, ext } = photoValues.coverImage
      const imageName = randomUID + date.getTime()
      const url = await firebaseUploadBlob(buffer, imageName, ext)
      try {
        const nftDetails = {
          url,
          description: descriptionRef.current.value,
          artworkName,
          supply,
          price,
        }

        const { tokenId, txId } = await mint(nftDetails)
        const { displayName, name, profileImage, uid } = currentUser
        await firbaseAddDoc('nfts', currentUser.uid, {
          artist: {
            name,
            profileImage,
            username: displayName,
          },
          nfts: [
            {
              amount: price,
              artworkName,
              url,
              description: descriptionRef.current.value,
              supply,
              likes: 0,
              tokenId,
              txId,
            },
          ],
          uid,
        })
        setMsg({
          photoValidateMessage: null,
          descriptionValidateMessage: null,
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      const photoValidateMessage = photoValues?.coverImage
        ? null
        : 'Please upload an NFT'
      const descriptionValidateMessage = descriptionRef.current?.value
        ? null
        : 'Description is required'
      setMsg({
        photoValidateMessage,
        descriptionValidateMessage,
      })
    }
  }

  const onDescriptonChange = (e) => {
    e.preventDefault()
    if (descriptionRef.current.value) {
      setDescriptionLen(descriptionRef.current.value.length)
    } else {
      setDescriptionLen(0)
    }
  }

  useEffect(() => {
    if (usdPrice) {
      setBsValue((usdPrice / usdBalance).toFixed(3))
    } else {
      setBsValue('0 BSV')
    }
  }, [usdPrice])

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
              id={inputAttribute.id}
              name={inputAttribute.name}
              text={inputAttribute.text}
              subinfo={inputAttribute.subinfo}
              limits={inputAttribute.limits}
              aspect={inputAttribute.aspect}
              handleClear={() => setPhotoValues({})}
              isSelected={!!photoValues[inputAttribute.id]}
              srcUploadNft={photoValues}
              setImageToState={setImageToState}
            />
            <div className=" text-xs text-red-600">
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
          <div className="grid sm:col-span-3 sm:grid-cols-3 text-xs text-red-600">
            <div className="sm:col-span-1"></div>
            <div className="sm:col-span-2 sm:pl-2 mt-3 sm:mt-0">
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
            <div className="grid sm:col-span-3 sm:grid-cols-3 text-xs text-red-600">
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
          <div className="grid sm:col-span-3 sm:grid-cols-3 text-xs text-red-600">
            <div className="sm:col-span-1"></div>
            <div className="sm:col-span-2 sm:pl-2 mt-3 sm:mt-0">
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
          <div className="grid sm:col-span-3 sm:grid-cols-3 text-xs text-red-600">
            <div className="sm:col-span-1"></div>
            <div className="sm:col-span-2 sm:pl-2 mt-3 sm:mt-0">
              {errors['supply']?.message}
            </div>
          </div>
        </InputMain>

        <div className="flex justify-end gap-3 border-none">
          <button
            type="button"
            onClick={resetHandler}
            className="btn-secondary py-2.5"
          >
            Cancel
          </button>
          {/* <button type="submit" className="btn-primary py-2.5">
            Save
          </button> */}
          <button
            type="submit"
            className={` font-semibold relative py-2.5 ${
              isSubmitting ? 'btn-secondary px-10' : 'btn-primary'
            }`}
          >
            Save
            {isSubmitting && <Spinner size="w-5 h-5 absolute top-3 right-1" />}
          </button>
        </div>
      </div>
    </form>
  )
}

export default UploadForm
