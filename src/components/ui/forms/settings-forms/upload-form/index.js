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
import { v4 as uuidv4 } from 'uuid'
import { doc, Timestamp, writeBatch } from 'firebase/firestore'
import { firebaseDb } from '@/firebase/init'
import { SendNotification } from '@/services/novu-notifications'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { envMODE } from '@/config/envMode'

const imageInputAttributes = {
  id: 'nftImage',
  name: 'nftImage',
  title: 'NFT Image',
  text: 'Click to upload',
  subinfo: 'Max size:4 MB',
  limits: {
    // maxWidth: 600,
    // maxHeight: 600,
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
  const { control, handleSubmit, formState, reset, watch, setValue } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })
  const router = useRouter()
  const bsvAmount = watch('bsvAmount') // Get the value of BSV amount input

  useEffect(() => {
    if (bsvAmount && !isNaN(bsvAmount)) {
      const usdEquivalent = (bsvAmount * usdBalance).toFixed(8)
      setValue('amount', usdEquivalent, { shouldValidate: true }) // Set the USD equivalent in the 'amount' input
    } else {
      setValue('amount', '', { shouldValidate: true }) // Clear the 'amount' input if BSV amount is empty
    }
  }, [bsvAmount, usdBalance, setValue])

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
    setIsPending(true)
    try {
      if (!photoValues?.nftImage) {
        throw new Error('Please upload an image')
      }

      const { fileFromStorage, url } = await firebaseUploadNftImage({
        file: croppedImageBlob,
        userId: currentUser.uid,
      })
      if (!fileFromStorage) {
        throw new Error('Failed to upload image to server')
      }

      const uploadData = {
        type: 'media',
        fileFromStorage,
        fileName: formData.name,
        fileUrl: url,
        notes: 'Empty notes',
      }
      const blockchainResponse = await uploadNFTFile(uploadData)
      if (!blockchainResponse) {
        throw new Error(
          'Failed to upload file to blockchain, please press "Save" again',
        )
      }

      const {
        uploadObj: { txid, url: blockchainUrl },
      } = blockchainResponse

      //minting nft
      const nftImageForDisplay = await firebaseGetNftImageUrl(
        currentUser.uid,
        fileFromStorage.metadata?.name,
        'normal',
      )
      const dataToMint = {
        name: formData.name,
        description: formData.description,
        supply: +formData.supply || 1,
        txid,
        url: envMODE === 'DEV' ? nftImageForDisplay : url,
        // image: url,
      }
      const mintResponse = await mintNFT(dataToMint)
      if (!mintResponse) {
        throw new Error('Failed to mint NFT')
      }
      const { tokenId, tokenObj } = mintResponse

      let formattedAmountInBSV = parseFloat(+formData.bsvAmount)
        .toFixed(8)
        .toString()

      if (
        formattedAmountInBSV.includes('.') &&
        parseFloat(formattedAmountInBSV) ===
          Math.floor(parseFloat(formattedAmountInBSV))
      ) {
        formattedAmountInBSV = parseFloat(formattedAmountInBSV).toFixed(0)
      }
      formData.amountInBSV = formattedAmountInBSV

      const atomicSwapOffer = await createAtomicSwapOffer({
        tokenId,
        amount: 1,
        wantedAmount: formattedAmountInBSV,
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
        amountInBSV: formattedAmountInBSV,
        imageURL: envMODE === 'DEV' ? nftImageForDisplay : url,
        ownerId: currentUser.uid,
        minterId: currentUser.uid,
        likes: 0,
        status: 'live',
        tokenId,
        contractTxid: tokenObj.contractTxid,
        issueTxid: tokenObj.issueTxid,
        username: currentUser?.username || '',
        offerHex: atomicSwapOffer?.contents[0]
          ? atomicSwapOffer.contents[0]
          : null,
      }
      console.log('tokenIdnftDataToFirebase', nftDataToFirebase)

      const nftDataFromFirebase = await firebaseSetDoc(
        'nfts',
        tokenId,
        nftDataToFirebase,
      )

      if (!nftDataFromFirebase) {
        throw new Error('Failed occured while uploading the NFT')
      }

      //nft history
      const batch = writeBatch(firebaseDb)

      let nftHisId = uuidv4()
      const hisRef = doc(firebaseDb, 'nfts', tokenId, 'nftHistory', nftHisId)
      let hisObj = {
        type: 'MINT',
        sn: 1,
        timestamp: Timestamp.now(),
        // amount: formData.amount,
        amountInBSV: formattedAmountInBSV,
        minterId: currentUser.uid,
        txid: tokenObj.issueTxid,
      }
      batch.set(hisRef, hisObj)
      await batch.commit()

      setIsSuccess(true)

      SendNotification(currentUser.uid, 'Your NFT has been created!')

      resetAllData()
      router.push('/user-settings/collection')
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
        <InputMain className="sm:flex sm:justify-between sm:gap-8">
          <InputMain.Label
            className="sm:w-[280px]"
            label="Upload artwork file"
            sublabel="This will be your NFT"
            htmlFor="nftImage"
          />
          <div
            className={twMerge(
              'mt-1 sm:mt-0 sm:w-full sm:max-w-[666px]',
              isPending && 'pointer-events-none touch-none',
            )}
          >
            <ImageUploadDragAndDrop
              attributes={imageInputAttributes}
              acceptableFileTypes={['JPG', 'JPEG', 'PNG', 'GIF', 'SVG', 'WEBP']}
              handleClear={() => setPhotoValues({})}
              isSelected={!!photoValues[imageInputAttributes.id]}
              setImageToState={handleImageState}
              photoValues={photoValues}
            />
          </div>
        </InputMain>

        <InputMain className="sm:flex sm:justify-between sm:gap-8">
          <InputMain.Label
            label="Artwork name"
            sublabel="This will be displayed on your artwork."
            htmlFor="name"
            className="sm:w-[280px]"
          />
          <div className="mt-1 sm:mt-0 sm:w-full sm:max-w-[666px]">
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
                    inputContainer="md:h-11"
                    error={errors['name']?.message}
                    disabled={isPending}
                    required
                    {...field}
                  />
                )
              }}
            />
          </div>
        </InputMain>

        <InputMain className="sm:flex sm:justify-between sm:gap-8">
          <InputMain.Label
            label="Description"
            sublabel="A quick snapshot of your artwork."
            htmlFor="description"
            className="sm:w-[280px]"
          />
          <div className="mt-1 sm:mt-0 sm:w-full sm:max-w-[666px]">
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
                  required
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

        <InputMain className="sm:flex sm:justify-between sm:gap-8">
          <InputMain.Label
            label="Starting price (BSV)"
            sublabel="The price shown on your artwork."
            htmlFor="bsvAmount"
            className="sm:w-[280px]"
          />
          <div className="flex flex-col sm:flex-row mt-1 sm:mt-0 gap-4 w-full sm:max-w-[666px]">
            <Controller
              name="bsvAmount"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputMain.Input
                  name="bsvAmount"
                  type="text"
                  id="bsvAmount"
                  className="relative w-full sm:w-1/2"
                  inputContainer="md:h-11"
                  autoComplete="given-name"
                  placeholder="e.g. 1 BSV"
                  pattern="^(0|[1-9]\d{0,8})(\.\d{1,8})?$"
                  tooltip={{
                    text: 'Enter the amount in BSV.',
                  }}
                  error={errors['bsvAmount']?.message}
                  disabled={isPending}
                  maxLength={10}
                  onInvalid={(e) =>
                    e.target.setCustomValidity('BSV amount must be a number')
                  }
                  required
                  onInput={(e) => e.target.setCustomValidity('')} // Clear custom validity on input
                  {...field}
                />
              )}
            />

            <Controller
              name="amount"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputMain.Input
                  name="amount"
                  type="text"
                  id="amount"
                  className="relative w-full mt-2 text-gray-500 sm:mt-0 sm:w-1/2"
                  inputContainer="md:h-11"
                  placeholder="0.00 USD"
                  tooltip={{
                    text: 'This is the equivalent amount in USD.',
                  }}
                  error={errors['amount']?.message}
                  disabled
                  required
                  {...field}
                />
              )}
            />
          </div>
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
          <div className="flex space-x-3">
            <div className="rounded-md">
              <Link href="/">
                <a className="flex items-center leading-5 justify-center w-full px-4 py-[10px] text-sm font-medium text-bluewood bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                  Cancel
                </a>
              </Link>
            </div>
            <ButtonWLoading
              className={'text-sm px-4 py-[10px]'}
              isError={isError}
              isPending={isPending}
              text="Mint"
              type="submit"
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default UploadForm
