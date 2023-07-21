import React, { useEffect, useState } from 'react'
import { ShareIcon } from '@heroicons/react/outline'
import {
  increment,
  arrayUnion,
  arrayRemove,
  writeBatch,
  doc,
  Timestamp,
  getDoc,
} from 'firebase/firestore'
import {
  firebaseAddDoc,
  firebaseAddNewNotification,
  firebaseDeleteDoc,
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
import { CustomTrashIcon, FeaturedIcon } from '@/components/common/icons'
import { swapNft, createAtomicSwapOffer } from '@/services/relysia-queries'
import { firebaseDb } from '@/firebase/init'
import { v4 as uuidv4 } from 'uuid'
import Social from '../../popover'
import { setOpen } from '@/redux/slices/basket'
import { async } from '@firebase/util'
import { SendNotification } from '@/services/novu-notifications'
import useToken from '@/hooks/useTokenDetails'
import useRedeemToken from '@/hooks/useReedemToken'
import ReactTooltip from 'react-tooltip'

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
  isUserDetails,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isDestory, setIsDestory] = useState(false)
  const [isDestorySuccess, setIsDestorySuccess] = useState(false)
  const isInFirstThree = idx < 3
  const router = useRouter()
  const [hasLike, setHasLike] = useState(false)
  const artistData = useArtistData(data?.ownerId)
  const { currentUser, isAuthenticated, notificationObj } =
    useSelector(userSelector)
  const { paymail, address, balance } = useSelector(walletSelector)
  const [loadingPurchaseBtn, setloadingPurchaseBtn] = useState(false)
  const [loadingDestoryBtn, setLoadingDestoryBtn] = useState(false)
  const [dialogErrorMsg, setdialogErrorMsg] = useState(null)
  const [successTx, setsuccessTx] = useState(null)
  const [totalLikes, setTotalLikes] = useState(data?.likes)
  const { token } = useToken(router.query?.slug, isUserDetails)

  const { redeemToken } = useRedeemToken()

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

      //checking if nft status is private
      const docRef = doc(firebaseDb, 'nfts', data.tokenId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists() && docSnap.data()) {
        const { status } = docSnap.data()
        if (!status === 'live') {
          setdialogErrorMsg('This NFT is not available for Purchase.')
          setloadingPurchaseBtn(false)
          return null
        }
      } else {
        setdialogErrorMsg('We can not process your request at a moment.')

        setloadingPurchaseBtn(false)
        return null
      }

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
        amount: 1,
        wantedAmount: data?.amountInBSV,
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
        status: 'private',
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
      router.reload()
    } catch (err) {
      console.log('buy func error', err)
      setloadingPurchaseBtn(false)
      setdialogErrorMsg('An error occured! please try later')
    }
  }

  const handleDestoryNft = async () => {
    setLoadingDestoryBtn(true)

    const { error, message } = await redeemToken(
      data?.tokenId,
      token.sats_per_token,
      token.total_supply,
    )

    if (message) {
      await firebaseDeleteDoc('nfts', data?.id)
      SendNotification(
        currentUser?.uid,
        `Your ${data?.name} has been destroyed!`,
      )
      setIsDestorySuccess(true)
      setIsDestory(false)
      setLoadingDestoryBtn(false)
    }

    if (error) {
      setdialogErrorMsg(
        'We were unable to destroy your NFT. Please try again later',
      )
      setIsDestorySuccess(false)
      setLoadingDestoryBtn(false)
    }
  }

  useEffect(() => {
    if (!favouriteNfts) return
    const isLike =
      favouriteNfts?.findIndex((like) => like === data?.tokenId) !== -1
    setHasLike(isLike)
  }, [data?.tokenId, favouriteNfts])

  const likeNfts = async () => {
    if (!isAuthenticated) router.push('/login')
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
        <div className="relative w-full overflow-hidden bg-gray-200 rounded-t-xl aspect-w-square aspect-h-square group-hover:opacity-80">
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
                  {/* <div className="absolute inset-0 h-full bg-gradient-to-tr opacity-10 from-slate-900 to-slate-600 mix-blend-multiply" /> */}
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-blue-300" />
              )}
            </a>
          </NextLink>
        </div>
        <div className="absolute bottom-0 right-0 z-20 inline-flex p-4 overflow-hidden rounded-lg">
          <CardLikeButton likeNfts={likeNfts} hasLike={hasLike} />
        </div>
        {singleNFT && data?.ownerId === currentUser?.uid && (
          <div className="absolute bottom-0 z-20 inline-flex p-4 overflow-hidden rounded-lg right-[3.3rem]">
            <div
              onClick={() => setIsDestory(true)}
              className="inline-flex items-center justify-center bg-[hsl(231,6%,75%)] border border-lightgray rounded-md cursor-pointer bg-opacity-40 hover:bg-opacity-30 hover:bg-lightgray w-11 h-11"
            >
              <CustomTrashIcon />
              <div
                data-tip
                data-for={'delete'}
                className="absolute inset-y-0 z-10 inline-flex items-center pl-5 cursor-pointer group"
              >
                <ReactTooltip
                  className="react-tooltip !text-sm !max-w-xs !rounded !text-white !bg-gray-900"
                  id={'delete'}
                >
                  <h4> Destroy this NFT </h4>
                </ReactTooltip>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 px-4 py-5">
        <div className="flex items-center justify-between">
          {/* {totalLikes > 0 && (
            <p className="px-3 py-2 rounded-lg text-mist bg-gray-50">
              {totalLikes}
            </p>
          )} */}
          <p className="py-2 text-xl font-medium text-mirage">
            <span className="mr-2">${data?.amount}</span>
          </p>
          <p className="py-2 text-xl font-medium text-mirage">
            <span>
              {data?.amount && Number((data?.amount / usdBalance).toFixed(4))}
            </span>{' '}
            BSV
          </p>
        </div>
        {!singleNFT && (
          <div className="flex-1 my-6">
            <NextLink href={`/discover/${data?.tokenId}`}>
              <a className="cursor-pointer">
                <h3 className="text-sm text-azul min-h-[20px]">
                  {artistData?.name}
                </h3>
                <p className="h-10 mt-1 text-lg text-mirage">{data?.name}</p>
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
            className="bg-azul hover:bg-ultramarine rounded-lg text-white py-2.5 flex w-full border-none justify-center items-center font-normal"
          >
            Buy now
          </button>
          <span className="border border-gray-200 rounded-md">
            {/* <ShareIcon className="w-5 h-5 text-blue-700" aria-hidden="true" /> */}
            <Social path={`/discover/${data?.tokenId}`} />
          </span>
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
        isDestory={true}
        isOpen={isDestory}
        button1Text={'Destory'}
        button2Text={'Cancel'}
        title={'Are you sure you want'}
        secondTitle={'to destory this NFT?'}
        description={'Destroyed NFTs cannot be restored.'}
        content={
          <Card
            data={data}
            artistData={artistData}
            usdBalance={usdBalance}
            dialogErrorMsg={dialogErrorMsg}
            totalLikes={totalLikes}
          />
        }
        onClose={() => setIsDestory(false)}
        onConfirm={handleDestoryNft}
        isLoadingConfirmBtn={loadingDestoryBtn}
      />
      <ModalConfirm
        isOpen={isSuccess}
        className="sm:max-w-[304px] max-w-[304px] "
        button1Text={'Dismis'}
        icon={
          <FeaturedIcon
            className="w-12 h-12 text-green-500"
            aria-hidden="true"
          />
        }
        cancelButton={false}
        title={'Success'}
        content={
          <div className="">
            You have successfully purchased <br /> &apos;{data?.name}&apos; NFT.
            <br />
            {successTx && (
              <div className="inline-flex items-center space-x-1">
                <span>Tx id:</span>
                <a
                  className="font-normal text-azul max-w-[100px] text-ellipsis overflow-hidden"
                  href={`https://whatsonchain.com/tx/${successTx}`}
                >
                  {successTx}
                </a>
              </div>
            )}
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
      <ModalConfirm
        isOpen={isDestorySuccess}
        className="sm:max-w-[304px] max-w-[304px]"
        button1Text={'Close'}
        icon={
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="4" width="48" height="48" rx="24" fill="#D1FADF" />
            <path
              d="M25 19H31M19 22H37M35 22L34.2987 32.5193C34.1935 34.0975 34.1409 34.8867 33.8 35.485C33.4999 36.0118 33.0472 36.4353 32.5017 36.6997C31.882 37 31.0911 37 29.5093 37H26.4907C24.9089 37 24.118 37 23.4983 36.6997C22.9528 36.4353 22.5001 36.0118 22.2 35.485C21.8591 34.8867 21.8065 34.0975 21.7013 32.5193L21 22M26 26.5V31.5M30 26.5V31.5"
              stroke="#039855"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="4"
              y="4"
              width="48"
              height="48"
              rx="24"
              stroke="#ECFDF3"
              strokeWidth="8"
            />
          </svg>
        }
        cancelButton={false}
        title={'Success'}
        content={
          <div>
            You have successfully destroyed <br /> &apos;{data?.name}&apos; NFT.
          </div>
        }
        onClose={() => {
          setIsDestorySuccess(false)
        }}
        onConfirm={() => {
          setIsDestorySuccess(false)
          router.push('/discover').then(() => router.reload())
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
  return (
    <div>
      <div
        className={twMerge(
          'relative border border-gray-200 group rounded-xl flex flex-col',
        )}
      >
        <div className="relative h-[380px]">
          <div className="relative w-full overflow-hidden bg-gray-200 rounded-t-xl aspect-w-square h-[380px] group-hover:opacity-75">
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
            {/* {totalLikes > 0 && (
              <p className="px-3 py-2 text-base font-normal text-mist rounded-lg bg-gray-50">
                {totalLikes}
              </p>
            )} */}
            <p className="py-2 text-xl font-medium text-mirage">
              <span className="mr-2">${data?.amount}</span>
            </p>
            <p className="py-2 text-xl font-medium text-mirage">
              BSV
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
