/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/outline'
import Image from 'next/image'

import { setOpen, removeBasket } from '@/redux/slices/basket'
import basketSelector from '@/redux/selectors/basket'
import { useSelector, useDispatch } from 'react-redux'
import { InputMain } from '@/components/ui/inputs'

export default function Basket() {
  const { open, basket } = useSelector(basketSelector)
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()

  const removeFromBasket = (uid) => {
    const newItemList = Object.keys(basket).reduce((prev, current) => {
      if (current !== uid) {
        return { ...prev, [current]: basket[current] }
      } else {
        return { ...prev }
      }
    }, {})
    dispatch(
      removeBasket({
        ...newItemList,
      }),
    )
  }

  useEffect(() => {
    if (Object.values(basket).length > 0) {
      const totalAmount = Object.values(basket).reduce((prev, current) => {
        if (Number(current.amount)) {
          return prev + Number(current.amount)
        } else {
          return prev
        }
      }, 0)
      setTotal(totalAmount)
    } else {
      setTotal(0)
    }
  }, [basket])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => dispatch(setOpen(false))}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-3">
                          <div className="rounded-full flex justify-center items-center h-14 w-14 bg-blue-100">
                            <div className="rounded-full flex justify-center items-center h-10 w-10 bg-blue-200">
                              <ShoppingCartIcon
                                className="w-6 h-6 inline text-blue-600"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                          <div>
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              Cart
                            </Dialog.Title>
                            <div>Your order summary</div>
                          </div>
                        </div>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => dispatch(setOpen(false))}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-7 w-7" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-between">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
                          {Object.values(basket).length} Items
                        </span>
                        <span className="text-xl text-gray-900 font-medium">
                          ${total}.00
                        </span>
                      </div>

                      <div className="py-6">
                        <div className="h-[1px] bg-gray-200"></div>
                      </div>
                      <div className="mt-8 ">
                        <div className="overflow-y-scroll">
                          <ul
                            role="list"
                            className="flex flex-col space-y-3 divide-gray-200"
                          >
                            {Object.values(basket).length > 0 &&
                              Object.values(basket).map((product) => (
                                <li
                                  key={product.objectID}
                                  className="flex justify-between py-6 px-3 bg-gray-50 rounded-md"
                                >
                                  <div className="flex">
                                    <div className="h-14 w-14 flex-shrink-0 rounded-md overflow-hidden">
                                      <Image
                                        src={product.imageURL}
                                        alt={product.description}
                                        width={100}
                                        height={100}
                                        className="object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-col">
                                      <div className="flex flex-col text-base font-medium text-gray-900">
                                        <div>${product.amount}.00</div>
                                        <div>{product.name}</div>
                                        <div className="text-gray-500 text-sm">
                                          {product.artist.name}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex space-x-2">
                                      <select
                                        className="rounded-lg border-gray-100"
                                        id="qty-select"
                                        defaultValue={product.qty}
                                      >
                                        {[...Array(product.supply)].map(
                                          (_, idx) => (
                                            <option key={idx} value={idx + 1}>
                                              {idx + 1}
                                            </option>
                                          ),
                                        )}
                                      </select>
                                      <div>
                                        <button
                                          onClick={() =>
                                            removeFromBasket(product.uid)
                                          }
                                          className="h-6 w-6"
                                        >
                                          <TrashIcon
                                            className="h-6 w-6 text-gray-300"
                                            aria-hidden="true"
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 sm:px-6">
                      <InputMain className="relative pb-0 border-none sm:gap-1">
                        <InputMain.Label
                          htmlFor={'discount'}
                          className="text-base font-medium text-gray-900"
                          label={'Discount code'}
                        />

                        <InputMain.Input
                          id={'discount'}
                          placeholder={''}
                          className="mb-8 sm:mb-4"
                          type={'text'}
                        />

                        {/* <span className="absolute text-xs text-red-600 -bottom-6 sm:-bottom-2 left-2">
                  {errors[inputAttribute.name]?.message}
                </span> */}
                      </InputMain>
                    </div>
                    <div className="flex flex-col text-base font-medium text-gray-900 px-4 sm:px-6">
                      <div className="py-2 flex justify-between">
                        <div>Discount</div>
                        <div className="text-gray-500 text-sm"></div>
                      </div>
                      <div className="py-2 flex justify-between">
                        <div>Total</div>
                        <div className="text-gray-500 text-sm">${total}.00</div>
                      </div>
                      <div className="py-2 flex justify-between">
                        <div>Wallet balance</div>
                        <div className="text-gray-500 text-sm"></div>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                        >
                          Pay ${total}.00 Now
                        </a>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
