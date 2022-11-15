import React, { useEffect, useState } from 'react'
import { ShareIcon } from '@heroicons/react/outline'
import {
  increment,
  arrayUnion,
  arrayRemove,
  writeBatch,
  doc,
  Timestamp,
} from 'firebase/firestore'
import {
  firebaseAddDoc,
  firebaseAddNewNotification,
  firebaseGetSingleDoc,
  firebaseUpdateDoc,
} from '@/firebase/utils'

import Image from 'next/image'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'
import CardLikeButton from '../../card-like-button'
import NextLink from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import userSelector from '@/redux/selectors/user'
import { useRouter } from 'next/router'
import ModalConfirm from '../../modal-confirm'
import useArtistData from '@/hooks/useArtistData'
import walletSelector from '@/redux/selectors/wallet'
import Alert from '@/components/ui/alert'
import { FeaturedIcon } from '@/components/common/icons'
import { swapNft, createAtomicSwapOffer } from '@/services/relysia-queries'
import { firebaseDb } from '@/firebase/init'
import { v4 as uuidv4 } from 'uuid'
import Social from '../../popover'
import { setOpen } from '@/redux/slices/basket'
import { async } from '@firebase/util'
import { SendNotification } from '@/services/novu-notifications'

// import { async } from 'functions/node_modules/@firebase/util/dist/util-public'

const ProductsCarouselCard = ({
  data,
  type,
  idx,
  favouriteNfts,
  usdBalance,
  setFavouriteNfts,
  setData,
  view,
  index,
  setDataArr,
  singleNFT = false,
  setnftHistory,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const isInFirstThree = idx < 3
  const router = useRouter()
  const [hasLike, setHasLike] = useState(false)
  const artistData = useArtistData(data?.ownerId)
  const { currentUser, isAuthenticated, notificationObj } =
    useSelector(userSelector)
  const { paymail, address, balance } = useSelector(walletSelector)
  const [loadingPurchaseBtn, setloadingPurchaseBtn] = useState(false)
  const [dialogErrorMsg, setdialogErrorMsg] = useState(null)
  const [successTx, setsuccessTx] = useState(null)
  const [totalLikes, setTotalLikes] = useState(data?.likes)

  const dispatch = useDispatch()
  useEffect(() => {
    if (dialogErrorMsg) {
      setTimeout(() => {
        setdialogErrorMsg(null)
      }, 5000)
    }
  }, [dialogErrorMsg])

  const handleBuyNft = async () => {
    try {
      setloadingPurchaseBtn(true)

      //checking if user own this nft
      if (data?.ownerId === currentUser?.uid) {
        setdialogErrorMsg('You own this NFT')

        setloadingPurchaseBtn(false)
        return null
      }

      //checking wallet balance
      let nftPriceInBSV = Number((data?.amount / usdBalance).toFixed(8))
      if (balance < nftPriceInBSV) {
        setdialogErrorMsg('Insufficient balance in wallet')

        setloadingPurchaseBtn(false)
        return null
      }

      //swaping nft
      console.log('validations passed')
      console.log('swaping nft')
      if (!data?.offerHex) {
        setdialogErrorMsg('NFT is not available for sale any more!')
        setloadingPurchaseBtn(false)
        return null
      }
      const swapNftRes = await swapNft(data?.offerHex)

      console.log('swapNftRes', swapNftRes)
      let transactionTx =
        swapNftRes?.txIds && swapNftRes?.txIds[0] ? swapNftRes?.txIds[0] : null
      // let transactionTx = null //remove
      console.log('transactionTx', transactionTx)
      if (swapNftRes && swapNftRes.status === 'error') {
        setdialogErrorMsg(swapNftRes.msg)
        setloadingPurchaseBtn(false)
        return null
      }

      if (!transactionTx) {
        setdialogErrorMsg('Nft is not indexed yet, please try later!')
        setloadingPurchaseBtn(false)
        return null
      }

      //creating atomic swap offer
      console.log('creating offer hex')
      // const atomicSwapOffer = null //remove
      const atomicSwapOffer = await createAtomicSwapOffer({
        tokenId: data?.tokenId,
        amount: data?.amountInBSV,
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
        ownerId: currentUser.uid,
        offerHex:
          atomicSwapOffer && atomicSwapOffer?.contents[0]
            ? atomicSwapOffer.contents[0]
            : null,
      }
      batch.update(tokenRef, tokenObj)

      //nft history
      let nftHisId = uuidv4()
      const hisRef = doc(
        firebaseDb,
        'nfts',
        data?.tokenId,
        'nftHistory',
        nftHisId,
      )
      let hisObj = {
        type: 'PURCHASE',
        sn: 1,
        timestamp: Timestamp.now(),
        amount: data?.amount,
        amountInBSV: data?.amountInBSV,
        purchaserId: currentUser.uid,
        sellerId: data?.ownerId,
        txid: transactionTx,
      }
      batch.set(hisRef, hisObj)
      await batch.commit()

      // updaing nft data locally
      if (view === 'product') {
        setDataArr((prev) => {
          let updatedArr = [...prev]
          updatedArr[index] = {
            ...updatedArr[index],
            ownerId: currentUser.uid,
            offerHex:
              atomicSwapOffer && atomicSwapOffer?.contents[0]
                ? atomicSwapOffer.contents[0]
                : null,
          }
          return updatedArr
        })
      } else if (setData) {
        setData((prev) => ({
          ...prev,
          ownerId: currentUser.uid,
          offerHex:
            atomicSwapOffer && atomicSwapOffer?.contents[0]
              ? atomicSwapOffer.contents[0]
              : null,
        }))
        //updating his array
        setnftHistory((prev) => [hisObj, ...prev])
      }

      setIsOpen(false)
      setloadingPurchaseBtn(false)
      setsuccessTx(transactionTx)
      setIsSuccess(true)

      SendNotification(data?.ownerId, `Your ${data?.name} has been sold`)
      SendNotification(currentUser?.uid, `You have purchased ${data?.name}`)
    } catch (err) {
      console.log('buy func error', err)
      setloadingPurchaseBtn(false)
      setdialogErrorMsg('An error occured! please try later')
    }
  }

  const notifyUser = async (currentUserId, ownerId, nftName, nftId) => {
    const purchaserNotificationValues = {
      type: 'debit',
      message: `You have purchased <strong>${nftName}</strong>`,
      nftId,
    }

    const sellerNotificationValues = {
      type: 'credit',
      message: `Your <strong>${nftName}</strong> has been sold`,
      nftId,
    }
    console.log(':::: 1', notificationObj)
    // currentUser
    if (notificationObj['app-notification'].purchases) {
      const pur = await firebaseAddNewNotification(
        currentUserId,
        purchaserNotificationValues,
      )
    }
    // for seller
    const ownerNotificationSetting = await firebaseGetSingleDoc(
      'notifications',
      ownerId,
    )
    console.log(':::: 2', ownerNotificationSetting)
    if (ownerNotificationSetting['app-notification'].itemSold) {
      const sel = await firebaseAddNewNotification(
        ownerId,
        sellerNotificationValues,
      )
    }
  }

  useEffect(() => {
    if (!favouriteNfts) return
    const isLike =
      favouriteNfts?.findIndex((like) => like === data?.tokenId) !== -1
    setHasLike(isLike)
  }, [data?.tokenId, favouriteNfts])

  const likeNfts = async () => {
    if (!currentUser) return
    if (hasLike) {
      setHasLike(false)
      setTotalLikes(totalLikes - 1)

      await firebaseUpdateDoc('favourites', currentUser?.uid, {
        nfts: arrayRemove(data?.tokenId),
      })
      setFavouriteNfts((state) => {
        if (state) {
          const newState = state.filter((s) => s !== data?.tokenId)
          return [...newState]
        } else {
          return state
        }
      })
      await firebaseUpdateDoc('nfts', data?.tokenId, { likes: increment(-1) })
    } else {
      setHasLike(true)
      setTotalLikes(totalLikes + 1)

      const updateFav = { nfts: arrayUnion(data?.tokenId) }
      if (favouriteNfts) {
        await firebaseUpdateDoc('favourites', currentUser?.uid, updateFav)
        if (setFavouriteNfts) {
          setFavouriteNfts((state) => [...state, data?.tokenId])
        }
      } else {
        await firebaseAddDoc('favourites', currentUser?.uid, updateFav)
      }
      await firebaseUpdateDoc('nfts', data?.tokenId, { likes: increment(1) })
    }
  }

  return (
    <div
      key={data?.id}
      className={twMerge(
        'relative border border-gray-200 group rounded-xl flex flex-col',
        type === 'carousel' ? 'sm:mr-5' : '',
      )}
    >
      <div className="relative">
        <div className="relative w-full overflow-hidden bg-gray-200 rounded-t-xl aspect-w-square aspect-h-square group-hover:opacity-75">
          <NextLink href={`/discover/${data?.tokenId}`}>
            <a className="cursor-pointer">
              {data?.imageURL ? (
                <>
                  <Image
                    src={data?.imageURL || ''}
                    alt={data?.name}
                    layout="fill"
                    className="absolute inset-0 object-cover object-center w-full h-full"
                    priority={type === 'list' && isInFirstThree}
                    quality={70}
                  />
                  <div className="absolute inset-0 h-full bg-gradient-to-tr opacity-10 from-slate-900 to-slate-600 mix-blend-multiply" />
                </>
              ) : (
                <div className="absolute inset-0 h-full bg-gradient-to-tr opacity-80 from-blue-600 to-blue-300 " />
              )}
            </a>
          </NextLink>
        </div>
        <div className="absolute bottom-0 right-0 z-20 inline-flex p-4 overflow-hidden rounded-lg">
          <CardLikeButton likeNfts={likeNfts} hasLike={hasLike} />
        </div>
      </div>
      <div className="flex flex-col flex-1 px-4 py-5">
        <div className="flex items-center justify-between">
          {totalLikes > 0 && (
            <p className="px-3 py-2 rounded-lg text-[#667085] bg-gray-50">
              {totalLikes}
            </p>
          )}
          <p className="py-2 ml-auto text-xl font-medium text-[#101828]">
            <span className="mr-2">${data?.amount}</span> BSV{' '}
            <span>
              {data?.amount && Number((data?.amount / usdBalance).toFixed(4))}
            </span>
          </p>
        </div>
        {!singleNFT && (
          <div className="flex-1 my-6">
            <NextLink href={`/discover/${data?.tokenId}`}>
              <a className="cursor-pointer">
                <h3 className="text-sm text-[#155EEF] min-h-[20px]">
                  {artistData?.name}
                </h3>
                <p className="h-10 mt-1 text-lg text-gray-800">{data?.name}</p>
              </a>
            </NextLink>
          </div>
        )}
        <div className={`flex gap-1.5 ${singleNFT ? 'my-2' : ''}`}>
          <button
            onClick={() => {
              if (isAuthenticated) {
                setIsOpen(true)
              } else {
                router.push('/login')
              }
            }}
            className="bg-[#155EEF] hover:bg-[#2d6ff1] rounded-lg text-white py-2.5 flex w-full border-none justify-center items-center font-normal"
          >
            Buy now
          </button>
          <button className="border border-gray-200 rounded-md">
            {/* <ShareIcon className="w-5 h-5 text-blue-700" aria-hidden="true" /> */}
            <Social path={`/discover/${data?.tokenId}`} />
          </button>
        </div>
      </div>
      <ModalConfirm
        isOpen={isOpen}
        button1Text={'Confirm'}
        button2Text={'Cancel'}
        title={'Are you sure you want'}
        secondTitle={'to buy this NFT?'}
        content={
          <Card
            data={data}
            artistData={artistData}
            usdBalance={usdBalance}
            dialogErrorMsg={dialogErrorMsg}
            totalLikes={totalLikes}
          />
        }
        onClose={() => setIsOpen(false)}
        onConfirm={handleBuyNft}
        isLoadingConfirmBtn={loadingPurchaseBtn}
      />
      <ModalConfirm
        isOpen={isSuccess}
        button1Text={'Confirm'}
        icon={
          <FeaturedIcon
            className="w-12 h-12 text-green-500"
            aria-hidden="true"
          />
        }
        cancelButton={false}
        title={'Success'}
        content={
          <div>
            You have successfully purchased <br /> &apos;{data?.name}&apos; NFT.{' '}
            <br /> {successTx && <>Tx id: {successTx}</>}
          </div>
        }
        onClose={() => {
          setIsSuccess(false)
          setsuccessTx(null)
          // setIsOpen(false)
        }}
        onConfirm={() => {
          setIsSuccess(false)
          // setIsOpen(false)
        }}
      />
    </div>
  )
}

ProductsCarouselCard.defaultProps = {
  data: {},
  type: 'default',
}

ProductsCarouselCard.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['default', 'list', 'carousel']),
}

export default ProductsCarouselCard

const Card = ({ data, artistData, usdBalance, dialogErrorMsg, totalLikes }) => {
  console.warn('data', data)
  return (
    <div>
      <div
        className={twMerge(
          'relative border border-gray-200 group rounded-xl flex flex-col',
        )}
      >
        <div className="relative h-[280px]">
          <div className="relative w-full overflow-hidden bg-gray-200 rounded-t-xl aspect-w-square h-[280px] group-hover:opacity-75">
            {data?.imageURL ? (
              <>
                <Image
                  src={data?.imageURL || ''}
                  alt={data?.name}
                  layout="fill"
                  className="absolute inset-0 object-cover object-center w-full"
                  quality={70}
                />
                <div className="absolute inset-0 h-full bg-gradient-to-tr opacity-10 from-slate-900 to-slate-600 mix-blend-multiply" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr opacity-80 from-blue-600 to-blue-300 " />
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 px-4 py-5">
          <div className="flex items-center justify-between">
            {totalLikes > 0 && (
              <p className="px-3 py-2 text-base font-normal text-[#667085] rounded-lg bg-gray-50">
                {totalLikes}
              </p>
            )}
            <p className="py-2 ml-auto text-xl font-medium text-[#101828]">
              <span className="mr-2">${data?.amount}</span> BSV{' '}
              <span>
                {data?.amount && Number((data.amount / usdBalance).toFixed(4))}
              </span>
            </p>
          </div>
          <div className="flex-1 mt-6">
            <h3 className="text-sm text-start text-blue-700 min-h-[20px]">
              {artistData?.name}
            </h3>
            <p className="mt-1 text-lg text-gray-800 text-start">
              {data?.name}
            </p>
            {/* <p className="mt-1 text-lg text-gray-800 text-start">
            Wallet Balance
          </p> */}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-1">
        <div>
          {dialogErrorMsg && <Alert message={dialogErrorMsg} type="error" />}{' '}
        </div>
      </div>
    </div>
  )
}
