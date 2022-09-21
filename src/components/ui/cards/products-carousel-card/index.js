import React, { useEffect, useState } from 'react'
import { ShareIcon } from '@heroicons/react/outline'
import { increment, arrayUnion, arrayRemove } from 'firebase/firestore'
import { firbaseAddDoc, firbaseUpdateDoc } from '@/firebase/utils'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'
import CardLikeButton from '../../card-like-button'
import NextLink from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import userSelector from '@/redux/selectors/user'
import { useRouter } from 'next/router'

import { addBasket, setOpen } from '@/redux/slices/basket'
import basketSelector from '@/redux/selectors/basket'

const ProductsCarouselCard = ({ data, type, idx, favouriteNfts }) => {
  const isInFirstThree = idx < 3
  const router = useRouter()
  const { currentUser } = useSelector(userSelector)
  const [hasLike, setHasLike] = useState(false)
  const { basket } = useSelector(basketSelector)

  const dispatch = useDispatch()

  const updateBasket = () => {
    if (currentUser) {
      dispatch(
        addBasket({
          [data.objectID]: {
            qty: 1,
            ...data,
          },
        }),
      )
      dispatch(setOpen(true))
    } else {
      router.replace('/login')
    }
  }

  useEffect(() => {
    if (!favouriteNfts) return
    const isLike = favouriteNfts?.findIndex((like) => like === data?.id) !== -1
    setHasLike(isLike)
  }, [favouriteNfts])

  const likeNfts = async () => {
    if (!currentUser) return
    if (hasLike) {
      setHasLike(false)
      await firbaseUpdateDoc('favourites', currentUser?.uid, {
        nfts: arrayRemove(data?.id),
      })
      await firbaseUpdateDoc('nfts', data?.id, { likes: increment(-1) })
    } else {
      setHasLike(true)
      const updateFav = { nfts: arrayUnion(data?.id) }
      favouriteNfts
        ? await firbaseUpdateDoc('favourites', currentUser?.uid, updateFav)
        : await firbaseAddDoc('favourites', currentUser?.uid, updateFav)
      await firbaseUpdateDoc('nfts', data?.id, { likes: increment(1) })
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
          <NextLink href={`/discover/${data?.uid}`}>
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
        <div className="absolute bottom-0 right-0 z-50 inline-flex p-4 overflow-hidden rounded-lg">
          <CardLikeButton likeNfts={likeNfts} hasLike={hasLike} />
        </div>
      </div>
      <div className="flex flex-col flex-1 px-4 py-5">
        <div className="flex items-center justify-between">
          <p className="px-3 py-2 rounded-lg bg-gray-50">1/1</p>
          <p className="text-xl font-medium text-gray-900">
            ${data?.amount} BSV 1
          </p>
        </div>
        <div className="flex-1 my-6">
          <NextLink href={`/discover/${data?.uid}`}>
            <a className="cursor-pointer">
              <h3 className="text-sm text-blue-700 min-h-[20px]">
                {data?.artist?.name}
              </h3>
              <p className="mt-1 text-lg text-gray-800">{data?.name}</p>
            </a>
          </NextLink>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={updateBasket}
            className="btn-primary py-2.5 flex w-full border-none justify-center items-center font-normal"
          >
            Buy now
          </button>

          <button className="p-3.5 rounded-md border border-gray-200">
            <ShareIcon className="w-5 h-5 text-blue-700" aria-hidden="true" />
          </button>
        </div>
      </div>
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
