import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import PropTypes from 'prop-types'

const ModalSimple = ({
  icon,
  title,
  description,
  isOpen,
  handleOnClose,
  children,
}) => {
  const [open, setOpen] = useState(isOpen)

  const onClose = () => {
    setOpen(false)
    handleOnClose(false)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
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
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-2xl sm:w-full sm:p-6">
                <div>
                  {icon && (
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                      <CheckIcon
                        className="w-6 h-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  <div className="text-center ">
                    {title && (
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Payment successful
                      </Dialog.Title>
                    )}
                    {description && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Consequatur amet labore.
                        </p>
                      </div>
                    )}

                    {children}
                  </div>
                  <div className="max-w-[40%] flex">
                    <button className="w-full btn-primary" onClick={onClose}>
                      Crop
                    </button>
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

ModalSimple.defaultProps = {
  isOpen: false,
}

ModalSimple.propTypes = {
  icon: PropTypes.node,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
}

export default ModalSimple
