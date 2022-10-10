import { useEffect, useState } from 'react'
import ImageUploadDragAndDrop from '@/components/ui/image-upload-drag-n-drop'
import { InputMain } from '@/components/ui/inputs'
import validationSchema from './validationScheme'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { useForm, Controller } from 'react-hook-form'
import usePriceConverter from '@/hooks/usePriceConverter'
import userSelector from '@/redux/selectors/user'
import {
  mintNFT,
  uploadNFTFile,
  createAtomicSwapOffer,
} from '@/services/relysia-queries'
import ButtonWLoading from '@/components/ui/button-w-loading'
import { twMerge } from 'tailwind-merge'
import { useSelector } from 'react-redux'
import {
  firebaseSetDoc,
  firebaseAddDocWithRandomID,
  firebaseGetNftImageUrl,
  firebaseUploadNftImage,
} from '@/firebase/utils'

const imageInputAttributes = {
  id: 'nftImage',
  name: 'nftImage',
  title: 'NFT Image',
  text: 'Click to upload cover photo',
  subinfo: 'Max Resolution: 600x600. Max size:4 MB',
  limits: {
    maxWidth: 600,
    maxHeight: 600,
    maxSize: 4, //MB
  },
  aspect: 1,
}

const UploadForm = () => {
  const { currentUser } = useSelector(userSelector)
  const DESC_MAX_LENGTH = 200
  const usdBalance = usePriceConverter()
  const [photoValues, setPhotoValues] = useState({})
  const [bsvPrice, setBsvPrice] = useState('')
  const [croppedImageBlob, setCroppedImageBlob] = useState(null)

  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const resolver = useYupValidationResolver(validationSchema)
  const { control, handleSubmit, formState, reset, watch } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })

  const { errors } = formState

  const usdPrice = watch('amount')

  useEffect(() => {
    let timeout
    if (errorMessage) {
      timeout = setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
    return () => clearTimeout(timeout)
  }, [errorMessage])

  const handleImageState = ({ id, file, croppedBlobFile }) => {
    setPhotoValues({
      [id]: file,
    })
    setCroppedImageBlob(croppedBlobFile)
  }

  const resetAllData = () => {
    reset({
      amount: '',
      description: '',
      name: '',
      // supply: '',
    })
    setPhotoValues({})
    setCroppedImageBlob(null)
  }

  const onSubmit = async (formData) => {
    console.log('submit call ')
    setIsPending(true)

    try {
      if (!photoValues?.nftImage) {
        throw new Error('Please upload an image')
      }

      //uploading image to firebase storage
      console.log('uploading image to Firebase storage')

      const { fileFromStorage } = await firebaseUploadNftImage({
        file: croppedImageBlob,
        userId: currentUser.uid,
      })
      if (!fileFromStorage) {
        throw new Error('Failed to upload image to server')
      }

      const nftImageForChain = await firebaseGetNftImageUrl(
        currentUser.uid,
        fileFromStorage.metadata?.name,
        'small',
      )

      const fileToChain = {
        fileUrl: nftImageForChain,
        fileName: formData.name,
      }

      console.log('uploading image to BSV network')
      const blockchainResponse = await uploadNFTFile(fileToChain)
      if (!blockchainResponse) {
        throw new Error(
          'Failed to upload file to blockchain, please press "Save" again',
        )
      }
      const {
        uploadObj: { txid, url: blockchainUrl },
      } = blockchainResponse

      //minting nft
      console.log('minting NFT')
      const dataToMint = {
        name: formData.name,
        description: formData.description,
        amount: +formData.amount,
        supply: +formData.supply || 1,
        txid,
      }
      const mintResponse = await mintNFT(dataToMint)
      if (!mintResponse) {
        throw new Error('Failed to mint NFT')
      }
      const { tokenId, tokenObj } = mintResponse
      const nftImageForDisplay = await firebaseGetNftImageUrl(
        currentUser.uid,
        fileFromStorage.metadata?.name,
        'normal',
      )

      //creating atomic swap offer
      console.log('creating offer hex')
      let amountInBSV = Number((formData.amount / usdBalance).toFixed(8))
      const atomicSwapOffer = await createAtomicSwapOffer({
        tokenId,
        amount: amountInBSV,
        sn: 1,
      })

      if (
        !atomicSwapOffer ||
        (atomicSwapOffer && !atomicSwapOffer.contents) ||
        (atomicSwapOffer &&
          atomicSwapOffer.contents &&
          !atomicSwapOffer.contents[0])
      ) {
        throw new Error('Failed to create Offer')
      }

      //saving data to database
      console.log('saving data to database')
      const nftDataToFirebase = {
        ...formData,
        amountInBSV: amountInBSV,
        imageURL: nftImageForDisplay,
        ownerId: currentUser.uid,
        minterId: currentUser.uid,
        likes: 0,
        tokenId,
        contractTxid: tokenObj.contractTxid,
        issueTxid: tokenObj.issueTxid,
        // artist: {
        //   name: currentUser?.name || '',
        //   profileImage: currentUser?.profileImage || '',
        //   username: currentUser?.username || '',
        // },
        offerHex: atomicSwapOffer?.contents[0]
          ? atomicSwapOffer.contents[0]
          : null,
      }
      console.log('tokenId', tokenId)
      const nftDataFromFirebase = await firebaseSetDoc(
        'nfts',
        tokenId,
        nftDataToFirebase,
      )

      if (!nftDataFromFirebase) {
        throw new Error('Failed occured while uploading the NFT')
      }

      setIsSuccess(true)
      resetAllData()
    } catch (error) {
      if (error?.message) {
        setIsError(true)
        setErrorMessage(error.message)
      }
    } finally {
      setIsPending(false)
    }
  }

  useEffect(() => {
    if (usdPrice) {
      setBsvPrice(`${(usdPrice / usdBalance).toFixed(4)} BSV`)
    } else {
      setBsvPrice('0 BSV')
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
            htmlFor="nftImage"
          />
          <div
            className={twMerge(
              'mt-1  sm:mt-0 sm:col-span-2',
              isPending && 'pointer-events-none touch-none',
            )}
          >
            <ImageUploadDragAndDrop
              attributes={imageInputAttributes}
              handleClear={() => setPhotoValues({})}
              isSelected={!!photoValues[imageInputAttributes.id]}
              setImageToState={handleImageState}
              photoValues={photoValues}
            />
          </div>
        </InputMain>

        <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Artwork name"
            sublabel="This will be displayed on your artwork."
            htmlFor="name"
          />
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <InputMain.Input
                  id="name"
                  className="sm:col-span-2"
                  placeholder="e.g. My artwork"
                  onChange={() => {}}
                  error={errors['name']?.message}
                  disabled={isPending}
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
              defaultValue=""
              render={({ field }) => (
                <InputMain.Textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Write a short description of your artwork."
                  onChange={() => {}}
                  error={errors['description']?.message}
                  maxLength={DESC_MAX_LENGTH}
                  disabled={isPending}
                  {...field}
                />
              )}
            />
            <p className="mt-2 text-sm text-gray-500">
              {watch('description')
                ? DESC_MAX_LENGTH - watch('description').length
                : DESC_MAX_LENGTH}{' '}
              characters left
            </p>
          </div>
        </InputMain>

        <InputMain className=" sm:grid-cols-3">
          <InputMain.Label
            label="Starting price"
            sublabel="The price shown on your artwork."
            htmlFor="amount"
          />

          <Controller
            name="amount"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <InputMain.Input
                  name="amount"
                  type="number"
                  id="amount"
                  autoComplete="given-name"
                  placeholder="e.g. $0.00"
                  error={errors['amount']?.message}
                  disabled={isPending}
                  inputIcon="$"
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

        {/* <InputMain className="sm:grid-cols-3">
          <InputMain.Label
            label="Supply"
            sublabel="The number of copies minted artwork."
            htmlFor="supply"
          />
          <Controller
            name="supply"
            control={control}
            defaultValue=""
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
                  disabled={isPending}
                  {...field}
                />
              )
            }}
          />
        </InputMain> */}

        <div className="flex flex-col items-center justify-end space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          {isSuccess && (
            <span className="text-xs text-green-500">
              NFT successfully created!
            </span>
          )}
          {isError && (
            <span className="text-xs text-red-500">{errorMessage}</span>
          )}
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
