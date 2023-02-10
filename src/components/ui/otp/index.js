import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import AuthCode from '@/utils/otpInput'

export default function OtpModal({
  isOpen,
  setIsOpen,
  handler,
  allowedCharacters,
  handleOnChange,
  otpNumber,
}) {
  const AuthInputRef = useRef(null)

  function closeModal() {
    setIsOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handler(e)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-6 sm:p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-center leading-6 text-gray-900"
                  >
                    SMS Verification
                  </Dialog.Title>

                  <div className="flex items-center flex-col mt-4">
                    <span>Enter the SMS you received</span>
                    {/* <span className="font-bold">+91 ******876</span> */}
                  </div>
                  <div className="mt-2">
                    <form
                      onSubmit={handleSubmit}
                      class="flex flex-col justify-center text-center sm:px-2 mt-5"
                    >
                      <AuthCode
                        key={allowedCharacters}
                        allowedCharacters={allowedCharacters}
                        ref={AuthInputRef}
                        onChange={handleOnChange}
                        containerClassName="container"
                        inputClassName="input"
                        isPassword={false}
                        disabled={false}
                      />

                      <div className="mt-4 flex justify-center items-center">
                        <button
                          type="submit"
                          disabled={otpNumber.length === 6 ? false : true}
                          className={`inline-flex justify-center rounded-md border border-transparent duration-300 bg-blue-100 px-4 py-2 text-sm font-medium ${
                            otpNumber.length === 6
                              ? 'text-blue-900 focus-visible:ring-blue-500 hover:bg-blue-200'
                              : 'text-blue-200'
                          } focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
                          onClick={closeModal}
                        >
                          Verify
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}