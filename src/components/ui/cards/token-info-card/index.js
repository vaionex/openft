import userSelector from '@/redux/selectors/user'
import Image from 'next/image'
import NextLink from 'next/link'
import { useSelector } from 'react-redux'
import { twMerge } from 'tailwind-merge'

const TokenInfoCard = ({
  data,
  type,
  isInFirstThree,
  isPrivate,
  handleModal,
  handleDelistModal,
  isLive,
}) => {
  const { currentUser } = useSelector(userSelector)

  return (
    <>
      <div
        className={twMerge(
          'relative border border-gray-200 group rounded-xl flex flex-col',
          type === 'carousel' ? 'sm:mr-5' : '',
        )}
      >
        <div className="relative">
          <div className="relative w-full cursor-pointer overflow-hidden bg-gray-200 rounded-t-xl aspect-w-square aspect-h-square group-hover:opacity-75">
            <NextLink
              href={`/user-settings/collection?current=${data?.tokenId}`}
            >
              {data?.image || data?.imageURL ? (
                <div>
                  <Image
                    src={data?.image || data?.imageURL || ''}
                    alt={data?.name}
                    layout="fill"
                    className="absolute inset-0 object-cover object-center w-full h-full"
                    priority={type === 'list' && isInFirstThree}
                    quality={70}
                  />
                  <div className="absolute inset-0 h-full bg-gradient-to-tr opacity-10 from-slate-900 to-slate-600 mix-blend-multiply" />
                </div>
              ) : (
                <div className="absolute inset-0 h-full bg-gradient-to-tr opacity-80 from-blue-600 to-blue-300" />
              )}
            </NextLink>
          </div>
          {data?.status == 'live' && (
            <div className="absolute top-4 right-4 z-20 text-gray-200 inline-flex py-1 px-2 font-semibold text-xs backdrop-blur-md bg-black/30 tracking-widest overflow-hidden rounded-md">
              LIVE
            </div>
          )}
        </div>
        <div className="px-4 py-5">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-azul font-semibold text-sm">
                {currentUser?.name}
              </span>
              <span className="text-mirage text-lg font-medium">
                {data?.name}
              </span>
            </div>

            <span>${data?.amount}</span>
          </div>

          <div className="flex gap-1.5 mt-4">
            <NextLink
              href={`/user-settings/collection?current=${data?.tokenId}`}
            >
              <a className="bg-azul hover:bg-ultramarine rounded-lg text-white py-2.5 px-3 flex w-full border-none justify-center items-center font-medium">
                <span>NFT Details</span>
              </a>
            </NextLink>

            {isLive ? (
              <button
                type="button"
                onClick={() => handleDelistModal()}
                className="bg-white rounded-lg border border-azul text-azul py-2.5 px-2 flex w-full justify-center items-center font-semibold"
              >
                <span>Delist Nft</span>
              </button>
            ) : (
              isPrivate && (
                <button
                  type="button"
                  onClick={() => handleModal()}
                  className="bg-white rounded-lg border border-azul text-azul py-2.5 px-2 flex w-full justify-center items-center font-semibold"
                >
                  <span>Sell Nft</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default TokenInfoCard
