import { HeartIcon } from '@heroicons/react/outline'
import React from 'react'

const CardLikeButton = () => {
  return (
    <div className="inline-flex items-center justify-center bg-white bg-opacity-50 border border-white rounded-md cursor-pointer hover:bg-opacity-40 w-11 h-11">
      <HeartIcon className="w-5 h-5 text-white" aria-hidden="true" />
    </div>
  )
}

export default CardLikeButton
