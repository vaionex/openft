import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import ButtonWLoading from '@/components/ui/button-w-loading'
import NextLink from 'next/link'
import Image from 'next/image'
import { InputMain } from '../inputs'
import { Controller, useForm } from 'react-hook-form'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'

const ModalNFTSell = ({ className, isOpen, onClose, onConfirm, data }) => {
  // const resolver = useYupValidationResolver(validationSchema)
  const textAreaRef = useRef(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    // resolver,
  })

  const onSubmit = async (formData) => {}
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
                <div className="flex flex-col sm:flex-row p-4 sm:p-16">
                  <div className="w-full">
                    <div className="relative max-w-sm border border-gray-200 group rounded-xl flex flex-col">
                      <div className="relative">
                        <div className="relative w-full overflow-hidden bg-gray-200 rounded-t-xl aspect-w-square aspect-h-square group-hover:opacity-75">
                          <NextLink
                            href={`/user-settings/collection?current=${data?.tokenId}`}
                          >
                            <a className="cursor-pointer">
                              {data?.image ? (
                                <Image
                                  src={data?.image || ''}
                                  alt={data?.name}
                                  layout="fill"
                                  className="object-cover object-center w-full h-full"
                                  quality={100}
                                />
                              ) : (
                                <div className="h-full w-full bg-gradient-to-tr from-blue-600 to-blue-300" />
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
                  <div className="w-full">
                    <div className="space-y-4 mb-8">
                      <h3 className="uppercase text-3xl text-azul">
                        Sell Your NFT
                      </h3>
                      <p className="text-mirage font-medium">
                        Unlock the potential of your digital assets.
                      </p>
                      <p className="text-mirage font-medium">
                        Connect with buyers and sellers form around the world,
                        and take the first step towards monetizing your unique
                        digital creations.
                      </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                      <div className="w-full mb-4">
                        <InputMain className="relative pb-2 border-none sm:gap-1">
                          <InputMain.Label
                            label="Sale Price"
                            htmlFor="Sale Price"
                            required
                          />
                          <Controller
                            name={'sale-price'}
                            control={control}
                            render={({ field }) => {
                              return (
                                <InputMain.Input
                                  id="sale-price"
                                  type="number"
                                  className="sm:col-span-2"
                                  inputClassName="md:h-11"
                                  onChange={() => {}}
                                  error={errors['first-name']?.message}
                                  {...field}
                                />
                              )
                            }}
                          />
                        </InputMain>
                      </div>

                      <div className="w-full">
                        <InputMain className="relative border-none justify-items-start sm:pb-2 sm:gap-1">
                          <InputMain.Label
                            label="Description"
                            htmlFor="desc"
                            required
                          />
                          <Controller
                            name="desc"
                            control={control}
                            render={({ field }) => {
                              return (
                                <InputMain.Textarea
                                  id="desc"
                                  className="w-full"
                                  rows={6}
                                  onChange={() => {}}
                                  error={errors['message']?.message}
                                  {...field}
                                  ref={textAreaRef}
                                />
                              )
                            }}
                          />
                        </InputMain>
                      </div>

                      <div className="mt-5 border-t border-gray-200 flex gap-1.5 justify-end py-3">
                        <button
                          type="button"
                          onClick={() => onClose()}
                          className="bg-white rounded-lg border w-fit py-2.5 px-2 flex justify-center items-center"
                        >
                          <span>Cancel</span>
                        </button>
                        <ButtonWLoading
                          type="submit"
                          text="LIST ITEM ON MARKET"
                          className="font-normal"
                        />
                      </div>
                    </form>
                  </div>
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
