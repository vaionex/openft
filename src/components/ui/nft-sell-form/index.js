import ButtonWLoading from '../button-w-loading'
import { InputMain } from '../inputs'
import { Controller, useForm } from 'react-hook-form'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import { useEffect, useRef, useState } from 'react'
import validationSchema from './validationScheme'
import usePriceConverter from '@/hooks/usePriceConverter'
import { createAtomicSwapOffer } from '@/services/relysia-queries'
import { doc, writeBatch } from 'firebase/firestore'
import userSelector from '@/redux/selectors/user'
import { useSelector } from 'react-redux'
import { firebaseDb } from '@/firebase/init'
import { toast } from 'react-toastify'
import {
  firebaseGetSingleDoc,
  firebaseSetDoc,
  firebaseUpdateDoc,
} from '@/firebase/utils'

const NFTSellForm = ({ onClose, data, setIslive, setRefresh, refresh }) => {
  const resolver = useYupValidationResolver(validationSchema)
  const [bsvPrice, setBsvPrice] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const textAreaRef = useRef(null)
  const usdBalance = usePriceConverter()
  const { currentUser } = useSelector(userSelector)
  const [dollarPrice, setDollarPrice] = useState('0 USD')
  const bsvBalance = usePriceConverter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver,
  })
  const bsvAmount = watch('amountInBSV')

  useEffect(() => {
    if (bsvAmount && /^[0-9]*(\.[0-9]{1,8})?$/.test(bsvAmount)) {
      const usdEquivalent = (bsvAmount * usdBalance).toFixed(8)
      const parsedUsdEquivalent = parseFloat(usdEquivalent)

      // Check if the parsedUsdEquivalent is a whole number
      if (Number.isInteger(parsedUsdEquivalent)) {
        setDollarPrice(`${parsedUsdEquivalent} USD`) // Whole number
      } else {
        setDollarPrice(`${parsedUsdEquivalent.toFixed(8)} USD`) // Decimal with 8 digits
      }
    } else {
      setDollarPrice('0 USD')
    }
  }, [bsvAmount, usdBalance])
  

  const onSubmit = async (formData) => {
    formData = { ...data, ...formData }
    let formattedAmountInBSV = parseFloat(+formData.amountInBSV)
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

    try {
      setIsLoading(true)

      let amountInBSV = formData?.amountInBSV
      const atomicSwapOffer = await createAtomicSwapOffer({
        tokenId: data?.tokenId,
        amount: formData?.amount,
        wantedAmount: amountInBSV,
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

      // updating database

      const batch = writeBatch(firebaseDb)
      const tokenRef = doc(firebaseDb, 'nfts', data?.tokenId)

      // Format amountInBSV for display

      let tokenObj = {
        amount: formData.amount,
        amountInBSV: formattedAmountInBSV,
        description: formData.description,
        status: 'live',
        offerHex:
          atomicSwapOffer &&
          atomicSwapOffer.contents &&
          atomicSwapOffer.contents[0]
            ? atomicSwapOffer.contents[0]
            : null,
      }

      let nftDataToFirebase = {}

      if (!data.status) {
        nftDataToFirebase = {
          ...formData,
          amountInBSV: formattedAmountInBSV,
          imageURL: data?.image || data?.imageURL,
          ownerId: currentUser.uid,
          minterId: currentUser.uid,
          likes: 0,
          status: 'live',
          tokenId: data?.tokenId,
          name: data?.name,
          username: currentUser?.displayName || '',
        }
        tokenObj = { ...tokenObj, ...nftDataToFirebase }
      }

      const item = await firebaseGetSingleDoc('nfts', data?.tokenId)
      if (item) {
        await firebaseUpdateDoc('nfts', data?.tokenId, { status: 'live' })
      } else {
        await firebaseSetDoc('nfts', data?.tokenId, nftDataToFirebase)
      }

      batch.update(tokenRef, tokenObj)
      await batch.commit()

      setIsLoading(false)
      setIslive(true)
      onClose()
      setRefresh(!refresh)

      toast.success('NFT Updated Successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } catch (err) {
      console.log('err: ', err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full mb-4">
        <InputMain className="relative pb-2 border-none sm:gap-1">
          <InputMain.Label label="Sale Price" htmlFor="bsvAmount" required />
          <Controller
            name="amountInBSV"
            control={control}
            defaultValue={data?.amountInBSV}
            render={({ field }) => {
              return (
                <InputMain.Input
                  id="amountInBSV"
                  type="text"
                  className="relative"
                  inputClassName="md:h-11"
                  placeholder="e.g. 1 BSV"
                  pattern="^(0|[1-9]\d{0,8})(\.\d{1,8})?$"
                  onInvalid={(e) =>
                    e.target.setCustomValidity('BSV amount must be a number')
                  }
                  onInput={(e) => e.target.setCustomValidity('')} // Clear custom validity on input
                  error={errors['amountInBSV']?.message}
                  maxLength={10}
                  {...field}
                />
              )
            }}
          />
        </InputMain>
        <div className="text-right mr-2">{dollarPrice}</div>
      </div>

      <div className="w-full">
        <InputMain className="relative border-none justify-items-start sm:pb-2 sm:gap-1">
          <InputMain.Label label="Description" htmlFor="description" required />
          <Controller
            name="description"
            control={control}
            defaultValue={data?.description}
            render={({ field }) => {
              return (
                <InputMain.Textarea
                  id="description"
                  className="w-full"
                  rows={6}
                  onChange={() => {}}
                  error={errors['description']?.message}
                  {...field}
                  ref={textAreaRef}
                />
              )
            }}
          />
        </InputMain>
      </div>

      <div className="mt-5 border-t border-gray-200 flex gap-1.5 justify-end py-3">
        {onClose && (
          <button
            type="button"
            onClick={() => onClose()}
            className="inline-flex text-xs justify-center items-center w-fit px-4 py-2.5 sm:text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 sm:text-sm"
          >
            Cancel
          </button>
        )}
        <ButtonWLoading
          isPending={isLoading}
          type="submit"
          text="LIST ITEM ON MARKET"
          className="font-normal text-xs sm:text-base"
        />
      </div>
    </form>
  )
}
export default NFTSellForm
