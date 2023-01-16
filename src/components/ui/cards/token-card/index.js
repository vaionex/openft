import React, { useState } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'
import NextLink from 'next/link'
import { SvgUpRightIcon } from '@/components/common/icons'
import ModalNFTSell from '../../modal-nft-sell'

const TokenCard = ({ data, type, idx }) => {
  let [isOpen, setIsOpen] = useState(false)

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
      <div className="px-4 py-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-azul font-semibold text-sm">
              {data.symbol}
            </span>
            <span className="text-mirage text-lg font-medium">{data.name}</span>
          </div>

          <span className="p-2 bg-vista-white rounded-lg">
            {data.satsPerToken + '/' + data.sn[0]}
          </span>
        </div>

        <div className="flex gap-1.5 mt-4">
          <NextLink href={`/user-settings/collection?current=${data?.tokenId}`}>
            <a className="bg-azul hover:bg-ultramarine rounded-lg text-white py-2.5 px-3 flex w-full border-none justify-center items-center font-medium">
              <span>NFT Details</span>
            </a>
          </NextLink>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="bg-white rounded-lg border border-azul text-azul py-2.5 px-2 flex w-full justify-center items-center font-semibold"
          >
            <span>Sell Nft</span>
          </button>
        </div>
        <ModalNFTSell
          data={data}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false)
          }}
        />
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
