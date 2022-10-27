import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { FeaturedIcon } from '@/components/common/icons'
import ButtonWLoading from '@/components/ui/button-w-loading'

const ModalConfirm = ({
  isOpen,
  onClose,
  onConfirm,
  isLoadingConfirmBtn = false,
  content,
  title,
  secondTitle,
  button1Text = 'Delete',
  button2Text = 'Cancel',
  icon = null,
  cancelButton = true,
  deleteButton = true,
}) => {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
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

        <div className="fixed inset-0 z-30 overflow-y-auto">
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
              <Dialog.Panel className="relative w-full px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-[438px] sm:p-6">
                <div>
                  <div className="text-center">
                    <Dialog.Title
                      as="h3"
                      className="flex flex-col items-center justify-center pb-2 text-lg font-medium leading-6 text-gray-900"
                    >
                      {icon && <div className="pb-5">{icon}</div>}
                      {title} <br /> {secondTitle}
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="text-sm text-gray-500">{content}</div>
                    </div>
                  </div>
                </div>
                <div
                  className={`mt-5 sm:mt-6 ${
                    deleteButton && cancelButton
                      ? 'sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'
                      : 'flex justify-center items-center max-w-xs mx-auto'
                  }`}
                >
                  {deleteButton && (
                    <ButtonWLoading
                      isPending={isLoadingConfirmBtn}
                      text={button1Text}
                      type="button"
                      className="inline-flex justify-center w-full px-4 py-[11px] text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                      onClick={onConfirm}
                    />
                  )}
                  {cancelButton && (
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-4 py-[11px] mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      onClick={onClose}
                      ref={cancelButtonRef}
                    >
                      {button2Text}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default ModalConfirm
