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

const NFTSellForm = ({ onClose, data }) => {
  const resolver = useYupValidationResolver(validationSchema)
  const [bsvPrice, setBsvPrice] = useState('')

  const textAreaRef = useRef(null)
  const usdBalance = usePriceConverter()
  const { currentUser } = useSelector(userSelector)
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
  const usdPrice = watch('amount')

  useEffect(() => {
    if (usdPrice) {
      setBsvPrice(`${(usdPrice / usdBalance).toFixed(4)} BSV`)
    } else {
      setBsvPrice('0 BSV')
    }
  }, [usdBalance, usdPrice])
  const onSubmit = async (formData) => {
    try {
      let amountInBSV = Number((formData.amount / usdBalance).toFixed(8))
      //creating atomic swap offer
      console.log('creating offer hex')

      const atomicSwapOffer = await createAtomicSwapOffer({
        tokenId: data?.tokenId,
        amount: 1,
        wantedAmount: amountInBSV, //data?.amountInBSV,
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

      console.log('atomicSwapOffer', atomicSwapOffer)

      //updating database
      console.log('updating database')

      const batch = writeBatch(firebaseDb)
      const tokenRef = doc(firebaseDb, 'nfts', data?.tokenId)

      let tokenObj = {
        amount: formData.amount,
        amountInBSV: amountInBSV,
        description: formData.description,
        status: 'live',
        offerHex:
          atomicSwapOffer && atomicSwapOffer?.contents[0]
            ? atomicSwapOffer.contents[0]
            : null,
      }

      batch.update(tokenRef, tokenObj)
      await batch.commit()
      onClose()

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
      console.log('err', err)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full mb-4">
        <InputMain className="relative pb-2 border-none sm:gap-1">
          <InputMain.Label label="Sale Price" htmlFor="Sale Price" required />
          <Controller
            name="amount"
            control={control}
            defaultValue={data?.amount}
            render={({ field }) => {
              return (
                <InputMain.Input
                  id="amount"
                  type="number"
                  className="relative"
                  inputClassName="md:h-11"
                  inputIcon="$"
                  value={90}
                  onChange={() => {}}
                  error={errors['amount']?.message}
                  {...field}
                />
              )
            }}
          />
        </InputMain>
        <div className="text-right mr-2">{bsvPrice}</div>
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
            className="inline-flex justify-center w-fit px-4 py-2.5 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 sm:text-sm"
          >
            Cancel
          </button>
        )}
        <ButtonWLoading
          type="submit"
          text="LIST ITEM ON MARKET"
          className="font-normal"
        />
      </div>
    </form>
  )
}
export default NFTSellForm
