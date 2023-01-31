import { firebaseDb } from '@/firebase/init'
import userSelector from '@/redux/selectors/user'
import { doc, writeBatch } from 'firebase/firestore'
import Image from 'next/image'
import NextLink from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'
import ModalConfirm from '../../modal-confirm'

const TokenInfoCard = ({
  data,
  type,
  isInFirstThree,
  isPrivate,
  handleModal,
}) => {
  const [isLive, setIslive] = useState(data?.status === 'live')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { currentUser } = useSelector(userSelector)
  const handleToggleIsLive = () => {}

  const updateNftStatus = async () => {
    try {
      setIsLoading(true)
      //updating database
      console.log('updating database')

      const batch = writeBatch(firebaseDb)
      const tokenRef = doc(firebaseDb, 'nfts', data?.tokenId)

      const tokenObj = {
        status: 'private',
      }

      batch.update(tokenRef, tokenObj)
      await batch.commit()

      // updating status
      setIslive(false)
      setIsOpen(false)
      setIsLoading(false)
      toast.success('NFT Delist Successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } catch (err) {
      setIsLoading(false)
      console.log('err', err)
    }
  }

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
              {data?.imageURL ? (
                <div>
                  <Image
                    src={data?.imageURL || ''}
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
          {isLive && (
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
                onClick={() => setIsOpen(true)}
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
      <ModalConfirm
        isOpen={isOpen}
        button1Text={'Confirm'}
        button2Text={'Cancel'}
        title={'Are you sure you want'}
        secondTitle={'to Delist this NFT?'}
        content={''}
        onClose={() => setIsOpen(false)}
        onConfirm={handleToggleIsLive}
        isLoadingConfirmBtn={isLoading}
      />
    </>
  )
}
export default TokenInfoCard
