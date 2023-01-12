import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'

export default function OtpModal({
  isOpen,
  setIsOpen,
  handler,
  verifyCode,
  setVerifyCode,
}) {
  const first = useRef(null)
  const second = useRef(null)
  const third = useRef(null)
  const fourth = useRef(null)
  const fifth = useRef(null)
  const sixth = useRef(null)

  const refObj = {
    1: second,
    2: third,
    3: fourth,
    4: fifth,
    5: sixth,
    6: first,
  }

  function closeModal() {
    setIsOpen(false)
  }

  const otpInput = (e, idx) => {
    e.preventDefault()
    if (parseInt(e.target.value) || e.target.value === '0') {
      const ref = refObj[idx]
      setVerifyCode({
        ...verifyCode,
        [idx]: e.target.value,
      })
      ref.current.focus()
    } else {
      setVerifyCode({
        ...verifyCode,
        [idx]: null,
      })
    }
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-center leading-6 text-gray-900"
                  >
                    SMS Verification
                  </Dialog.Title>

                  <div class="flex items-center flex-col mt-4">
                    <span>Enter the SMS you received</span>
                    {/* <span class="font-bold">+91 ******876</span> */}
                  </div>
                  <div className="mt-2">
                    <form
                      onSubmit={handler}
                      class="flex flex-col justify-center text-center px-2 mt-5"
                    >
                      <div
                        class="flex flex-row justify-center text-center px-2 mt-5"
                        id="otp"
                      >
                        <input
                          class="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          ref={first}
                          onChange={(e) => otpInput(e, 1)}
                          maxlength="1"
                        />
                        <input
                          class="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          ref={second}
                          onChange={(e) => otpInput(e, 2)}
                          maxlength="1"
                        />
                        <input
                          class="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          ref={third}
                          onChange={(e) => otpInput(e, 3)}
                          maxlength="1"
                        />
                        <input
                          class="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          ref={fourth}
                          onChange={(e) => otpInput(e, 4)}
                          maxlength="1"
                        />
                        <input
                          class="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          ref={fifth}
                          onChange={(e) => otpInput(e, 5)}
                          maxlength="1"
                        />
                        <input
                          class="m-2 border h-10 w-10 text-center form-control rounded"
                          type="text"
                          ref={sixth}
                          onChange={(e) => otpInput(e, 6)}
                          maxlength="1"
                        />
                      </div>

                      <div className="mt-4 flex justify-center items-center">
                        <button
                          type="submit"
                          disabled={
                            Object.values(verifyCode).every((isnum) => isnum)
                              ? false
                              : true
                          }
                          className={`inline-flex justify-center rounded-md border border-transparent duration-300 bg-blue-100 px-4 py-2 text-sm font-medium ${
                            Object.values(verifyCode).every((isnum) => isnum)
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
