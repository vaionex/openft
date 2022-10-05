import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HearIconSolid } from '@heroicons/react/solid'
import React from 'react'

const CardLikeButton = ({ likeNfts, hasLike }) => {
  return (
    <div onClick={likeNfts} className="inline-flex items-center justify-center bg-white bg-opacity-50 border border-white rounded-md cursor-pointer hover:bg-opacity-40 w-11 h-11">
      {hasLike
        ? <HearIconSolid className="w-5 h-5 text-red-600" aria-hidden="true" />
        : <HeartIcon className="w-5 h-5 text-white" aria-hidden="true" />}

    </div>
  )
}

export default CardLikeButton
