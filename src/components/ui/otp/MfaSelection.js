import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import QRCode from "react-qr-code";
import AuthCode from '@/utils/otpInput'
import { Controller, useController, useForm, useWatch } from 'react-hook-form'
import useYupValidationResolver from '@/hooks/useYupValidationResolver'
import * as yup from 'yup'
import Checkbox from '../checkbox';
import ButtonWLoading from '../button-w-loading';
export default function MfaSelection({
  isOpen,
  setIsOpen,
  handler,
}) {
  const checkBox = [
    {
      name: "totp",
      text: "Time-based One-Time Password",
      subText: "Recieve OTP on authenticator app",
    },
    {
      name: "phone",
      text: "SMS",
      subText: "Recieve OTP on mobile number",
    }]
  function closeModal() {
    setIsOpen(false)
  }


  const validationSchema = yup.object().shape({
    checkbox: yup.string().required("Please select atleast one option."),
  });

  const resolver = useYupValidationResolver(validationSchema)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm({
    mode: 'onSubmit',
    resolver,
    reValidateMode: 'onChange',
  })
  const onSubmit = (e) => {
    handler(e.checkbox)
    closeModal()
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[10]" onClose={closeModal}>
          <div className="fixed inset-0 overflow-y-auto z-[999999999999]">
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
                    className="text-2xl font-bold text-left leading-6 text-gray-900"
                  >
                    Select MFA method
                  </Dialog.Title>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 divide-y divide-gray-200"
                  >
                    <div className="space-y-6 divide-y divide-gray-200">
                      <div className="pt-6 ">
                        <fieldset>
                          <legend className="sr-only">Multi-factor Authentication </legend>
                          <div
                            className="text-base font-medium text-gray-900 "
                            aria-hidden="true"
                          >
                            Multi-factor Authentication
                            <div className="text-sm font-medium text-gray-500">
                              Select type of Multi-factor Authentication
                            </div>
                          </div>
                          <div className="mt-4 space-y-4">
                            <Controller

                              name="checkbox"
                              control={control}
                              defaultValue=""
                              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                                <>
                                  {checkBox?.map((data, index) => (

                                    <div key={index} className="relative flex items-start">
                                      <Checkbox
                                        type="checkbox"
                                        name={name}
                                        text={data.text}
                                        value={data.name}
                                        checked={value === data.name}
                                        onChange={(e) => {
                                          onChange(e.target.checked ? e.target.value : '');
                                        }}
                                        onBlur={onBlur}
                                        ref={ref}
                                      />
                                    </div>
                                  ))}

                                </>
                              )}
                            />
                            {errors?.checkbox && <span className="w-full mt-2 text-xs text-red-500">{errors?.checkbox?.message}</span>}

                          </div>

                        </fieldset>
                        <div className='mt-5'>
                          <ButtonWLoading
                            // isError={error}
                            // isPending={isPending}
                            text="Next"
                            type="submit"
                            fullWidth
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
