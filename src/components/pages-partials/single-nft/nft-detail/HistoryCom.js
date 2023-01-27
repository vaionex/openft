import { useEffect, useState } from 'react'
import useArtistData from '@/hooks/useArtistData'
import moment from 'moment'
import NextLink from 'next/link'

export default function HistoryComp({ data, index, ...props }) {
  // const [artistId, setartistId] = useState(null)
  // const artistData = useArtistData(artistId)

  // useEffect(() => {
  //   if (data) {
  //     if (data.type === 'PURCHASE') {
  //       setartistId(data.purchaserId)
  //     } else if (data.type === 'MINT') {
  //       setartistId(data.minterId)
  //     }
  //   }
  // }, [data])

  return (
    <div
      {...props}
      className="flex items-center mt-4 space-x-2"
      key={'his-' + index}
    >
      <div>
        {data?.profileImage ? (
          <img
            src={data?.profileImage}
            alt="vaionex-mini-icon"
            className="bg-gray-100 rounded-full w-9 h-9"
          />
        ) : (
          <svg
            className="w-9 h-9 text-gray-400 bg-gray-100 rounded-full"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}
      </div>
      <div>
        <div className="font-medium text-gray-900 ">
          {(() => {
            if (data.type === 'PURCHASE') {
              return (
                'NFT purchased ' +
                moment
                  .utc(
                    moment
                      .duration(data.timestamp.seconds, 'seconds')
                      .as('milliseconds'),
                  )
                  .fromNow()
              )
            } else if (data.type === 'MINT') {
              return (
                'NFT minted ' +
                moment
                  .utc(
                    moment
                      .duration(data.timestamp.seconds, 'seconds')
                      .as('milliseconds'),
                  )
                  .fromNow()
              )
            }
          })()}

          {data.title}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <p className="font-medium text-[#004EEB]">
              <NextLink href={'/user/' + data?.username}>
                <a className="outline-none">by {data?.name}</a>
              </NextLink>
            </p>
            <a
              href={'https://whatsonchain.com/tx/' + data?.txid}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={'/images/chain.webp'}
                alt="vaionex-mini-icon"
                className="object-cover h-5 bg-gray-100 rounded-full w-1-"
              />{' '}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
