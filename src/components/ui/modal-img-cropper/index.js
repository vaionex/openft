import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import PropTypes from 'prop-types'

const ModalImgCropper = ({ isOpen, handleOnClose, children }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={() => {}}>
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
          <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-3xl sm:p-6">
                <div className="relative">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

ModalImgCropper.defaultProps = {
  isOpen: false,
}

ModalImgCropper.propTypes = {
  icon: PropTypes.node,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
}

export default ModalImgCropper
