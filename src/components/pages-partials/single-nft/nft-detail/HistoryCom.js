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
        <img
          src={data?.profileImage}
          alt="vaionex-mini-icon"
          className="bg-gray-100 rounded-full w-9 h-9"
        />
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
                <a className="outline-none">
                  {' '}
                  by {data?.username}
                  {data.buyer}
                </a>
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
