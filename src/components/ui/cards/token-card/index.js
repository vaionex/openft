import React from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'
import NextLink from 'next/link'
import { SvgUpRightIcon } from '@/components/common/icons'

const TokenCard = ({ data, type, idx }) => {
  const isInFirstThree = idx < 3
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
          <NextLink href={`/user-settings/collection?current=${data?.tokenId}`}>
            <a className="cursor-pointer">
              {data?.image ? (
                <>
                  <Image
                    src={data?.image || ''}
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
      </div>
      <div className="mt-5 flex justify-between px-2">
        <span>{data.symbol}</span>
        <span>{data.satsPerToken + '/' + data.sn[0]}</span>
      </div>
      <div className="mt-3 px-2">
        <span>{data.name}</span>
      </div>
      <div className={`flex gap-1.5 my-2 px-2`}>
        <NextLink href={`/user-settings/collection?current=${data?.tokenId}`}>
          <a className="bg-[#155EEF] hover:bg-[#2d6ff1] rounded-lg text-white py-2.5 flex space-x-2 w-full border-none justify-center items-center font-normal">
            <span>NFT Details</span>
            <SvgUpRightIcon className="w-4 h-4" />
          </a>
        </NextLink>
      </div>
    </div>
  )
}

TokenCard.defaultProps = {
  data: {},
  type: 'default',
}

TokenCard.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['default', 'list', 'carousel']),
}

export default TokenCard
