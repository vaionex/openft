import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { FeaturedIcon } from '@/components/common/icons'
import ButtonWLoading from '@/components/ui/button-w-loading'
import NextLink from 'next/link'
import Image from 'next/image'

const ModalNFTSell = ({ className, isOpen, onClose, onConfirm, data }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-[30] transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-30 overflow-y-auto max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl w-full ${className} `}
              >
                <div className="md:grid grid-cols-3 gap-16 p-4 sm:p-16">
                  <div className=" col-span-1">
                    <div className="relative max-w-sm border border-gray-200 group rounded-xl flex flex-col">
                      <div className="relative">
                        <div className="relative w-full overflow-hidden bg-gray-200 rounded-t-xl aspect-w-square aspect-h-square group-hover:opacity-75">
                          <NextLink
                            href={`/user-settings/collection?current=${data?.tokenId}`}
                          >
                            <a className="cursor-pointer">
                              {data?.image ? (
                                <>
                                  <Image
                                    src={data?.image || ''}
                                    alt={data?.name}
                                    layout="fill"
                                    className="absolute inset-0 object-cover object-center w-full h-full"
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
                            <span className="text-mirage text-lg font-medium">
                              {data.name}
                            </span>
                          </div>

                          <span className="p-2 bg-vista-white rounded-lg">
                            {data.satsPerToken + '/' + data.sn[0]}
                          </span>
                        </div>

                        <div className="flex gap-1.5 mt-4">
                          <NextLink
                            href={`/user-settings/collection?current=${data?.tokenId}`}
                          >
                            <a className="bg-azul hover:bg-ultramarine rounded-lg text-white py-2.5 px-3 flex w-full border-none justify-center items-center font-medium">
                              <span>NFT Details</span>
                            </a>
                          </NextLink>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" col-span-2 bg-gray-700"></div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalNFTSell
